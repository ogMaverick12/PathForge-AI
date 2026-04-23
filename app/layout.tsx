import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PathForge AI — Personal Career Decision Engine',
  description:
    'Stop guessing your future. PathForge AI evaluates your goals, constraints, and reality to generate personalized, actionable career paths for students in India and globally.',
  keywords: 'career counselling, JEE, NEET, UPSC, career path, student guidance, India education',
  openGraph: {
    title: 'PathForge AI — Forge Your Path',
    description: 'The most intelligent career engine for Indian students.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
