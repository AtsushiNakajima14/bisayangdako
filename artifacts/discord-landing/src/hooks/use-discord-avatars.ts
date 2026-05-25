import { useState, useEffect } from "react";

interface AvatarResult {
  avatarUrl: string;
  username: string;
  decorationUrl: string | null;
}

type AvatarMap = Record<string, AvatarResult | null>;

export function useDiscordAvatars(userIds: string[]) {
  const [avatars, setAvatars] = useState<AvatarMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userIds.length === 0) { setLoading(false); return; }

    let cancelled = false;

    async function fetchAll() {
      const results = await Promise.allSettled(
        userIds.map(async (id) => {
          const res = await fetch(`/api/discord/user/${id}/avatar`);
          if (!res.ok) throw new Error(`${res.status}`);
          const data: AvatarResult = await res.json();
          return { id, data };
        })
      );

      if (cancelled) return;

      const map: AvatarMap = {};
      results.forEach((result, i) => {
        const id = userIds[i];
        map[id] = result.status === "fulfilled" ? result.value.data : null;
      });
      setAvatars(map);
      setLoading(false);
    }

    fetchAll();
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIds.join(",")]);

  return { avatars, loading };
}
