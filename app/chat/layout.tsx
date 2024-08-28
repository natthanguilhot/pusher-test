import SideBar from "./components/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex gap-4">
			<SideBar />

			<section className="border w-full p-2">{children}</section>
		</div>
	);
}
