const Player = require('../database/models/Player')
const bcrypt = require('bcrypt')

exports.register = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).send('You must submit a username, an email and a password for a player creation')

    let player = await Player.findOne({ email })
    if (player) return res.status(400).send('This player already exists')

    player = new Player({ username, email, password: await bcrypt.hash(password, 10) })
    await player.save()

    res.set('x-auth-token', player.generateToken()).json({
        _id: player._id,
        email: player.email
      })
}

exports.login = async (req, res) => {
    const { email, password } = req.body;

    let player = await Player.findOne({ email })
    if (!player) return res.status(400).send('Invalid request')

    const match = await bcrypt.compare(password, player.password)
    if (!match) return res.status(400).send('Invalid credentials')

    const token = player.generateToken()
    res.set('x-auth-token', player.generateToken()).send('Login success')
}

exports.me = async (req, res) => {
    let player = await Player.findOne({ email: req.player.email }).populate('games')
    if (!player) return res.status(400).send('Invalid request')
    res.send({
        username: player.username,
        email: player.email,
        games: player.games
    })
}
