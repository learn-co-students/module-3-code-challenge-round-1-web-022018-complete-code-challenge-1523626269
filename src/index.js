document.addEventListener('DOMContentLoaded', function() {
  const imageId = 1 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let name = document.getElementById('name')
  let image = document.getElementById('image')
  let likes = document.getElementById('like_button')
  let count = document.getElementById('likes')
  let comment = document.getElementById('comment_form')
  let ul = document.getElementById('comments')

  fetch(imageURL).then(r => r.json()).then(json => {
    // let ob = new Image(json.id, json.url, json.name, json.like_count)
    image.src = json.url
    name.innerHTML = json.name
    likes.addEventListener('click', e => {
      let times = json.like_count++
      count.innerHTML = json.like_count
      createLike(json)
    })

    comment.addEventListener('submit', e => {
      let list = document.createElement('li')
      list.innerHTML = `<h4>${e.target.comment_input.value}</h4>`
      ul.append(list)
      createComment(e.target.comment_input.value)
      e.preventDefault()
    })
  })

  function createLike(json) {
    let config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: json.id})
    }
    fetch(likeURL,config)
  }

  function createComment(content) {
    let config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content: content, image_id: imageId})
    }
    fetch(commentsURL,config)
  }
  // function update(json) {
  //   let config = {
  //     method: 'POST',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({like_count: json.like_count, comments: json.comments})
  //   }
  //   fetch(imageURL,config).then(r => r.json()).then(json => console.log(json))
  // }


})
