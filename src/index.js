document.addEventListener('DOMContentLoaded', function() {
  const imageId = 15
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const image = document.getElementById('image')
  const likeButton = document.getElementById('like_button')
  const submitComment = document.getElementById('comment_form')
getImage()

  function getImage(){
    fetch(imageURL).then(r => r.json()).then(r => {
      image.src = r.url
      image.dataset.id = imageId
      document.getElementById('likes').innerHTML = r.like_count
      document.getElementById('name').innerHTML = r.name
      document.getElementById('comments').innerHTML = r.comments.map(comment => {
        return `
        <li id="${comment.id}" data-imageid="${comment.image_id}"> ${comment.content} <br>
        <button data-id="${comment.id}" id="delete-comment">Delete</button></li>`
      }).join('')
    })
  }

  likeButton.addEventListener('click', e => {
    let likes = 1 + document.getElementById('likes').innerHTML++
    fetch(likeURL, {
      method: "POST",
      headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({like_count: likes, image_id: 15})
    })
  })
  submitComment.addEventListener('submit', e => {
    e.preventDefault()
    let newComment = document.getElementById('comment_input').value
    document.getElementById('comments').innerHTML += `<li>${newComment}</li>`
    fetch(commentsURL, {
      method: "POST",
      headers: {'Accept': 'application/json',
        'Content-Type': 'application/json'},
      body: JSON.stringify({content: newComment, image_id: 15})
    })
  })
  document.getElementById('comments').addEventListener('click', e =>{
    if (e.target.id === 'delete-comment')
    fetch(commentsURL+e.target.dataset.id, {
        method: "DELETE"
      }).then(getImage())
  })
  // delete button for new comments only shows up after refreshing and deleted comments also only disappear after refreshing...
  // idk I'm tired...

})
