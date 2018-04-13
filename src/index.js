document.addEventListener('DOMContentLoaded', function() {
  const imageId = 22 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let fetchGet = fetch('https://randopic.herokuapp.com/images/22')
  .then(function(response) {
    return response.json();
  })

  // .then(function(myJson) {
  //   console.log(myJson);
  // });

  // fetchGet.then(console.log(data));

  fetchGet.then(displayData);

// Make comments
  let commentForm = document.getElementById('comment_form')
  commentForm.addEventListener('submit', submit)

  function submit(event) {
    event.preventDefault()

    console.log('in submit')
  }

  function displayData(data) {
    let imageContent = data.url

    let id = data.id

    let imageContainer = document.getElementById("image_content")
    imageContainer.innerHTML += '<div data-id=`${id}`> <img src="'+imageContent+'" /></div>';

//Comments
    let comments = data.comments
    let commentContent = document.getElementById('comments')

    let likes = data.like_count
    let listedComments = comments.forEach(comment => commentContent.innerHTML += `<br>Comment: ${comment.content}`)

    let image = document.getElementsByTagName('img')[1]
    image.addEventListener('click', increaseLike)
  }

  function increaseLike(event) {
    event.preventDefault()

    let likes = document.getElementById("likes")
    likes.innerText++
    console.log(`${comments.likes}`)
  }

})
