import http from 'http';

function makeRequest(options, postData = null) {
    return new Promise((resolve, reject) => {
        const req = http.request(options, (res) => {
            let data = '';
            res.on('data', (chunk) => data += chunk);
            res.on('end', () => {
                try {
                    resolve({ statusCode: res.statusCode, body: JSON.parse(data) });
                } catch (e) {
                    resolve({ statusCode: res.statusCode, rawBody: data });
                }
            });
        });
        req.on('error', (err) => reject(err));
        if (postData) req.write(JSON.stringify(postData));
        req.end();
    });
}

async function runTests() {
    console.log('Testing MedGuard AI Backend API...');

    // 1. Health check
    console.log('\n--- 1. Testing GET /api/health ---');
    const health = await makeRequest({
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/health',
        method: 'GET'
    });
    console.log('Health Status Code:', health.statusCode);
    console.log('Health Response:', health.body);

    // 2. Search Panadol
    console.log('\n--- 2. Testing POST /api/search-medicine (Panadol) ---');
    const searchPanadol = await makeRequest({
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/search-medicine',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { query: 'Panadol' });
    console.log('Panadol Status Code:', searchPanadol.statusCode);
    console.log('Panadol Name:', searchPanadol.body?.name);
    console.log('Panadol IsCurated:', searchPanadol.body?.isCuratedData);

    // 3. Search Unknown Medicine
    console.log('\n--- 3. Testing POST /api/search-medicine (Unknown medicine) ---');
    const searchUnknown = await makeRequest({
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/search-medicine',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { query: 'XyzMedicament123' });
    console.log('Unknown Medicine Status Code:', searchUnknown.statusCode);
    console.log('Unknown Result Demo Mode:', searchUnknown.body?.isDemoMode);
    console.log('Demo Banner Text:', searchUnknown.body?.demoBannerText);

    // 4. Packaging Analysis (Clear image base64 simulation)
    console.log('\n--- 4. Testing POST /api/analyze (Image analysis) ---');
    const dummyBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==';
    const analyze = await makeRequest({
        hostname: '127.0.0.1',
        port: 5000,
        path: '/api/analyze',
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    }, { image: dummyBase64, filename: 'clear_panadol_packaging.jpg' });
    console.log('Analyze Status Code:', analyze.statusCode);
    console.log('Risk Level:', analyze.body?.riskLevel);
    console.log('Demo Banner Text:', analyze.body?.demoBannerText);
    console.log('Authenticity Disclaimer:', analyze.body?.authenticityDisclaimer);

    console.log('\n✅ ALL BACKEND TESTS COMPLETED SUCCESSFULY!');
    process.exit(0);
}

runTests().catch(err => {
    console.error('❌ Test failed:', err);
    process.exit(1);
});
