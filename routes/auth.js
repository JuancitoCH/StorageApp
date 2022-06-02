const express = require('express')
const Auth = require('../services/auth')
const cookieResponse = require('../libs/cookie')
const { isUser } = require('../middleware/auth')


const auth = (app) => {
    const router = express.Router()
    const authService = new Auth()

    app.use('/api/auth', router)

    router.post('/login', async (req, res) => {
        const response = await authService.login(req.body)
        return cookieResponse(res, response)
    })
    router.post('/register', async (req, res) => {
        const response = await authService.register(req.body)
        return res.json(response)
    })
    router.get('/',isUser,(req,res)=>{
        return res.json({ ...req.userData })
    })
}

module.exports = auth