const bcrypt = require('bcrypt')

const Admin = require('./models/admin')
const Request = require('./models/request')

const initialData = async () => {
  try {
    await Admin.findOne({ where: { email: 'admin@admin.com' } })

    const pass = await bcrypt.hash('admin', 12)

    await Admin.create({
      email: 'admin@admin.com',
      password: pass,
    })
    await Request.create({
      name: 'Temo',
      lastName: 'Sanchez',
      email: 'batemo4912@gmail.com',
      enrollment: '39198596',
      status: 'pending',
      comments: 'Soy estudinate de ing software',
      curp: 'MAHJ280603MSPRRV09',
      type: 'estudiante',
    })
    await Request.create({
      name: 'Bryan',
      lastName: 'Dominguez',
      email: 'soyelbryan@gmail.com',
      enrollment: '987652',
      status: 'pending',
      comments: 'Soy profesor de la materia de poo2',
      curp: 'ROVI490617HSPDSS05',
      type: 'profesor',
    })
    await Request.create({
      name: 'Tadeo',
      lastName: 'Gonzales',
      email: 'ingetadeo@gmail.com',
      enrollment: '90625321',
      status: 'pending',
      comments: 'Soy estudinate de computacion',
      curp: 'PERC561125MSPRMT03',
      type: 'estudiante',
    })
    await Request.create({
      name: 'Aaron',
      lastName: 'Reyes',
      email: 'aarondavis@gmail.com',
      enrollment: '847362',
      status: 'acepted',
      comments: 'Soy el director',
      curp: 'PERC561125MSPRMT04',
      type: 'profesor',
    })
  } catch (err) {
    return
  }
}

module.exports = initialData
