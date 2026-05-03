const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const cors = require('cors');

const app = express();
const PORT = 3000;

// ============ SECURITY MIDDLEWARE ============
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            styleSrc: ["'self'", "'unsafe-inline'"],
            imgSrc: ["'self'", "data:"],
        },
    },
    hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
}));

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001'],
    credentials: true,
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: { error: 'Too many requests' }
});
app.use('/api', limiter);

app.use(express.json());
app.use(express.static('public'));

// ============ DATABASE SETUP ============
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT, email TEXT, role TEXT)`);
    db.run(`CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL)`);
    
    const users = [
        [1, 'admin', 'admin123', 'admin@example.com', 'administrator'],
        [2, 'john_doe', 'password123', 'john@example.com', 'user'],
        [3, 'jane_smith', 'qwerty456', 'jane@example.com', 'user']
    ];
    users.forEach(u => db.run(`INSERT INTO users VALUES (?, ?, ?, ?, ?)`, u));
    
    const products = [
        [1, 'Laptop', 999.99],
        [2, 'Mouse', 29.99],
        [3, 'Keyboard', 79.99]
    ];
    products.forEach(p => db.run(`INSERT INTO products VALUES (?, ?, ?)`, p));
});

// ============ API KEY AUTHENTICATION (WEEK 4) ============
const API_KEYS = new Map([
    ['dev-api-key-123', { name: 'Developer', role: 'admin' }],
    ['test-api-key-456', { name: 'Tester', role: 'user' }]
]);

const authenticate = (req, res, next) => {
    const apiKey = req.header('X-API-Key');
    if (!apiKey) return res.status(401).json({ error: 'API Key required' });
    const client = API_KEYS.get(apiKey);
    if (!client) return res.status(403).json({ error: 'Invalid API Key' });
    req.client = client;
    next();
};

// ============ SECURE ENDPOINTS (WEEK 4) ============
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString(), security: 'CSP, HSTS, Rate Limited' });
});

app.get('/api/users', authenticate, (req, res) => {
    db.all(`SELECT id, username, email, role FROM users`, [], (err, users) => {
        res.json({ users, accessedBy: req.client.name });
    });
});

// ============ VULNERABLE SQL INJECTION DEMO (WEEK 5) ============
app.get('/api/vulnerable/login', (req, res) => {
    const { username, password } = req.query;
    // DANGER: SQL INJECTION VULNERABILITY!
    const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    
    db.get(query, (err, user) => {
        if (err) return res.json({ vulnerable: true, error: err.message, query });
        res.json({ vulnerable: true, success: !!user, query, user });
    });
});

// ============ SECURE VERSION (PREPARED STATEMENTS) ============
app.get('/api/secure/login', (req, res) => {
    const { username, password } = req.query;
    const query = `SELECT * FROM users WHERE username = ? AND password = ?`;
    
    db.get(query, [username, password], (err, user) => {
        if (err) return res.json({ secure: true, error: err.message });
        res.json({ secure: true, success: !!user, user });
    });
});

// ============ SECURITY HEADERS INFO ============
app.get('/api/security-headers', (req, res) => {
    res.json({
        activeHeaders: [
            'Content-Security-Policy (CSP)',
            'Strict-Transport-Security (HSTS)',
            'X-Frame-Options: DENY',
            'X-Content-Type-Options: nosniff',
            'X-XSS-Protection: 1; mode=block',
            'RateLimit: 100 requests/15min'
        ]
    });
});

app.listen(PORT, () => {
    console.log(`
╔══════════════════════════════════════════════════════════════╗
║     🔐 CYBERSECURITY DEMO PROJECT - ALL WEEKS COMBINED       ║
╠══════════════════════════════════════════════════════════════╣
║  📍 Server: http://localhost:${PORT}                              ║
║                                                              ║
║  🔒 SECURE ENDPOINTS (Week 4):                               ║
║    GET  /api/health                                          ║
║    GET  /api/users (requires API key)                        ║
║    GET  /api/security-headers                                ║
║                                                              ║
║  🐛 VULNERABLE DEMO (Week 5):                                ║
║    GET  /api/vulnerable/login?username=admin&password=admin123║
║    TRY SQL INJECTION: ?username=' OR '1'='1' --              ║
║                                                              ║
║  ✅ SECURE VERSION (Week 5):                                 ║
║    GET  /api/secure/login?username=admin&password=admin123   ║
║                                                              ║
║  🛡️ SECURITY AUDITS (Week 6):                                ║
║    Reports available in /audit-reports/                      ║
║                                                              ║
║  🌐 Web Interface: http://localhost:${PORT}                      ║
╚══════════════════════════════════════════════════════════════╝
    `);
});
