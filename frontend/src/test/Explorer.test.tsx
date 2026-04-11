import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Explorer from "@/pages/Explorer";
import * as api from "@/lib/api";

vi.mock("@/lib/api", () => ({
  fetchStates: vi.fn(),
  fetchDistricts: vi.fn(),
  fetchSubDistricts: vi.fn(),
  fetchVillages: vi.fn(),
}));

describe("Explorer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(api.fetchStates).mockResolvedValue([
      {
        id: "s1",
        name: "Andhra Pradesh",
        code: 28,
      },
    ]);
    vi.mocked(api.fetchDistricts).mockResolvedValue([]);
    vi.mocked(api.fetchSubDistricts).mockResolvedValue([]);
    vi.mocked(api.fetchVillages).mockResolvedValue([]);
  });

  it("loads states on mount", async () => {
    render(
      <MemoryRouter>
        <Explorer />
      </MemoryRouter>,
    );

    expect(screen.getByText("Browse Indian Geography")).toBeInTheDocument();

    await waitFor(() => {
      expect(api.fetchStates).toHaveBeenCalledTimes(1);
    });
  });
});
