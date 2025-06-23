import React, { useState } from "react";
import API from "../api/axios";
import { LinkedInProfile } from "../types/profile";

const MessageGenerator: React.FC = () => {
  const [profile, setProfile] = useState<LinkedInProfile>({
    name: "",
    job_title: "",
    company: "",
    location: "",
    summary: "",
  });

  const [message, setMessage] = useState("");

  const handleGenerate = async () => {
    const res = await API.post("/personalized-message", profile);
    setMessage(res.data.message);
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        💬 AI Message Generator
      </h2>

      <div className="space-y-3 bg-white shadow p-4 rounded">
        <input
          className="border p-2 w-full"
          placeholder="Name"
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Job Title"
          onChange={(e) =>
            setProfile({ ...profile, job_title: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="Company"
          onChange={(e) => setProfile({ ...profile, company: e.target.value })}
        />
        <input
          className="border p-2 w-full"
          placeholder="Location"
          onChange={(e) => setProfile({ ...profile, location: e.target.value })}
        />
        <textarea
          className="border p-2 w-full"
          placeholder="Summary"
          onChange={(e) => setProfile({ ...profile, summary: e.target.value })}
        />

        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700"
        >
          Generate Message
        </button>
      </div>

      {message && (
        <div className="mt-4 bg-green-50 border border-green-500 text-green-800 p-4 rounded">
          <p className="font-semibold">Generated Message:</p>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default MessageGenerator;
