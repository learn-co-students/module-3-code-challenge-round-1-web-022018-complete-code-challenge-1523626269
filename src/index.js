document.addEventListener('DOMContentLoaded', function() {
  const imageId = 19 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

fetch(imageURL).then(r => r.json()).then(json => domAppend(json))

function domAppend(argument){
  protoImage = new Image(argument)
  protoImage.appendDom()
}


function addLikesListener(){
const likesDiv = document.querySelector("#likes")
const likesButton = document.querySelector("#like_button")
likesButton.addEventListener("click", e => {
var currentLikes = parseInt(likesDiv.innerText)
currentLikes += 1
fetch(likeURL,{
headers: {"Accept":"application/json","Content-Type":"application/json"},
method: "POST",
body: JSON.stringify({image_id:`${imageId}`})
})
likesDiv.innerText = currentLikes
})
// fetch(likeURL,{
// headers: {"Accept":"application/json","Content-Type":"application/json"},
// method: "POST",
// body: JSON.stringify({image_id:`${imageId}`})
// })
}
let commentID = 0
function addCommentsListener(){

  const commentsDiv = document.querySelector("#comments")
  const commentsInput = document.querySelector("#comment_input")
  const commentSubmit = document.querySelector("#comment_form")
commentSubmit.addEventListener("submit", e =>{
  e.preventDefault()
 commentsDiv.innerHTML += `<li>${commentsInput.value}</li>`
 fetch(commentsURL,{
   headers: {'Accept': 'application/json',
   'Content-Type': 'application/json'},
   method: "POST",
   body: JSON.stringify({image_id:`${imageId}`,content:`${commentsInput.value}`})
 })

})
// fetch(commentsURL,{
//   headers: {'Accept': 'application/json',
//   'Content-Type': 'application/json'},
//   method: "POST",
//   body: JSON.stringify({image_id:`${imageId}`,content:`commentsInput.value`})
// })
commentsInput.innerHTML = ""
}


addLikesListener()
addCommentsListener()






})
