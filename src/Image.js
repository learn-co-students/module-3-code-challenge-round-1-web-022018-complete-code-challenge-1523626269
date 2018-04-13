
let s = {images: []}

class Image {

  constructor(id,url, name, like_count){
    this.id = id
    this.url = url
    this.name = name
    this.like_count = like_count
    s.images.push(this)
  }

}
