store = []

class Image {
  constructor(id, url, name, likecount, comments){
    this.id = id
    this.url = url
    this.name = name
    this.likecontent = likecount
    this.comments = comments
    store.push(this)
  }

  renderComments(){
    return this.comments.map(comment => `<li>${comment.content}</li>`).join('')
  }

  static all() {
    return store.slice()
  }

  // comments() {
  //   If I had a bit more time, would have the image filter through comment class instances
  //   instead of storing it here
  // }

}
