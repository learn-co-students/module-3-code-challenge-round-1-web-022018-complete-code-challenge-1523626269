class Comment {
	constructor(data){
		this.id = data.id
		this.content = data.content
		// this.image_id = data.image_id

	}

	render() {
		return `${this.content}  <button class="delete_button">Delete</button>`
	}
}
