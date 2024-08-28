import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
	title: "Chat app using Pusher !",
	description: "Chat app using Pusher !",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className="container mx-auto p-10 m-10 border-x">{children}</body>
		</html>
	);
}
