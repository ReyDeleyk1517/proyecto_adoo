const tableBody = document.getElementById('table-body')

const deleteRequestHandler = (event) => {
  const enrollment =
    event.target.parentNode.parentNode.parentNode.firstChild.textContent

  Swal.fire({
    title: 'Seguro que desea eliminar la peticion',

    showCancelButton: true,
    confirmButtonText: 'Eliminar',
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      fetch('/request', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ enrollment }),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((res) => {
          console.log(res)
          return Swal.fire(
            'Elimiada!',
            'Se ha eliminado la peticion',
            'success'
          )
        })
        .then((res) => {
          event.target.parentNode.parentNode.parentNode.remove()
        })
        .catch((err) => {
          Swal.fire('Opss!', 'Algo ha salido mal', 'error')
        })
    } else {
      return
    }
  })
}

const changeStatusHandler = (event) => {
  const enrollment =
    event.target.parentNode.parentNode.parentNode.firstChild.textContent

  let status
  Swal.fire({
    title: 'Desea cambiar el estado de la peticion',
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: 'Aceptar peticion',
    denyButtonText: `Denegar peticion`,
  }).then((result) => {
    if (result.isConfirmed) {
      status = 'acepted'
    } else if (result.isDenied) {
      status = 'denied'
    } else {
      return
    }
    fetch('/request', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status, enrollment }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((res) => {
        console.log(res)
        return Swal.fire(
          'Guardado!',
          'Se ha modificado el estado de la peticion',
          'success'
        )
      })
      .then((res) => {
        console.log(event.target.parentNode.parentNode.parentNode.childNodes[3])
        event.target.parentNode.parentNode.parentNode.childNodes[3].textContent =
          status
      })
      .catch((err) => {
        Swal.fire('Opss!', 'Algo ha salido mal', 'error')
      })
  })
}

const genereteActionsButtons = () => {
  const div = document.createElement('div')
  const changeStatusButton = document.createElement('button')
  const deleteRequestButton = document.createElement('button')

  changeStatusButton.classList.add('button')
  deleteRequestButton.classList.add('button')

  changeStatusButton.addEventListener('click', changeStatusHandler)
  deleteRequestButton.addEventListener('click', deleteRequestHandler)

  changeStatusButton.innerHTML = 'Cambiar estado'
  deleteRequestButton.innerHTML = 'Eliminar peticion'
  div.appendChild(changeStatusButton)
  div.appendChild(deleteRequestButton)

  return div
}

fetch('request')
  .then((res) => (res.ok ? res.json() : Promise.reject(res)))
  .then((res) => {
    for (const request of res.requests) {
      const tr = document.createElement('tr')
      const thEnrollment = document.createElement('th')
      const tdName = document.createElement('td')
      const tdEmail = document.createElement('td')
      const tdStatus = document.createElement('td')
      const tdComments = document.createElement('td')
      const tdActions = document.createElement('th')

      thEnrollment.textContent = request.enrollment
      tdName.textContent = request.name
      tdEmail.textContent = request.email
      tdStatus.textContent = request.status
      tdActions.appendChild(genereteActionsButtons(request.enrollment))
      tdComments.textContent =
        request.comments.length == 0 ? 'Sin comentarios' : request.comments

      tr.appendChild(thEnrollment)
      tr.appendChild(tdName)
      tr.appendChild(tdEmail)
      tr.appendChild(tdStatus)
      tr.appendChild(tdComments)
      tr.appendChild(tdActions)

      tableBody.appendChild(tr)
    }
  })
  .catch((err) => {
    console.log(err)
  })
