const express = require('express') //ovo posto se vrsi na serveru tj server je ne importujemo klasicno import from pa putanja, vec sa require
const router = express.Router()

const app = express()
router.use((req, res, next) => {
	Object.setPrototypeOf(req, app.request)
	Object.setPrototypeOf(req, app.response)
	req.res = res
	res.req = req
	next()
})

router.post('/track-data', (req, res) => {
	console.log('Stored data!', req.body.data) // hajde d ainstaliramo body-parser sa npm install --save bodys-parser i dodacemo ga u nuxt.config.js u serverMiddleware, ali prvo na vru tog fajla da ga dodamo sa require. i ono sto je bitno u nuxt.config.js stvari isto ucitavamo sa require ne sa import je se taj deo izvrsava by node
	res.status(200).json({ message: 'Success!' })
})

module.exports = {
	path: '/api',
	handler: router
}