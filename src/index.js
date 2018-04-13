document.addEventListener('DOMContentLoaded', function() {
	const imageId = 7 //Enter your assigned imageId here
	const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
	const likeURL = `https://randopic.herokuapp.com/likes/`
	const commentsURL = `https://randopic.herokuapp.com/comments/`

	const imgElement = document.getElementById('image')
	const commentsList = document.getElementById('comments')
	const commentForm = document.getElementById('comment_form')
	// const likeButton = document.getElementById('like_button')
	const likes = document.getElementById('likes')


	commentForm.addEventListener('submit', submitComment)
	document.addEventListener('click', buttonClick)

	fetch(imageURL).then(r=>r.json()).then(json=>createImage(json))


	function createImage(data){
	  image = new Image(data)
	  imgElement.src = image.url
	  image.comments.forEach(function(c) {
	  	
	  	comment = new Comment(c)
	  	commentElement = document.createElement('li')
		commentElement.innerHTML = comment.render()
		commentElement.dataset.commentId = comment.id
	  	commentsList.appendChild(commentElement)


	  })
	  likes.innerHTML = image.like_count
	}

	function submitComment(e){
		e.preventDefault()
		comment = new Comment({content:e.target.comment.value})
		commentElement = document.createElement('li')
		commentElement.innerHTML = comment.render()
		commentsList.appendChild(commentElement)

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
		fetch(commentsURL, config).then(r=>r.json()).then(json => {
			comment.id = json.id
			commentElement.dataset.commentId = comment.id
		})
		e.target.reset()
	}

	function buttonClick(e){
		if (e.target.id === 'like_button'){
			addLike()
		} else if (e.target.className === 'delete_button'){
			deleteComment(e.target.parentNode.dataset.commentId)
		}

	}

	function addLike(){
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

	function deleteComment(id){
		commentElement = document.querySelector(`[data-comment-id='${id}']`)
		commentsList.removeChild(commentElement)

		deleteURL = commentsURL + `/${id}`
		config = {
			method:'DELETE'
		}

		fetch(deleteURL, config)
	}



})
