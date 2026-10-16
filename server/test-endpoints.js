// Local test script for MedGuard AI backend endpoints
// Run with: node server/test-endpoints.js or npm run test:backend

import http from 'http';
import app from './index.js';

// Minimal 1x1 valid PNG binary buffer for image upload test
const TINY_PNG_BUFFER = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

const TEST_PORT = 5099;

async function runTests() {
  console.log('\n========================================');
  console.log('🧪 Starting MedGuard AI Backend Tests');
  console.log('========================================\n');

  const server = http.createServer(app);
  await new Promise((resolve) => server.listen(TEST_PORT, resolve));
  const baseUrl = `http://localhost:${TEST_PORT}`;

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // ----------------------------------------------------
    // Test 1: GET /api/health
    // ----------------------------------------------------
    console.log('Test 1: GET /api/health');
    const healthRes = await fetch(`${baseUrl}/api/health`);
    assert(healthRes.status === 200, 'Health endpoint returns HTTP 200');
    const healthData = await healthRes.json();
    assert(healthData.status === 'ok', 'Health status is "ok"');
    assert('alibaba_api_configured' in healthData, 'Health reports alibaba_api_configured');
    assert(healthData.models?.vision === 'qwen3-vl-plus', 'Vision model is qwen3-vl-plus');
    assert(healthData.models?.text === 'qwen-plus', 'Text model is qwen-plus');

    // ----------------------------------------------------
    // Test 2: POST /api/search-medicine (Panadol query)
    // ----------------------------------------------------
    console.log('\nTest 2: POST /api/search-medicine (query="panadol")');
    const searchRes = await fetch(`${baseUrl}/api/search-medicine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: 'panadol', lang: 'en' })
    });
    assert(searchRes.status === 200, 'Search returns HTTP 200');
    const searchData = await searchRes.json();
    assert(Array.isArray(searchData.results), 'Search returns results array');
    const hasPanadol = searchData.results.some(m => m.id === 'panadol');
    assert(hasPanadol, 'Search results include Panadol (500mg)');
    if (hasPanadol) {
      const panadol = searchData.results.find(m => m.id === 'panadol');
      assert(Array.isArray(panadol.packagingSecurityFeatures), 'Panadol includes packaging security features');
      assert(Boolean(panadol.safetyWarning), 'Panadol includes safety warning');
      assert(Boolean(panadol.nameUrdu), 'Panadol includes Urdu name');
    }

    // ----------------------------------------------------
    // Test 3: POST /api/search-medicine (Empty query - all 6 curated)
    // ----------------------------------------------------
    console.log('\nTest 3: POST /api/search-medicine (Empty query returns curated database)');
    const allSearchRes = await fetch(`${baseUrl}/api/search-medicine`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: '', lang: 'en' })
    });
    const allSearchData = await allSearchRes.json();
    assert(allSearchData.results.length >= 6, 'Empty search returns at least 6 curated medicines');
    const requiredMeds = ['panadol', 'aspirin', 'ibuprofen', 'paracetamol', 'nuberol-forte', 'amoxicillin'];
    const foundAll = requiredMeds.every(id => allSearchData.results.some(m => m.id === id));
    assert(foundAll, 'All 6 required medicines present: Panadol, Aspirin, Ibuprofen, Paracetamol, Nuberol Forte, Amoxicillin');

    // ----------------------------------------------------
    // Test 4: POST /api/analyze (Image Upload)
    // ----------------------------------------------------
    console.log('\nTest 4: POST /api/analyze (Multipart image upload)');
    const boundary = '----WebKitFormBoundaryMedGuardTest' + Date.now();
    const crlf = '\r\n';

    let bodyBuffer = Buffer.concat([
      Buffer.from(
        `--${boundary}${crlf}` +
        `Content-Disposition: form-data; name="medicineName"${crlf}${crlf}` +
        `Panadol 500mg${crlf}` +
        `--${boundary}${crlf}` +
        `Content-Disposition: form-data; name="lang"${crlf}${crlf}` +
        `en${crlf}` +
        `--${boundary}${crlf}` +
        `Content-Disposition: form-data; name="image"; filename="sample_panadol.png"${crlf}` +
        `Content-Type: image/png${crlf}${crlf}`
      ),
      TINY_PNG_BUFFER,
      Buffer.from(`${crlf}--${boundary}--${crlf}`)
    ]);

    const analyzeRes = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': String(bodyBuffer.length)
      },
      body: bodyBuffer
    });

    assert(analyzeRes.status === 200, 'Analyze endpoint returns HTTP 200');
    const analyzeData = await analyzeRes.json();
    assert(Boolean(analyzeData.riskLevel), `Risk level returned: ${analyzeData.riskLevel}`);
    const validRisks = ['LOW_CONCERN', 'NEEDS_VERIFICATION', 'HIGH_CONCERN'];
    assert(validRisks.includes(analyzeData.riskLevel), 'Risk level is valid enum (LOW_CONCERN, NEEDS_VERIFICATION, HIGH_CONCERN)');
    assert(Array.isArray(analyzeData.checklist) && analyzeData.checklist.length > 0, 'Packaging checklist provided');
    assert(Array.isArray(analyzeData.disclaimers) && analyzeData.disclaimers.length >= 2, 'Safety disclaimers present');
    assert('isDemo' in analyzeData, `Simulation flag isDemo=${analyzeData.isDemo}`);

    // ----------------------------------------------------
    // Test 5: POST /api/analyze without file (Validation error)
    // ----------------------------------------------------
    console.log('\nTest 5: POST /api/analyze without file (Expect 400)');
    const emptyAnalyzeRes = await fetch(`${baseUrl}/api/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert(emptyAnalyzeRes.status === 400, 'Missing file properly returns HTTP 400 Bad Request');

  } catch (err) {
    console.error('Unhandled test runner error:', err);
    failed++;
  } finally {
    await new Promise((resolve) => server.close(resolve));
    console.log('\n========================================');
    console.log(`Results: ${passed} passed, ${failed} failed`);
    console.log('========================================\n');
    process.exit(failed > 0 ? 1 : 0);
  }
}

runTests();
