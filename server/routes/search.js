import express from 'express';
import { findCuratedMedicine } from '../data/curatedMedicines.js';
import { isQwenConfigured, searchMedicineWithQwen } from '../services/qwenService.js';
import { getMockMedicineSearch } from '../services/mockService.js';

const router = express.Router();

router.post('/search-medicine', async (req, res) => {
    try {
        const { query } = req.body || {};

        if (!query || typeof query !== 'string' || query.trim() === '') {
            return res.status(400).json({
                error: true,
                message: 'Please provide a valid medicine name to search.',
                messageUrdu: 'براہِ کرم تلاش کے لیے دوا کا نام درج کریں۔'
            });
        }

        const trimmedQuery = query.trim();

        // 1. Check local curated reference database
        const localMatch = findCuratedMedicine(trimmedQuery);
        if (localMatch) {
            return res.status(200).json({
                ...localMatch,
                isCuratedData: true,
                dataOriginNote: "Curated Pakistani Reference Data"
            });
        }

        // 2. Query Qwen AI service if API key configured
        if (isQwenConfigured()) {
            try {
                const qwenResult = await searchMedicineWithQwen(trimmedQuery);
                return res.status(200).json({
                    ...qwenResult,
                    isCuratedData: false,
                    dataOriginNote: "AI-Generated Educational Reference"
                });
            } catch (qwenError) {
                console.warn(`[Qwen Search Warning] Falling back to Demo Mode: ${qwenError.message}`);
                const mockResult = getMockMedicineSearch(trimmedQuery);
                return res.status(200).json({
                    ...mockResult,
                    isCuratedData: false,
                    dataOriginNote: "Demo Simulation (Fallback)"
                });
            }
        }

        // 3. Default to safe Demo Mode simulation if API key not present
        const mockResult = getMockMedicineSearch(trimmedQuery);
        return res.status(200).json({
            ...mockResult,
            isCuratedData: false,
            dataOriginNote: "Demo Simulation"
        });

    } catch (error) {
        console.error('[Search API Error]:', error);
        return res.status(500).json({
            error: true,
            message: 'Something went wrong while searching medicine information. Please try again.',
            messageUrdu: 'دوا کا تلاش کرتے ہوئے مسئلہ پیش آیا۔ براہِ کرم دوبارہ کوشش کریں۔'
        });
    }
});

export default router;
