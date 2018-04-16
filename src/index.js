document.addEventListener('DOMContentLoaded', function() {
  const imageId = 12
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`




  const image = document.getElementById('image')
  const name = document.getElementById('name')

  const likeButton = document.getElementById('like_button')
  const likesNumber = document.getElementById('likes')


  const commentForm = document.getElementById('comment_form')
  const commentInput = document.getElementById('comment_input')
  const commentsList = document.getElementById('comments')



// Render Image and Data from backend

  fetch(imageURL).then(response => response.json()).then(json => renderImageData(json))

  function renderImageData(data){

        image.src = data.url
        name.innerText = data.name
        likesNumber.innerText = data.like_count
        commentsList.innerHTML += data.comments.map(comment=>{return `<li> ${comment.content}</li>`}).join("")


  }



// Make Like Button event listener- Increase Likes on Page and persist

      likeButton.addEventListener('click', function(e){
          likesNumber.innerText = 1 + parseInt(likesNumber.innerText)


      fetch(likeURL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({
               image_id: imageId

          })
        })
      })



//  Create Comment on page and persist




    commentForm.addEventListener('submit', function(e){
      e.preventDefault();
      newCommentInput = commentInput.value
      newComment = document.createElement('li')
      newComment.innerText = newCommentInput
      commentsList.appendChild(newComment)

      fetch(commentsURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: imageId,
          content: newCommentInput
        })
      })

    })
//
// const commentForm = document.getElementById('comment_form')
//   commentForm.addEventListener("submit", e => {
//       e.preventDefault();
//       const inputBody = document.getElementById('comment_input').value;
//       createComment(inputBody).then(json => {
//         const comment = new Comment(json);
//         comment.render();
// })
//
// function render() {
//     const commentList = document.getElementById("comments");
//     commentList.innerHTML += input.createLi()
//   }
//
//
//
// function createDiv() {
//     return `<li> ${inputBody} </li>`;
//   }
//

})
