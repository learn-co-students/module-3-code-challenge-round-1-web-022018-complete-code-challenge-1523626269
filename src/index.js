document.addEventListener('DOMContentLoaded', function() {
  const imageId = 6 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch('https://randopic.herokuapp.com/images/6').then(r => r.json()).then(json=>renderInfo(json))
//ADDS INFO TO PAGE
  function renderInfo(data){
    let image = document.getElementById('image')
    image.src = data.url
    let name = document.getElementById('name')
    name.innerText = data.name
    let likes = document.getElementById('likes')
    likes.innerText = data.like_count
    let comments = document.getElementById('comments')
    comments.innerHTML += data.comments.map(comment=>{return `<li> ${comment.content}</li>`}).join("")
// ADD LIKES ...oops, realizing i used a hot mess of both snake and camel case
    let like_button = document.getElementById('like_button')
    like_button.addEventListener('click', e =>{
      e.preventDefault()
      let like_count = document.getElementById('likes')
      let addLikes = data.like_count += 1
      like_count.innerText = addLikes

      fetch(likeURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: 6
        })
      }) // end of likes post fetch
    }) // end of like button event listner

// COMMENTS TIME! HO BOY
    let comment_form = document.getElementById('comment_form')
    comment_form.addEventListener('submit', e=>{
      e.preventDefault()
      let comments_list = document.getElementById('comments')
      let newComment = document.createElement('li')
      let newCommentContent = document.getElementById('comment_input').value
      newComment.innerText = newCommentContent
      comments_list.append(newComment)
      document.getElementById('comment_form').reset()

      fetch(commentsURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: 6,
          content: newCommentContent
        })
      }) //end of comments post fetch
    }) //end of comments event listner
  } //end of renderInfo function
}) //end of first event listner
