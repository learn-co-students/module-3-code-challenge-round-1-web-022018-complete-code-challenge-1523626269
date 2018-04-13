const likeURL = `https://randopic.herokuapp.com/likes/`

class Image {
  constructor(obj) {
    this.id = obj.id
    this.url = obj.url
    this.name = obj.name
    this.like_count = obj.like_count
    this.comments = []
    obj.comments.forEach(c => {
      this.comments.push(new Comment(c))
    })
    this.comments.sort(function(a, b){
      return a.id - b.id
    })
  }

  render() {
    $('#image_content').html(`
      <div class="card col-md-4"></div>
      <div id="image_card" class="card col-md-4">
          <img src="${this.url}" id="image" data-id="${this.id}"/>
          <h4 id="name">${this.name}</h4>
          <span>Likes:
            <span id="likes">${this.like_count}</span>
          </span>
          <button id="like_button">Like</button>
          <form id="comment_form">
            <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
            <input type="submit" value="Submit"/>
          </form>
          <ul id="comments">
          </ul>
      </div>
      <div class="card col-md-4"></div>
    `)
    this.comments.forEach(c => c.render())
  }

  initLikeListener() {
    $('#like_button').on('click', e => {
      this.like_count += 1
      this.render()

      fetch(likeURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: this.id
        })
      })

      this.initLikeListener()
    })
  }

}
