const loginForm = document.getElementById('login-form')
const emailInput = document.getElementById('email-input')
const passwordInput = document.getElementById('password-input')

const submitLoginFormHandler = async (event) => {
  try {
    event.preventDefault()

    const data = {
      email: emailInput.value,
      password: passwordInput.value,
    }

    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
  } catch (err) {
    console.log(err)
  }
}

loginForm.addEventListener('submit', submitLoginFormHandler)
