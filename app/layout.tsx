import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'PathForge AI — Career Intelligence Engine',
  description:
    'Stop guessing your future. PathForge evaluates your grades, goals, budget, and reality to generate three ranked career paths with real institutions and scholarship intelligence.',
  keywords: 'career counselling, JEE, NEET, CLAT, CA, career path, student guidance, India education, scholarship, college recommendation',
  openGraph: {
    title: 'PathForge AI — Forge Your Path',
    description: 'The most intelligent career engine for Indian students. Three paths. Real data. Brutal honesty.',
    type: 'website',
  },
};

// Conditionally import ClerkProvider only when keys are configured
const hasClerkKeys = !!(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY && process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY !== 'pk_test_placeholder');

let ClerkProviderWrapper: React.ComponentType<{ children: React.ReactNode }> | null = null;

if (hasClerkKeys) {
  try {
    const { ClerkProvider } = require('@clerk/nextjs');
    ClerkProviderWrapper = ClerkProvider;
  } catch {
    // Clerk not available — skip
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = (
    <html lang="en" style={{ scrollBehavior: 'smooth' }}>
      <body>
        {children}
        <Footer />
      </body>
    </html>
  );

  if (ClerkProviderWrapper) {
    const Provider = ClerkProviderWrapper;
    return <Provider>{content}</Provider>;
  }

  return content;
}
