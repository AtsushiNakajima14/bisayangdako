import { motion } from "framer-motion";
import { SiDiscord } from "react-icons/si";
import {
  Users,
  Activity,
  Hash,
  CalendarDays,
  Calendar,
  ShieldCheck,
  Bot,
  MessageSquare,
  Gamepad2,
  Gift,
  ArrowRight,
  HashIcon,
  Volume2,
  RefreshCw,
  Crown,
  Handshake,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDiscordStats } from "@/hooks/use-discord-stats";
import { useDiscordAvatars } from "@/hooks/use-discord-avatars";
import { usePartnerStats } from "@/hooks/use-partner-stats";
import { usePartner2Stats } from "@/hooks/use-partner2-stats";


function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toLocaleString();
}

function StatValue({ value, loading }: { value: string; loading: boolean }) {
  if (loading) {
    return <div className="h-8 w-16 mx-auto rounded-lg bg-primary/10 animate-pulse" />;
  }
  return <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-white">{value}</h3>;
}

const ADMINS = [
  { userId: "1038455296965742663", name: "Sam",    role: "Server Owner", badge: "Owner", quote: "samiboi." },
  { userId: "1108723204568121435", name: "Xyy",    role: "Manager",      badge: "Mod",   quote: "Don't wait for the perfect moment. Take the moment and make it perfect" },
  { userId: "1262537942438772739", name: "El",     role: "Manager",      badge: "Mod",   quote: "The nicest feeling is knowing someone out there is proud of the person you’re becoming, even on the days you’re still figuring it out." },
  { userId: "585071845729107984",  name: "Jowns",  role: "Manager",      badge: "Mod",   quote: "You don’t need to be loud to matter. Sometimes the softest hearts leave the deepest footprints in people’s lives." },
  { userId: "1500491002459455490", name: "Vince",  role: "Manager",      badge: "Mod",   quote: "There’s something really special about people who make you feel safe to be yourself — no masks, no pretending, just rest." },
  { userId: "811928271745712159",  name: "Julius", role: "Manager",      badge: "Mod",   quote: "The saddest part of healing is realizing you can be okay without them… and still wish they were here to see how far you’ve come." },
  { userId: "496668492859179008",  name: "Chandey",role: "Manager",      badge: "Mod",   quote: "You don’t have to be extraordinary to be deeply loved. Being yourself is already enough for the right hearts." },
  { userId: "819064248826069002",  name: "CyCyy",  role: "Manager",      badge: "Mod",   quote: "I keep the memories in a gentle place now — not to torture myself, but because even the painful ones belong to the best chapter of my life so far." },
];

