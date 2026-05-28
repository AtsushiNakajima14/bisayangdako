import { Router, type IRouter } from "express";

const router: IRouter = Router();

const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN ?? "";

const INVITE_CODE = "Hu6QJZH4H";
const PARTNER_INVITE_CODE = "V6AdubUuN";
const PARTNER2_INVITE_CODE = "fTEjVC4V";
const PARTNER3_INVITE_CODE = "D5JUMQnjkV";
const PARTNER4_INVITE_CODE = "euvs2NXzYU";
const PARTNER5_INVITE_CODE = "qapgJtFEt";
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

// ── Partner server stats cache ────────────────────────────────────────────────
interface PartnerStats {
  memberCount: number;
  onlineCount: number;
  serverName: string;
  inviteUrl: string;
  iconUrl: string | null;
}

interface PartnerCache {
  data: PartnerStats;
  fetchedAt: number;
}

let partnerCache: PartnerCache | null = null;

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

async function fetchPartnerStats(): Promise<PartnerStats> {
  const response = await fetch(
    `${DISCORD_API_BASE}/invites/${PARTNER_INVITE_CODE}?with_counts=true`,
    { headers: { "User-Agent": "DiscordBot (landing-page, 1.0)" } },
  );
  if (!response.ok) throw new Error(`Discord API ${response.status}`);

  const json = await response.json() as {
    approximate_member_count: number;
    approximate_presence_count: number;
    guild?: { id?: string; name?: string; icon?: string | null };
  };

  const guild = json.guild;
  const iconUrl = guild?.id && guild?.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=256`
    : null;

  return {
    memberCount: json.approximate_member_count ?? 0,
    onlineCount: json.approximate_presence_count ?? 0,
    serverName: guild?.name ?? "Partner Server",
    inviteUrl: `https://discord.gg/${PARTNER_INVITE_CODE}`,
    iconUrl,
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

router.get("/discord/partner/stats", async (req, res) => {
  try {
    const now = Date.now();
    if (partnerCache && now - partnerCache.fetchedAt < CACHE_TTL_MS) {
      res.json({ ...partnerCache.data, cachedAt: partnerCache.fetchedAt });
      return;
    }
    const data = await fetchPartnerStats();
    partnerCache = { data, fetchedAt: now };
    res.json({ ...data, cachedAt: now });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch partner Discord stats");
    res.status(502).json({ error: "Failed to fetch partner Discord stats" });
  }
});

// ── Partner 2 server stats cache ────────────────────────────────────────────────
interface Partner2Stats {
  memberCount: number;
  onlineCount: number;
  serverName: string;
  inviteUrl: string;
  iconUrl: string | null;
}

interface Partner2Cache {
  data: Partner2Stats;
  fetchedAt: number;
}

let partner2Cache: Partner2Cache | null = null;

async function fetchPartner2Stats(): Promise<Partner2Stats> {
  const response = await fetch(
    `${DISCORD_API_BASE}/invites/${PARTNER2_INVITE_CODE}?with_counts=true`,
    { headers: { "User-Agent": "DiscordBot (landing-page, 1.0)" } },
  );
  if (!response.ok) throw new Error(`Discord API ${response.status}`);

  const json = await response.json() as {
    approximate_member_count: number;
    approximate_presence_count: number;
    guild?: { id?: string; name?: string; icon?: string | null };
  };

  const guild = json.guild;
  const iconUrl = guild?.id && guild?.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=256`
    : null;

  return {
    memberCount: json.approximate_member_count ?? 0,
    onlineCount: json.approximate_presence_count ?? 0,
    serverName: guild?.name ?? "Partner 2 Server",
    inviteUrl: `https://discord.gg/${PARTNER2_INVITE_CODE}`,
    iconUrl,
  };
}

router.get("/discord/partner2/stats", async (req, res) => {
  try {
    const now = Date.now();
    if (partner2Cache && now - partner2Cache.fetchedAt < CACHE_TTL_MS) {
      res.json({ ...partner2Cache.data, cachedAt: partner2Cache.fetchedAt });
      return;
    }
    const data = await fetchPartner2Stats();
    partner2Cache = { data, fetchedAt: now };
    res.json({ ...data, cachedAt: now });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch partner2 Discord stats");
    res.status(502).json({ error: "Failed to fetch partner2 Discord stats" });
  }
});

