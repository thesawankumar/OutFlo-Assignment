import express from 'express';
import {
    getCampaigns,
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign
} from "../controllers/campaignController";

const router = express.Router();

router.get('/all', getCampaigns);
router.get('/:id', getCampaign);
router.post('/create', createCampaign);
router.put('/:id', updateCampaign);
router.delete('/:id', deleteCampaign);

export default router;
