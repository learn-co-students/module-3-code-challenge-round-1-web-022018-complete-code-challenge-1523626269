
document.addEventListener('DOMContentLoaded', function() {
  const imageId = 45 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  // debugger
  fetch(imageURL).then(resp => resp.json()).then(image=>{
    const imageEl = document.getElementById('image')
    let imageObj = new Image(image.comments,image.id,image.like_count,image.name,image.url)
    imageEl.src = imageObj.url
    renderComments(imageObj)
    //i still need f**king event listeners
    // document.getElementById('like_button', e=> {
    //   trying to bind or call in here, i cant figure out how to pass imageObj
    // })
    // document.getElementById('comments', e=> {
    //   trying to bind or call in here, i cant figure out how to pass imageObj
    // })
  })
})
function renderComments(imageObj){
  for (let i=0;i<imageObj.comments.length;i++){
    renderComment(imageObj.comments[i].content)
  }
}
function renderComment(content){
  let imageComment = document.createElement('li')
  imageComment.innerText = content
  document.getElementById('comments').append(imageComment)
}
// function addLike(imageObj){
//   document.getElementById("likes").innerText = imageObj.like_count
//   fetch("https://randopic.herokuapp.com/likes",{
//     method:"POST",
//     headers:{'Content-Type':'application/json','Accepts':'application/json'},
//     body:JSON.stringify({image_id:`${imageObj.image_id}`})
//   })
// }

// function addComment(imageObj,content){
//   imageObj.comments += comment
//   renderComment(content)
//   fetch("https://randopic.herokuapp.com/likes",{
//     method:"POST",
//     headers:{'Content-Type':'application/json','Accepts':'application/json'},
//     body:JSON.stringify({image_id:`${imageObj.image_id}`,comment:`${imageObj.comment}`})
//   })
// }
