import { memo, useEffect, useId, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import originalAtlas from '../assets/pets/frela-original-poses.png';
import directionalAtlas from '../assets/pets/frela-directional-poses.png';

export type FrelaDirection = 'e' | 'se' | 's' | 'sw' | 'w' | 'nw' | 'n' | 'ne';
export const FRELA_DIRECTIONS: FrelaDirection[] = ['e', 'se', 's', 'sw', 'w', 'nw', 'n', 'ne'];

interface SpriteFrame {
  atlas: 'original' | 'directional';
  x: number;
  y: number;
  width: number;
  height: number;
  // Shared source-pixel scale for each atlas keeps head/body size consistent.
  scale: number;
  clip?: string;
}

const original = (x: number, y: number, width: number, height: number, clip?: string): SpriteFrame =>
  ({ atlas: 'original', x, y, width, height, scale: 100 / 280, clip });
const directional = (x: number, y: number, width: number, height: number): SpriteFrame =>
  ({ atlas: 'directional', x, y, width, height, scale: 100 / 390 });

const sitting = original(200, 122, 213, 237);
// Reuse the sleeping sequence in the user's sheet; the last frame includes Zzz.
// Keep one scale and a shared ground line across all four frames.
const sleepFrames = [
  original(106, 803, 312, 133),
  original(455, 803, 283, 133),
  original(777, 803, 290, 133),
  original(1125, 725, 332, 211),
].map(pose => ({ ...pose, scale: 100 / 360 }));
// The first two source frames have overlapping bounding rectangles, but their
// silhouettes do not touch. Clip the neighbouring paw/muzzle out at display time.
const rightRun = [
  original(15, 444, 254, 202, '15,444 269,444 269,575 255,575 255,646 15,646'),
  original(262, 444, 250, 202, '280,444 512,444 512,646 262,646 262,580 280,580'),
  original(514, 444, 238, 203),
];
const leftRun = [
  original(813, 444, 212, 203),
  original(1029, 440, 256, 207),
  original(1286, 437, 234, 207, '1286,437 1520,437 1520,644 1302,644 1302,570 1286,570'),
];
const northRun = [directional(31, 271, 251, 305), directional(31, 699, 251, 301)];
const southRun = [directional(334, 272, 265, 305), directional(334, 699, 265, 291)];
const northEastRun = [directional(656, 272, 257, 304), directional(647, 698, 270, 302)];
const southEastRun = [directional(948, 281, 277, 279), directional(950, 713, 275, 279)];
const poses: Record<FrelaDirection, SpriteFrame[]> = {
  e: rightRun, w: leftRun, n: northRun, s: southRun,
  ne: northEastRun, nw: northEastRun, se: southEastRun, sw: southEastRun,
};

const FrelaSprite = memo(function FrelaSprite({ running = false, sleeping = false, direction = 's' }: { running?: boolean; sleeping?: boolean; direction?: FrelaDirection }) {
  const [tick, setTick] = useState(0);
  const spriteRef = useRef<SVGSVGElement>(null);
  const nearViewport = useInView(spriteRef, { once: true, margin: '240px' });
  const loadImages = nearViewport || running || sleeping;
  const reducedMotion = useReducedMotion();
  const clipId = useId();
  useEffect(() => {
    if (!loadImages) return;
    // Do not fetch the pet atlases during the initial hero-page load.
    // Warm the other views only when Frela approaches the viewport.
    const preload = new Image();
    preload.src = directionalAtlas;
  }, [loadImages]);
  useEffect(() => {
    setTick(0);
    if ((!running && !sleeping) || reducedMotion) return;
    const timer = window.setInterval(() => setTick(value => (value + 1) % 12), sleeping ? 800 : 120);
    return () => window.clearInterval(timer);
  }, [running, sleeping, reducedMotion]);
  const frames = sleeping ? sleepFrames : poses[direction];
  const frameIndex = tick % frames.length;
  const pose = running || sleeping ? frames[frameIndex] : sitting;
  const width = pose.width * pose.scale;
  const height = pose.height * pose.scale;
  const mirrored = running && !sleeping && (direction === 'nw' || direction === 'sw');
  const isOriginal = pose.atlas === 'original';

  return (
    <svg ref={spriteRef} className={`frela-poodle${sleeping ? ' is-sleeping' : running ? ' is-running' : ''}`} data-direction={sleeping ? 'sleep' : running ? direction : 'rest'} data-frame={running || sleeping ? frameIndex : 'rest'} viewBox="0 0 100 100" shapeRendering="crispEdges" aria-hidden="true" focusable="false">
      <g transform={mirrored ? 'translate(100 0) scale(-1 1)' : undefined}>
        <svg x={(100 - width) / 2} y={94 - height} width={width} height={height} viewBox={`${pose.x} ${pose.y} ${pose.width} ${pose.height}`} overflow="hidden">
          {pose.clip && <defs><clipPath id={clipId} clipPathUnits="userSpaceOnUse"><polygon points={pose.clip} /></clipPath></defs>}
          {loadImages && <image href={isOriginal ? originalAtlas : directionalAtlas} width={isOriginal ? 1536 : 1254} height={isOriginal ? 1024 : 1254} clipPath={pose.clip ? `url(#${clipId})` : undefined} />}
        </svg>
      </g>
    </svg>
  );
});

export default FrelaSprite;
