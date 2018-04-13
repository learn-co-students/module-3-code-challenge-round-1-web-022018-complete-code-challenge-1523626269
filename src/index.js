document.addEventListener('DOMContentLoaded', () => {
  const imageId = 14 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/14`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  URL= imageURL;
  console.log("JS has loaded");
  fetch(imageURL)
  // .this(res=>console.log(res))
  .then(res=>res.json())
  // .then(json=>console.log(json))
  .then(json=>implementMe(json))
})

function implementMe(json){
  console.log(json)
    DATA = json
    let comments = document.getElementById("comments")
    let ul = document.getElementById('comments')
    let li = document.createElement('li')
    let image = document.getElementById('image')
    let name = document.getElementById('name')
    let likes = document.getElementById('likes')
    likes.innerText = json.like_count
    image.src = json.url

    for (i=0; i < json.comments.length; i++){
      li.innerText = json.comments[i].content
      ul.appendChild(li)
    }

  }

const like = document.getElementById('like_button')
like.addEventListener('click', function(event) {
  let likes = document.getElementById('likes')
  let number = parseInt(document.getElementById('likes').innerText);
  document.getElementById('likes').innerText = (number += 1)
  fetch("https://randopic.herokuapp.com/likes/",
  {method: "POST",
  headers: {'Accept': 'application/json','Content-Type': 'application/json'},
  body: JSON.stringify({image_id: 14})
  })
})

let submit = document.querySelectorAll('input')[1]
submit.addEventListener('click', function(event) {
  event.preventDefault()
  let comment = document.getElementById('comment_input').value
  if (comment !== "") {
    let ul = document.getElementById('comments')
    let li = document.createElement('li')
    li.innerText = comment
    ul.appendChild(li)
  }
    fetch("https://randopic.herokuapp.com/comments/",
    {method: "POST",
    headers: {'Accept': 'application/json','Content-Type': 'application/json'},
    body: JSON.stringify({image_id: 14,
  content: document.getElementById('comment_input').value})
    })
    document.getElementById('comment_input').value = ""
})


fetch("",
{method: "DELETE"
})

fetch("",
{method: "PATCH",
headers: {'Content-type' : 'application/json'},
body: JSON.stringify({name:"Don", body:"Patched"})
})
