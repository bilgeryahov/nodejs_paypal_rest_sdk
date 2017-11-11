`use strict`;

const express = require('express');
const ejs = require('ejs');
const paypal = require('paypal-rest-sdk');
const config = require('./config.json');

paypal.configure({
	'mode': config.environment,
	'client_id': config.clientID,
	'client_secret': config.clientSecret
});

const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index');
});

app.post('/pay', (req, res) => {
	const create_payment_json = {
		"intent": "sale",
		"payer": {
			"payment_method": "paypal"
		},
		"redirect_urls": {
			"return_url": "http://localhost:3000/success",
			"cancel_url": "http://localhost:3000/cancel"
		},
		"transactions": [{
			"item_list": {
				"items": [{
					"name": "item",
					"sku": "item",
					"price": "2.00",
					"currency": "EUR",
					"quantity": 1
				}]
			},
			"amount": {
				"currency": "EUR",
				"total": "2.00"
			},
			"description": "This is the payment description."
		}]
	};

	paypal.payment.create(create_payment_json, function (error, payment) {
		if (error) {
			throw error;
		}
		else{
			console.log("Create Payment Response");
			console.log(payment);
			res.send('test');
		}
	});
});

app.listen(3000, () => {
	console.log('Server started at port 3000...');
});