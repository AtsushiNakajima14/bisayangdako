import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SiDiscord } from "react-icons/si";
import {
  Users,
  Activity,
  Hash,
  CalendarDays,
  ShieldCheck,
  Bot,
  MessageSquare,
  Gamepad2,
  ArrowRight,
  HashIcon,
  Volume2,
  RefreshCw,
  Crown,
  Handshake,
  ExternalLink,
  Sparkles,
  Zap,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDiscordStats } from "@/hooks/use-discord-stats";
import { useDiscordAvatars } from "@/hooks/use-discord-avatars";
import { usePartnerStats } from "@/hooks/use-partner-stats";
import { usePartner2Stats } from "@/hooks/use-partner2-stats";
import { usePartner3Stats } from "@/hooks/use-partner3-stats";
import { usePartner4Stats } from "@/hooks/use-partner4-stats";
import { usePartner5Stats } from "@/hooks/use-partner5-stats";

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "k";
  return n.toLocaleString();
}

function useCountUp(target: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started || target === 0) return;
    let start = 0;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return { count, ref };
}

function AnimatedStatCard({
  icon: Icon,
  label,
  value,
  rawValue,
  isText,
  loading,
  delay,
  testId,
  color,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  rawValue?: number;
  isText?: boolean;
  loading: boolean;
  delay: number;
  testId: string;
  color: string;
}) {
  const { count, ref } = useCountUp(rawValue ?? 0, 1800);
  const displayValue = loading
    ? null
    : isText
    ? value
    : rawValue !== undefined
    ? formatNumber(count)
    : value;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, scale: 1.03, transition: { type: "tween", ease: "easeOut", duration: 0.2 } }}
      data-testid={testId}
      className="relative group overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.07] to-white/[0.02] backdrop-blur-sm p-4 sm:p-6 flex flex-col items-center text-center gap-2 sm:gap-3 cursor-default"
      style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.05), 0 4px 32px rgba(0,0,0,0.4)" }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${color}22 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ background: color }}
      />
      <motion.div
        whileHover={{ rotate: [0, -10, 10, -5, 5, 0] }}
        transition={{ duration: 0.5 }}
        className="p-3.5 rounded-xl"
        style={{ background: `${color}22`, border: `1px solid ${color}44` }}
      >
        <Icon className="w-6 h-6" style={{ color }} />
      </motion.div>
      <div className="space-y-1">
        {loading ? (
          <div className="h-9 w-20 mx-auto rounded-lg bg-white/10 animate-pulse" />
        ) : (
          <motion.h3
            key={displayValue}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight text-white"
          >
            {displayValue}
          </motion.h3>
        )}
        <p className="text-xs font-semibold uppercase tracking-widest text-white/40">{label}</p>
      </div>
      <div
        className="absolute inset-x-0 bottom-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
      />
    </motion.div>
  );
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const ADMINS = [
  { userId: "1038455296965742663", name: "Sam",    role: "Server Owner", badge: "Owner", quote: "Daghan chix parts." },
  { userId: "1108723204568121435", name: "Xyy",    role: "Manager",      badge: "Mod",   quote: "Don't wait for the perfect moment. Take the moment and make it perfect" },
  { userId: "1262537942438772739", name: "El",     role: "Manager",      badge: "Mod",   quote: "The nicest feeling is knowing someone out there is proud of the person you're becoming, even on the days you're still figuring it out." },
  { userId: "585071845729107984",  name: "Jowns",  role: "Manager",      badge: "Mod",   quote: "You don't need to be loud to matter. Sometimes the softest hearts leave the deepest footprints in people's lives." },
  { userId: "1500491002459455490", name: "Vince",  role: "Manager",      badge: "Mod",   quote: "There's something really special about people who make you feel safe to be yourself — no masks, no pretending, just rest." },
  { userId: "811928271745712159",  name: "Julius", role: "Manager",      badge: "Mod",   quote: "The saddest part of healing is realizing you can be okay without them… and still wish they were here to see how far you've come." },
  { userId: "496668492859179008",  name: "Chandey",role: "Manager",      badge: "Mod",   quote: "You don't have to be extraordinary to be deeply loved. Being yourself is already enough for the right hearts." },
  { userId: "819064248826069002",  name: "CyCyy",  role: "Manager",      badge: "Mod",   quote: "I keep the memories in a gentle place now — not to torture myself, but because even the painful ones belong to the best chapter of my life so far." },
];

