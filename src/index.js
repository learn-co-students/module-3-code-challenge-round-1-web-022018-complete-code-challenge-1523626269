document.addEventListener('DOMContentLoaded', function() {
  const imageId = 23 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const likeButton = document.getElementById('like_button')
  const myImage = new Image();
  const commentForm = document.getElementById('comment_form')
  const comments = document.getElementById('comments')

  function getImage(){
    fetch(imageURL).then(r => r.json())
      .then(json => {
        myImage.id = json.id
        myImage.src = json.url;
        myImage.name = json.name;
        myImage.likes = json.like_count;
        myImage.comments = json.comments;
        myImage.render()
      })
  }

  function incrementLikes(e){
    e.preventDefault()
    myImage.likes += 1
    myImage.render()
    let configuration = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({image_id: myImage.id, like_count: myImage.likes})
    }
    fetch(likeURL, configuration).then(r=> r)
  }

  function addComment(e){
    e.preventDefault()
    let commentText = e.target[0].value
    let comments = document.getElementById('comments')
    comments.innerHTML += `<li class = "non-persisted-comment"> ${commentText}</li>`
    let configuration = {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify({image_id: myImage.id, content: commentText})
    }

    fetch(commentsURL, configuration)
  }

  function deleteComment(e){
    e.preventDefault();
    if (e.target.tagName === "BUTTON"){
      let commentId = parseInt(e.target.id.split("delete-")[1])
      comments.removeChild(e.target.parentNode)
      fetch(commentsURL+'/'+commentId, {method: "delete"})
    }
  }

  comments.addEventListener('click', deleteComment)
  commentForm.addEventListener('submit', addComment)
  likeButton.addEventListener('click', incrementLikes)
  getImage()
})
