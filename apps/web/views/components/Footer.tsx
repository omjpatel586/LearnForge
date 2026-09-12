'use client';

import { FaRegCopyright } from 'react-icons/fa6';
import { IoMdHeart } from 'react-icons/io';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const year = new Date().getFullYear();
  const { theme } = useTheme();

  return (
    <footer className="p-2 bg-primary-light dark:bg-primary-dark border-t border-t-secondary-light dark:border-t-secondary-dark">
      <div className="flex flex-row flex-wrap justify-center items-center gap-2">
        Created By <IoMdHeart color={theme === 'dark' ? 'red' : 'darkred'} />
        <a
          href="https://www.linkedin.com/in/om-j-patel"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold tracking-wider hover:underline"
        >
          OM J Patel
        </a>
        <FaRegCopyright />
        {year}
        <span className="font-semibold tracking-widest">
          <span className="text-secondary-light dark:text-secondary-dark">Learn</span>
          Forge
        </span>
      </div>
    </footer>
  );
};

export default Footer;
