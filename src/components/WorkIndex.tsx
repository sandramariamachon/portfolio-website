import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

interface WorkProject {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  hoverImage?: string;
}

export default function WorkIndex({ projects }: { projects: WorkProject[] }) {
  const [preview, setPreview] = useState<WorkProject | null>(null);
  const [touchProject, setTouchProject] = useState<string | null>(null);
  const [pointerPreview, setPointerPreview] = useState(false);
  const lastPointer = useRef('mouse');
  const keyboardPreview = useRef(false);
  const reducedMotion = useReducedMotion();
  const previewX = useMotionValue(0);
  const previewY = useMotionValue(0);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(previewX, { stiffness: 350, damping: 36 });
  const smoothY = useSpring(previewY, { stiffness: 350, damping: 36 });

  const closePreview = () => {
    keyboardPreview.current = false;
    setPreview(null);
    setPointerPreview(false);
  };

  useEffect(() => {
    const dismiss = () => {
      keyboardPreview.current = false;
      setPreview(null);
      setPointerPreview(false);
    };
    const dismissPointerPreview = () => {
      if (!keyboardPreview.current) dismiss();
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { dismiss(); setTouchProject(null); }
    };
    window.addEventListener('scroll', dismissPointerPreview, { passive: true });
    window.addEventListener('resize', dismiss);
    window.addEventListener('keydown', escape);
    return () => {
      window.removeEventListener('scroll', dismissPointerPreview);
      window.removeEventListener('resize', dismiss);
      window.removeEventListener('keydown', escape);
    };
  }, []);

  const positionPreview = (x: number, y: number, instant = false) => {
    const width = Math.min(320, window.innerWidth - 32);
    const height = width * 0.75;
    const nextX = Math.max(16, Math.min(x + 28 + width > window.innerWidth - 16 ? x - width - 28 : x + 28, window.innerWidth - width - 16));
    const nextY = Math.max(16, Math.min(y - height / 2, window.innerHeight - height - 16));
    previewX.set(nextX);
    previewY.set(nextY);
    if (instant) { smoothX.jump(nextX); smoothY.jump(nextY); }
    cursorX.set(x - 32);
    cursorY.set(y - 32);
  };

  return (
    <>
      <div className="work-index-panel">
        <ol className="work-index-list" onPointerLeave={closePreview}>
          {projects.map((project, index) => (
            <motion.li
              key={project.id}
              className="work-index-item"
              initial={reducedMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <Link
                to={`/project/${project.id}`}
                className={`work-index-row${pointerPreview && preview?.id === project.id ? ' has-pointer-preview' : ''}`}
                onPointerDown={event => { lastPointer.current = event.pointerType; }}
                onPointerMove={event => {
                  if (event.pointerType !== 'mouse' || window.innerWidth < 768) return;
                  keyboardPreview.current = false;
                  positionPreview(event.clientX, event.clientY, !preview);
                  setPreview(project);
                  setPointerPreview(true);
                }}
                onFocus={event => {
                  if (!event.currentTarget.matches(':focus-visible') || window.innerWidth < 768) return;
                  keyboardPreview.current = true;
                  const bounds = event.currentTarget.getBoundingClientRect();
                  positionPreview(bounds.right - 360, bounds.top + bounds.height / 2, true);
                  setPreview(project);
                  setPointerPreview(false);
                }}
                onBlur={closePreview}
                onClick={event => {
                  if (event.detail !== 0 && lastPointer.current === 'touch' && touchProject !== project.id && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
                    event.preventDefault();
                    setTouchProject(project.id);
                    closePreview();
                  }
                }}
              >
                <span className="work-index-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="work-index-info">
                  <h3 className="work-index-title">{project.title}</h3>
                  <p className="work-index-description">{project.description}</p>
                </div>
                <span className="work-index-category">{project.category}</span>
                <ArrowRight className="work-index-arrow" aria-hidden="true" />
              </Link>
              {touchProject === project.id && (
                <div className="work-inline-preview">
                  <img src={project.hoverImage || project.image} alt="" />
                  <p>{project.description}</p>
                  <Link to={`/project/${project.id}`}>View project <ArrowUpRight size={16} aria-hidden="true" /></Link>
                </div>
              )}
            </motion.li>
          ))}
        </ol>
      </div>
      {preview && createPortal(
        <div aria-hidden="true" className="work-preview-layer">
          <motion.div className="work-floating-preview" style={{ x: reducedMotion ? previewX : smoothX, y: reducedMotion ? previewY : smoothY }}>
            <img key={preview.id} src={preview.hoverImage || preview.image} alt="" />
          </motion.div>
          {pointerPreview && <motion.div className="work-view-cursor" style={{ x: cursorX, y: cursorY }}>View</motion.div>}
        </div>, document.body
      )}
    </>
  );
}
