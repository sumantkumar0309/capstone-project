const express = require("express");
const prisma = require("../lib/prisma");
const { cacheMiddleware } = require("../middleware/redisCache");

const router = express.Router();

// 1. Get all states
router.get("/states", cacheMiddleware(3600), async (req, res, next) => {
  try {
    const states = await prisma.state.findMany({
      orderBy: { name: 'asc' },
      select: { id: true, name: true, code: true }
    });
    return res.status(200).json({ success: true, data: states });
  } catch (error) {
    next(error);
  }
});

// 2. Get districts by state
router.get("/states/:stateId/districts", cacheMiddleware(3600), async (req, res, next) => {
  try {
    const { stateId } = req.params;
    const districts = await prisma.district.findMany({
      where: { stateId },
      orderBy: { name: 'asc' },
      select: { id: true, name: true, code: true }
    });
    return res.status(200).json({ success: true, data: districts });
  } catch (error) {
    next(error);
  }
});

// 3. Get sub-districts by district
router.get("/districts/:districtId/subdistricts", cacheMiddleware(3600), async (req, res, next) => {
  try {
    const { districtId } = req.params;
    const subDistricts = await prisma.subDistrict.findMany({
      where: { districtId },
      orderBy: { name: 'asc' },
      select: { id: true, name: true, code: true }
    });
    return res.status(200).json({ success: true, data: subDistricts });
  } catch (error) {
    next(error);
  }
});

// 4. Get villages by sub-district
router.get("/subdistricts/:subDistrictId/villages", cacheMiddleware(3600), async (req, res, next) => {
  try {
    const { subDistrictId } = req.params;
    const villages = await prisma.village.findMany({
      where: { subDistrictId },
      orderBy: { name: 'asc' },
      select: { id: true, name: true, code: true }
    });
    return res.status(200).json({ success: true, data: villages });
  } catch (error) {
    next(error);
  }
});

// 5. Autocomplete Search API
router.get("/search", cacheMiddleware(900), async (req, res, next) => {
  try {
    const q = String(req.query.q || "").trim();
    if (q.length < 3) {
      return res.status(400).json({ success: false, message: "Query string 'q' must be at least 3 characters long" });
    }

    const requestedLimit = Number(req.query.limit || 10);
    const limit = Number.isFinite(requestedLimit)
      ? Math.min(Math.max(Math.floor(requestedLimit), 1), 25)
      : 10;

    const villageSelect = {
      id: true,
      name: true,
      code: true,
      subDistrict: {
        select: {
          name: true,
          district: {
            select: {
              name: true,
              state: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      },
    };

    // startsWith is generally faster than contains on large datasets.
    let results = await prisma.village.findMany({
      where: {
        name: {
          startsWith: q,
          mode: 'insensitive'
        }
      },
      orderBy: { name: 'asc' },
      take: limit,
      select: villageSelect,
    });

    if (!results.length && q.length >= 4) {
      results = await prisma.village.findMany({
        where: {
          name: {
            contains: q,
            mode: 'insensitive',
          },
        },
        orderBy: { name: 'asc' },
        take: limit,
        select: villageSelect,
      });
    }

    const formattedResults = results.map(v => ({
      id: v.id,
      name: v.name,
      code: v.code,
      subDistrict: v.subDistrict.name,
      district: v.subDistrict.district.name,
      state: v.subDistrict.district.state.name
    }));

    return res.status(200).json({ success: true, data: formattedResults });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
