import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useMotionValue, useReducedMotion } from 'motion/react';
import FrelaSprite, { FRELA_DIRECTIONS, type FrelaDirection } from './FrelaSprite';

export default function FrelaPet() {
  const [following, setFollowing] = useState(false);
  const [running, setRunning] = useState(false);
  const [sleeping, setSleeping] = useState(false);
  const [direction, setDirection] = useState<FrelaDirection>('s');
  const [touchMode, setTouchMode] = useState(() => window.matchMedia('(pointer: coarse)').matches);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const touchHandleRef = useRef<HTMLButtonElement>(null);
  const touchControlsRef = useRef<HTMLDivElement>(null);
  const touchDragged = useRef(false);
  const startingPointer = useRef({ x: 0, y: 0 });
  const tooltipId = useId();
  const touchHelpId = useId();
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const stopWalk = () => { setFollowing(false); setRunning(false); setSleeping(false); };

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
    let activeTouchPointer: number | null = null;
    let touchTravel = 0;
    const touchHandle = touchHandleRef.current;
    const viewportWidth = window.innerWidth;
    const maxX = Math.max(8, window.innerWidth - 88);
    const verticalLimit = () => Math.max(8, touchMode && touchControlsRef.current
      ? touchControlsRef.current.getBoundingClientRect().top - 88
      : window.innerHeight - 88);
    let maxY = verticalLimit();
    if (touchMode) { petY = Math.min(petY, maxY); y.set(petY); }
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
      if (touchMode ? event.pointerId !== activeTouchPointer : event.pointerType !== 'mouse') return;
      const pointerDistance = Math.hypot(event.clientX - lastPointer.x, event.clientY - lastPointer.y);
      if (pointerDistance === 0) return;
      if (touchMode) {
        touchTravel += pointerDistance;
        if (touchTravel > 4) touchDragged.current = true;
      }
      lastPointer = { x: event.clientX, y: event.clientY };
      // On touchscreens, stay above the finger so Frela remains visible.
      const targetX = Math.max(8, Math.min(event.clientX + (touchMode ? -40 : 20), maxX));
      const targetY = Math.max(8, Math.min(event.clientY + (touchMode ? -100 : 18), maxY));
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
    const startTouch = (event: PointerEvent) => {
      if (!event.isPrimary || activeTouchPointer !== null || event.button !== 0) return;
      activeTouchPointer = event.pointerId;
      touchTravel = 0;
      touchDragged.current = false;
      lastPointer = { x: event.clientX, y: event.clientY };
      touchHandle?.setPointerCapture(event.pointerId);
      setSleeping(false);
      armIdleTimers();
    };
    const endTouch = (event: PointerEvent) => {
      if (event.pointerId !== activeTouchPointer) return;
      activeTouchPointer = null;
      // Publish the last sample, then rest; lifting a finger does not end a walk.
      if (animationFrame) { window.cancelAnimationFrame(animationFrame); commitMovement(); }
      if (event.type === 'pointercancel' || event.type === 'lostpointercapture') touchDragged.current = true;
      if (touchHandle?.hasPointerCapture(event.pointerId)) touchHandle.releasePointerCapture(event.pointerId);
      setRunning(false);
      armIdleTimers();
    };
    const resize = () => {
      // Mobile browser chrome may resize the viewport while scrolling.
      // Keep Frela in bounds; a rotation or desktop resize ends the walk.
      if (!touchMode || window.innerWidth !== viewportWidth) { stop(); return; }
      maxY = verticalLimit();
      petY = Math.max(8, Math.min(petY, maxY));
      y.set(petY);
    };
    const visibility = () => {
      if (document.hidden) stop();
    };
    armIdleTimers();
    const key = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { stop(); buttonRef.current?.focus({ preventScroll: true }); }
    };
    window.addEventListener('pointermove', move, { passive: true });
    if (touchMode) {
      touchHandle?.addEventListener('pointerdown', startTouch);
      touchHandle?.addEventListener('pointerup', endTouch);
      touchHandle?.addEventListener('pointercancel', endTouch);
      touchHandle?.addEventListener('lostpointercapture', endTouch);
    } else {
      window.addEventListener('click', stop);
    }
    window.addEventListener('keydown', key);
    window.addEventListener('blur', stop);
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.clearTimeout(restTimer);
      window.clearTimeout(sleepTimer);
      touchHandle?.removeEventListener('pointerdown', startTouch);
      touchHandle?.removeEventListener('pointerup', endTouch);
      touchHandle?.removeEventListener('pointercancel', endTouch);
      touchHandle?.removeEventListener('lostpointercapture', endTouch);
      if (activeTouchPointer !== null && touchHandle?.hasPointerCapture(activeTouchPointer)) {
        touchHandle.releasePointerCapture(activeTouchPointer);
      }
      window.removeEventListener('pointermove', move);
      window.removeEventListener('click', stop);
      window.removeEventListener('keydown', key);
      window.removeEventListener('blur', stop);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [following, reducedMotion, touchMode, x, y]);

  return (
    <div className="frela-home">
      <button
        ref={buttonRef}
        type="button"
        className="frela-button"
        aria-label={following ? 'Bring Frela back' : touchMode
          ? 'Meet Frela, my fawn toy poodle. Tap to take her for a walk'
          : 'Meet Frela, my fawn toy poodle. Click to let her follow your cursor'}
        aria-describedby={following ? undefined : tooltipId}
        aria-pressed={following}
        onPointerDown={event => { if (!following) setTouchMode(event.pointerType !== 'mouse'); }}
        onClick={event => {
          event.stopPropagation();
          if (following) { stopWalk(); return; }
          const bounds = event.currentTarget.getBoundingClientRect();
          const startX = Math.max(8, Math.min(bounds.left, window.innerWidth - 88));
          const startY = Math.max(8, Math.min(bounds.top, window.innerHeight - 88));
          x.set(startX); y.set(startY);
          startingPointer.current = event.detail === 0
            ? { x: bounds.left + bounds.width / 2, y: bounds.top + bounds.height / 2 }
            : { x: event.clientX, y: event.clientY };
          setSleeping(false);
          touchDragged.current = false;
          setFollowing(true);
        }}
      >
        <span className={`frela-docked${following ? ' is-away' : ''}`}><FrelaSprite /></span>
        <span className="frela-caption">{following ? 'Bring Frela back ↙' : 'Meet Frela ↗'}</span>
      </button>
      <div id={tooltipId} role="tooltip" aria-hidden={following || undefined} className={`frela-tooltip${following ? ' is-following' : ''}`}>
        <strong>I also have a dog called Frela.</strong>
        <span>She often accompanies me while I work!</span>
        <span>{touchMode ? 'Tap to take her for a walk, then drag Frela with your finger!' : 'Click to take her for a walk. She’ll follow your cursor!'}</span>
      </div>
      <span className="sr-only" role="status">{following
        ? touchMode ? 'Frela is ready. Drag her to guide her. Scroll elsewhere as usual. Tap Done to finish.' : 'Frela is following. Click anywhere or press Escape to stop.'
        : 'Frela is resting below my photo.'}</span>
      {following && createPortal(
        <>
          <motion.div className="frela-follower" aria-hidden={touchMode ? undefined : true} style={{ x, y }}>
            {touchMode ? (
              <button
                ref={touchHandleRef}
                type="button"
                className="frela-touch-handle"
                aria-label="Drag Frela to walk, or tap her to stop"
                aria-describedby={touchHelpId}
                onClick={event => {
                  event.stopPropagation();
                  if (!touchDragged.current || event.detail === 0) stopWalk();
                }}
              >
                <FrelaSprite running={running && !reducedMotion} sleeping={sleeping} direction={direction} />
              </button>
            ) : <FrelaSprite running={running && !reducedMotion} sleeping={sleeping} direction={direction} />}
          </motion.div>
          {touchMode && (
            <div ref={touchControlsRef} className="frela-touch-controls">
              <div id={touchHelpId}><strong>Drag Frela to guide her</strong><span>Scroll anywhere else as usual.</span></div>
              <button type="button" onClick={stopWalk} aria-label="End Frela's walk">Done</button>
            </div>
          )}
        </>, document.body
      )}
    </div>
  );
}
