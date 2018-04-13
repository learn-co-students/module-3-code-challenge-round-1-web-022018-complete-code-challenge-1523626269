document.addEventListener('DOMContentLoaded', function() {
  //Enter your assigned imageId here
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageId = 16
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const imageTag = document.getElementById('image')
  const imageName = document.getElementById('name')
  const imageLikes = document.getElementById('likes')
  const imageComments = document.getElementById('comments')
  const likeButton = document.getElementById('like_button')
  const submitComment = document.getElementById('submit-comment')
  const commentInput = document.getElementById('comment_input')

  fetch(imageURL).then(resp => resp.json()).then(json => {

    let image = new Image(json.id, json.url,json.name, json.like_count, json.comments)
    json.comments.forEach(comment => new Comment(comment.id, comment.content, image.id))

    imageTag.src =image.url
    imageName.innerText = image.name
    imageLikes.innerText = parseInt(image.likecontent)
    imageComments.innerHTML = image.renderComments()

    likeButton.addEventListener('click', e => {
      image.likecontent += 1
      imageLikes.innerText = image.likecontent
      fetch(likeURL, {
        headers: {'Content-Type': 'application/json'},
        method: "POST",
        body: JSON.stringify({image_id: image.id})
      })
    })

    submitComment.addEventListener('click', e => {
      image.comments.push({id: "", content: comment_input.value})
      imageComments.innerHTML = image.renderComments()
      fetch(commentsURL, {
        headers: {"Content-Type":"application/json"},
        method: "POST",
        body: JSON.stringify({image_id: image.id, content: comment_input.value})
      })
    })
  })
})
