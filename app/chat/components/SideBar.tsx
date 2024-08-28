import Link from "next/link";

export default function SideBar() {
	const chatList = ["123", "456"];
	return (
		<>
			<section className="w-40 border p-2">
				<ul>
					{chatList.map((chat) => {
						return (
							<li key={chat}>
								<Link href={`/chat/${chat}`}>
									<h1>{chat}</h1>
								</Link>
							</li>
						);
					})}
				</ul>
			</section>
		</>
	);
}
