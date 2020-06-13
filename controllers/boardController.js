const Game = require('../database/models/Game')
const Player = require('../database/models/Player')

exports.find_all = async (req, res) => {
    const allGames = await Game.find().populate('player', '_id username email')
    res.json(allGames)
}

exports.create_one = async (req, res) => {
    const { player, chosenPokemonId, adversaryPokemonId, winner } = req.body
    if (!player || !chosenPokemonId || !adversaryPokemonId || typeof winner !== 'boolean') return res.status(400).send('Missing information to save a game')

    let newGame = new Game({
        player,
        chosenPokemonId,
        adversaryPokemonId,
        winner
    })

    try {
        await newGame.save()
        await Player.findByIdAndUpdate(player, { $push: { games: newGame._id } })
    } catch (err) {
        console.error(err)
    }

    res.json(newGame)
}