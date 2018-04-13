document.addEventListener('DOMContentLoaded', function() {
  const imageId = 20 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  document.addEventListener("click", deleteComment)

  let imageTag = document.getElementById("image")
  let image = fetch(imageURL).then(response => response.json())
  image.then(renderImage)

  function renderImage(json){
    imageTag.src = json["url"]
  }

  let likes = document.getElementById("likes")
  image.then(setLikeCount)
  let likeButton = document.getElementById("like_button")
  likeButton.addEventListener("click", incrementLike)

  function setLikeCount(json){
    likes.innerText = json["like_count"]
  }

  function incrementLike(){
    likes.innerText = (Number(likes.innerText) + 1).toString()
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"image_id": `${imageId}`})
    })
  }

  let commentForm = document.getElementById("comment_form")
  let commentInput = document.getElementById("comment_input")
  let comments = document.getElementById("comments")
  image.then(setComments)
  commentForm.addEventListener("submit", addComment)

  function setComments(json){
    let sortedComments = json["comments"].sort(function compare(a,b) {
      if ((Number(a["id"])) < Number(b["id"])) {
        return -1;
      } else if ((Number(a["id"])) > Number(b["id"])) {
        return 1;
      }
      else {
        return 0;
      }
    })
    sortedComments.forEach(comment => {
      let li = document.createElement("li")
      li.innerText = `${comment["content"]}   `
      let deleteButton = document.createElement("button")
      deleteButton.innerText = "X"
      deleteButton.id = `delete-${comment["id"]}`
      li.append(deleteButton)
      comments.append(li)
    })
  }

  function addComment(event){
    event.preventDefault()
    let li = document.createElement("li")
    li.innerText = `${commentInput.value}   `
    let deleteButton = document.createElement("button")
    deleteButton.innerText = "X"
    li.append(deleteButton)
    comments.append(li)

    commentInput.value = ""

    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "image_id": `${imageId}`,
        "content": `${li.innerText}`
      })
    }).then(response => response.json()).then(json => {
      deleteButton.id = `delete-${json["id"]}`
    })
  }

  function deleteComment(event){
    if (event.target.id.slice(0,7) === "delete-") {
      fetch(`https://randopic.herokuapp.com/comments/${event.target.id.slice(7)}`, {
        method: "DELETE"
      }).then(() => event.target.parentNode.remove())
    }
  }
})
