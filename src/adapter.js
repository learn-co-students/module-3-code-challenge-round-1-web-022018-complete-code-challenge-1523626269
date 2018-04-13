class Adapter {
  constructor(){

  }

  getImage(imageURL){
    fetch(imageURL, {
      headers: {'Content-Type':'application/json'},
      method: 'get'
    }).then(r=>r.json()).then(json=>{
      let myImage = new Image(json.id, json.url, json.name, json.comments, json.like_count)
      const imageContainer = document.getElementById('image')
      imageContainer.src = myImage.render()
      likesCount.innerText = myImage.likes
    })
  }

  postLike(imageURL){
    fetch('https://randopic.herokuapp.com/likes', {
      headers: {'Content-Type':'application/json'},
      method: 'post',
      body: JSON.stringify({image_id:11})
    })
    //getting a CORS error with this??
    // fetch(imageURL, {
    //   headers: {'Content-Type':'application/json'},
    //   method: 'patch',
    //   body: JSON.stringify({'like_count':'like_count+1'})
    // })
  }

  //this saves it to the database after the comment is created in index.js
  postComment(comment){
    let imageId = comment.imageId
    let content = comment.commentText
    fetch('https://randopic.herokuapp.com/comments', {
      headers: {'Content-Type':'application/json'},
      method: 'post',
      body: JSON.stringify({image_id:imageId, content:content})
    })
  }
}
