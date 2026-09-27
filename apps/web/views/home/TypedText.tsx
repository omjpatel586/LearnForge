'use client';

import { useEffect, useState } from 'react';

interface TypedTextProps {
  words: string[];
  typeMs?: number;
  deleteMs?: number;
  holdMs?: number;
  className?: string;
}

const TypedText = ({
  words,
  typeMs = 70,
  deleteMs = 40,
  holdMs = 1600,
  className = '',
}: TypedTextProps) => {
  const [state, setState] = useState({ word: 0, chars: 0, deleting: false });
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const current = words[state.word];
    let delay = state.deleting ? deleteMs : typeMs;
    if (!state.deleting && state.chars === current.length) delay = holdMs;

    const timer = setTimeout(() => {
      setState((s) => {
        const word = words[s.word];
        if (!s.deleting) {
          if (s.chars < word.length) return { ...s, chars: s.chars + 1 };
          return { ...s, deleting: true };
        }
        if (s.chars > 0) return { ...s, chars: s.chars - 1 };
        return { word: (s.word + 1) % words.length, chars: 0, deleting: false };
      });
    }, delay);

    return () => clearTimeout(timer);
  }, [state, words, typeMs, deleteMs, holdMs, reduceMotion]);

  const text = reduceMotion ? words[0] : words[state.word].slice(0, state.chars);

  return (
    <span className={`${className} after:ml-0.5 after:animate-pulse after:content-['|']`}>
      {text}
    </span>
  );
};

export default TypedText;
