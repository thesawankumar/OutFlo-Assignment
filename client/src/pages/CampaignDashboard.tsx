import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { Campaign } from "../types/campaign";

const CampaignDashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    name: "",
    description: "",
    leads: [],
    accountIDs: [],
  });

  const fetchCampaigns = async () => {
    const res = await API.get("/campaigns/all");
    setCampaigns(res.data);
  };

  const handleCreate = async () => {
    await API.post("/campaigns/create", newCampaign);
    fetchCampaigns();
  };

  const handleStatusToggle = async (
    id: string,
    status: "active" | "inactive"
  ) => {
    await API.put(`/campaigns/${id}`, { status });
    fetchCampaigns();
  };

  const handleDelete = async (id: string) => {
    await API.delete(`/campaigns/${id}`);
    fetchCampaigns();
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        📊 Campaign Dashboard
      </h2>

      <div className="bg-white shadow p-4 rounded mb-6 space-y-2">
        <h3 className="font-semibold">Create New Campaign</h3>
        <input
          className="border p-2 w-full"
          placeholder="Name"
          onChange={(e) =>
            setNewCampaign({ ...newCampaign, name: e.target.value })
          }
        />
        <input
          className="border p-2 w-full"
          placeholder="Description"
          onChange={(e) =>
            setNewCampaign({ ...newCampaign, description: e.target.value })
          }
        />
        <button
          onClick={handleCreate}
          className="bg-blue-600 text-white px-4 py-2 rounded mt-2 hover:bg-blue-700"
        >
          Create
        </button>
      </div>

      <ul className="space-y-4">
        {campaigns.map((c) => (
          <li
            key={c._id}
            className="bg-white shadow p-4 rounded flex justify-between items-center"
          >
            <div>
              <p className="font-bold">{c.name}</p>
              <p className="text-sm text-gray-600">{c.description}</p>
              <p className="text-xs mt-1">
                Status:{" "}
                <span
                  className={`capitalize font-semibold ${
                    c.status === "active" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {c.status}
                </span>
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() =>
                  handleStatusToggle(
                    c._id!,
                    c.status === "active" ? "inactive" : "active"
                  )
                }
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Toggle
              </button>
              <button
                onClick={() => handleDelete(c._id!)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignDashboard;
