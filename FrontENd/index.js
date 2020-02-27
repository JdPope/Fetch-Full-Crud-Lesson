document.addEventListener('DOMContentLoaded', ()=>{


  fetch('http://localhost:3000/comments')
    .then(response => response.json())
    .then(result => handleCommentData(result))


    function handleCommentData(comments){
      console.table(comments)
      comments.map(comment => {
          renderId(comment)
          renderComment(comment.content)
      })
    }


    function renderId(comment){
      console.log('renderId', comment)
    }

    function renderComment(bananas){
      const commentsContainer = document.querySelector('#commentsUl')
      const commentContent = document.createElement('li')
      commentContent.textContent = bananas
      commentsContainer.appendChild(commentContent)
    }


    const commentsForm = document.querySelector('#comments-form')

    commentsForm.addEventListener('submit', ()=>{
      event.preventDefault()
      getUserComment(commentsForm)
    })

    function getUserComment(commentsForm){
      const newFormData = new FormData(commentsForm)
      const formComment = newFormData.get('comment')
      renderComment(formComment)
      sendUserComment(formComment)
    }


    function sendUserComment(){
      //POST request will go here
    }

})
