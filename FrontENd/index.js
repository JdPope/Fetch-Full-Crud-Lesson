document.addEventListener('DOMContentLoaded', ()=>{
  const commentsUl = document.getElementById('commentsUl')
  const submitButton = document.getElementById('submit_Button')
  const textBox = document.getElementById('comments_input')

  fetch('http://localhost:3000/comments')
  .then(response => response.json())
  .then(result => {
    console.log(result)
    renderComments(result)
  })

  function renderComments(result){
    result.map(comment =>{
      let li = document.createElement('li')
      li.innerText = comment.content
      let deleteButton = document.createElement('button')
      deleteButton.innerText = 'delete'
      deleteButton.addEventListener('click', ()=>{
        event.target.parentNode.remove()
        deleteComment(comment.id)
      })
      li.appendChild(deleteButton)
      commentsUl.appendChild(li)
    })
  }
 
  submitButton.addEventListener('click', ()=>{
    event.preventDefault()
    let newComment = textBox.value
    postComment(newComment)
  })

  function postComment(newComment){
    fetch('http://localhost:3000/comments',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Accept':'application/json'
      },
      body:JSON.stringify({content:newComment})
    })
  }

  function deleteComment(chair){
    fetch(`http://localhost:3000/comments/${chair}`, {
      method:'DELETE'
    })
  }



})
