import { useState, useEffect } from "react";
import axios from "./axiosConfig";

/**
 * useProfile — fetches profile from API, normalises field names,
 * caches to localStorage("resume-user") so templates work offline.
 *
 * Returned `user` object field map:
 *   firstName, lastName, email, phone, portfolio,
 *   summary, location,
 *   education[], skills[], experience[], projects[],
 *   certificates[], courses[], cocurricular[], interests[]
 *
 * Templates also read the flattened "legacy" names kept as aliases:
 *   firstname, lastname, mobileNumber, address, objective
 */
export function useProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Not logged in — return empty object so templates show blank
      setUser({});
      setLoading(false);
      return;
    }

    // Try cache first for instant render
    const cached = localStorage.getItem("resume-user");
    if (cached) {
      try { setUser(JSON.parse(cached)); } catch {}
    }

    // Always refresh from API
    axios
      .get("/api/user/profile")
      .then(({ data }) => {
        // Normalise: create both new and legacy keys
        const normalised = {
          ...data,
          // Canonical frontend names (what the form uses)
          firstName:    data.firstName  || data.firstname  || "",
          lastName:     data.lastName   || data.lastname   || "",
          phone:        data.phone      || data.mobileNumber || "",
          summary:      data.summary    || data.objective  || "",
          location:     data.location   || data.address    || "",
          // Legacy aliases so old template code still works unchanged
          firstname:    data.firstName  || data.firstname  || "",
          lastname:     data.lastName   || data.lastname   || "",
          mobileNumber: data.phone      || data.mobileNumber || "",
          address:      data.location   || data.address    || "",
          objective:    data.summary    || data.objective  || "",
        };
        localStorage.setItem("resume-user", JSON.stringify(normalised));
        setUser(normalised);
      })
      .catch((err) => {
        setError(err.message);
        // Fall back to stale cache
        const stale = localStorage.getItem("resume-user");
        if (stale) {
          try { setUser(JSON.parse(stale)); } catch {}
        } else {
          setUser({});
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, error };
}
