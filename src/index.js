document.addEventListener('DOMContentLoaded', function() {
  const imageId = 8
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


//GET INFO//

  function getImage (){
  fetch(imageURL).then(res => res.json()).then(json => render(json))
  }

//RENDER DATA//

  function render(data) {
    console.log(data)
    document.getElementById('image').src = data.url
    document.getElementById('name').innerHTML = data.name
  }


//INCREMENT LIKES//
  let likes = document.getElementById('like_button')
  let counter = 0

  function newLike() {
    document.getElementById('likes').innerText = counter += 1
    fetch(likeURL, {
      method:"POST",
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({
        image_id: 8
      })
    })
  }

  likes.addEventListener('click', newLike)


  //ADD COMMENT//

  let commentForm = document.getElementById('comment_form')

  function addComment(e){
    e.preventDefault();
    comment = document.getElementById('comment_input').value
    document.getElementById('comments').append(comment)
  }

  commentForm.addEventListener('submit', addComment)




  getImage()
})
