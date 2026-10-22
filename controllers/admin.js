const path = require('path')
const bcrypt = require('bcrypt')

require('dotenv').config()

const Admin = require('../models/admin')

module.exports.getLogin = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'login.html'))
}

module.exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email
    const password = req.body.password

    console.log(req.body)

    const admin = await Admin.findOne({ where: { email: email } })

    const passwordHashed = admin.password

    const passwordConfirmation = await bcrypt.compare(password, passwordHashed)
    if (!passwordConfirmation) {
      throw new Error()
    }

    res.sendFile(path.join(__dirname, '..', 'views', 'admin.html'))
  } catch (err) {
    console.log(err)
    res.sendFile(path.join(__dirname, '..', 'views', '404.html'))
  }
}