function fallbackAvatar(name: string): string {
  const colors = ["5865F2","7c3aed","2563eb","9333ea","0891b2","059669","dc2626","d97706"];
  const i = name.charCodeAt(0) % colors.length;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${colors[i]}&color=fff&size=128&bold=true`;
}

export default function Home() {
  const { stats, loading, error } = useDiscordStats();
  const { avatars, loading: avatarsLoading } = useDiscordAvatars(ADMINS.map((a) => a.userId));
  const { stats: partnerStats, loading: partnerLoading, error: partnerError } = usePartnerStats();
  const { stats: partner2Stats, loading: partner2Loading, error: partner2Error } = usePartner2Stats();

  const JOIN_LINK = stats?.inviteUrl ?? "https://discord.gg/Hu6QJZH4H";
  const serverName = stats?.serverName ?? "#BISAYANGDAKO";
  const onlineCount = stats ? formatNumber(stats.onlineCount) : "—";
  const memberCount = stats ? formatNumber(stats.memberCount) : "—";

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-primary font-bold text-base sm:text-xl tracking-tight min-w-0">
            <SiDiscord className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
            <span className="truncate">{serverName}</span>
          </div>
          <a href={JOIN_LINK} target="_blank" rel="noreferrer" data-testid="link-join-nav" className="shrink-0">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-3 sm:px-6 text-sm sm:text-base shadow-[0_0_15px_rgba(88,101,242,0.5)] hover:shadow-[0_0_25px_rgba(88,101,242,0.7)] transition-all duration-300">
              Join Server
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 md:pt-48 md:pb-32 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/20 rounded-full blur-[128px] -z-10 mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/20 rounded-full blur-[128px] -z-10 mix-blend-screen" />

        <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-6 sm:mb-8 p-3 sm:p-4 bg-card/50 rounded-2xl border border-border/50 shadow-2xl backdrop-blur-sm"
          >
            <SiDiscord className="w-14 h-14 sm:w-20 sm:h-20 text-primary drop-shadow-[0_0_15px_rgba(88,101,242,0.8)]" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-primary"
          >
            Where Gamers & Creators Unite
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 sm:mb-10 font-medium px-2"
          >
            Step into {serverName}. A hyper-active, welcoming community obsessed with gaming, coding, and immaculate vibes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <a href={JOIN_LINK} target="_blank" rel="noreferrer" data-testid="link-join-hero" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-[0_0_30px_rgba(88,101,242,0.4)] hover:shadow-[0_0_50px_rgba(88,101,242,0.6)] transition-all duration-300 hover:-translate-y-1"
              >
                Join Our Discord <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </a>
            <div
              data-testid="badge-online-count"
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-card/80 border border-border/50 backdrop-blur-sm"
            >
              {loading ? (
                <RefreshCw className="w-3 h-3 text-green-400 animate-spin" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
              )}
              <span className="text-sm font-semibold">
                {loading ? "Loading..." : error ? "— Online Now" : `${onlineCount} Online Now`}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-12 border-y border-border/50 bg-card/30 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
            {[
              { icon: Users,        label: "Total Members",  value: memberCount, testId: "stat-member-count", live: true },
              { icon: Activity,     label: "Online Now",      value: onlineCount, testId: "stat-online-count", live: true },
              { icon: Hash,         label: "Active Channels", value: "28",        testId: "stat-channels",     live: false },
              { icon: CalendarDays, label: "Established",     value: "Est. 2026", testId: "stat-established",  live: false },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center space-y-1 sm:space-y-2"
                data-testid={stat.testId}
              >
                <div className="p-2 sm:p-3 bg-primary/10 text-primary rounded-lg mb-1 sm:mb-2">
                  <stat.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <StatValue value={stat.value} loading={loading && stat.live} />
                <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
          {stats && (
            <p className="text-center text-xs text-muted-foreground mt-4 sm:mt-6 opacity-60" data-testid="text-last-updated">
              Live data — refreshes every 30s
            </p>
          )}
          {error && (
            <p className="text-center text-xs text-destructive mt-4 sm:mt-6" data-testid="text-stats-error">
              Could not reach Discord — showing last known values
            </p>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">Why You'll Love It Here</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              Everything you need — whether you're looking to squad up, showcase your work, or just chill.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[
              { icon: ShieldCheck,   title: "Active Staff",       desc: "Our moderation team is fair, active, and keeps the server safe 24/7." },
              { icon: Bot,           title: "Custom Bots",        desc: "Leveling systems, economy, and mini-games built exclusively for members." },
              { icon: MessageSquare, title: "Exclusive Channels", desc: "Unlock special areas as you level up by being active in the community." },
              { icon: Gamepad2,      title: "LFG & Gaming",       desc: "Dedicated roles and voice channels to find teammates for your favorite games instantly." }
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group relative bg-card p-5 sm:p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-primary mb-4 sm:mb-6 drop-shadow-[0_0_10px_rgba(88,101,242,0.4)]" />
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Channels Preview */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/20 border-y border-border/50">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-8 sm:gap-12 items-center">
          <div className="flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">A Channel for Everything</h2>
            <p className="text-muted-foreground text-base sm:text-lg">
              Organized, clean, and intuitive. Find exactly where you belong without the clutter of a messy server.
            </p>
          </div>
          <div className="flex-1 w-full min-w-0 bg-sidebar rounded-2xl border border-border shadow-2xl p-3 sm:p-4 space-y-1">
            {[
              { icon: HashIcon, name: "chika2",                          active: true },
              { icon: HashIcon, name: "e-confess" },
              { icon: HashIcon, name: "cmd" },
              { icon: HashIcon, name: "gaming-zone" },
              { icon: HashIcon, name: "moots" },
              { icon: HashIcon, name: "thirsttrap" },
              { icon: HashIcon, name: "selfie" },
              { icon: HashIcon, name: "media" },
              { icon: Volume2,  name: "CHIKA² GINAGMAY LIBAK DINAGKO" },
              { icon: Volume2,  name: "MGA TAGA DAVAO" },
              { icon: Volume2,  name: "BBL" },
              { icon: Volume2,  name: "MGA TAGA UBEC" },
            ].map((channel, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg cursor-pointer font-medium transition-colors min-w-0 ${
                  channel.active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-muted-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <channel.icon className="w-4 h-4 sm:w-5 sm:h-5 opacity-70 shrink-0" />
                <span className="text-sm sm:text-base truncate">{channel.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Admins */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/20 border-y border-border/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Server Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">Meet the Admins</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              The team keeping the server safe, active, and fun — around the clock.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10">
            {ADMINS.map((admin, i) => {
              const resolved = avatars[admin.userId];
              const avatarSrc = resolved?.avatarUrl ?? fallbackAvatar(admin.name);
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group flex flex-col items-center text-center gap-3 sm:gap-4"
                  data-testid={`card-admin-${i}`}
                >
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-primary/40 shadow-[0_0_20px_rgba(88,101,242,0.3)] group-hover:border-primary/80 group-hover:shadow-[0_0_30px_rgba(88,101,242,0.5)] transition-all duration-300">
                      {avatarsLoading ? (
                        <div className="w-full h-full bg-primary/10 animate-pulse" />
                      ) : (
                        <img
                          src={avatarSrc}
                          alt={admin.name}
                          className="w-full h-full object-cover"
                          data-testid={`img-avatar-${i}`}
                        />
                      )}
                    </div>
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
                      {admin.badge}
                    </span>
                  </div>
                  <div className="mt-2 sm:mt-3 space-y-0.5 sm:space-y-1">
                    <h4 className="font-bold text-white text-base sm:text-lg leading-tight" data-testid={`text-admin-name-${i}`}>{admin.name}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{admin.role}</p>
                    <p className="text-xs sm:text-sm italic text-foreground/60 px-1">"{admin.quote}"</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/30 border-y border-border/50">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">House Rules</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Just a few simple guidelines to keep the vibes immaculate.</p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {[
              "Be respectful and kind to everyone. Hate speech is zero-tolerance.",
              "No spamming, flooding, or excessive pinging.",
              "Keep content in the correct channels.",
              "No self-promotion or DM advertising without staff permission.",
              "Follow the official Discord Terms of Service.",
            ].map((rule, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-background rounded-xl border border-border"
              >
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary/20 flex items-center justify-center text-secondary font-bold text-sm">
                  {i + 1}
                </div>
                <p className="pt-0.5 text-sm sm:text-base md:text-lg font-medium">{rule}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 bg-card/20 border-y border-border/50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Handshake className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Partners & Collaborations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">Servers We Partner With</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              We proudly collaborate with amazing communities. Check them out!
            </p>
          </div>

          {/*Partner 1 Card display*/}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border border-border p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8"
          >
            <div className="shrink-0 p-4 sm:p-5 bg-primary/10 rounded-2xl">
              {partnerStats?.iconUrl ? (
                <img
                  src={partnerStats.iconUrl}
                  alt={partnerStats.serverName}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover"
                  loading="lazy"
                />
              ) : (
                <SiDiscord className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
              )}
            </div>
            <div className="flex-1 text-center md:text-left space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold">
                {partnerStats ? partnerStats.serverName : "Partner Server"}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                A community we partnered with to bring more connections and fun to both of our servers.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>
                    {partnerLoading ? "—" : partnerError ? "—" : formatNumber(partnerStats?.memberCount ?? 0)} members
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span>
                    {partnerLoading ? "—" : partnerError ? "—" : formatNumber(partnerStats?.onlineCount ?? 0)} online
                  </span>
                </div>
              </div>
            </div>
            <a
              href={partnerStats?.inviteUrl ?? "https://discord.gg/V6AdubUuN"}
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              <Button
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:shadow-[0_0_35px_rgba(88,101,242,0.6)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Visit Server <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          {/*Partner 2 Card display*/}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-card rounded-2xl border border-border p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8"
          >
            <div className="shrink-0 p-4 sm:p-5 bg-primary/10 rounded-2xl">
              {partner2Stats?.iconUrl ? (
                <img
                  src={partner2Stats.iconUrl}
                  alt={partner2Stats.serverName}
                  className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl object-cover"
                  loading="lazy"
                />
              ) : (
                <SiDiscord className="w-12 h-12 sm:w-16 sm:h-16 text-primary" />
              )}
            </div>
            <div className="flex-1 text-center md:text-left space-y-2 sm:space-y-3">
              <h3 className="text-xl sm:text-2xl font-bold">
                {partner2Stats ? partner2Stats.serverName : "Partner 2 Server"}
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base">
                Another amazing community we partnered with to expand connections.
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 sm:gap-4 pt-1">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4 text-primary" />
                  <span>
                    {partner2Loading ? "—" : partner2Error ? "—" : formatNumber(partner2Stats?.memberCount ?? 0)} members
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span>
                    {partner2Loading ? "—" : partner2Error ? "—" : formatNumber(partner2Stats?.onlineCount ?? 0)} online
                  </span>
                </div>
              </div>
            </div>
            <a
              href={partner2Stats?.inviteUrl ?? "https://discord.gg/fTEjVC4V"}
              target="_blank"
              rel="noreferrer"
              className="shrink-0"
            >
              <Button
                size="lg"
                className="h-12 sm:h-14 px-6 sm:px-8 text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-[0_0_20px_rgba(88,101,242,0.4)] hover:shadow-[0_0_35px_rgba(88,101,242,0.6)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Visit Server <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </a>
          </motion.div>

          {partnerStats && (
            <p className="text-center text-xs text-muted-foreground mt-4 sm:mt-6 opacity-60">
              Live data from Discord — refreshes every 30s
            </p>
          )}
          {partnerError && (
            <p className="text-center text-xs text-destructive mt-4 sm:mt-6">
              Could not reach Discord for partner stats — showing fallback values
            </p>
          )}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto max-w-4xl relative z-10 text-center flex flex-col items-center">
          <SiDiscord className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-6 sm:mb-8" />
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6">Ready to jump in?</h2>
          <p className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl">
            {loading ? "Join our growing community right now." : `Join ${memberCount} members right now.`}{" "}
            Claim your roles, introduce yourself, and let's get started.
          </p>
          <a href={JOIN_LINK} target="_blank" rel="noreferrer" data-testid="link-join-cta" className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-lg sm:text-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl shadow-[0_0_40px_rgba(88,101,242,0.5)] hover:shadow-[0_0_60px_rgba(88,101,242,0.8)] transition-all duration-300 hover:scale-105"
            >
              Join {serverName} Now
            </Button>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 text-center border-t border-border bg-background px-4">
        <p className="text-muted-foreground text-xs sm:text-sm font-medium">
          Not affiliated with Discord Inc. This is the official #BISAYANGDAKO server page.
        </p>
      </footer>

    </div>
  );
}
