import { useEffect, useRef } from "react";

export default function Brain3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let t = 0;

    const W = 400;
    const H = 400;
    canvas.width = W;
    canvas.height = H;

    // Nodes in 3D space
    const nodeCount = 80;
    type Node3D = { x: number; y: number; z: number; vx: number; vy: number; vz: number };
    const nodes: Node3D[] = Array.from({ length: nodeCount }, () => ({
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2,
      z: (Math.random() - 0.5) * 2,
      vx: (Math.random() - 0.5) * 0.002,
      vy: (Math.random() - 0.5) * 0.002,
      vz: (Math.random() - 0.5) * 0.002,
    }));

    // Normalize to sphere surface
    nodes.forEach((n) => {
      const len = Math.sqrt(n.x * n.x + n.y * n.y + n.z * n.z);
      n.x /= len;
      n.y /= len;
      n.z /= len;
    });

    const project = (x: number, y: number, z: number, rotY: number, rotX: number) => {
      // Rotate Y
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      // Rotate X
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const fov = 3;
      const scale = fov / (fov + z2 + 1.5);
      return { px: x1 * scale * 160 + W / 2, py: y1 * scale * 160 + H / 2, depth: z2, scale };
    };

    const draw = () => {
      t += 0.005;
      const rotY = t * 0.4;
      const rotX = Math.sin(t * 0.2) * 0.3;

      ctx.clearRect(0, 0, W, H);

      // Projected nodes
      const projected = nodes.map((n) => ({ ...project(n.x, n.y, n.z, rotY, rotX), orig: n }));

      // Draw connections
      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const a = projected[i];
          const b = projected[j];
          const dx = a.orig.x - b.orig.x;
          const dy = a.orig.y - b.orig.y;
          const dz = a.orig.z - b.orig.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (dist < 0.65) {
            const alpha = (1 - dist / 0.65) * 0.6; // Increased from 0.35
            const avgDepth = (a.depth + b.depth) / 2;
            const depthFade = (avgDepth + 1.5) / 3;
            // Color gradient purple → cyan based on position
            const hue = 250 + ((a.orig.x + a.orig.y + 1) / 2) * 60;
            ctx.beginPath();
            ctx.moveTo(a.px, a.py);
            ctx.lineTo(b.px, b.py);
            ctx.strokeStyle = `hsla(${hue}, 80%, 65%, ${alpha * depthFade})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projected.forEach((p) => {
        const depthFade = (p.depth + 1.5) / 3;
        const r = 2.5 * p.scale * depthFade;
        const hue = 250 + ((p.orig.x + p.orig.y + 1) / 2) * 70;

        // Glow
        const grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, r * 6); // Increased from 4
        grad.addColorStop(0, `hsla(${hue}, 90%, 75%, ${0.8 * depthFade})`);
        grad.addColorStop(1, `hsla(${hue}, 90%, 75%, 0)`);
        ctx.beginPath();
        ctx.arc(p.px, p.py, r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(p.px, p.py, r * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue}, 100%, 85%, ${depthFade})`;
        ctx.fill();
      });

      // Pulse ring
      const pulseR = 165 + Math.sin(t * 2) * 5;
      ctx.beginPath();
      ctx.arc(W / 2, H / 2, pulseR, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(139, 92, 246, ${0.08 + Math.sin(t * 2) * 0.04})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      animFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full max-w-[400px] mx-auto opacity-100"
      style={{ filter: "drop-shadow(0 0 60px rgba(139,92,246,0.6))" }}
    />
  );
}
