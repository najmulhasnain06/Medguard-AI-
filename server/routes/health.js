import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        service: 'MedGuard AI',
        version: '1.0.0',
        timestamp: new Date().toISOString()
    });
});

export default router;
