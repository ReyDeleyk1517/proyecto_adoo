const nameInput = document.getElementById('name')
const lastNameInput = document.getElementById('lastName')
const emailInput = document.getElementById('email')
const curpInput = document.getElementById('curp')
const enrollmentInput = document.getElementById('enrollment')
const commentsInput = document.getElementById('comments')
const typeSelector = document.getElementById('emailType')

const requestEmailForm = document.getElementById('request-form')

const curpValida = (curp) => {
  const re =
    /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0\d|1[0-2])(?:[0-2]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/
  const validado = re.test(curp)

  if (!validado) {
    //Coincide con el formato general?
    return false
  }
  return true //Validado
}

function validarEmail(valor) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)) {
    return true
  } else {
    return false
  }
}

requestEmailForm.addEventListener('submit', (event) => {
  event.preventDefault()

  let isEnrollmentValid = true
  let isEmailValid = validarEmail(emailInput)
  let isCurpValid = curpValida(curpInput.value)

  const enrollment = enrollmentInput.value

  if (!(enrollment.length == 6 || enrollment.length == 8)) {
    isEnrollmentValid = false
  }

  if (!(isEnrollmentValid || isEmailValid || isCurpValid)) {
    if (!isEnrollmentValid) {
      enrollmentInput.classList.add('is-invalid')
    }

    if (!isEmailValid) {
      emailInput.classList.add('is-invalid')
    }

    if (!isCurpValid) {
      curpInput.classList.add('is-invalid')
    }
    console.log('Peticion fallida')
    return
  }

  if (isEnrollmentValid) {
    enrollmentInput.classList.remove('is-invalid')
    enrollmentInput.classList.add('is-valid')
  }

  if (isEmailValid) {
    emailInput.classList.remove('is-invalid')
    emailInput.classList.add('is-valid')
  }

  if (isCurpValid) {
    curpInput.classList.remove('is-invalid')
    curpInput.classList.add('is-valid')
  }

  const data = {
    name: nameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
    curp: curpInput.value,
    enrollment: enrollmentInput.value,
    comments: commentsInput.value,
    type: typeSelector.value,
  }
  const url = '/request'

  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response)
      return response.ok ? response.json() : Promise.reject(response)
    })
    .then((response) => {
      if (response.errors && response.errors.length > 0) {
        throw new Error(response.errors[0].message)
      }
      return Swal.fire({
        title: 'Correcto!',
        text: 'Ah registrado una peticion para un correo institucional',
        icon: 'success',
        confirmButtonText: 'Continuar',
        allowOutsideClick: false,
      })
    })
    .then((response) => {
      console.log(response)
      if (response.isConfirmed) {
        console.log('entrooooo')
        window.location.href = 'http://localhost:8000/'
      }
    })
    .catch((err) => {
      Swal.fire({
        title: 'Error!',
        text: err.message,
        icon: 'error',
        confirmButtonText: 'Entendido',
      })
    })
})
