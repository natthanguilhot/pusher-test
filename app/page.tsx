"use client";
import Pusher from "pusher-js";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
	const [messages, setMessages] = useState<string[]>([]);
	const [newMsg, setNewMsg] = useState("");

	// useEffect(() => {
	// 	// Enable pusher logging - don't include this in production
	// 	Pusher.logToConsole = true;

	// 	const pusher = new Pusher("e02c20479381fd817d81", {
	// 		cluster: "eu",
	// 	});
	// 	const channelName = "123";
	// 	const channel = pusher.subscribe(channelName);

	// 	channel.bind("sendMsg", function (data: any) {
	// 		console.log("Listening the event", data);
	// 		setMessages((prevMessages) => [...prevMessages, data.message]);
	// 	});

	// 	// Clean up function to unsubscribe from the channel when the component unmounts
	// 	return () => {
	// 		channel.unbind_all();
	// 		channel.unsubscribe();
	// 	};
	// }, []);

	async function t(): Promise<any> {
		const response = await fetch("/api/chat", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ message: newMsg, channel: "123" }),
		});
		const data = await response.json();
		console.log("DATA FROM FETCH : ", data);
		setMessages(data.messages);
		setNewMsg("");
	}

	return (
		<div>
			<Button>
				<Link href="/chat" className="">
					Go chat
				</Link>
			</Button>
		</div>
	);
}
