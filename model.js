const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CredentialsSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

const Credentials = mongoose.model("Credential", CredentialsSchema);
module.exports = Credentials;
