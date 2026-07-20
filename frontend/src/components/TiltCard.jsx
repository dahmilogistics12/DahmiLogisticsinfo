import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * 3D tilt card — tilts toward the cursor with a spring, resets on leave.
 * Respects prefers-reduced-motion (spring simply stays at 0 since we never set values).
 */
export const TiltCard = ({ children, className = "", max = 8, ...props }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [max, -max]), {
    stiffness: 260,
    damping: 22,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-max, max]), {
    stiffness: 260,
    damping: 22,
  });

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onMouseMove = (e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
};
