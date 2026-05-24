import { Router, type IRouter } from "express";

const router: IRouter = Router();

const BOT_TOKEN = "MTUwNzc4ODU5MDgwODA0MzUyMA.GdqMEj.DqRdyCHJTrqrPx9wd08MTkQeXuAJib68XZPAyI";

const INVITE_CODE = "Hu6QJZH4H";
const DISCORD_API_BASE = "https://discord.com/api/v10";
const CACHE_TTL_MS = 30_000;

// ── Stats cache ───────────────────────────────────────────────────────────────
interface DiscordStats {
  memberCount: number;
  onlineCount: number;
  serverName: string;
  inviteUrl: string;
}

interface StatsCache {
  data: DiscordStats;
  fetchedAt: number;
}

let statsCache: StatsCache | null = null;

async function fetchDiscordStats(): Promise<DiscordStats> {
  const response = await fetch(
    `${DISCORD_API_BASE}/invites/${INVITE_CODE}?with_counts=true`,
    { headers: { "User-Agent": "DiscordBot (landing-page, 1.0)" } },
  );
  if (!response.ok) throw new Error(`Discord API ${response.status}`);

  const json = await response.json() as {
    approximate_member_count: number;
    approximate_presence_count: number;
    guild?: { name?: string };
  };

  return {
    memberCount: json.approximate_member_count ?? 0,
    onlineCount: json.approximate_presence_count ?? 0,
    serverName: json.guild?.name ?? "Discord Server",
    inviteUrl: `https://discord.gg/${INVITE_CODE}`,
  };
}

router.get("/discord/stats", async (req, res) => {
  try {
    const now = Date.now();
    if (statsCache && now - statsCache.fetchedAt < CACHE_TTL_MS) {
      res.json({ ...statsCache.data, cachedAt: statsCache.fetchedAt });
      return;
    }
    const data = await fetchDiscordStats();
    statsCache = { data, fetchedAt: now };
    res.json({ ...data, cachedAt: now });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch Discord stats");
    res.status(502).json({ error: "Failed to fetch Discord stats" });
  }
});

// ── User avatar by ID ─────────────────────────────────────────────────────────
interface AvatarCache {
  avatarUrl: string;
  username: string;
  fetchedAt: number;
}

const avatarCache = new Map<string, AvatarCache>();
const AVATAR_TTL_MS = 5 * 60_000; // 5 minutes

router.get("/discord/user/:userId/avatar", async (req, res) => {
  const { userId } = req.params;

  if (!BOT_TOKEN || BOT_TOKEN === "YOUR_BOT_TOKEN_HERE") {
    res.status(503).json({ error: "Bot token not configured" });
    return;
  }

  try {
    const now = Date.now();
    const cached = avatarCache.get(userId);
    if (cached && now - cached.fetchedAt < AVATAR_TTL_MS) {
      res.json({ avatarUrl: cached.avatarUrl, username: cached.username });
      return;
    }

    const response = await fetch(`${DISCORD_API_BASE}/users/${userId}`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`,
        "User-Agent": "DiscordBot (landing-page, 1.0)",
      },
    });

    if (!response.ok) {
      res.status(response.status).json({ error: `Discord API ${response.status}` });
      return;
    }

    const user = await response.json() as {
      id: string;
      username: string;
      avatar: string | null;
      discriminator: string;
    };

    let avatarUrl: string;
    if (user.avatar) {
      const ext = user.avatar.startsWith("a_") ? "gif" : "png";
      avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.${ext}?size=256`;
    } else {
      // Default avatar — uses (userId >> 22) % 6 for pomelo accounts
      const index = (BigInt(userId) >> 22n) % 6n;
      avatarUrl = `https://cdn.discordapp.com/embed/avatars/${index}.png`;
    }

    avatarCache.set(userId, { avatarUrl, username: user.username, fetchedAt: now });
    res.json({ avatarUrl, username: user.username });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch Discord user avatar");
    res.status(502).json({ error: "Failed to fetch Discord user avatar" });
  }
});

export default router;
