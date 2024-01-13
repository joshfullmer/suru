import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import '@/globals.css';

export const metadata: Metadata = {
	title: 'Suru',
	description: 'Todo app',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/favicon-16.png" sizes="16x16" />
				<link rel="icon" href="/favicon-32.png" sizes="32x32" />
				<link rel="icon" href="/favicon-96.png" sizes="96x96" />
			</head>
			<body
				className={`${GeistSans.variable} ${GeistMono.variable} min-h-screen bg-slate-900 font-sans text-slate-100`}
			>
				{children}
			</body>
		</html>
	);
}
