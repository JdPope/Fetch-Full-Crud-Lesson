document.addEventListener('DOMContentLoaded', ()=>{


  fetch('http://localhost:3000/comments')
    .then(response => response.json())
    .then(result => handleCommentData(result))


    function handleCommentData(comments){
      console.table(comments)
      comments.map(comment => {
          renderId(comment)
          renderComment(comment.content, comment.id)
      })
    }


    function renderId(comment){
      console.log('renderId', comment)
    }

    function renderComment(bananas, id){
      const commentsContainer = document.querySelector('#commentsUl')
      const commentContent = document.createElement('li')
      commentContent.textContent = bananas
      commentsContainer.appendChild(commentContent)
      createDeleteButton(commentContent, id)
    }


    function createDeleteButton(commentContent, id){
      const deleteButton = document.createElement('button')
      deleteButton.innerText = 'delete'
      commentContent.appendChild(deleteButton)
      deleteButton.addEventListener('click', event => deleteComment(id))
    }

    function deleteComment(id){
      console.log(id)
      event.target.parentNode.remove()
      fetch(`http://localhost:3000/comments/${id}`, {method:'DELETE'})
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


    function sendUserComment(formComment){
      fetch('http://localhost:3000/comments', {
        method:'POST',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({content:formComment})
      })
    }

})
