const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    const name = req.cookies.username
    if (!name) {
        res.redirect('/hello')
    } else {
        res.render('index', {
            name
        })
    }
})

router.get('/hello', (req, res) => {
    if (req.cookies.username) {
        res.redirect('/')
    } else {
        res.render('hello')
    }
})

router.post('/hello', (req, res) => {
    res.cookie('username', req.body.username)
    res.redirect('/')
})

router.post('/goodbye', (req, res) => {
    res.clearCookie('username')
    res.redirect('/hello')
})

router.get('/sandbox', (req, res) => {
    const nameData = [
        {
            first: 'Skyler',
            last: 'Rivera'
        },
        {
            first: 'Cam',
            last: 'Adrian'
        },
        {
            first: 'Cam',
            last: 'Nelson'
        },
        {
            first: 'John',
            last: 'Monley'
        },
        {
            first: 'Travis',
            last: 'Lawrence'
        },
    ]

    res.render('sandbox', {
        title: `Names`,
        data: nameData
    })
})

module.exports = router