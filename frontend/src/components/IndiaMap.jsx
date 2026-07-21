import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import roadsMap from "@/assets/india-roads.png";

// Image is a cropped, background-cleaned render of india-roads.png (1400x1315).
const IMG_W = 1400;
const IMG_H = 1315;

// Percent positions calibrated against the road-map image's cropped bounds.
// Index-matched to t.network.branches / t.network.satellite (labels are
// localized, positions aren't, so array order must stay in sync).
export const MAIN_COORDS = [
  { x: 69.1, y: 47.5 }, // Kolkata — hub
  { x: 65.6, y: 44.3 }, // Durgapur
  { x: 68.1, y: 49.1 }, // Haldia
];

export const SATELLITE_COORDS = [
  { x: 80.6, y: 35.8 }, // Gauhati
  { x: 58.7, y: 45.0 }, // Ranchi
  { x: 60.5, y: 54.9 }, // Bhubaneswar
  { x: 16.3, y: 58.9 }, // Mumbai
  { x: 16.1, y: 52.1 }, // Surat
];

const HUB = MAIN_COORDS[0];

const curve = (x1, y1, x2, y2, bend = 0.18) => {
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const len = Math.hypot(dx, dy) || 1;
  const cx = mx + (-dy / len) * len * bend;
  const cy = my + (dx / len) * len * bend;
  return { d: `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`, len };
};

export const IndiaMap = ({ branchNames, satelliteNames, activeKey, onActivate, onClear, hqLabel }) => {
  const [hovered, setHovered] = useState(false);
  const [halo, setHalo] = useState({ x: 50, y: 50 });
  const wrapRef = useRef(null);

  const routes = useMemo(() => {
    const list = [];
    MAIN_COORDS.slice(1).forEach((p, i) => {
      list.push({ key: `main-${i + 1}`, ...curve(HUB.x, HUB.y, p.x, p.y, 0.1), point: p });
    });
    SATELLITE_COORDS.forEach((p, i) => {
      list.push({ key: `sat-${i}`, ...curve(HUB.x, HUB.y, p.x, p.y, 0.16), point: p });
    });
    return list;
  }, []);

  const nodes = [
    { key: "main-0", label: branchNames[0], point: MAIN_COORDS[0], kind: "hub" },
    ...MAIN_COORDS.slice(1).map((point, i) => ({ key: `main-${i + 1}`, label: branchNames[i + 1], point, kind: "main" })),
    ...SATELLITE_COORDS.map((point, i) => ({ key: `sat-${i}`, label: satelliteNames[i], point, kind: "sat" })),
  ];

  const handleMove = (e) => {
    const rect = wrapRef.current?.getBoundingClientRect();
    if (!rect) return;
    setHalo({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div
      className="relative mx-auto w-full max-w-[420px] select-none py-3"
      data-testid="india-network-map"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        onClear();
      }}
      onMouseMove={handleMove}
    >
      <div
        ref={wrapRef}
        className="relative"
        style={{
          aspectRatio: `${IMG_W} / ${IMG_H}`,
          transform: hovered ? "scale(1.22)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)",
        }}
      >
        {/* cursor halo */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none absolute z-20 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                left: `${halo.x}%`,
                top: `${halo.y}%`,
                background: "radial-gradient(circle, hsla(24,95%,55%,0.35) 0%, hsla(24,95%,55%,0) 70%)",
                mixBlendMode: "plus-lighter",
              }}
            />
          )}
        </AnimatePresence>

        {/* base road map */}
        <img
          src={roadsMap}
          alt="India road network map connecting Dahmi Logistics branches"
          className="absolute inset-0 h-full w-full object-contain opacity-80 dark:opacity-90"
          draggable={false}
        />

        {/* animated "traffic pulse" glow layer, active while hovered */}
        <img
          src={roadsMap}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ${
            hovered ? "map-pulse opacity-100" : "opacity-0"
          }`}
          style={{ filter: "brightness(1.4) saturate(1.6)" }}
        />

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 z-10 h-full w-full overflow-visible"
        >
          {routes.map((r, i) => {
            const isActive = activeKey === r.key;
            const dimmed = activeKey && !isActive;
            return (
              <g key={r.key}>
                <motion.path
                  d={r.d}
                  fill="none"
                  vectorEffect="non-scaling-stroke"
                  strokeWidth={isActive ? 2.4 : 1.3}
                  strokeDasharray="0.4 1.6"
                  strokeLinecap="round"
                  className={isActive ? "stroke-[hsl(var(--brand-orange))]" : "stroke-[hsl(var(--brand-navy))] dark:stroke-white"}
                  opacity={dimmed ? 0.12 : 0.75}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.1, delay: 0.15 + i * 0.09, ease: "easeInOut" }}
                />
                <circle
                  r={isActive ? 0.9 : 0.6}
                  className={isActive ? "fill-[hsl(var(--brand-orange))]" : "fill-[hsl(var(--brand-navy-2))] dark:fill-white"}
                  opacity={dimmed ? 0.2 : 0.95}
                >
                  <animateMotion dur={`${2.4 + r.len / 30}s`} repeatCount="indefinite" path={r.d} />
                </circle>
              </g>
            );
          })}
        </svg>

        {nodes.map((n) => {
          const isActive = activeKey === n.key;
          const dimmed = activeKey && !isActive;
          const isHub = n.kind === "hub";
          const isMain = n.kind === "main" || isHub;
          return (
            <button
              type="button"
              key={n.key}
              data-testid={`map-node-${n.key}`}
              onMouseEnter={() => onActivate(n.key)}
              onFocus={() => onActivate(n.key)}
              onClick={() => onActivate(n.key)}
              className="group absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center outline-none"
              style={{ left: `${n.point.x}%`, top: `${n.point.y}%` }}
            >
              <span className="relative flex items-center justify-center">
                {isHub && (
                  <motion.span
                    className="absolute rounded-full bg-[hsl(var(--brand-orange))]/40"
                    style={{ width: 22, height: 22 }}
                    animate={{ scale: [1, 1.9, 1], opacity: [0.6, 0, 0.6] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
                <span
                  className={[
                    "relative rounded-full border-2 border-white shadow transition-transform duration-200 dark:border-slate-900",
                    isMain ? "bg-[hsl(var(--brand-navy))] dark:bg-[hsl(var(--brand-orange))]" : "bg-white dark:bg-slate-900",
                    !isMain && "border-[hsl(var(--brand-orange))]",
                    isActive ? "scale-125" : "group-hover:scale-110",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={{ width: isHub ? 11 : isMain ? 8.5 : 7.5, height: isHub ? 11 : isMain ? 8.5 : 7.5 }}
                />
              </span>
              <span
                className={[
                  "mt-1 whitespace-nowrap rounded px-1.5 py-0.5 text-[9.5px] font-medium leading-none transition-colors sm:text-[10.5px]",
                  isActive
                    ? "bg-[hsl(var(--brand-orange))] text-white"
                    : dimmed
                      ? "text-muted-foreground/50"
                      : "text-foreground/80",
                ].join(" ")}
              >
                {n.label}
              </span>
              <AnimatePresence>
                {isActive && isHub && (
                  <motion.span
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-0.5 whitespace-nowrap rounded-full bg-[hsl(var(--brand-navy))] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-white dark:bg-white dark:text-[hsl(var(--brand-navy))]"
                  >
                    {hqLabel}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          );
        })}
      </div>
    </div>
  );
};
