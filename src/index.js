document.addEventListener('DOMContentLoaded', function() {
	const imageId = 7 //Enter your assigned imageId here
	const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
	const likeURL = `https://randopic.herokuapp.com/likes/`
	const commentsURL = `https://randopic.herokuapp.com/comments/`

	const imgElement = document.getElementById('image')
	const commentsList = document.getElementById('comments')
	const commentForm = document.getElementById('comment_form')
	const likeButton = document.getElementById('like_button')
	const likes = document.getElementById('likes')


	commentForm.addEventListener('submit', submitComment)
	likeButton.addEventListener('click', addLike)

	fetch(imageURL).then(r=>r.json()).then(json=>createImage(json))


	function createImage(data){
	  image = new Image(data)
	  imgElement.src = image.url
	  image.comments.forEach(function(c) {
	  	
	  	comment = new Comment(c)
	  	commentsList.innerHTML += comment.render()

	  })
	  likes.innerHTML = image.like_count
	}

	function submitComment(e){
		e.preventDefault()
		comment = new Comment({content:e.target.comment.value})
		commentsList.innerHTML += comment.render()

		config = {
			method:'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image_id: imageId,
				content: comment.content
			})
		}
		console.log(config)
		fetch(commentsURL, config).then(r=>r.json()).then(json=>console.log(json))
		e.target.reset()
	}

	function addLike(e){
		let count = parseInt(likes.innerHTML)
		likes.innerHTML = (count + 1).toString()
		config = {
			method:'POST',
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				image_id: imageId,
			})
		}
		fetch(likeURL, config)//.then(r=>r.json()).then(json=>console.log(json))
	}



})
