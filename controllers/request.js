const path = require('path')

const Request = require('../models/request')

const validateCurp = (curp) => {
  console.log(curp)
  const options = {
    method: 'GET',
    url: 'https://curp-mexico1.p.rapidapi.com/porCurp/' + curp,
    headers: {
      'x-rapidapi-host': 'curp-mexico1.p.rapidapi.com',
      'x-rapidapi-key': 'SIGN-UP-FOR-KEY',
    },
  }

  axios
    .request(options)
    .then((response) => {
      console.log(response.data)
    })
    .catch((err) => {
      console.error(err)
    })
}

module.exports.createRequest = async (req, res) => {
  try {
    const name = req.body.name
    const lastName = req.body.lastName
    const email = req.body.email
    const curp = req.body.curp
    const enrollment = req.body.enrollment
    const comments = req.body.comments
    const type = req.body.type
    const status = 'pending'

    // validateCurp(curp)

    if (
      (type === 'estudiante' && enrollment.length != 8) ||
      (type === 'docente' && enrollment.length != 6)
    ) {
      throw new Error("Enrollment and type doesn't match")
    }

    const response = await Request.create({
      name,
      lastName,
      email,
      enrollment,
      status,
      comments,
      curp,
      type,
    })

    if (response.errors) {
      throw new Error(response.errors[0].message)
    }

    res.status(201).json({ message: 'Se ha creado correctamente la peticion' })
  } catch (err) {
    res.status(418).json({ message: err.message })
  }
}

module.exports.getAllRequest = async (req, res) => {
  try {
    const requests = await Request.findAll()
    res.status(200).json({ requests })
  } catch (err) {
    res.send(err)
  }
}

module.exports.getRequestStatus = async (req, res) => {
  try {
    const enrollment = req.params.enrollment

    const request = await Request.findOne({ where: { enrollment } })

    if (!request) {
      throw new Error()
    }

    res.status(200).json({
      requestStatus: request.status,
      name: request.name,
      email: request.email,
      enrollment: request.enrollment,
    })
  } catch (err) {
    res.status(200).json({
      message:
        'No se ha encontrado ninguna peticion correspondiente a esa matricula',
    })
  }
}

module.exports.changeRequestStatus = async (req, res) => {
  try {
    const enrollment = req.body.enrollment
    const status = req.body.status

    console.log(enrollment, status)

    if (!(status == 'pending' || status == 'denied' || status == 'acepted')) {
      throw new Error('new status not allowed')
    }

    const request = await Request.findOne({ where: { enrollment } })

    if (!request) {
      res.send('no product found')
    }

    request.status = status

    await request.save()

    res.status(200).json({ message: 'Status has been changed' })
  } catch (err) {
    console.log(err)
    res.status(418).json({ message: 'Something went wrong' })
  }
}

module.exports.deleteRequest = async (req, res) => {
  try {
    const enrollment = req.body.enrollment
    const response = await Request.destroy({ where: { enrollment } })

    res
      .status(200)
      .json({ message: 'The request has been deleted', body: response })
  } catch (err) {
    res.status(418).json({ message: 'Something went wrong' })
  }
}

module.exports.getStatePage = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'estado.html'))
}

module.exports.getRequestPage = (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'solicitar.html'))
}
