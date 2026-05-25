import { useState, useEffect, useRef } from "react";

export interface PartnerStats {
  memberCount: number;
  onlineCount: number;
  serverName: string;
  inviteUrl: string;
  iconUrl: string | null;
  cachedAt: number;
}

const POLL_INTERVAL_MS = 30_000;
const API_URL = "/api/discord/partner2/stats";

export function usePartner2Stats() {
  const [stats, setStats] = useState<PartnerStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function fetchStats() {
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("non-2xx response");
      const data: PartnerStats = await res.json();
      setStats(data);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchStats();
    timerRef.current = setInterval(fetchStats, POLL_INTERVAL_MS);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return { stats, loading, error };
}
