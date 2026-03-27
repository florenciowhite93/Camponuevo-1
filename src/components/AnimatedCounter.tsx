"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  separator?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  end,
  duration = 2000,
  prefix = "",
  suffix = "",
  separator = "",
  decimals = 0,
  className = "",
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isInView && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const startTime = performance.now();
      const startValue = 0;
      const frameSkip = end > 100 ? Math.ceil(end / 200) : 1;
      let lastFrame = 0;
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const easeOut = progress === 1 ? 1 : easeOutQuart;
        const currentValue = Math.floor((startValue + (end - startValue) * easeOut) / frameSkip) * frameSkip;
        
        if (currentValue !== lastFrame) {
          lastFrame = currentValue;
          setCount(currentValue);
        }
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, end, duration]);

  const formatNumber = (num: number) => {
    const fixed = num.toFixed(decimals);
    
    if (separator && !decimals) {
      return parseInt(fixed).toLocaleString("es-AR");
    }
    
    if (decimals) {
      const [intPart, decPart] = fixed.split(".");
      const formatted = parseInt(intPart).toLocaleString("es-AR");
      return decimals > 0 ? `${formatted}.${decPart}` : formatted;
    }
    
    return fixed;
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: 0.2 }}
      className={className}
    >
      <span className="tabular-nums">
        {prefix}{formatNumber(count)}{suffix}
      </span>
    </motion.div>
  );
}
