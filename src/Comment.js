class Comment {
	constructor(data){
		// this.id = data.id
		this.content = data.content
		// this.image_id = data.image_id

	}

	render() {
		return `<li>${this.content}</li>`
	}
}
