store = []

class Image {
  constructor(id, url, name, comments, likes) {
    this.id = id;
    this.url = url;
    this.name = name;
    this.comments = comments
    //change the likes to be an array of the actual objects if time
    this.likes = likes
    store.push(this)
  }

  render(){
    return this.url
  }

}
