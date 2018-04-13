document.addEventListener('DOMContentLoaded', () => {
  const imageId = 1 //Enter your assigned imageId here
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

  }

const like = document.getElementById('like_button')
like.addEventListener('click', function(event) {
  let likes = document.getElementById('likes')
  let number = parseInt(document.getElementById('likes').innerText);
  document.getElementById('likes').innerText = (number += 1)
})

let submit = document.querySelectorAll('input')[1]
submit.addEventListener('click', function(event) {
  if (event) {
    event.preventDefault()
    let comment = document.getElementById('comment_input').value
    let ul = document.getElementById('comments')
    let li = document.createElement('li')
    li.innerText = comment
    ul.appendChild(li)
  }
})
// fetch("",
// {method: "POST",
// headers: {'Content-type' : 'application/json'},
// body: JSON.stringify({name:"Don", body:"Gotta patch this"})
// })
//
// fetch("",
// {method: "DELETE"
// })
//
// fetch("",
// {method: "PATCH",
// headers: {'Content-type' : 'application/json'},
// body: JSON.stringify({name:"Don", body:"Patched"})
// })
