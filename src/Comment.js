const commentsURL = `https://randopic.herokuapp.com/comments/`

class Comment {
  constructor(obj) {
    this.content = obj.content
    this.id = obj.id
    this.image_id = obj.image_id
  }

  static initCommentListener(img) {
    $('#comment_form').on('submit', e => {
      e.preventDefault();
      let comment = new Comment({content: $('#comment_input').val(), id: null, image_id: img.id})
      $('#comments').append(comment.render())
      $('#comment_input').val('')
      img.comments.push(comment)
      comment.persistComment();
    })
  }

  initDeleteListener() {
    $(`#delete-${this.id}`).on('click', e => {
      $(`#comment-${this.id}`).remove()
      fetch(commentsURL+`/${this.id}`, {
        method: "DELETE"
      }).then(r => r.json()).then(json => console.log(json))
    })
  }

  persistComment() {
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: this.image_id,
        content: this.content
      })
    }).then(r => r.json()).then(json => console.log(json))
  }

  render() {
    $('#comments').append(`<li id="comment-${this.id}">${this.content} <button id="delete-${this.id}">Delete</button> </li>`)
    this.initDeleteListener()
  }

  setImage() {

  }
}
