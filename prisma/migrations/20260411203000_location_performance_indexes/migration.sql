CREATE INDEX IF NOT EXISTS "idx_state_name" ON "State" ("name");
CREATE INDEX IF NOT EXISTS "idx_district_name" ON "District" ("name");
CREATE INDEX IF NOT EXISTS "idx_village_name" ON "Village" ("name");

CREATE INDEX IF NOT EXISTS "idx_district_state_id" ON "District" ("stateId");
CREATE INDEX IF NOT EXISTS "idx_subdistrict_district_id" ON "SubDistrict" ("districtId");
CREATE INDEX IF NOT EXISTS "idx_village_subdistrict_id" ON "Village" ("subDistrictId");
