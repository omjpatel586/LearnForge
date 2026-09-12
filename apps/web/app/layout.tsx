import ContentWrapper from '../views/components/ContentWrapper';
import Footer from '../views/components/Footer';
import Header from '../views/components/Header';
import { ThemeProvider } from '../views/context/ThemeContext';
import { ReduxProvider } from '../views/redux/provider';
import './global.css';

export const metadata = {
  title: {
    default: 'LearnForge — Learn. Build. Share.',
    template: '%s | LearnForge',
  },
  description:
    'LearnForge is a developer-focused learning platform built on one idea: learn by doing. Structured course notes, technical blogs, real-world projects and curated resources — documented openly and shared as the journey happens.',
  applicationName: 'LearnForge',
  keywords: [
    'LearnForge',
    'learn build share',
    'developer learning platform',
    'programming notes',
    'technical blogs',
    'developer projects',
    'coding resources',
    'learn by doing',
    'software engineering',
  ],
  openGraph: {
    title: 'LearnForge — Learn. Build. Share.',
    description:
      'A developer-focused learning platform. Structured course notes, technical blogs, real-world projects and curated resources — learning documented in the open.',
    siteName: 'LearnForge',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LearnForge — Learn. Build. Share.',
    description:
      'A developer-focused learning platform. Learn by doing, build in the open, share what you know.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-body-light dark:bg-body-dark text-text-light dark:text-text-dark">
        <ThemeProvider>
          <ReduxProvider>
            <Header />
            <ContentWrapper>{children}</ContentWrapper>
            <Footer />
          </ReduxProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
