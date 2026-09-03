import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import healthRouter from './routes/health.js';
import searchRouter from './routes/search.js';
import analyzeRouter from './routes/analyze.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || '*';

// Security & Middleware
app.use(cors({
    origin: FRONTEND_ORIGIN === '*' ? true : FRONTEND_ORIGIN,
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Mount API Routes
app.use('/api', healthRouter);
app.use('/api', searchRouter);
app.use('/api', analyzeRouter);

// 404 Route Handler
app.use((req, res) => {
    res.status(404).json({
        error: true,
        message: `API endpoint '${req.originalUrl}' not found on MedGuard AI server.`
    });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('[MedGuard Server Error]:', err);
    res.status(500).json({
        error: true,
        message: err.message || 'Internal server error occurred.'
    });
});

// Start Express Listener
app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`🛡️ MedGuard AI Backend Service running on port ${PORT}`);
    console.log(`GET  http://localhost:${PORT}/api/health`);
    console.log(`POST http://localhost:${PORT}/api/search-medicine`);
    console.log(`POST http://localhost:${PORT}/api/analyze`);
    console.log(`====================================================`);
});
