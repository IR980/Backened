const express = require('express');
const cookieParser = require('cookie-parser');
const dns = require('dns');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes')
dns.setServers(['8.8.8.8', '8.8.4.4']);



const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/music',musicRoutes)

module.exports = app;