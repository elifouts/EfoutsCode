"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 20,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: {
  children?: any;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}) => {
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.0015;
      default:
        return 0.001;
    }
  };

  const init = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Exit if canvas is null

    const ctx = canvas.getContext("2d");
    if (!ctx) return; // Exit if ctx is null

    w = ctx.canvas.width = window.innerWidth;
    h = ctx.canvas.height = window.innerHeight;

    // Create offscreen canvas
    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d");
    if (!offscreenCtx) return; // Exit if offscreenCtx is null

    offscreenCanvas.width = w;
    offscreenCanvas.height = h;

    nt = 0;

    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth;
      h = ctx.canvas.height = window.innerHeight;
      offscreenCanvas.width = w;
      offscreenCanvas.height = h;
    };

    const render = () => {
      // Clear main canvas
      ctx.fillStyle = backgroundFill || "#000000";
      ctx.fillRect(0, 0, w, h);

      drawWave(5, ctx, offscreenCanvas, offscreenCtx);

      requestAnimationFrame(render);
    };

    render();
  };

  const waveColors = colors ?? [
    "#faaffa",
    "#0fafff",
    "#aaaffa",
    "#1e3aff",
    "#affaaa",
  ];

  const drawWave = (
    n: number,
    ctx: CanvasRenderingContext2D,
    offscreenCanvas: HTMLCanvasElement,
    offscreenCtx: CanvasRenderingContext2D
  ) => {
    nt += getSpeed();

    // Clear offscreen canvas
    offscreenCtx.clearRect(0, 0, w, h);

    // Apply blur and opacity to the offscreen context
    offscreenCtx.filter = `blur(${blur}px)`;
    offscreenCtx.globalAlpha = waveOpacity || 0.5;

    for (i = 0; i < n; i++) {
      offscreenCtx.beginPath();
      offscreenCtx.lineWidth = waveWidth || 50;
      offscreenCtx.strokeStyle = waveColors[i % waveColors.length];

      for (x = -50; x < w + 50; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 150;
        offscreenCtx.lineTo(x, y + h * 0.5);
      }

      offscreenCtx.stroke();
      offscreenCtx.closePath();
    }

    // Draw the offscreen canvas onto the main canvas
    ctx.drawImage(offscreenCanvas, 0, 0);

    // Reset filters and globalAlpha for offscreen context
    offscreenCtx.filter = "none";
    offscreenCtx.globalAlpha = 1.0;
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0"
        ref={canvasRef}
        id="canvas"
      ></canvas>
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};