// ── Partner 3 server stats cache ────────────────────────────────────────────────
interface Partner3Stats {
  memberCount: number;
  onlineCount: number;
  serverName: string;
  inviteUrl: string;
  iconUrl: string | null;
}

interface Partner3Cache {
  data: Partner3Stats;
  fetchedAt: number;
}

let partner3Cache: Partner3Cache | null = null;

async function fetchPartner3Stats(): Promise<Partner3Stats> {
  const response = await fetch(
    `${DISCORD_API_BASE}/invites/${PARTNER3_INVITE_CODE}?with_counts=true`,
    { headers: { "User-Agent": "DiscordBot (landing-page, 1.0)" } },
  );
  if (!response.ok) throw new Error(`Discord API ${response.status}`);

  const json = await response.json() as {
    approximate_member_count: number;
    approximate_presence_count: number;
    guild?: { id?: string; name?: string; icon?: string | null };
  };

  const guild = json.guild;
  const iconUrl = guild?.id && guild?.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=256`
    : null;

  return {
    memberCount: json.approximate_member_count ?? 0,
    onlineCount: json.approximate_presence_count ?? 0,
    serverName: guild?.name ?? "Partner 3 Server",
    inviteUrl: `https://discord.gg/${PARTNER3_INVITE_CODE}`,
    iconUrl,
  };
}

router.get("/discord/partner3/stats", async (req, res) => {
  try {
    const now = Date.now();
    if (partner3Cache && now - partner3Cache.fetchedAt < CACHE_TTL_MS) {
      res.json({ ...partner3Cache.data, cachedAt: partner3Cache.fetchedAt });
      return;
    }
    const data = await fetchPartner3Stats();
    partner3Cache = { data, fetchedAt: now };
    res.json({ ...data, cachedAt: now });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch partner3 Discord stats");
    res.status(502).json({ error: "Failed to fetch partner3 Discord stats" });
  }
});

// ── Partner 4 server stats cache ────────────────────────────────────────────────
interface Partner4Stats {
  memberCount: number;
  onlineCount: number;
  serverName: string;
  inviteUrl: string;
  iconUrl: string | null;
}

interface Partner4Cache {
  data: Partner4Stats;
  fetchedAt: number;
}

let partner4Cache: Partner4Cache | null = null;

async function fetchPartner4Stats(): Promise<Partner4Stats> {
  const response = await fetch(
    `${DISCORD_API_BASE}/invites/${PARTNER4_INVITE_CODE}?with_counts=true`,
    { headers: { "User-Agent": "DiscordBot (landing-page, 1.0)" } },
  );
  if (!response.ok) throw new Error(`Discord API ${response.status}`);

  const json = await response.json() as {
    approximate_member_count: number;
    approximate_presence_count: number;
    guild?: { id?: string; name?: string; icon?: string | null };
  };

  const guild = json.guild;
  const iconUrl = guild?.id && guild?.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=256`
    : null;

  return {
    memberCount: json.approximate_member_count ?? 0,
    onlineCount: json.approximate_presence_count ?? 0,
    serverName: guild?.name ?? "Partner 4 Server",
    inviteUrl: `https://discord.gg/${PARTNER4_INVITE_CODE}`,
    iconUrl,
  };
}

router.get("/discord/partner4/stats", async (req, res) => {
  try {
    const now = Date.now();
    if (partner4Cache && now - partner4Cache.fetchedAt < CACHE_TTL_MS) {
      res.json({ ...partner4Cache.data, cachedAt: partner4Cache.fetchedAt });
      return;
    }
    const data = await fetchPartner4Stats();
    partner4Cache = { data, fetchedAt: now };
    res.json({ ...data, cachedAt: now });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch partner4 Discord stats");
    res.status(502).json({ error: "Failed to fetch partner4 Discord stats" });
  }
});

