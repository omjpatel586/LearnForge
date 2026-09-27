'use client';

import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import {
  IoAdd,
  IoContract,
  IoExpand,
  IoRefresh,
  IoRemove,
  IoShareOutline,
} from 'react-icons/io5';
import { BACK_COVER, FRONT_COVER, INotebook } from './notebookData';

type FlipState = null | { dir: 'next' | 'prev'; running: boolean };

const FLIP_MS = 750;

const MIN_ZOOM = 1;
const MAX_ZOOM = 3;
const ZOOM_STEP = 0.5;

const SWIPE_PX = 60;

const ruledPaper = {
  backgroundImage: 'repeating-linear-gradient(transparent 0 31px, rgba(96,165,250,0.35) 31px 32px)',
  backgroundPositionY: '48px',
};

interface NotebookProps {
  notebook: INotebook;
  chapterLabel: string;
  initialIndex?: number;
  onIndexChange?: (index: number) => void;
  shareUrl?: string;
}

const Notebook = ({
  notebook,
  chapterLabel,
  initialIndex = 0,
  onIndexChange,
  shareUrl,
}: NotebookProps) => {
  const pageCount = Math.max(notebook.pages.length, 1);
  const backSheet = pageCount + 1;
  const sheetCount = pageCount + 2;

  const [index, setIndex] = useState(Math.min(Math.max(initialIndex, 0), sheetCount - 1));
  const [flip, setFlip] = useState<FlipState>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [expanded, setExpanded] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [panning, setPanning] = useState(false);

  const drag = useRef<{ x: number; y: number; panX: number; panY: number; moved: boolean } | null>(
    null
  );

  const canNext = index < sheetCount - 1;
  const canPrev = index > 0;

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const changeZoom = useCallback((delta: number) => {
    setZoom((z) => {
      const nextZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, Math.round((z + delta) * 100) / 100));
      if (nextZoom === MIN_ZOOM) setPan({ x: 0, y: 0 });
      return nextZoom;
    });
  }, []);

  const next = useCallback(() => {
    if (!canNext || flip) return;
    resetView();
    setFlip({ dir: 'next', running: false });
  }, [canNext, flip, resetView]);

  const prev = useCallback(() => {
    if (!canPrev || flip) return;
    resetView();
    setFlip({ dir: 'prev', running: false });
  }, [canPrev, flip, resetView]);

  useLayoutEffect(() => {
    if (!flip || flip.running) return;
    const frame = requestAnimationFrame(() => setFlip((f) => (f ? { ...f, running: true } : f)));
    return () => cancelAnimationFrame(frame);
  }, [flip]);

  const onFlipEnd = () => {
    if (!flip) return;
    const target = flip.dir === 'next' ? index + 1 : index - 1;
    setIndex(target);
    setFlip(null);
    onIndexChange?.(target);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === '+' || e.key === '=') changeZoom(ZOOM_STEP);
      if (e.key === '-') changeZoom(-ZOOM_STEP);
      if (e.key === '0') resetView();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, changeZoom, resetView]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 750px)');
    const frame = requestAnimationFrame(() => setExpanded(media.matches));
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2200);
    return () => clearTimeout(timer);
  }, [toast]);

  const share = async () => {
    const url = shareUrl ?? window.location.href;
    const data = { title: notebook.title, text: `${chapterLabel} — ${notebook.title}`, url };
    try {
      if (navigator.share) {
        await navigator.share(data);
        return;
      }
      await navigator.clipboard.writeText(url);
      setToast('Link copied');
    } catch {
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    drag.current = { x: e.clientX, y: e.clientY, panX: pan.x, panY: pan.y, moved: false };
    if (zoom > 1) e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const start = drag.current;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) > 8 || Math.abs(dy) > 8) start.moved = true;
    if (zoom > 1) {
      setPanning(true);
      setPan({ x: start.panX + dx, y: start.panY + dy });
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const start = drag.current;
    drag.current = null;
    setPanning(false);
    if (!start || zoom > 1) return;
    const dx = e.clientX - start.x;
    if (Math.abs(dx) < SWIPE_PX) return;
    if (dx < 0) next();
    else prev();
  };

  const renderFace = (sheet: number) => {
    if (sheet === 0) {
      return (
        <Image
          src={notebook.cover ?? FRONT_COVER}
          alt={`${notebook.title} — front cover`}
          fill
          sizes="(max-width: 750px) 100vw, 720px"
          className="object-cover"
          priority
        />
      );
    }

    if (sheet === backSheet) {
      return (
        <Image
          src={BACK_COVER}
          alt="Back cover"
          fill
          sizes="(max-width: 750px) 100vw, 720px"
          className="object-cover"
        />
      );
    }

    const page = notebook.pages[sheet - 1];
    if (!page) {
      return (
        <div
          className="flex h-full flex-col items-center justify-center bg-white p-8 text-center text-slate-600"
          style={ruledPaper}
        >
          <p className="text-lg font-medium">Notes coming soon</p>
          <p className="mt-2 text-sm">This notebook is being written up page by page.</p>
        </div>
      );
    }

    return (
      <Image
        src={page.src}
        alt={page.alt}
        fill
        sizes="(max-width: 750px) 100vw, 720px"
        className="object-contain bg-white"
        priority={sheet <= 2}
      />
    );
  };

  const movingSheet = flip?.dir === 'next' ? index : flip?.dir === 'prev' ? index - 1 : null;

  let movingAngle = 0;
  if (flip?.dir === 'next') movingAngle = flip.running ? -180 : 0;
  if (flip?.dir === 'prev') movingAngle = flip.running ? 0 : -180;

  const restingSheet = flip?.dir === 'next' ? index + 1 : index;

  const sheetClass =
    'absolute inset-0 overflow-hidden rounded-r-lg shadow-[0_1px_2px_rgba(0,0,0,0.12)] bg-white';

  const iconButtonClass =
    'p-2 rounded-lg border border-border-light dark:border-border-dark hover:bg-hover-light dark:hover:bg-hover-dark disabled:opacity-40 disabled:hover:bg-transparent transition-colors';

  const counter =
    index === 0
      ? 'Front cover'
      : index === backSheet
        ? 'Back cover'
        : `Page ${index} of ${pageCount}`;

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="sticky top-14 z-40 flex w-full max-w-[720px] flex-wrap items-center justify-between gap-3 rounded-lg bg-body-light/90 dark:bg-body-dark/90 py-2 backdrop-blur">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={prev}
            disabled={!canPrev}
            aria-label="Previous page"
            title="Previous page (←)"
            className={iconButtonClass}
          >
            <IoIosArrowBack size={18} />
          </button>
          <span className="min-w-[7rem] text-center text-sm tabular-nums text-textSecondary-light dark:text-textSecondary-dark">
            {counter}
          </span>
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            aria-label="Next page"
            title="Next page (→)"
            className={iconButtonClass}
          >
            <IoIosArrowForward size={18} />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => changeZoom(-ZOOM_STEP)}
            disabled={zoom <= MIN_ZOOM}
            aria-label="Zoom out"
            title="Zoom out (−)"
            className={iconButtonClass}
          >
            <IoRemove size={18} />
          </button>
          <span className="min-w-[3rem] text-center text-xs tabular-nums text-textMuted-light dark:text-textMuted-dark">
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            onClick={() => changeZoom(ZOOM_STEP)}
            disabled={zoom >= MAX_ZOOM}
            aria-label="Zoom in"
            title="Zoom in (+)"
            className={iconButtonClass}
          >
            <IoAdd size={18} />
          </button>
          <button
            type="button"
            onClick={resetView}
            disabled={zoom === 1 && pan.x === 0 && pan.y === 0}
            aria-label="Reset zoom"
            title="Reset zoom (0)"
            className={iconButtonClass}
          >
            <IoRefresh size={18} />
          </button>

          <span className="mx-1 h-5 w-px bg-border-light dark:bg-border-dark" />

          <button
            type="button"
            onClick={share}
            aria-label="Share this notebook"
            title="Share this notebook"
            className={iconButtonClass}
          >
            <IoShareOutline size={18} />
          </button>
          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-pressed={expanded}
            aria-label={expanded ? 'Shrink notebook' : 'Expand notebook'}
            title={expanded ? 'Shrink notebook' : 'Expand notebook'}
            className={iconButtonClass}
          >
            {expanded ? <IoContract size={18} /> : <IoExpand size={18} />}
          </button>
        </div>
      </div>
      <div
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          drag.current = null;
          setPanning(false);
        }}
        onDoubleClick={() => (zoom > 1 ? resetView() : changeZoom(ZOOM_STEP * 2))}
        className={`flex w-full justify-center overflow-hidden pr-2 pb-2 touch-pan-y select-none ${
          zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''
        } ${expanded ? '' : 'max-w-[720px]'}`}
      >
        <div
          className={`relative aspect-[3/4] [container-type:inline-size] [perspective:2400px] ${
            expanded ? 'h-[calc(100dvh-13rem)] max-h-[900px] max-w-full' : 'w-full'
          }`}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transition: panning ? 'none' : 'transform 200ms ease-out',
          }}
        >
          {[3, 2, 1].map((n) => (
            <div
              key={n}
              className={sheetClass}
              style={{ transform: `translate(${n * 2}px, ${n * 2}px)`, zIndex: 0 }}
            />
          ))}
          {restingSheet < sheetCount && (
            <div className={sheetClass} style={{ zIndex: 10 }}>
              {renderFace(restingSheet)}
            </div>
          )}
          {movingSheet !== null && (
            <div
              className="absolute inset-0 origin-left [transform-style:preserve-3d]"
              style={{
                zIndex: 20,
                transform: `rotateY(${movingAngle}deg)`,
                transition: flip?.running
                  ? `transform ${FLIP_MS}ms cubic-bezier(0.32, 0.08, 0.24, 1)`
                  : 'none',
              }}
              onTransitionEnd={onFlipEnd}
            >
              <div className={`${sheetClass} [backface-visibility:hidden]`}>
                {renderFace(movingSheet)}
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/25 to-transparent"
                  style={{
                    opacity: flip?.running && flip.dir === 'next' ? 0.9 : 0,
                    transition: `opacity ${FLIP_MS}ms ease-out`,
                  }}
                />
              </div>
              <div
                className={`${sheetClass} [backface-visibility:hidden] [transform:rotateY(180deg)]`}
                style={movingSheet === 0 ? { background: '#1b2340' } : ruledPaper}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/20 to-transparent" />
              </div>
            </div>
          )}
          {zoom === 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                disabled={!canPrev}
                aria-label="Previous page"
                className="absolute inset-y-0 left-0 z-40 w-1/2 cursor-w-resize disabled:cursor-default"
              />
              <button
                type="button"
                onClick={next}
                disabled={!canNext}
                aria-label="Next page"
                className="absolute inset-y-0 right-0 z-40 w-1/2 cursor-e-resize disabled:cursor-default"
              />
            </>
          )}

        </div>
      </div>

      <p className="text-xs text-textMuted-light dark:text-textMuted-dark maxSmPlus:hidden">
        Tap the page edges or use ← → to turn · + / − to zoom · 0 to reset
      </p>
      <p className="text-xs text-textMuted-light dark:text-textMuted-dark minSmPlus:hidden">
        Swipe to turn pages · pinch the zoom buttons to read closely
      </p>

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-text-light dark:bg-text-dark px-4 py-2 text-sm text-body-light dark:text-body-dark shadow-lg"
        >
          {toast}
        </div>
      )}
    </div>
  );
};

export default Notebook;
