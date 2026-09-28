import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useReducedMotion } from 'motion/react';
import FrelaSprite, { FRELA_DIRECTIONS, type FrelaDirection } from './FrelaSprite';

export default function FrelaPet() {
  const [following, setFollowing] = useState(false);
  const [running, setRunning] = useState(false);
  const [sleeping, setSleeping] = useState(false);
  const [direction, setDirection] = useState<FrelaDirection>('s');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const startingPointer = useRef({ x: 0, y: 0 });
  const tooltipId = useId();
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!following) return;
    let animationFrame = 0;
    let restTimer = 0;
    let sleepTimer = 0;
    let lastPointer = startingPointer.current;
    let petX = x.get();
    let petY = y.get();
    let nextDirection: FrelaDirection = 's';
    let hasHeading = false;
    let headingX = 0;
    let headingY = 0;
    let moved = false;
    const maxX = Math.max(8, window.innerWidth - 88);
    const maxY = Math.max(8, window.innerHeight - 88);
    const stop = () => { setFollowing(false); setRunning(false); setSleeping(false); };
    const armIdleTimers = () => {
      window.clearTimeout(restTimer);
      window.clearTimeout(sleepTimer);
      // Sparse slow-pointer events can be hundreds of milliseconds apart.
      // Hold the gait through those gaps without moving the pet any further.
      restTimer = window.setTimeout(() => {
        setRunning(false);
        hasHeading = false;
        headingX = 0;
        headingY = 0;
      }, 600);
      sleepTimer = window.setTimeout(() => { setRunning(false); setSleeping(true); }, 2000);
    };
    const commitMovement = () => {
      animationFrame = 0;
      x.set(petX);
      y.set(petY);
      setSleeping(false);
      if (moved) {
        setDirection(nextDirection);
        setRunning(!reducedMotion);
      }
      moved = false;
      armIdleTimers();
    };
    const move = (event: PointerEvent) => {
      const pointerDistance = Math.hypot(event.clientX - lastPointer.x, event.clientY - lastPointer.y);
      if (pointerDistance === 0) return;
      lastPointer = { x: event.clientX, y: event.clientY };
      const targetX = Math.max(8, Math.min(event.clientX + 20, maxX));
      const targetY = Math.max(8, Math.min(event.clientY + 18, maxY));
      const dx = targetX - petX;
      const dy = targetY - petY;
      const distance = Math.hypot(dx, dy);
      // Each pointer sample grants at most the distance the cursor travelled.
      // There is no spring acceleration, teleport to the target, or catch-up
      // motion after the cursor stops, including on the very first movement.
      if (distance > 0.01) {
        const step = Math.min(pointerDistance, distance);
        const stepX = dx / distance * step;
        const stepY = dy / distance * step;
        petX += stepX;
        petY += stepY;
        headingX += stepX;
        headingY += stepY;
        // Accumulate real travel before turning. One-pixel reversals cancel
        // out, while intentional turns still take effect after just six pixels.
        if (!hasHeading || Math.hypot(headingX, headingY) >= 6) {
          const angle = Math.atan2(headingY, headingX);
          const currentAngle = FRELA_DIRECTIONS.indexOf(nextDirection) * Math.PI / 4;
          const turn = Math.abs(Math.atan2(Math.sin(angle - currentAngle), Math.cos(angle - currentAngle)));
          // An extra ten degrees prevents flutter at the edge of two octants.
          if (!hasHeading || turn > Math.PI / 8 + Math.PI / 18) {
            const octant = (Math.round(angle / (Math.PI / 4)) + 8) % 8;
            nextDirection = FRELA_DIRECTIONS[octant];
          }
          hasHeading = true;
          headingX = 0;
          headingY = 0;
        }
        moved = true;
      }
      // Calculate the capped path for every sample, but publish at most once
      // per display frame. Nothing polls or repaints when the pointer is idle.
      if (!animationFrame) animationFrame = window.requestAnimationFrame(commitMovement);
    };
    const visibility = () => {
      if (document.hidden) stop();
    };
    armIdleTimers();
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { stop(); buttonRef.current?.focus({ preventScroll: true }); }
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('click', stop);
    window.addEventListener('keydown', key);
    window.addEventListener('blur', stop);
    window.addEventListener('resize', stop);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(restTimer);
      window.clearTimeout(sleepTimer);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('click', stop);
      window.removeEventListener('keydown', key);
      window.removeEventListener('blur', stop);
      window.removeEventListener('resize', stop);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [following, reducedMotion, x, y]);

  return (
    <div className="frela-home">
      <button
        ref={buttonRef}
        type="button"
        className="frela-button"
        aria-label={following ? 'Bring Frela back' : 'Meet Frela, my fawn toy poodle. Click to let her follow your cursor'}
        aria-describedby={following ? undefined : tooltipId}
        aria-pressed={following}
        onClick={event => {
          event.stopPropagation();
          if (following) { setFollowing(false); setRunning(false); setSleeping(false); return; }
          const bounds = event.currentTarget.getBoundingClientRect();
          const startX = Math.max(8, Math.min(bounds.left, window.innerWidth - 88));
          const startY = Math.max(8, Math.min(bounds.top, window.innerHeight - 88));
          x.set(startX); y.set(startY);
          startingPointer.current = event.detail === 0
            ? { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 }
            : { x: event.clientX, y: event.clientY };
          setSleeping(false);
          setFollowing(true);
        }}
      >
        <span className={`frela-docked${following ? ' is-away' : ''}`}><FrelaSprite /></span>
        <span className="frela-caption">{following ? 'Bring Frela back ↙' : 'Meet Frela ↗'}</span>
      </button>
      <div id={tooltipId} role="tooltip" aria-hidden={following || undefined} className={`frela-tooltip${following ? ' is-following' : ''}`}>
        <strong>I also have a dog called Frela.</strong>
        <span>She often accompanies me while I work!</span>
        <span>Click to take her for a walk. She’ll follow your cursor!</span>
      </div>
      <span className="sr-only" role="status">{following ? 'Frela is following. Click anywhere or press Escape to stop.' : 'Frela is resting below my photo.'}</span>
      {following && createPortal(
        <motion.div className="frela-follower" aria-hidden="true" style={{ x, y }}>
          <FrelaSprite running={running && !reducedMotion} sleeping={sleeping} direction={direction} />
        </motion.div>, document.body
      )}
    </div>
  );
}
