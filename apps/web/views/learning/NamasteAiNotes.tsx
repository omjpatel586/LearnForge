'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import Notebook from './Notebook';
import { FRONT_COVER, INotebook, INotebookChapter, namasteAiChapters } from './notebookData';

const chapterLabel = (chapter: INotebookChapter) => `Chapter ${chapter.number} · ${chapter.title}`;

const NotebookCard = ({ notebook, onOpen }: { notebook: INotebook; onOpen: () => void }) => (
  <button
    type="button"
    onClick={onOpen}
    className="group flex flex-col overflow-hidden rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark text-left hover:border-borderStrong-light dark:hover:border-borderStrong-dark transition-colors duration-200"
  >
    <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1e293b]">
      <Image
        src={notebook.cover ?? FRONT_COVER}
        alt={`${notebook.title} — cover`}
        fill
        sizes="(max-width: 900px) 50vw, 240px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
    <div className="flex flex-col p-4">
      <h4 className="text-base font-semibold tracking-tight">{notebook.title}</h4>
      <span className="mt-1 text-xs text-textMuted-light dark:text-textMuted-dark">
        {notebook.pages.length ? `${notebook.pages.length} pages` : 'Coming soon'}
      </span>
      <span className="mt-3 text-sm font-medium text-secondary-light dark:text-secondary-dark group-hover:underline">
        Open notebook →
      </span>
    </div>
  </button>
);

const NamasteAiNotes = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [initialPage, setInitialPage] = useState(0);

  const chapter = namasteAiChapters[activeIndex];
  const openNotebook = chapter.notebooks.find((n) => n.slug === openSlug) ?? null;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const slug = params.get('notebook');
      if (!slug) return;
      const chapterIndex = namasteAiChapters.findIndex((c) =>
        c.notebooks.some((n) => n.slug === slug),
      );
      if (chapterIndex === -1) return;
      setActiveIndex(chapterIndex);
      setOpenSlug(slug);
      setInitialPage(Number(params.get('page')) || 0);
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const syncUrl = useCallback((slug: string | null, page: number) => {
    const url = new URL(window.location.href);
    if (slug) {
      url.searchParams.set('notebook', slug);
      if (page > 0) url.searchParams.set('page', String(page));
      else url.searchParams.delete('page');
    } else {
      url.searchParams.delete('notebook');
      url.searchParams.delete('page');
    }
    window.history.replaceState(null, '', url);
  }, []);

  const openNotebookAt = (slug: string) => {
    setOpenSlug(slug);
    setInitialPage(0);
    syncUrl(slug, 0);
  };

  const closeNotebook = () => {
    setOpenSlug(null);
    syncUrl(null, 0);
  };

  const selectChapter = (i: number) => {
    setActiveIndex(i);
    setOpenSlug(null);
    syncUrl(null, 0);
  };

  return (
    <section className="animate-fadeIn">
      <span className="px-3 py-1 rounded-full text-xs font-medium tracking-widest uppercase bg-secondarySoft-light dark:bg-secondarySoft-dark text-secondary-light dark:text-secondary-dark">
        Learning notes
      </span>

      <h2 className="mt-5 text-4xl max2xs:text-3xl font-semibold tracking-tight">Namaste AI</h2>

      <p className="mt-4 max-w-2xl text-textSecondary-light dark:text-textSecondary-dark">
        Previously, I didn’t know much about the journey of AI. After I started learning from the
        Namaste Dev platform, I began to understand how AI is shaping the future, how AI works
        behind the scenes, and what happens under the hood. I also started discovering the secret
        language behind LLMs and how these softwares actually work.
      </p>
      <nav
        aria-label="Chapters"
        className="mt-10 flex gap-1 overflow-x-auto border-b border-border-light dark:border-border-dark"
      >
        {namasteAiChapters.map((item, i) => {
          const active = i === activeIndex;
          return (
            <button
              key={item.number}
              type="button"
              onClick={() => selectChapter(i)}
              aria-current={active ? 'true' : undefined}
              className={`-mb-px flex shrink-0 items-baseline gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                active
                  ? 'border-secondary-light dark:border-secondary-dark text-text-light dark:text-text-dark'
                  : 'border-transparent text-textSecondary-light dark:text-textSecondary-dark hover:text-text-light dark:hover:text-text-dark'
              }`}
            >
              <span className="text-xs font-semibold tracking-widest text-secondary-light dark:text-secondary-dark">
                {item.number}
              </span>
              {item.title}
            </button>
          );
        })}
      </nav>

      <div className="mt-8">
        {openNotebook ? (
          <div className="animate-fadeIn">
            <button
              type="button"
              onClick={closeNotebook}
              className="inline-flex items-center gap-1 text-sm font-medium text-textSecondary-light dark:text-textSecondary-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
            >
              <IoIosArrowBack size={16} />
              Back to {chapterLabel(chapter)}
            </button>
            <h3 className="mt-4 mb-8 text-2xl font-semibold tracking-tight">
              {openNotebook.title}
            </h3>
            <Notebook
              key={openNotebook.slug}
              notebook={openNotebook}
              chapterLabel={chapterLabel(chapter)}
              initialIndex={initialPage}
              onIndexChange={(page) => syncUrl(openNotebook.slug, page)}
            />
          </div>
        ) : (
          <div key={chapter.number} className="animate-fadeIn">
            <h3 className="text-2xl font-semibold tracking-tight">{chapter.title}</h3>
            <p className="mt-2 max-w-2xl text-sm text-textSecondary-light dark:text-textSecondary-dark">
              {chapter.description}
            </p>

            {chapter.notebooks.length ? (
              <div className="mt-6 grid grid-cols-4 maxLg:grid-cols-3 maxMd:grid-cols-2 gap-6">
                {chapter.notebooks.map((notebook) => (
                  <NotebookCard
                    key={notebook.slug}
                    notebook={notebook}
                    onOpen={() => openNotebookAt(notebook.slug)}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-dashed border-border-light dark:border-border-dark p-10 text-center text-sm text-textSecondary-light dark:text-textSecondary-dark">
                Notebooks for this chapter are coming soon.
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default NamasteAiNotes;
