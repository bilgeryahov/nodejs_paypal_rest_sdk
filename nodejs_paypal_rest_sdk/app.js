`use strict`;

const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');

const app = express();

app.set('view_engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

app.listen(3000, () => {
	console.log('Server started at port 3000...');
});

