document.addEventListener('DOMContentLoaded', function() {
  const imageId = 3 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetch(imageURL).then(x => x.json()).then(json => display(json))
})

function display(json) {
  document.getElementById('image').setAttribute('src', `${json.url}`)
  document.getElementById('like_button').addEventListener('click', like)
  document.getElementById('comment_button').addEventListener('click', comment)
  document.getElementById('likes').innerText = (`Likes: ${json.like_count}`)

  json.comments.map(function(x) {
  document.getElementById('comments').innerHTML += (`<li id='item'><strong>${x.content}</strong><br></li>`)})

  function like() {
    fetch('https://randopic.herokuapp.com/likes/', {
    method:"POST",
    headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({image_id: json.id})})
  }

  function comment() {
    fetch('https://randopic.herokuapp.com/comments/', {
    method:"POST",
    headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({content: document.getElementById('comment_input').value, image_id: json.id})})
    document.getElementById('comment_input').value = ''
  }
}
