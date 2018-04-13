document.addEventListener('DOMContentLoaded', function() {
  const imageId = 9 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`


  function loadImg() {
    fetch(imageURL).then(r => r.json()).then(json => {
      img = new Image(json)
      img.render()
      img.initLikeListener()
      Comment.initCommentListener(img)
    })
  }

  loadImg()

})
