import { useEffect, useRef } from "react";

export default function FloatingCube({ color = "#8b5cf6", size = 120 }: { color?: string; size?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let t = 0;
    let animId: number;
    const W = size * 2;
    const H = size * 2;
    canvas.width = W;
    canvas.height = H;

    const vertices = [
      [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
      [-1, -1,  1], [1, -1,  1], [1, 1,  1], [-1, 1,  1],
    ].map(([x, y, z]) => ({ x: x * 0.5, y: y * 0.5, z: z * 0.5 }));

    const edges = [
      [0,1],[1,2],[2,3],[3,0],
      [4,5],[5,6],[6,7],[7,4],
      [0,4],[1,5],[2,6],[3,7],
    ];

    const project = (x: number, y: number, z: number, ry: number, rx: number) => {
      const cosY = Math.cos(ry), sinY = Math.sin(ry);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const cosX = Math.cos(rx), sinX = Math.sin(rx);
      const y1 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const fov = 3;
      const s = fov / (fov + z2 + 1.5) * size * 0.9;
      return { px: x1 * s + W / 2, py: y1 * s + H / 2, depth: z2 };
    };

    const hexToRgb = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `${r},${g},${b}`;
    };
    const rgb = hexToRgb(color);

    const draw = () => {
      t += 0.012;
      ctx.clearRect(0, 0, W, H);

      const ry = t;
      const rx = t * 0.6;

      const pts = vertices.map((v) => project(v.x, v.y, v.z, ry, rx));

      // Draw edges
      edges.forEach(([a, b]) => {
        const pa = pts[a], pb = pts[b];
        const avgDepth = (pa.depth + pb.depth) / 2;
        const alpha = 0.3 + (avgDepth + 0.8) * 0.3;
        ctx.beginPath();
        ctx.moveTo(pa.px, pa.py);
        ctx.lineTo(pb.px, pb.py);
        ctx.strokeStyle = `rgba(${rgb}, ${Math.max(0.1, Math.min(0.9, alpha))})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      });

      // Draw vertices
      pts.forEach((p) => {
        const alpha = 0.5 + (p.depth + 0.8) * 0.4;
        const grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, 6);
        grad.addColorStop(0, `rgba(${rgb}, ${Math.min(1, alpha)})`);
        grad.addColorStop(1, `rgba(${rgb}, 0)`);
        ctx.beginPath();
        ctx.arc(p.px, p.py, 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(p.px, p.py, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb}, ${Math.min(1, alpha)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [color, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size, filter: `drop-shadow(0 0 20px ${color}66)` }}
    />
  );
}
