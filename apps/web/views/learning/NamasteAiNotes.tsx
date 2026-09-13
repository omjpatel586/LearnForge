'use client';

import { useState } from 'react';
import Notebook from './Notebook';
import { namasteAiChapters } from './notebookData';

const NamasteAiNotes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapter = namasteAiChapters[activeIndex];

  return (
    <section className="animate-fadeIn">
      <span className="px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-secondarySoft-light dark:bg-secondarySoft-dark text-secondary-light dark:text-secondary-dark">
        Learning notes
      </span>

      <h2 className="mt-5 text-4xl max2xs:text-3xl font-semibold tracking-tight">Namaste AI</h2>

      <p className="mt-4 max-w-2xl text-textSecondary-light dark:text-textSecondary-dark">
        A practical journey through modern AI — from the foundations and an AI-native engineering
        mindset to building knowledge-grounded applications and autonomous agents. Each chapter is
        a notebook: open it and turn the pages.
      </p>

      <div className="mt-10 grid grid-cols-[18rem_1fr] maxLg:grid-cols-1 gap-10 maxLg:gap-8 items-start">
        <nav aria-label="Chapters" className="flex flex-col gap-2 maxLg:flex-row maxLg:flex-wrap">
          {namasteAiChapters.map((item, i) => {
            const active = i === activeIndex;
            return (
              <button
                key={item.number}
                type="button"
                onClick={() => setActiveIndex(i)}
                aria-current={active ? 'true' : undefined}
                className={`flex items-baseline gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                  active
                    ? 'border-secondary-light dark:border-secondary-dark bg-secondarySoft-light dark:bg-secondarySoft-dark'
                    : 'border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark hover:bg-hover-light dark:hover:bg-hover-dark'
                }`}
              >
                <span className="shrink-0 text-xs font-semibold tracking-widest text-secondary-light dark:text-secondary-dark">
                  {item.number}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium leading-snug">{item.title}</span>
                  <span className="mt-0.5 text-xs text-textMuted-light dark:text-textMuted-dark">
                    {item.pages.length ? `${item.pages.length} pages` : 'Coming soon'}
                  </span>
                </span>
              </button>
            );
          })}
        </nav>

        {/* Keyed so switching chapters remounts the notebook at its cover. */}
        <Notebook key={chapter.number} chapter={chapter} />
      </div>
    </section>
  );
};

export default NamasteAiNotes;
