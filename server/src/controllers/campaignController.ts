import { Request, Response } from 'express';
import Campaign from '../models/Campaign';

export const getCampaigns = async (req: Request, res: Response) => {
    const campaigns = await Campaign.find({ status: { $ne: 'deleted' } });
    res.json(campaigns);
};

export const getCampaign = async (req: Request, res: Response) => {
    const campaign = await Campaign.findById(req.params.id);
    res.json(campaign);
};

export const createCampaign = async (req: Request, res: Response) => {
    const newCampaign = new Campaign(req.body);
    await newCampaign.save();
    res.status(201).json(newCampaign);
};

export const updateCampaign = async (req: Request, res: Response) => {
    const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
};

export const deleteCampaign = async (req: Request, res: Response) => {
    const deleted = await Campaign.findByIdAndUpdate(req.params.id, { status: 'deleted' }, { new: true });
    res.json(deleted);
};
