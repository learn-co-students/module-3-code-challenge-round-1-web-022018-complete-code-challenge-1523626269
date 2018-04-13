document.addEventListener('DOMContentLoaded', function() {
  const imageId = 11
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const imageContainer = document.getElementById('image')
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  //have to fix these scoping issues
  commentContainer = document.getElementById('comments')
  likesCount = document.getElementById('likes')
  // myImage = new Image

  const adapter = new Adapter

  adapter.getImage(imageURL)

  document.addEventListener('click', e=>{
    e.preventDefault()
    console.log(e.target)
    if (e.target.id==="like_button") {
      adapter.postLike(imageURL)
      adapter.getImage(imageURL)
      let targetImage = store.find(image=>image.id===imageId)
      console.log(targetImage.likes)
      // likesCount.innerText = targetImage.likes
    } else if (e.target.type==="submit"){
      let commentText = document.getElementById('comment_input').value
      let newComment = new Comment(commentText, imageId)
      commentContainer.innerHTML += newComment.render()
      //have to still clear out the comment field, below isn't cutting it
      commentText = ""
      adapter.postComment(newComment)
      // adapter.getImage(imageURL)
    }
  })





})
