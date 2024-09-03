const express = require('express')
const credentialsManager = require('./controller')

const app = express()

app.listen(8000)

app.post('/login', (req, res) => {
	if (req.query.email && req.query.password) {
		credentialsManager.login(req.query.email, req.query.password)
			.then((response) => {
				res.json({response: "login successful"})
			})
			.catch((err) => {
				console.log(err)
				res.json({response: "login failed"})
			})
	}else {
		console.log(req)
		res.json({error: "email or password not entered"})
	}

})

app.post('/signup', (req, res) => {
	const email = req.query.email;
	const password = req.query.password;
	console.log(password)

	credentialsManager.signup(email, password)
		.then((res) => {
			res.json({response: "signup successful"})
		})
		.catch((err) => {
			res.json({error: err})
		})

})
