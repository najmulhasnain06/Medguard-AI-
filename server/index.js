import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import {
  isAlibabaConfigured,
  analyzePackagingWithQwen,
  searchMedicineInfo
} from './services/alibabaQwen.js';
import { CURATED_MEDICINES, findCuratedMedicine } from './data/curatedMedicines.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

// Multer storage in memory to easily convert buffer into base64
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (allowedMimes.includes(file.mimetype.toLowerCase())) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPG, JPEG, PNG, and WEBP images are accepted.'));
    }
  }
});

// ==========================================
// ROUTES
// ==========================================

/**
 * GET /api/health
 * Returns service status, model configuration, and mode info.
 */
app.get('/api/health', (req, res) => {
  const alibabaConfigured = isAlibabaConfigured();
  res.json({
    status: 'ok',
    service: 'MedGuard AI Backend',
    alibaba_api_configured: alibabaConfigured,
    mode: alibabaConfigured ? 'LIVE_ALIBABA_CLOUD' : 'FALLBACK_DEMO_MODE',
    models: {
      vision: process.env.QWEN_VISION_MODEL || 'qwen3-vl-plus',
      text: process.env.QWEN_TEXT_MODEL || 'qwen-plus'
    },
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

/**
 * POST /api/search-medicine
 * Searches medicine records (Panadol, Aspirin, Ibuprofen, Paracetamol, Nuberol Forte, Amoxicillin)
 * or queries Qwen-Plus text model if configured.
 */
app.post('/api/search-medicine', async (req, res) => {
  try {
    const { query = '', lang = 'en' } = req.body;
    const result = await searchMedicineInfo(query, lang);
    res.json(result);
  } catch (error) {
    console.error('[MedGuard AI] Search error:', error);
    res.status(500).json({
      error: 'Failed to search medicine database',
      message: error.message,
      fallbackResults: CURATED_MEDICINES
    });
  }
});

/**
 * POST /api/analyze
 * Accepts uploaded packaging image (JPG, JPEG, PNG, WEBP),
 * converts to base64, and invokes Alibaba Qwen3-VL-Plus vision model
 * or fallback demo mode.
 */
app.post('/api/analyze', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: 'Missing image file',
        message: 'Please upload a medicine packaging image (JPG, JPEG, PNG, or WEBP).'
      });
    }

    const { medicineName = '', notes = '', lang = 'en' } = req.body;
    const mimeType = req.file.mimetype;
    const base64Data = req.file.buffer.toString('base64');
    const base64DataUri = `data:${mimeType};base64,${base64Data}`;

    const analysis = await analyzePackagingWithQwen({
      base64DataUri,
      medicineName,
      notes,
      originalname: req.file.originalname,
      lang
    });

    res.json(analysis);
  } catch (error) {
    console.error('[MedGuard AI] Analysis route error:', error);
    res.status(500).json({
      error: 'Analysis processing failed',
      message: error.message
    });
  }
});

// Multer error handling middleware
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({
        error: 'File too large',
        message: 'The uploaded file exceeds the 10MB limit.'
      });
    }
    return res.status(400).json({ error: 'Upload Error', message: err.message });
  } else if (err) {
    return res.status(400).json({ error: 'Upload Rejected', message: err.message });
  }
  next();
});

// Serve frontend build in production if available
const distPath = path.join(__dirname, '..', 'dist');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(` MedGuard AI Server running on port ${PORT}`);
  console.log(` Health check: http://localhost:${PORT}/api/health`);
  console.log(` Alibaba API Configured: ${isAlibabaConfigured()}`);
  console.log(` Mode: ${isAlibabaConfigured() ? 'LIVE (Alibaba Qwen)' : 'DEMO MODE (Fallback Simulation)'}`);
  console.log(`===============================================`);
});

export default app;
