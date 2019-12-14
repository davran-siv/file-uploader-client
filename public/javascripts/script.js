$(function() {
  const accessTokenKeyInLocalStorage = 'accessToken'
  var showInfo = function(message) {
    $('div.progress').hide()
    $('strong.message').text(message)
    $('div.alert').show()
  }

  $('#auth').on('submit', function(evt) {
    console.log('awdawd')
    evt.preventDefault()
    const email = document.getElementById('email').value
    const params = JSON.stringify({ email })

    const xhr = new XMLHttpRequest()
    xhr.open('post', 'http://localhost:3000/auth', true)

    xhr.setRequestHeader('Content-type', 'application/json')


    xhr.onerror = function(e) {
      showInfo('An error occurred while submitting the form. Maybe your file is too big')
    }

    xhr.onload = function() {
      const responseBody = JSON.parse(this.response)
      console.log(responseBody)
      localStorage.setItem(accessTokenKeyInLocalStorage, responseBody.accessToken)
      showInfo(this.statusText)
    }
    xhr.send(params)

  })

  $('#file-submit').on('click', function(evt) {
    evt.preventDefault()
    $('div.progress').show()
    var formData = new FormData()
    var file = document.getElementById('myFile').files[0]
    formData.append('file', file)

    var xhr = new XMLHttpRequest()

    xhr.open('post', 'http://localhost:3000/uploader', true)

    const accessToken = localStorage.getItem(accessTokenKeyInLocalStorage)
    if(accessToken) {
        xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`)
    }

    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        console.log(e)
        var percentage = (e.loaded / e.total) * 100
        $('div.progress div.bar').css('width', percentage + '%')
      }
    }

    xhr.onerror = function(e) {
      showInfo('An error occurred while submitting the form. Maybe your file is too big')
    }

    xhr.onload = function() {
      showInfo(this.statusText)
    }

    xhr.send(formData)

  })

})
