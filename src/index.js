document.addEventListener('DOMContentLoaded', function() {
  const imageId = 12
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`



  function createComment(comment){
    return fetch("commentsurl", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        image_id: 12,
        content: `${comment}`
        })
      .then(resp => resp.json())
    }

const commentForm = document.getElementById('comment_form')
  commentForm.addEventListener("submit", e => {
      e.preventDefault();
      const inputBody = document.getElementById('comment_input').value;
      createComment(inputBody).then(json => {
        const comment = new Comment(json);
        comment.render();
})

function render() {
    const commentList = document.getElementById("comments");
    commentList.innerHTML += input.createLi()
  }



function createDiv() {
    return `<li> ${inputBody} </li>`;
  }


})})
