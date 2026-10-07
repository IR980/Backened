const express = require('express');
const authRoutes = require('./routes/auth.routes');
const postRoutes = require('./routes/post.routes');
const cookieParser = require('cookie-parser');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const app = express();
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRoutes);   // api/auth is a prefix for all the routes defined in authRoutes. For example, the register route will be accessible at /api/auth/register.
app.use('/api/posts', postRoutes);  // api/posts is a prefix for all the routes defined in postRoutes. For example, the create post route will be accessible at /api/posts/create.
module.exports = app;