class Image {
  constructor(id, url, name, like_count, comments){
    this.id = id
    this.url = url
    this.name = name
    this.like_count = like_count
    this.comments = comments.map(c => new Comment(c.id, c.content))
  }


}
