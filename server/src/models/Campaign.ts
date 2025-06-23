// src/models/Campaign.ts
import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: String,
    status: { type: String, enum: ['active', 'inactive', 'deleted'], default: 'active' },
    leads: [String],
    accountIDs: [String],
}, { timestamps: true });

export default mongoose.model("Campaign", campaignSchema);
