import express from 'express';
import multer from 'multer';
import { isQwenConfigured, analyzePackagingWithQwen } from '../services/qwenService.js';
import { getMockPackagingAnalysis } from '../services/mockService.js';

const router = express.Router();

// Memory storage for multer file uploads
const upload = multer({
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files (JPG, JPEG, PNG, WEBP) are supported.'));
        }
    }
});

router.post('/analyze', upload.single('image'), async (req, res) => {
    try {
        let imageBase64 = null;
        let mimeType = 'image/jpeg';
        let originalName = 'uploaded_image.jpg';

        // Handle multipart form upload OR base64 JSON payload
        if (req.file) {
            imageBase64 = req.file.buffer.toString('base64');
            mimeType = req.file.mimetype;
            originalName = req.file.originalname || originalName;
        } else if (req.body && req.body.image) {
            const rawImage = req.body.image;
            originalName = req.body.filename || originalName;
            if (rawImage.includes(';base64,')) {
                const parts = rawImage.split(';base64,');
                mimeType = parts[0].replace('data:', '');
                imageBase64 = parts[1];
            } else {
                imageBase64 = rawImage;
            }
        }

        if (!imageBase64) {
            return res.status(400).json({
                error: true,
                message: 'No packaging image provided. Please upload a clear photo of the medicine packaging.',
                messageUrdu: 'دوا کی کوئی تصوير فراہم نہیں کی گئی۔ براہِ کرم دوا کی پیکنگ کی صاف تصویر اپ لوڈ کریں۔'
            });
        }

        // Call Qwen Vision model if configured
        if (isQwenConfigured()) {
            try {
                const qwenAnalysis = await analyzePackagingWithQwen(imageBase64, mimeType);
                return res.status(200).json(qwenAnalysis);
            } catch (visionError) {
                console.warn(`[Qwen Vision Warning] Falling back to Demo Mode: ${visionError.message}`);
                const mockAnalysis = getMockPackagingAnalysis(originalName);
                return res.status(200).json(mockAnalysis);
            }
        }

        // Default to safe Demo Mode simulation if API key not present
        const mockAnalysis = getMockPackagingAnalysis(originalName);
        return res.status(200).json(mockAnalysis);

    } catch (error) {
        console.error('[Analyze API Error]:', error);
        return res.status(500).json({
            error: true,
            message: 'Something went wrong while analyzing the medicine packaging. Please try again.',
            messageUrdu: 'دوا کی پیکنگ کا تجزیہ کرتے ہوئے مسئلہ پیش آیا۔ براہِ کرم دوبارہ کوشش کریں۔'
        });
    }
});

export default router;
