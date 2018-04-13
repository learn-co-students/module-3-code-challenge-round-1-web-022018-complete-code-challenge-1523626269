document.addEventListener('DOMContentLoaded', function() {
  const imageId = 9 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  let activeImage = null


  function loadImg() {
    fetch(imageURL).then(r => r.json()).then(json => {
      img = new Image(json)
      activeImage = img
      img.render()
      img.initLikeListener()
      Comment.initCommentListener(activeImage)
    })
  }

  loadImg()

})
