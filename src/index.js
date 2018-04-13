document.addEventListener('DOMContentLoaded', function() {
  const imageId = 4 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let bossImage = null;
  // let image = null;
  //////////////////////////////////////////////////////////////////////////////getImageData
  function getImageData(){
    // fetch(imageURL).then(res=>res.json()).then(json=>console.log(json))//works
    fetch(imageURL).then(res=>res.json()).then(json=>processImage(json))
  }//getImageData
  //////////////////////////////////////////////////////////////////////////////processImage
  //called by getImageData
  function processImage(json){
    // console.log("processImage");
    // console.log(json);
    let img = new Image(json.id,json.url,json.name,json.like_count,json.comments) // worry about sotring search all leater
    // console.log(img);
    // <img id="image" data-id/>
    let imghtml = document.querySelector('#image')
    imghtml.setAttribute("src",img.url  )
    // console.log(imghtml);
    bossImage = img;
    // console.log(bossImage);
    processLikes()
    processComments()
  }
  //////////////////////////////////////////////////////////////////////////////processLikes
  //called by processImage
  function processLikes(){
    // console.log("processLikes");
    // <span id="likes">0</span>
    let likeshtml = document.querySelector('#likes')
    likeshtml.innerText = bossImage.like_count
    // <button id="like_button">Like</button>
    let likeButton = document.querySelector('#like_button')
    likeButton.addEventListener("click",function(e){
      // console.log("like++");
      bossImage.like_count++;
      likeshtml.innerText = bossImage.like_count
      updateLikes();
    });
    // console.log(bossImage);
  }
  //////////////////////////////////////////////////////////////////////////////updateLikes
  //called by processLikes:addEventListener
  function updateLikes(){
    console.log("updateLikes");
    //post
    fetch("https://randopic.herokuapp.com/likes",{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 4,
        like_count: bossImage.like_count
      })
    }).then(res=>res.json()).then(json=>console.log(json))
  }
  //////////////////////////////////////////////////////////////////////////////processComments
  //called by processImage
  function processComments(){
    // console.log("processComments");
    // <ul id="comments">
    commenthtml=document.querySelector("#comments")
    // console.log(bossImage);
    bossImage.comments.forEach(function(comment){
      // console.log(comment.content);
      let li = `<li>${comment.content}</li>`
      // commenthtml.appendChild(li) //have to make via node first
      commenthtml.innerHTML += li
    })//forEach
    //add addEventListener to button
    // <form id="comment_form">
    let form = document.querySelector("#comment_form")
    form.addEventListener("submit",function(e){
      e.preventDefault()
      // console.log("form was clicked");
      let inputbox=document.querySelector("#comment_input")
      if (inputbox.value == ""){alert("Cannot be blank")}
      else {
        let text = inputbox.value
        inputbox.value=""
        // console.log("text is::::" +text);
        // {id: 4065, content: null, image_id: 4, created_at: "2018-04-13T14:29:07.658Z", updated_at: "2018-04-13T14:29:07.658Z"}
        bossImage.comments.push({content: text, image_id: bossImage.id})
        // console.log(bossImage);
        updateComments(text)
      }//else
    })//addEventListener
  }
  //////////////////////////////////////////////////////////////////////////////updateComments
  //called by processComments:addEventListener
  function updateComments(text){
    console.log("updateComments:" +text);
    // console.log(bossImage);
    fetch(commentsURL,{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: 4,
        content: text
      })
    }).then(res=>res.json()).then(json=>console.log(json))
    console.log(bossImage);
  }

  //////////////////////////////////////////////////////////////////////////////call functions
  getImageData()

})//end addEventListener


//
// when the page loads
//   I will see an image,
//   any comments that image has, and
//   the number of likes that image has.
//
// I can click to like an image,
//   which will increase the number of likes that image has by one.
//
// I can fill out an input fields and
//   submit the form to add a comment to an image.
//   I should see my new comment below any previous comments.
//
// when I refresh the page,
//   any comments or likes I have added should be persisted to the backend API and
//   I should see my changes on the page.
