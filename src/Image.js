class Image {

  constructor(id, src, name, likes, comments){
    this.id = id
    this.src = src
    this.name = name
    this.likes = likes
    this.comments = comments
  }

  render(){
    let image = document.getElementById('image')
    let name = document.getElementById('name')
    let likes = document.getElementById('likes')
    let comments = document.getElementById('comments')
    comments.innerHTML = ""
    image.src = this.src
    name.innerText = this.name
    likes.innerHTML = this.likes
    this.comments.forEach((comment)=>{
      comments.innerHTML += `<li id = "${comment.id}-comment"> ${comment.content}  <button id="delete-${comment.id}">destroy</button></li>`
    })

  }
}
