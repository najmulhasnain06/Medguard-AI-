import http from 'http';

http.get('http://localhost:5173', (res) => {
    console.log('Frontend Dev Server Status Code:', res.statusCode);
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        console.log('Frontend Document Title Present:', data.includes('<title>MedGuard AI'));
        console.log('React Root Element Present:', data.includes('id="root"'));
        process.exit(0);
    });
}).on('error', (err) => {
    console.error('Frontend HTTP error:', err);
    process.exit(1);
});
