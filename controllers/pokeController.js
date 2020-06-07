const pokedex = require('../database/pokedex.json')

exports.find_all = (req, res) => {
    res.json(pokedex)
}

exports.find_one = (req, res) => {
    const { id } = req.params
    const pokemon = pokedex.find(p => p.id === parseInt(id,10))
    if (!pokemon) return res.status(404).send('There\'s no Pokemon with this ID')
    res.json(pokemon)
}

exports.find_one_and_filter = (req, res) => {
    const { id, info } = req.params
    const possibleInfo = ['name', 'type', 'base']
    const pokemon = pokedex.find(p => p.id === parseInt(id,10))
    if (!pokemon) return res.status(404).send('There\'s no Pokemon with this ID')
    if (!info || !possibleInfo.some(i => i === info)) return res.status(400).send('Info required must match name / type or base')
    res.json(pokemon[info])
}