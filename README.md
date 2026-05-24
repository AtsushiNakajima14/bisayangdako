# #BISAYANGDAKO — Discord Server Landing Page

Official landing page for the **#BISAYANGDAKO** Discord server. Shows live member/online stats, real admin profile pictures, server channels, features, and rules — all in a dark Discord-themed design.

**Invite link:** https://discord.gg/Hu6QJZH4H

---

## What it does

- Live member count and online count pulled from Discord every 30 seconds
- Real Discord profile pictures for each admin fetched via the Discord API
- Fully responsive — works on phones, tablets, and desktops
- Animated sections using Framer Motion
- Direct "Join Server" button throughout the page

---

## Stack

- **Frontend:** React + Vite + TypeScript + Tailwind CSS
- **Backend:** Express (Node.js) — proxies Discord API calls
- **Animations:** Framer Motion
- **Monorepo:** pnpm workspaces

---

## Customizing content

### Change admin info or quotes
Open `artifacts/discord-landing/src/pages/Home.tsx` and edit the `ADMINS` array near the top of the file:

```ts
const ADMINS = [
  { userId: "...", name: "Sam", role: "Server Owner", badge: "Owner", quote: "Daghan chix bai" },
  // ...
];
```

- `userId` — Discord user ID (right-click username in Discord → Copy User ID; requires Developer Mode)
- `name` — display name shown on the card
- `role` — subtitle under the name
- `badge` — small label on the avatar (e.g. `Owner`, `Mod`)
- `quote` — the quote shown under the role

### Change the bot token
Open `artifacts/api-server/src/routes/discord.ts` — the token is on line 6:

```ts
const BOT_TOKEN = "your-token-here";
```

Get a token at [discord.com/developers/applications](https://discord.com/developers/applications) → Bot → Reset Token. The bot must be a member of your server.

### Change server invite / channels / rules
Everything is in `artifacts/discord-landing/src/pages/Home.tsx`:
- Channels list: search for the `Channels Preview` section comment
- Rules: search for the `Rules` section comment
- Invite link fallback: `JOIN_LINK` constant near the top of the component

---

## Running locally

```bash
# Install dependencies
pnpm install

# Start both the API server and landing page
# (these run automatically via Replit workflows)
pnpm --filter @workspace/api-server run dev
pnpm --filter @workspace/discord-landing run dev
```

The API server runs on port 8080 (`/api/*`) and the landing page runs on its assigned port (`/`).

---

## Project structure

```
artifacts/
  api-server/          # Express backend — Discord API proxy
    src/routes/
      discord.ts       # /api/discord/stats and /api/discord/user/:id/avatar
  discord-landing/     # React + Vite frontend
    src/
      pages/Home.tsx   # Main page — edit content here
      hooks/
        use-discord-stats.ts    # Polls live member/online stats
        use-discord-avatars.ts  # Fetches admin avatars by user ID
```
