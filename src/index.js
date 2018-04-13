document.addEventListener('DOMContentLoaded', function() {
  const imageId = 13 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likeButton = document.getElementById('like_button')
  const likesNumber = document.getElementById('likes')
  const commentInput = document.getElementById('comment_input')
  const commentsList = document.getElementById('comments')
  const image = document.getElementById('image')
  const name = document.getElementById('name')

  fetch(imageURL).then(resp => resp.json()).then(createImage)


  function createImage(data){
    i = new Image(data.id, data.url, data.name, data.like_count, data.comments)

    image.src = i.url
    name.innerText = i.name
    likesNumber.innerText = i.like_count
    commentsList.innerHTML = i.comments.map(c => c.render()).join("")
  }



  // EVENT LISTENERS
  likeButton.addEventListener('click', function(e){
    likesNumber.innerText = 1 + parseInt(likesNumber.innerText)

    fetch(likeURL, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            image_id: imageId
        })
    })
  })

  document.getElementById('comment_form').addEventListener('submit', function(e){
    e.preventDefault()

    commentContent = commentInput.value


    newComment = document.createElement('li')
    newComment.innerText = commentContent
    commentsList.appendChild(newComment)

    fetch(commentsURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            image_id: imageId,
            content: commentContent
        })
    })

    commentInput.value = ""
  })

  commentsList.addEventListener('click', function(e){
    if (e.target.className === 'delete'){
      commentId = e.target.parentElement.dataset.id
      console.log(commentId)

      commentsList.removeChild(document.getElementById(`comment${commentId}`))

      fetch(`${commentsURL}/${commentId}`, {
          method: 'DELETE'
      })
    }
  })


})
