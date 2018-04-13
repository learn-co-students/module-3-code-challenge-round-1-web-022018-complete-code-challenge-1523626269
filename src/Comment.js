commentStore = []

class Comment {

  constructor(commentText, image_id){
    this.commentText = commentText
    this.imageId = image_id
    commentStore.push(this)
  }

  render(){
    return `
      <li>${this.commentText}</li><br>
    `
  }

  static renderAll(){
    commentStore.map(comment=>comment.render()).join("")
  }

}