const BOOSTERS = [
  { userId: "496668492859179008",  name: "Chandey" },
  { userId: "1118430714828967956", name: "aumbr¡" },
];

function fallbackAvatar(name: string): string {
  const colors = ["5865F2","7c3aed","2563eb","9333ea","0891b2","059669","dc2626","d97706"];
  const i = name.charCodeAt(0) % colors.length;
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${colors[i]}&color=fff&size=128&bold=true`;
}

const FEATURES = [
  { icon: ShieldCheck, title: "Active Staff",       desc: "Our moderation team is fair, active, and keeps the server safe 24/7.", color: "#5865F2", gradient: "from-[#5865F2]/20 to-transparent" },
  { icon: Bot,         title: "Custom Bots",        desc: "Leveling systems, economy, and mini-games built exclusively for members.", color: "#9333ea", gradient: "from-[#9333ea]/20 to-transparent" },
  { icon: MessageSquare,title: "Exclusive Channels",desc: "Unlock special areas as you level up by being active in the community.", color: "#0891b2", gradient: "from-[#0891b2]/20 to-transparent" },
  { icon: Gamepad2,    title: "LFG & Gaming",       desc: "Dedicated roles and voice channels to find teammates for your favorite games instantly.", color: "#059669", gradient: "from-[#059669]/20 to-transparent" },
];

const PARTNER_DATA = [
  { fallbackInvite: "https://discord.gg/V6AdubUuN" },
  { fallbackInvite: "https://discord.gg/fTEjVC4V" },
  { fallbackInvite: "https://discord.gg/D5JUMQnjkV" },
  { fallbackInvite: "https://discord.gg/euvs2NXzYU" },
  { fallbackInvite: "https://discord.gg/qapgJtFEt" },
];

function PartnerCard({
  stats,
  loading,
  error,
  fallbackInvite,
  index,
}: {
  stats: { serverName?: string; iconUrl?: string; memberCount?: number; onlineCount?: number; inviteUrl?: string } | null | undefined;
  loading: boolean;
  error: unknown;
  fallbackInvite: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
      whileHover={{ y: -4, transition: { type: "tween", ease: "easeOut", duration: 0.2 } }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.06] to-white/[0.02] p-4 sm:p-6 lg:p-8 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
      style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.07)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
        className="shrink-0 p-3 sm:p-4 rounded-2xl bg-primary/15 border border-primary/20"
      >
        {stats?.iconUrl ? (
          <img src={stats.iconUrl} alt={stats.serverName} className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl object-cover" loading="lazy" />
        ) : loading ? (
          <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl bg-white/10 animate-pulse" />
        ) : (
          <SiDiscord className="w-10 h-10 sm:w-14 sm:h-14 text-primary" />
        )}
      </motion.div>

      <div className="flex-1 text-center sm:text-left space-y-2 min-w-0">
        {loading ? (
          <div className="h-6 w-40 rounded-lg bg-white/10 animate-pulse mx-auto sm:mx-0" />
        ) : (
          <h3 className="text-xl sm:text-2xl font-bold text-white truncate">
            {stats?.serverName ?? "Partner Server"}
          </h3>
        )}
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          A community we proudly partner with — more connections, more vibes.
        </p>
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 pt-1">
          <div className="flex items-center gap-1.5 text-sm">
            <div className="p-1 rounded-md bg-primary/15">
              <Users className="w-3.5 h-3.5 text-primary" />
            </div>
            <span className="text-muted-foreground">
              {loading ? "—" : error ? "—" : formatNumber(stats?.memberCount ?? 0)} members
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <div className="p-1 rounded-md bg-green-500/15">
              <Activity className="w-3.5 h-3.5 text-green-400" />
            </div>
            <span className="text-muted-foreground">
              {loading ? "—" : error ? "—" : formatNumber(stats?.onlineCount ?? 0)} online
            </span>
          </div>
        </div>
      </div>

      <a href={stats?.inviteUrl ?? fallbackInvite} target="_blank" rel="noreferrer" className="shrink-0">
        <Button
          size="lg"
          className="h-11 px-6 font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl shadow-[0_0_20px_rgba(88,101,242,0.3)] hover:shadow-[0_0_35px_rgba(88,101,242,0.6)] transition-all duration-300 hover:-translate-y-0.5 group/btn"
        >
          Visit Server
          <ExternalLink className="ml-2 w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
        </Button>
      </a>
    </motion.div>
  );
}

export default function Home() {
  const { stats, loading, error } = useDiscordStats();
  const { avatars, loading: avatarsLoading } = useDiscordAvatars(ADMINS.map((a) => a.userId));
  const { avatars: boosterAvatars, loading: boosterAvatarsLoading } = useDiscordAvatars(BOOSTERS.map((b) => b.userId));
  const { stats: partnerStats, loading: partnerLoading, error: partnerError } = usePartnerStats();
  const { stats: partner2Stats, loading: partner2Loading, error: partner2Error } = usePartner2Stats();
  const { stats: partner3Stats, loading: partner3Loading, error: partner3Error } = usePartner3Stats();
  const { stats: partner4Stats, loading: partner4Loading, error: partner4Error } = usePartner4Stats();
  const { stats: partner5Stats, loading: partner5Loading, error: partner5Error } = usePartner5Stats();

  const JOIN_LINK = stats?.inviteUrl ?? "https://discord.gg/Hu6QJZH4H";
  const serverName = stats?.serverName ?? "#BISAYANGDAKO";
  const onlineCount = stats ?   formatNumber(stats.onlineCount) : "—";
  const memberCount = stats ? formatNumber(stats.memberCount) : "—";

  return (
    <div className="min-h-[100dvh] w-full bg-background text-foreground overflow-x-hidden">

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/70 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="container mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-primary font-bold text-base sm:text-xl tracking-tight min-w-0">
            <motion.div whileHover={{ rotate: 15, scale: 1.2 }} transition={{ type: "spring", stiffness: 180, damping: 22 }}>
              <SiDiscord className="w-6 h-6 sm:w-8 sm:h-8 shrink-0" />
            </motion.div>
            <span className="truncate text-white">{serverName}</span>
          </div>
          <a href={JOIN_LINK} target="_blank" rel="noreferrer" data-testid="link-join-nav" className="shrink-0">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-3 sm:px-6 text-sm sm:text-base shadow-[0_0_15px_rgba(88,101,242,0.5)] hover:shadow-[0_0_25px_rgba(88,101,242,0.7)] transition-all duration-300 hover:-translate-y-0.5">
              Join Server
            </Button>
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-24 pb-10 sm:pt-36 sm:pb-16 md:pt-44 md:pb-24 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(88,101,242,0.25) 0%, transparent 70%)" }} />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-secondary/15 rounded-full blur-[128px] -z-10" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/15 rounded-full blur-[128px] -z-10" />
        {/* Floating orbs */}
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-[15%] w-2 h-2 rounded-full bg-primary"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-48 right-[20%] w-3 h-3 rounded-full bg-secondary"
        />
        <motion.div
          animate={{ y: [0, -15, 0], opacity: [0.15, 0.4, 0.15] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-24 left-[30%] w-2 h-2 rounded-full bg-primary"
        />

        <div className="container mx-auto relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="mb-6 sm:mb-8"
          >
            <div className="relative p-4 sm:p-5 bg-white/[0.05] rounded-2xl border border-white/10 shadow-2xl backdrop-blur-sm inline-flex">
              <div className="absolute inset-0 rounded-2xl" style={{ background: "radial-gradient(circle at 50% 50%, rgba(88,101,242,0.3), transparent 70%)" }} />
              <SiDiscord className="relative w-14 h-14 sm:w-20 sm:h-20 text-primary drop-shadow-[0_0_20px_rgba(88,101,242,0.9)]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs sm:text-sm font-semibold mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Est. 2026 · Bisaya Pride</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight mb-4 sm:mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-primary">
              Where Gamers &{" "}
            </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-purple-400">
              Creators Unite
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl md:text-2xl text-muted-foreground max-w-2xl mb-8 sm:mb-10 font-medium px-2 leading-relaxed"
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
                className="w-full sm:w-auto h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl shadow-[0_0_30px_rgba(88,101,242,0.4)] hover:shadow-[0_0_50px_rgba(88,101,242,0.7)] transition-all duration-300 hover:-translate-y-1 group"
              >
                Join Our Discord
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>
            <div
              data-testid="badge-online-count"
              className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-white/[0.05] border border-white/10 backdrop-blur-sm"
            >
              {loading ? (
                <RefreshCw className="w-3 h-3 text-green-400 animate-spin" />
              ) : (
                <motion.div
                  animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2.5 h-2.5 rounded-full bg-green-500"
                />
              )}
              <span className="text-sm font-semibold text-white/80">
                {loading ? "Loading..." : error ? "— Online Now" : `${onlineCount} Online Now`}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-14 relative">
        <div className="absolute inset-0 border-y border-white/[0.06]" />
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <AnimatedStatCard
              icon={Users}
              label="Total Members"
              value={memberCount}
              rawValue={stats?.memberCount}
              loading={loading}
              delay={0}
              testId="stat-member-count"
              color="#5865F2"
            />
            <AnimatedStatCard
              icon={Activity}
              label="Online Now"
              value={onlineCount}
              rawValue={stats?.onlineCount}
              loading={loading}
              delay={0.1}
              testId="stat-online-count"
              color="#22c55e"
            />
            <AnimatedStatCard
              icon={Hash}
              label="Active Channels"
              value="28"
              rawValue={28}
              loading={false}
              delay={0.2}
              testId="stat-channels"
              color="#9333ea"
            />
            <AnimatedStatCard
              icon={CalendarDays}
              label="Established"
              value="Est. 2026"
              isText
              loading={false}
              delay={0.3}
              testId="stat-established"
              color="#f59e0b"
            />
          </div>
          {stats && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-center text-xs text-muted-foreground mt-4 sm:mt-6 opacity-50 flex items-center justify-center gap-1.5"
              data-testid="text-last-updated"
            >
              <Zap className="w-3 h-3 text-primary" />
              Live data — refreshes every 30s
            </motion.p>
          )}
          {error && (
            <p className="text-center text-xs text-destructive mt-4 sm:mt-6" data-testid="text-stats-error">
              Could not reach Discord — showing last known values
            </p>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 relative">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-7 sm:mb-12 lg:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-3"
            >
              <Sparkles className="w-3.5 h-3.5" /> What We Offer
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4"
            >
              Why You'll Love It Here
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto"
            >
              Everything you need — whether you're looking to squad up, showcase your work, or just chill.
            </motion.p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
            {FEATURES.map((feature, i) => (
              <TiltCard key={i} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.45 }}
                  className="group relative h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-4 sm:p-5 lg:p-7 flex flex-col gap-3 sm:gap-4 cursor-default"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: `radial-gradient(circle at 30% 20%, ${feature.color}18, transparent 65%)` }}
                  />
                  <div
                    className="absolute bottom-0 inset-x-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: `linear-gradient(90deg, transparent, ${feature.color}80, transparent)` }}
                  />
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 180, damping: 22 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${feature.color}20`, border: `1px solid ${feature.color}40` }}
                  >
                    <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: feature.color }} />
                  </motion.div>
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white">{feature.title}</h3>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                  <div
                    className="mt-auto pt-2 text-xs font-semibold flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-1 group-hover:translate-y-0"
                    style={{ color: feature.color }}
                  >
                    <ArrowRight className="w-3 h-3" /> Learn more
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </div>
      </section>

      {/* Channels Preview */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 bg-card/20 border-y border-white/[0.05]">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row gap-8 sm:gap-12 items-center">
          <div className="flex-1 space-y-4 sm:space-y-6 text-center md:text-left">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold"
            >
              A Channel for Everything
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-base sm:text-lg"
            >
              Organized, clean, and intuitive. Find exactly where you belong without the clutter of a messy server.
            </motion.p>
          </div>
          <div className="flex-1 w-full min-w-0 rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)" }}
          >
            <div className="p-3 sm:p-4 border-b border-white/[0.06] flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              <span className="ml-2 text-xs text-white/30 font-medium">#BISAYANGDAKO</span>
            </div>
            <div className="p-2 sm:p-3 space-y-0.5">
              {[
                { icon: HashIcon, name: "chika2", active: true },
                { icon: HashIcon, name: "english2" },
                { icon: HashIcon, name: "e-confess" },
                { icon: HashIcon, name: "cmd" },
                { icon: HashIcon, name: "gaming-zone" },
                { icon: HashIcon, name: "moots" },
                { icon: HashIcon, name: "thirsttrap" },
                { icon: HashIcon, name: "selfie" },
                { icon: HashIcon, name: "media" },
                { icon: Volume2,  name: "KARAOKE" },
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
                  transition={{ delay: i * 0.04 }}
                  whileHover={{ x: 4 }}
                  className={`flex items-center gap-2 sm:gap-3 p-2 sm:p-2.5 rounded-lg cursor-pointer font-medium transition-colors min-w-0 ${
                    channel.active
                      ? "bg-primary/20 text-white"
                      : "text-white/40 hover:bg-white/[0.06] hover:text-white/70"
                  }`}
                >
                  <channel.icon className={`w-4 h-4 shrink-0 ${channel.active ? "text-primary" : "opacity-50"}`} />
                  <span className="text-sm truncate">{channel.name}</span>
                  {channel.active && (
                    <motion.div
                      animate={{ opacity: [1, 0.4, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="ml-auto w-1.5 h-1.5 rounded-full bg-green-400 shrink-0"
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Admins */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 relative">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(88,101,242,0.06), transparent)" }} />
        <div className="container mx-auto max-w-6xl relative">
          <div className="text-center mb-7 sm:mb-12 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>Server Leadership</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4">Meet the Admins</h2>
            <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
              The team keeping the server safe, active, and fun — around the clock.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 items-start">
            {ADMINS.map((admin, i) => {
              const resolved = avatars[admin.userId];
              const avatarSrc = resolved?.avatarUrl ?? fallbackAvatar(admin.name);
              const isOwner = admin.badge === "Owner";
              const hasDecoration = !avatarsLoading && !!resolved?.decorationUrl;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 24, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07, duration: 0.45 }}
                  whileHover={{ y: -6, transition: { type: "tween", ease: "easeOut", duration: 0.2 } }}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.06] to-transparent p-3 sm:p-5 flex flex-col items-center text-center gap-2 sm:gap-3"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)" }}
                  data-testid={`card-admin-${i}`}
                >
                  {isOwner && (
                    <div className="absolute inset-0 rounded-2xl pointer-events-none" style={{ background: "radial-gradient(circle at 50% 0%, rgba(88,101,242,0.2), transparent 70%)" }} />
                  )}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ background: "radial-gradient(circle at 50% 0%, rgba(88,101,242,0.12), transparent 70%)" }}
                  />
                  <div className="absolute top-0 inset-x-0 h-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(88,101,242,0.6), transparent)" }}
                  />

                  {/* Avatar section — fixed height so decorations don't shift layout */}
                  <div className="relative flex items-end justify-center" style={{ width: 80, height: hasDecoration ? 88 : 80 }}>
                    <motion.div
                      whileHover={{ scale: 1.08 }}
                      transition={{ type: "spring", stiffness: 180, damping: 22 }}
                      className="relative"
                      style={{ width: 72, height: 72 }}
                    >
                      <div
                        className={`w-full h-full rounded-full overflow-hidden border-2 ${isOwner ? "border-primary" : "border-white/20"} group-hover:border-primary/70 transition-colors duration-300`}
                        style={{ boxShadow: isOwner ? "0 0 20px rgba(88,101,242,0.5)" : "none" }}
                      >
                        {avatarsLoading ? (
                          <div className="w-full h-full bg-white/10 animate-pulse" />
                        ) : (
                          <img src={avatarSrc} alt={admin.name} className="w-full h-full object-cover" data-testid={`img-avatar-${i}`} />
                        )}
                      </div>
                      {hasDecoration && (
                        <img
                          src={resolved!.decorationUrl!}
                          alt=""
                          className="absolute pointer-events-none select-none"
                          style={{ inset: 0, width: "100%", height: "100%", zIndex: 10 }}
                        />
                      )}
                    </motion.div>
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded-full text-[10px] font-bold shadow-lg z-20"
                      style={{
                        background: isOwner ? "linear-gradient(135deg, #5865F2, #9333ea)" : "rgba(88,101,242,0.85)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.2)",
                      }}
                    >
                      {admin.badge}
                    </span>
                  </div>

                  <div className="mt-1 space-y-1 w-full">
                    <h4 className="font-bold text-white text-xs sm:text-sm leading-tight" data-testid={`text-admin-name-${i}`}>{resolved?.username ?? admin.name}</h4>
                    <p className="text-[10px] sm:text-xs text-primary/80 font-medium">{admin.role}</p>
                    <p className="hidden sm:block text-[10px] sm:text-xs italic text-white/40 leading-relaxed line-clamp-2">"{admin.quote}"</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Server Boosters */}
      <section className="py-10 sm:py-16 px-4 sm:px-6 relative overflow-hidden">
        {/* ambient background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(244,127,255,0.07), transparent)" }} />
          <div className="absolute top-0 left-1/4 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, #f47fff, transparent)" }} />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full blur-3xl opacity-20" style={{ background: "radial-gradient(circle, #a855f7, transparent)" }} />
        </div>

        <div className="container mx-auto max-w-3xl relative">
          {/* Section header */}
          <div className="text-center mb-8 sm:mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs sm:text-sm font-bold mb-4"
              style={{
                background: "linear-gradient(135deg, rgba(244,127,255,0.15), rgba(168,85,247,0.15))",
                borderColor: "rgba(244,127,255,0.35)",
                color: "#f47fff",
                boxShadow: "0 0 20px rgba(244,127,255,0.15)",
              }}
            >
              <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              <span>Server Boosters</span>
            </motion.div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3" style={{ background: "linear-gradient(135deg, #f9a8ff, #c084fc, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Powering Our Community
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
              These legends go above and beyond — boosting the server and unlocking perks for everyone.
            </p>
          </div>

          {/* Booster cards */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-stretch">
            {BOOSTERS.map((booster, i) => {
              const resolved = boosterAvatars[booster.userId];
              const avatarSrc = resolved?.avatarUrl ?? fallbackAvatar(booster.name);
              const displayName = resolved?.username ?? booster.name;
              const hasDecoration = !boosterAvatarsLoading && !!resolved?.decorationUrl;

              return (
                <motion.div
                  key={booster.userId}
                  initial={{ opacity: 0, y: 32, scale: 0.92 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -8, transition: { type: "tween", ease: "easeOut", duration: 0.2 } }}
                  className="group relative flex-1 min-w-[220px] max-w-[320px] mx-auto sm:mx-0 rounded-3xl overflow-hidden flex flex-col items-center text-center p-6 sm:p-8 gap-5 cursor-default"
                  style={{
                    background: "linear-gradient(160deg, rgba(244,127,255,0.10) 0%, rgba(168,85,247,0.08) 50%, rgba(88,101,242,0.06) 100%)",
                    border: "1px solid rgba(244,127,255,0.25)",
                    boxShadow: "0 8px 40px rgba(0,0,0,0.35), 0 0 0 1px rgba(244,127,255,0.08) inset, 0 1px 0 rgba(255,255,255,0.08) inset",
                  }}
                >
                  {/* Top shimmer line */}
                  <div
                    className="absolute top-0 inset-x-0 h-[2px] rounded-t-3xl"
                    style={{ background: "linear-gradient(90deg, transparent 0%, #f47fff 40%, #a855f7 60%, transparent 100%)", opacity: 0.8 }}
                  />

                  {/* Hover glow overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                    style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(244,127,255,0.14), transparent 70%)" }}
                  />

                  {/* Floating sparkle particles */}
                  {[...Array(4)].map((_, si) => (
                    <motion.div
                      key={si}
                      className="absolute pointer-events-none"
                      style={{
                        top: `${15 + si * 18}%`,
                        left: `${8 + si * 22}%`,
                        width: si % 2 === 0 ? 4 : 3,
                        height: si % 2 === 0 ? 4 : 3,
                        borderRadius: "50%",
                        background: si % 2 === 0 ? "#f47fff" : "#c084fc",
                        opacity: 0.4,
                      }}
                      animate={{ y: [0, -8, 0], opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 2.5 + si * 0.5, repeat: Infinity, ease: "easeInOut", delay: si * 0.4 }}
                    />
                  ))}

                  {/* Avatar */}
                  <div className="relative flex items-end justify-center" style={{ width: 100, height: hasDecoration ? 110 : 100 }}>
                    {/* Outer glow ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ background: "radial-gradient(circle, rgba(244,127,255,0.3), transparent 70%)", filter: "blur(8px)" }}
                      animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 180, damping: 22 }}
                      className="relative"
                      style={{ width: 88, height: 88 }}
                    >
                      {/* Avatar ring */}
                      <div
                        className="w-full h-full rounded-full overflow-hidden"
                        style={{
                          padding: 3,
                          background: "linear-gradient(135deg, #f47fff, #a855f7, #5865F2)",
                          boxShadow: "0 0 24px rgba(244,127,255,0.5), 0 0 48px rgba(168,85,247,0.25)",
                        }}
                      >
                        <div className="w-full h-full rounded-full overflow-hidden bg-background">
                          {boosterAvatarsLoading ? (
                            <div className="w-full h-full rounded-full bg-white/10 animate-pulse" />
                          ) : (
                            <img src={avatarSrc} alt={displayName} className="w-full h-full object-cover rounded-full" />
                          )}
                        </div>
                      </div>
                      {hasDecoration && (
                        <img
                          src={resolved!.decorationUrl!}
                          alt=""
                          className="absolute pointer-events-none select-none"
                          style={{ inset: 0, width: "100%", height: "100%", zIndex: 10 }}
                        />
                      )}
                    </motion.div>

                    {/* Boost badge */}
                    <span
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 whitespace-nowrap flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold z-20 shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, #f47fff, #a855f7)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.25)",
                        boxShadow: "0 0 12px rgba(244,127,255,0.6)",
                      }}
                    >
                      <Zap className="w-2.5 h-2.5 fill-white" />
                      Booster
                    </span>
                  </div>

                  {/* Name & info */}
                  <div className="space-y-2 w-full">
                    <h4 className="font-bold text-base sm:text-lg leading-tight" style={{ background: "linear-gradient(135deg, #f9a8ff, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                      {displayName}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-white/50 leading-relaxed">
                      Boosting this server &amp; supporting the whole community
                    </p>
                    {/* Appreciation hearts */}
                    <div className="flex items-center justify-center gap-1 pt-1">
                      {[...Array(5)].map((_, hi) => (
                        <motion.div
                          key={hi}
                          animate={{ scale: [1, 1.25, 1] }}
                          transition={{ duration: 1.2, repeat: Infinity, delay: hi * 0.15, ease: "easeInOut" }}
                        >
                          <Heart className="w-3 h-3 fill-current" style={{ color: hi < 3 ? "#f47fff" : "#c084fc" }} />
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom decorative bar */}
                  <div className="w-full h-[1px] rounded-full opacity-30" style={{ background: "linear-gradient(90deg, transparent, #f47fff, #a855f7, transparent)" }} />

                  <p className="text-[10px] text-white/30 italic">Thank you for your support! 💜</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Rules */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 bg-card/20 border-y border-white/[0.05]">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">House Rules</h2>
            <p className="text-muted-foreground text-sm sm:text-base">Just a few simple guidelines to keep the vibes immaculate.</p>
          </div>
          <div className="space-y-3 sm:space-y-3">
            {[
              "Be respectful and kind to everyone. Hate speech is zero-tolerance.",
              "No spamming, flooding, or excessive pinging.",
              "Keep content in the correct channels.",
              "No self-promotion or DM advertising without staff permission.",
              "Follow the official Discord Terms of Service.",
            ].map((rule, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09 }}
                whileHover={{ x: 4 }}
                className="group flex items-start gap-4 p-4 sm:p-5 rounded-xl border border-white/[0.06] bg-gradient-to-r from-white/[0.04] to-transparent transition-colors duration-300 hover:border-primary/30 hover:from-primary/[0.05]"
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/15 border border-primary/25 flex items-center justify-center text-primary font-bold text-sm group-hover:bg-primary/25 transition-colors duration-300">
                  {i + 1}
                </div>
                <p className="pt-1 text-sm sm:text-base font-medium text-white/80 group-hover:text-white transition-colors duration-300">{rule}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-10 sm:py-16 lg:py-24 px-4 sm:px-6 relative">
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

          <div className="space-y-4">
            <PartnerCard stats={partnerStats} loading={partnerLoading} error={partnerError} fallbackInvite={PARTNER_DATA[0].fallbackInvite} index={0} />
            <PartnerCard stats={partner2Stats} loading={partner2Loading} error={partner2Error} fallbackInvite={PARTNER_DATA[1].fallbackInvite} index={1} />
            <PartnerCard stats={partner3Stats} loading={partner3Loading} error={partner3Error} fallbackInvite={PARTNER_DATA[2].fallbackInvite} index={2} />
            <PartnerCard stats={partner4Stats} loading={partner4Loading} error={partner4Error} fallbackInvite={PARTNER_DATA[3].fallbackInvite} index={3} />
            <PartnerCard stats={partner5Stats} loading={partner5Loading} error={partner5Error} fallbackInvite={PARTNER_DATA[4].fallbackInvite} index={4} />
          </div>

          {partnerStats && (
            <p className="text-center text-xs text-muted-foreground mt-4 sm:mt-6 opacity-50 flex items-center justify-center gap-1.5">
              <Zap className="w-3 h-3 text-primary" />
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
      <section className="py-14 sm:py-24 lg:py-32 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(88,101,242,0.12), transparent 70%)" }} />
        <div className="container mx-auto max-w-4xl relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
          >
            <SiDiscord className="w-12 h-12 sm:w-16 sm:h-16 text-primary mb-6 sm:mb-8 drop-shadow-[0_0_20px_rgba(88,101,242,0.8)]" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl md:text-6xl font-black mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-primary"
          >
            Ready to jump in?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-2xl"
          >
            {loading ? "Join our growing community right now." : `Join ${memberCount} members right now.`}{" "}
            Claim your roles, introduce yourself, and let's get started.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-full sm:w-auto"
          >
            <a href={JOIN_LINK} target="_blank" rel="noreferrer" data-testid="link-join-cta" className="w-full sm:w-auto inline-block">
              <Button
                size="lg"
                className="w-full sm:w-auto h-14 sm:h-16 px-8 sm:px-10 text-lg sm:text-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl shadow-[0_0_40px_rgba(88,101,242,0.5)] hover:shadow-[0_0_70px_rgba(88,101,242,0.8)] transition-all duration-300 hover:scale-105 group"
              >
                Join {serverName} Now
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 sm:py-8 text-center border-t border-white/[0.05] bg-background px-4">
        <p className="text-muted-foreground text-xs sm:text-sm font-medium opacity-50">
          Not affiliated with Discord Inc. This is the official #BISAYANGDAKO server page.
        </p>
      </footer>

    </div>
  );
}
