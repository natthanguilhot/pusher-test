"use client";

import { useParams } from "next/navigation";
import Pusher from "pusher-js";
import { useState, useEffect } from "react";

export default function Page() {
	const { id } = useParams();
	const [messages, setMessages] = useState<string[]>([]);
	const [newMsg, setNewMsg] = useState("");

	if (!id || typeof id !== "string") {
		console.error("ID is undefined");
		return <div>Error: ID is undefined</div>;
	}

	useEffect(() => {
		// Pusher.logToConsole = true;

		const pusher = new Pusher("e02c20479381fd817d81", {
			cluster: "eu",
		});

		const channel = pusher.subscribe(id);

		channel.bind("sendMsg", function (data: any) {
			console.log("Listening to the event", data);
			setMessages((prevMessages) => [...prevMessages, data.message]);
		});
		getMessages();

		return () => {
			channel.unbind_all();
			channel.unsubscribe();
		};
	}, [id]);

	async function getMessages() {
		try {
			const response = await fetch("/api/chat", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			console.log("DATA FROM FETCH : ", data);
			setMessages(data.messages);
		} catch (error) {
			console.error("Failed to fetch messages:", error);
		}
	}

	async function sendMsg(): Promise<void> {
		try {
			const response = await fetch("/api/chat", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ message: newMsg, channel: id }),
			});
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			console.log("DATA FROM FETCH : ", data);
			setMessages(data.messages);
			setNewMsg("");
		} catch (error) {
			console.error("Failed to send message:", error);
		}
	}

	return (
		<section className="container mx-auto p-10 m-10 flex flex-col justify-between min-h-full">
			<div>
				{messages.map((message, index) => {
					return <p key={index}>{message}</p>;
				})}
			</div>
			<div className="flex items-center">
				<input value={newMsg} type="text" onChange={(e) => setNewMsg(e.target.value)} className="border rounded-md w-9/12 p-2 h-20" />
				<button onClick={sendMsg} className="ml-2 h-20 p-1 bg-blue-500 rounded-md text-white w-3/12">
					Envoyez le msg
				</button>
			</div>
		</section>
	);
}
