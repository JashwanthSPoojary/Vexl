import React, { ComponentPropsWithoutRef, CSSProperties } from "react";

import { cn } from "@/lib/utils";

interface RippleProps extends ComponentPropsWithoutRef<"div"> {
  mainCircleSize?: number;
  mainCircleOpacity?: number;
  numCircles?: number;
}

export const Ripple = React.memo(function Ripple({
  mainCircleSize = 210,
  mainCircleOpacity = 0.8,
  numCircles = 6,
  className,
  ...props
}: RippleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 select-none [mask-image:linear-gradient(to_bottom,white,transparent)]",
        className
      )}
      {...props}
    >
      {Array.from({ length: numCircles }, (_, i) => {
        const size = mainCircleSize + i * 70;
        const opacity = mainCircleOpacity - i * 0.01; // Softer fade
        const animationDelay = `${i * 0.6}s`;

        return (
          <div
            key={i}
            className="absolute animate-ripple rounded-full border shadow-xl"
            style={
              {
                "--i": i,
                "--duration": "5s",
                width: `${size}px`,
                height: `${size}px`,
                opacity,
                animationDelay,
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "rgba(255, 255, 255, 0.1)", // subtle white
                backgroundColor: "rgba(255, 255, 255, 0.03)", // soft light fill
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(1)",
                
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
});

Ripple.displayName = "Ripple";
