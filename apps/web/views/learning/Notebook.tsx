'use client';

import { Patrick_Hand } from 'next/font/google';
import Image from 'next/image';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { author, BACK_COVER, INotebookChapter } from './notebookData';

type FlipState = null | { dir: 'next' | 'prev'; running: boolean };

const FLIP_MS = 900;

// Faint ruled-paper background for pages that have no image yet.
const ruledPaper = {
  backgroundImage: 'repeating-linear-gradient(transparent 0 31px, rgba(96,165,250,0.35) 31px 32px)',
  backgroundPositionY: '48px',
};

// Matches the handwriting on the back-cover artwork.
const handwriting = Patrick_Hand({ weight: '400', subsets: ['latin'] });

// The printed handles were erased from the back-cover artwork; these are drawn
// in their place as real links. Positions are percentages of the 3:4 sheet,
// measured from the artwork's "Connect with Me" box.
const BackCoverLinks = ({ interactive }: { interactive: boolean }) => {
  const rows = [
    { top: '66.3%', ...author.github },
    { top: '71.6%', ...author.linkedin },
    { top: '76.6%', ...author.portfolio },
  ];

  return (
    <div
      className={`${handwriting.className} absolute inset-0 text-[2.2cqw] text-[#2456c8] pointer-events-none`}
    >
      {rows.map(({ top, label, href }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={interactive ? 0 : -1}
          className={`absolute left-[35%] -translate-y-1/2 whitespace-nowrap leading-none underline decoration-1 underline-offset-[0.25em] hover:text-[#1a3f9a] ${
            interactive ? 'pointer-events-auto' : ''
          }`}
          style={{ top }}
        >
          {label}
        </a>
      ))}
    </div>
  );
};

