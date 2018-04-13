document.addEventListener('DOMContentLoaded', function() {

  const image = document.getElementById('image')

  const commentInput = document.getElementById('comment_input')
  const likeButton = document.getElementById('like_button')

  const imageId = 4 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`



// Attempting to fetch the imageURL

  fetch(imageURL)
  .then(resp => resp.json())
  // .then(console.log)
  .then(render)


// iterating over data and grabbing img url
// But it won't display on the screen despite being in the html as the image src
// and displaying in the console

  function render(data) {
    // debugger
    for (var x in data) {
      // console.log(data.url)
      image.src += `${data.url}`
    }
  }


// making the bones of the like post
  fetch('https://randopic.herokuapp.com/likes', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({})
  })


// making the bones of the comments post
  fetch('https://randopic.herokuapp.com/comments', {
        method: 'POST',
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
          image_id: 4,
          // content: // comment stuff
        })
  })





// utter failure
})
