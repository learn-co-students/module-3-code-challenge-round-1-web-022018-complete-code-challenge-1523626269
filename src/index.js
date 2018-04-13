document.addEventListener('DOMContentLoaded', function() {
  const imageId = 18 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let likes = 0
  // GET IMAGE data and APPEND
  fetch(imageURL).then(res=>res.json()).then(res=> {console.log('this is res' + JSON.stringify(res))
    document.getElementById('image').src = res.url
    document.getElementById('name').innerHTML = res.name

    // like count
    document.getElementById('likes').innerHTML = res.like_count
    likes = res.like_count


    console.log('these are all the comments' + JSON.stringify(res.comments))
    // append the comments
    for (const comment of res.comments){
      console.log('this is the comment content' + JSON.stringify(comment))
      document.getElementById('comments').innerHTML += `<li>${comment.content}</li>`
    }
  })

  setTimeout(()=>{
     console.log('this is the like count' + likes)
  },500)


  // ADD LIKE FUNCTIONALITY ---------------------------------------
  document.getElementById('like_button').addEventListener('click', ()=>{
    likes++
    // SHOW IT IN View
    document.getElementById('likes').innerHTML = likes

    // GET READY TO POST IT TO THE SERVER
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');


    let data = {   method: 'POST',
                   headers: {
                      'Accept': 'application/json',
                      'Content-Type': 'application/json'
                    }
                  };
    let content = {
      image_id: imageId
    }
    data.body = JSON.stringify(content)

    // THEN JUST SEND IT
    fetch('https://randopic.herokuapp.com/likes', data).then(res=> res.json()).then(res=>console.log('this the response of the like data' + JSON.stringify(res) ))

  })




  // ADD SUBMIT FUNCTIONALITY ---------------------------------------
  document.getElementById('submitBtn').addEventListener('click', (e)=>{
    e.preventDefault()
    // append comments to the view
    document.getElementById('comments').innerHTML += `<li>${document.getElementById('comment_input').value}</li>`

    let comment_value = document.getElementById('comment_input').value // in case i wanna use it
    console.log('this is the coment value that I saved' + comment_value)



    // GET READY TO POST IT TO THE SERVER



    let data = {   method: 'POST',
                   headers: { 'Accept': 'application/json',
                     'Content-Type': 'application/json'
                   }
                  };
    let content = {
      image_id: imageId,
      content: document.getElementById('comment_input').value,
    }
    data.body = JSON.stringify(content)
    console.log('this is my comment data BODY:' + data.body)
    // THEN JUST SEND IT
    fetch('https://randopic.herokuapp.com/comments', data).then(res=> res.json()).then(res=>console.log('this the response of the comment data' + JSON.stringify(res) ))

    document.getElementById('comment_input').value = ''

  })


})