const Notebook = ({ chapter }: { chapter: INotebookChapter }) => {
  // Sheet 0 is the front cover, 1..n the note pages, n+1 the back cover.
  const pageCount = Math.max(chapter.pages.length, 1);
  const backSheet = pageCount + 1;
  const sheetCount = pageCount + 2;
  const [index, setIndex] = useState(0);
  const [flip, setFlip] = useState<FlipState>(null);

  const canNext = index < sheetCount - 1;
  const canPrev = index > 0;

  const next = useCallback(() => {
    if (!canNext || flip) return;
    setFlip({ dir: 'next', running: false });
  }, [canNext, flip]);

  const prev = useCallback(() => {
    if (!canPrev || flip) return;
    setFlip({ dir: 'prev', running: false });
  }, [canPrev, flip]);

  // Mount the moving sheet at its start angle, then kick off the transition
  // on the next frame so the browser has a start value to animate from.
  useLayoutEffect(() => {
    if (!flip || flip.running) return;
    const frame = requestAnimationFrame(() => setFlip((f) => (f ? { ...f, running: true } : f)));
    return () => cancelAnimationFrame(frame);
  }, [flip]);

  const onFlipEnd = () => {
    if (!flip) return;
    setIndex((i) => (flip.dir === 'next' ? i + 1 : i - 1));
    setFlip(null);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const renderFace = (sheet: number) => {
    if (sheet === 0) {
      if (chapter.cover) {
        return (
          <Image
            src={chapter.cover}
            alt={`${chapter.title} — front cover`}
            fill
            sizes="(max-width: 750px) 100vw, 640px"
            className="object-cover"
            priority
          />
        );
      }
      return (
        <div className="flex h-full flex-col justify-between bg-[#1e293b] p-8 max2xs:p-5 text-white">
          <div>
            <span className="text-xs font-medium tracking-[0.3em] uppercase text-slate-300">
              Chapter {chapter.number}
            </span>
            <h3 className="mt-4 text-3xl max2xs:text-2xl font-semibold leading-tight tracking-tight">
              {chapter.title}
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-slate-300">{chapter.description}</p>
          </div>
          <div className="flex items-end justify-between text-xs text-slate-400">
            <span>Namaste AI · Learning notes</span>
            <span>
              {chapter.pages.length ? `${chapter.pages.length} pages` : 'Notes coming soon'}
            </span>
          </div>
        </div>
      );
    }

    if (sheet === backSheet) {
      return (
        <>
          <Image
            src={BACK_COVER}
            alt="Back cover"
            fill
            sizes="(max-width: 750px) 100vw, 640px"
            className="object-cover"
          />
          <BackCoverLinks interactive={false} />
        </>
      );
    }

    const page = chapter.pages[sheet - 1];
    if (!page) {
      return (
        <div
          className="flex h-full flex-col items-center justify-center bg-white p-8 text-center text-slate-600"
          style={ruledPaper}
        >
          <p className="text-lg font-medium">Notes coming soon</p>
          <p className="mt-2 text-sm">This chapter is being written up topic by topic.</p>
        </div>
      );
    }

    return (
      <Image
        src={page.src}
        alt={page.alt}
        fill
        sizes="(max-width: 750px) 100vw, 640px"
        className="object-cover bg-white"
        priority={sheet <= 2}
      />
    );
  };

  // Which sheet is physically turning, and the angle it should be at now.
  const movingSheet = flip?.dir === 'next' ? index : flip?.dir === 'prev' ? index - 1 : null;

  let movingAngle = 0;
  if (flip?.dir === 'next') movingAngle = flip.running ? -180 : 0;
  if (flip?.dir === 'prev') movingAngle = flip.running ? 0 : -180;

  // The sheet that sits still on top of the stack while another one turns.
  const restingSheet = flip?.dir === 'next' ? index + 1 : index;
  const onBackCover = index === backSheet && !flip;

  const sheetClass =
    'absolute inset-0 overflow-hidden rounded-r-lg shadow-[0_1px_2px_rgba(0,0,0,0.12)] bg-white';

  const navButtonClass =
    'p-2 rounded-full border border-border-light dark:border-border-dark hover:bg-hover-light dark:hover:bg-hover-dark disabled:opacity-40 disabled:hover:bg-transparent transition-colors';

  const counter =
    index === 0
      ? 'Front cover'
      : index === backSheet
        ? 'Back cover'
        : `Page ${index} of ${pageCount}`;

  return (
    <div className="flex flex-col items-center gap-6">
      {/* overflow-hidden clips a sheet once it turns past the spine, like it went behind the notebook. */}
      <div className="w-full max-w-[640px] overflow-hidden pr-2 pb-2">
        {/* Perspective viewport. */}
        <div className="relative w-full aspect-[3/4] [container-type:inline-size] [perspective:2400px]">
          {/* Decorative stack edges beneath everything. */}
          {[3, 2, 1].map((n) => (
            <div
              key={n}
              className={sheetClass}
              style={{ transform: `translate(${n * 2}px, ${n * 2}px)`, zIndex: 0 }}
            />
          ))}

          {/* Resting sheet: the one being revealed (next) or covered (prev). */}
          {restingSheet < sheetCount && (
            <div className={sheetClass} style={{ zIndex: 10 }}>
              {renderFace(restingSheet)}
            </div>
          )}

          {/* Turning sheet: only mounted during a flip. */}
          {movingSheet !== null && (
            <div
              className="absolute inset-0 origin-left [transform-style:preserve-3d]"
              style={{
                zIndex: 20,
                transform: `rotateY(${movingAngle}deg)`,
                transition: flip?.running
                  ? `transform ${FLIP_MS}ms cubic-bezier(0.4, 0.1, 0.2, 1)`
                  : 'none',
              }}
              onTransitionEnd={onFlipEnd}
            >
              <div className={`${sheetClass} [backface-visibility:hidden]`}>
                {renderFace(movingSheet)}
              </div>
              <div
                className={`${sheetClass} [backface-visibility:hidden] [transform:rotateY(180deg)]`}
                style={movingSheet === 0 ? { background: '#1b2340' } : ruledPaper}
              />
            </div>
          )}

          {/* Click targets: left half turns back, right half turns forward. */}
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

          {/* Clickable copy of the links, above the click targets, only while resting on the back cover. */}
          {onBackCover && (
            <div className="absolute inset-0 z-50 pointer-events-none">
              <BackCoverLinks interactive />
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={prev}
          disabled={!canPrev}
          aria-label="Previous page"
          className={navButtonClass}
        >
          <IoIosArrowBack size={20} />
        </button>

        <span className="min-w-[8rem] text-center text-sm tabular-nums text-textSecondary-light dark:text-textSecondary-dark">
          {counter}
        </span>

        <button
          type="button"
          onClick={next}
          disabled={!canNext}
          aria-label="Next page"
          className={navButtonClass}
        >
          <IoIosArrowForward size={20} />
        </button>
      </div>
    </div>
  );
};

export default Notebook;
