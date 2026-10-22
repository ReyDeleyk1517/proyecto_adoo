const checkStateForm = document.getElementById('check-state-form')
const enrollmentInput = document.getElementById('enrollment')

const checkStateSubmitHandler = (event) => {
  event.preventDefault()

  const url = '/request/' + enrollmentInput.value

  fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((res) => {
      console.log(res)

      if (res.message) {
        throw new Error(res.message)
      }

      let text
      let icon
      let title

      if (res.requestStatus === 'acepted') {
        title = 'Aceptada'
        icon = 'success'
        text =
          'Su peticion ha sido aceptada por favor este al pendiente de su correo electronico'
      } else {
        text =
          'El estado de su peticion es ' +
          (res.requestStatus == 'pending' ? 'pendiente' : 'denegada')
        icon = res.requestStatus == 'pending' ? 'question' : 'error'
        title = res.requestStatus == 'pending' ? 'Pendiente' : 'Denegada'
      }

      const html = `
        <div>
          <h4>Nombre: ${res.name}</h4>
          <h4>Correo: ${res.email}</h4>
          <h4>Matricula: ${res.enrollment}</h4>
          <p>${text}</p>
          </div>
      `

      Swal.fire({
        title,
        icon: icon,
        html,
        confirmButtonText: 'Continuar',
      })
    })
    .catch((err) => {
      console.log(err)
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Entendido',
      })
    })
}

checkStateForm.addEventListener('submit', checkStateSubmitHandler)
