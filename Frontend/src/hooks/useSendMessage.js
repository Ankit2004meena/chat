import { useState } from 'react';
import useConversation from "../zustand/useConversation";
import { toast } from "react-toastify"; // You can keep this if toast is used

const useSendMessage = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	const sendMessage = async (message) => {
		try {
			setLoading(true);
			const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
				method: "POST",
				headers: { "Content-Type": "application/json" }, // Fixed header typo
				body: JSON.stringify({ message }),
			});

			// Await the response data
			const data = await res.json();

			// Check if the request was successful
			if (!res.ok) {
				toast.error("Message not sent");
				console.log("Error data:", data); // For debugging
				return; // Stop execution if there's an error
			}

			// If the message is successfully sent, update messages
			setMessages([...messages, data]);

		} catch (error) {
			console.log("Send message error:", error.message);
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, sendMessage };
};

export default useSendMessage;
