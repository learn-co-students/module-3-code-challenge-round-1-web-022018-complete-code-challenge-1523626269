class Image {
  constructor(argument){
  this.id = argument.id
  this.url = argument.url
  this.name = argument.name
  this.likeCount = argument.like_count
  this.comments = argument.comments
  }

commentRender(comment){
  return(`
    <li>#${comment.content}</li>
    `)
}


appendDom(){
document.querySelector("#image").src = this.url
document.querySelector("#likes").innerHTML = this.likeCount
document.querySelector("#name").innerHTML = this.name
this.comments.forEach(comment => document.querySelector("#comments").innerHTML += this.commentRender(comment))

}


}


      //Comments is an array with id and content.
      // "id": 1,
      // "content": "first comment!"
