import { NextResponse } from "next/server";
import Pusher from "pusher";

const pusher = new Pusher({
	appId: "1822394",
	key: "e02c20479381fd817d81",
	secret: "0cc6fe7738a1d8f013f8",
	cluster: "eu",
	useTLS: true,
});

let messages: string[] = [];

export async function POST(req: Request) {
	try {
		const data = await req.json();

		messages.push(data.message);

		const pusherResponse = await pusher.trigger(data.channel, "sendMsg", {
			message: data.message,
		});

		if (pusherResponse) {
			// Simulate sending an email notification
			sendEmailNotification(data.message);
			return NextResponse.json({ status: "ok", message: "Message received and notification sent", messages });
		} else {
			return NextResponse.json({ status: "error", message: "Message received but failed to trigger pusher", messages });
		}
	} catch (err) {
		console.log(err);
		return NextResponse.json({ status: "error", err });
	}
}

export async function GET(req: Request) {
	try {
		return NextResponse.json({ status: "ok", message: "Message received and notification sent", messages });
	} catch (err) {
		console.log(err);
		return NextResponse.json({ status: "error", err });
	}
}

// Simulated email notification function
function sendEmailNotification(message: string) {
	console.log(`Sending email notification for message: ${message}`);
	// Here you would integrate with an email service provider like SendGrid, Mailgun, etc.
}
