document.addEventListener('DOMContentLoaded', function() {
  const imageId = 3
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  fetch(imageURL).then(x => x.json()).then(json => display(json))
})

function display(json) {
  document.getElementById('image').setAttribute('src', `${json.url}`)
  document.getElementById('like_button').addEventListener('click', like)
  document.getElementById('comment_form').addEventListener('click', comment)
  document.getElementById('likes').innerHTML = json.like_count
  json.comments.forEach(function(x) {
  document.getElementById('comments').innerHTML += (`<li>${x.content}</li>`)})

  function like() {
    fetch('https://randopic.herokuapp.com/likes/', {
    method:"POST",
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json'},
    body: JSON.stringify({image_id: json.id})})
    .then(document.getElementById('likes').innerHTML = parseInt(document.getElementById('likes').innerHTML) + 1)
  }

  function comment() {
    if (document.getElementById('comment_input').value != '' ) {
      fetch('https://randopic.herokuapp.com/comments/', {
      method:"POST",
      headers: { Accept: 'application/json', 'Content-Type': 'application/json'},
      body: JSON.stringify({content: document.getElementById('comment_input').value, image_id: json.id})})
      .then(document.getElementById('comments').innerHTML += `<li>${document.getElementById('comment_input').value}</li>`)
      document.getElementById('comment_input').value = ''
    }
  }
}
