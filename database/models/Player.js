const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const Schema = mongoose.Schema

const playerSchema = new Schema({
    username: {type: String, min: 8, max: 100, required: true, unique: true},
    email: {type: String, min: 8, max: 100, required: true, unique: true},
    password: { type: String, required: true},
    games: [{type: Schema.ObjectId, ref: 'Game'}],
    last_updated: {type: Date, default: Date.now },
})

playerSchema.methods.generateToken = function () {
    const payload = { _id: this._id, email: this.email, username: this.username }
    const secretKey = process.env.JWT_SECRET
    const token = jwt.sign(payload, secretKey)
    return token
}

const Player = mongoose.model('Player', playerSchema)

module.exports = Player