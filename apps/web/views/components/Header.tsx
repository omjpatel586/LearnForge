'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa6';
import { IoMdClose, IoMdMenu } from 'react-icons/io';
import useWindowSize from '../hooks/useWindowSize';
import ThemeToggle from '../theme/ThemeToggle';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Learning', href: '/learning' },
  { label: 'Blogs', href: '/blogs' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resources', href: '/resources' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const windowSize = useWindowSize();

  useEffect(() => {
    if (windowSize.width > 900) {
      setMenuOpen(false);
    }
  }, [windowSize.width]);

  return (
    <header className="fixed top-0 z-50 w-full h-14 px-8 max2xs:px-4 bg-primary-light dark:bg-primary-dark border-b-4 border-b-secondary-light dark:border-b-secondary-dark transition-colors duration-300">
      <nav className="flex justify-between items-center h-full">
        <Link href="/">
          <h1 className="text-2xl max2xs:text-xl font-semibold tracking-widest">
            <span className="text-secondary-light dark:text-secondary-dark">Learn</span>
            Forge
          </h1>
        </Link>

        <div className="flex items-center gap-6 maxMd:gap-2">
          <ul className="flex items-center gap-6 maxMd:hidden">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="hover:text-secondary-light dark:hover:text-secondary-dark transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ThemeToggle />

          <a
            href="https://github.com/omjpatel586/LearnForge"
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl hover:text-secondary-light dark:hover:text-secondary-dark transition-colors"
            aria-label="View LearnForge on GitHub"
            title="View LearnForge on GitHub"
          >
            <FaGithub />
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hidden maxMd:block text-2xl"
            title="Toggle menu"
          >
            {menuOpen ? <IoMdClose /> : <IoMdMenu />}
          </button>
        </div>
      </nav>

      {menuOpen && (
        <ul className="hidden maxMd:flex flex-col gap-4 p-4 bg-primary-light dark:bg-primary-dark border-b border-border-light dark:border-border-dark">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} onClick={() => setMenuOpen(false)}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
};

export default Header;
