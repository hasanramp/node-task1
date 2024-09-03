require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const Credentials = require('./model')

const password = process.env.PASSWORD
const dbURI = `mongodb+srv://node_project_user:${password}@cluster0.fszmfbt.mongodb.net/credentials?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(dbURI)

let CredentialsManager = new function() {
	return {
		signup: function(email, password) {

			return new Promise((resolve, reject) => {
				Credentials.find({email: email})
					.then((res) => {
						if (res.length === 0) {
							bcrypt.hash(password, 2, function(err, hash) {
								const credentials = new Credentials({
									email: email,
									password: hash
								})
								credentials.save()
									.then((res) => {
										resolve(true)
									}) 
									.catch((err) => {
										console.log(err)
										reject("could not save credentials")
									})
							});			
						}else {
							reject("email already exists")
						}
					})

			})
		},
		login: function(email, password) {
			return new Promise((resolve, reject) => {
				Credentials.find({email: email})
					.then((res) => {
						bcrypt.compare(password, res[0].password, (err, result) => {
							console.log(result)
							resolve(result)
						})
					})
					.catch((err) => {
						console.log(email)
						console.log('email id not found')
						reject(err)
					})
				})
		}
	}	
}


module.exports = CredentialsManager
