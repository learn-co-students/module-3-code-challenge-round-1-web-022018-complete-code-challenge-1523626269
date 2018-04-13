//Get image data
//Like feature --> persist
//Comment feature --> persist
//  refer to readme to get syntax help
//Bonus
//Delete feature --> persist

// Laura's method for dom manip (lucky 8 steps)
// find element
// add event listener to trigger
// inside event listener have functionality
// new element
// if class as sep file, new instance
// render to return html --> event listener
// inner html to returned render html
// APPEND

document.addEventListener('DOMContentLoaded', function()
{
  const imageId = 21 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const comments = document.getElementById('comments')
  const imageCard = document.getElementById('image_card')
  const likes = document.getElementById('likes')

  document.getElementById('like_button').addEventListener('click', function(event)
      {
        likeImage()
      })
    document.getElementById('comment_form').addEventListener('submit', function(event)
      {
        event.preventDefault()
        addComment()
      })

    function getImage()
    {
      fetch(imageURL)
      .then(res => res.json())
      .then(json =>
      {
        document.getElementById('image').src=json.url
        let name = document.createElement('h1')
        name.innerText = json.name + " sitting in a tree," + "\n"+ "k-i-s-s-i-n-g"
        imageCard.prepend(name)
        likes.innerText = json.like_count

        json.comments.forEach(comment =>
        {
          comments.innerHTML += `<div><li id=${comment.id}>${comment.content}</li></div>`
          addButtonToComment(comment.id)
        })
      })
    }

    function likeImage()
    {
      let likesNum = parseInt(likes.innerText)
      likes.innerText = likesNum + 1

      fetch(likeURL,
      {
        method: 'post',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
          image_id: imageId,
          like_count: likes.innerText
        })
      })
    }

    function addComment()
    {
      let addComment = document.getElementById('comment_input')
      comments.innerHTML += `<div><li id="placeholder">${addComment.value}</li></div>`
      addComment.value = ""

      fetch(commentsURL,
      {
        method: 'post',
        headers:
        {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
        {
          image_id: imageId,
          content: comments.lastChild.innerText
        })
      })
      .then(res => res.json())
      .then(json =>
        {
        document.getElementById("placeholder").id = json.id
        addButtonToComment(json.id)
        })
    }

    function addButtonToComment(commentId)
    {
      let addButton = document.createElement('button')
      addButton.innerText = "Eradicate this comment"
      document.getElementById(commentId).parentNode.append(addButton)
    }

    function deleteComment()
    {
      if (event.target.nodeName === 'BUTTON')
      {
        let commentID = event.target.parentNode.children[0].id
        event.target.parentNode.remove()
        fetch(commentsURL + commentID,
        {
          method: 'delete'
        })
      }
    }

    getImage()

    comments.addEventListener('click', function(event)
    {
      event.stopPropagation()
      deleteComment()
    })
  })