// ── Partner 5 ─────────────────────────────────────────────────────────────────
interface Partner5Stats {
  memberCount: number;
  onlineCount: number;
  serverName: string;
  inviteUrl: string;
  iconUrl: string | null;
}

interface Partner5Cache {
  data: Partner5Stats;
  fetchedAt: number;
}

let partner5Cache: Partner5Cache | null = null;

async function fetchPartner5Stats(): Promise<Partner5Stats> {
  const response = await fetch(
    `${DISCORD_API_BASE}/invites/${PARTNER5_INVITE_CODE}?with_counts=true`,
    { headers: { "User-Agent": "DiscordBot (landing-page, 1.0)" } },
  );
  if (!response.ok) throw new Error(`Discord API ${response.status}`);

  const json = await response.json() as {
    approximate_member_count: number;
    approximate_presence_count: number;
    guild?: { id?: string; name?: string; icon?: string | null };
  };

  const guild = json.guild;
  const iconUrl = guild?.id && guild?.icon
    ? `https://cdn.discordapp.com/icons/${guild.id}/${guild.icon}.png?size=256`
    : null;

  return {
    memberCount: json.approximate_member_count ?? 0,
    onlineCount: json.approximate_presence_count ?? 0,
    serverName: guild?.name ?? "Partner 5 Server",
    inviteUrl: `https://discord.gg/${PARTNER5_INVITE_CODE}`,
    iconUrl,
  };
}

router.get("/discord/partner5/stats", async (req, res) => {
  try {
    const now = Date.now();
    if (partner5Cache && now - partner5Cache.fetchedAt < CACHE_TTL_MS) {
      res.json({ ...partner5Cache.data, cachedAt: partner5Cache.fetchedAt });
      return;
    }
    const data = await fetchPartner5Stats();
    partner5Cache = { data, fetchedAt: now };
    res.json({ ...data, cachedAt: now });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch partner5 Discord stats");
    res.status(502).json({ error: "Failed to fetch partner5 Discord stats" });
  }
});

// ── User avatar by ID ─────────────────────────────────────────────────────────
interface AvatarCache {
  avatarUrl: string;
  username: string;
  decorationUrl: string | null;
  fetchedAt: number;
}

const avatarCache = new Map<string, AvatarCache>();
const AVATAR_TTL_MS = 2 * 60_000; // 2 minutes — keeps avatar and avatar decorations changes in sync quickly

router.get("/discord/user/:userId/avatar", async (req, res) => {
  const { userId } = req.params;

  if (!BOT_TOKEN) {
    res.status(503).json({ error: "Bot token not configured" });
    return;
  }

  try {
    const now = Date.now();
    const cached = avatarCache.get(userId);
    if (cached && now - cached.fetchedAt < AVATAR_TTL_MS) {
      res.json({ avatarUrl: cached.avatarUrl, username: cached.username, decorationUrl: cached.decorationUrl });
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
      avatar_decoration_data?: { asset: string; sku_id: string } | null;
    };

    let avatarUrl: string;
    if (user.avatar) {
      const ext = user.avatar.startsWith("a_") ? "gif" : "png";
      avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${user.avatar}.${ext}?size=256`;
    } else {
      // default avatar — uses (userId >> 22) % 6 for pomelo accounts
      const index = (BigInt(userId) >> 22n) % 6n;
      avatarUrl = `https://cdn.discordapp.com/embed/avatars/${index}.png`;
    }

    const decorationUrl = user.avatar_decoration_data?.asset
      ? `https://cdn.discordapp.com/avatar-decoration-presets/${user.avatar_decoration_data.asset}.png?size=256&passthrough=true`
      : null;

    avatarCache.set(userId, { avatarUrl, username: user.username, decorationUrl, fetchedAt: now });
    res.json({ avatarUrl, username: user.username, decorationUrl });
  } catch (err) {
    req.log.error({ err }, "Failed to fetch Discord user avatar");
    res.status(502).json({ error: "Failed to fetch Discord user avatar" });
  }
});

export default router;
