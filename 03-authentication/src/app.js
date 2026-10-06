const express = require('express');
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const app = express();
app.use(express.json());

module.exports = app;