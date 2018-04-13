class Comment {
  constructor(id, content){
    this.id = id
    this.content = content
  }

  render(){
    return `
      <li data-id="${this.id}" id="comment${this.id}">${this.content}<span class="delete">x</span></li>
    `
  }

}
