import { useEffect, useState } from "react";
import Loading from "../components/Loading";

export default function Inbox() {
  const [inboxData, setInboxData] = useState([]);

  useEffect(() => {
    console.log("Inbox Items");
    // Simulate data fetching (replace with real fetch request)
    setTimeout(() => {
      setInboxData([
        { id: 1, subject: "Hello!", sender: "john@example.com" },
        { id: 2, subject: "Meeting tomorrow", sender: "susan@example.com" },
      ]);
    }, 1000); // Mock data after 1 second
  }, []);

  if (!inboxData.length) {
    return (
      <div className="h-screen flex justify-center items-center">
        <Loading />
      </div>
    ); // Show loading message if data is not loaded yet
  }

  return (
    <div className="bg-gray-100 min-h-screen min-w-screen"> {/* Ensure it takes full height */}
      <h2>Inbox</h2>
      <ul>
        {inboxData.map((message) => (
          <li key={message.id}>
            <strong>{message.subject}</strong> - {message.sender}
          </li>
        ))}
      </ul>
    </div>
  );
}
