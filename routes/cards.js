const express = require('express')
const router = express.Router()
const { data } = require('../data/flashcardData.json')
const { cards } = data

router.get('/', (req, res) => {
    let random = Math.floor(Math.random() * cards.length)
    console.log(random)
    res.redirect(`/cards/${random}`)
})

router.get('/:id', (req, res) => {
    const { side } = req.query
    const { id } = req.params

    if ( !side ) {
        res.redirect(`/cards/${id}?side=question`)
    }
    const name = req.cookies.username
    const text = cards[id][side]
    const { hint }  = cards[id]

    const templateData = { id, text, name }

    if (side === 'question') {
        templateData.hint = hint
        templateData.redirect = 'answer'
    } else if (side === 'answer') {
        templateData.redirect = 'question'
    }

    res.render('card', templateData)
})

module.exports = router