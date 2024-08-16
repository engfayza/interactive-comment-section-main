import { useEffect, useState } from 'react'
import './App.css'

// import Adder from './components/Adder/Adder'
import CommentAdder from './components/CommentAdder/CommentAdder'
import Comment from './components/Comment/Comment'
import { User, CommentData, ReplyData, QueryData } from './models'

function App() {
  const [currUser, setCurrUser] = useState<User>({
    username: '',
    image:{
      png: '',
      webp: '',
    },
  })

  const [comments, setComments] = useState<Array<CommentData>>([])

  useEffect(() => {
    const fetchData = async () => {
      await fetch('./data.json') 
        .then((res) => res.json())
        .then((data: QueryData) => {
          console.log(data)

          setCurrUser(data.currentUser)
          setComments(data.comments)
        })
    }
    fetchData().catch(err =>{
      console.log(err)
    });
  }, [])

  const addComment = (newComment: CommentData) =>{
    setComments((prevComments: Array<CommentData>) => {
      return [...prevComments, newComment]
    })
  }

  const addReply = (parentId: number, newReply: ReplyData) => {
    let updatedComments: Array<CommentData> = [...comments]
    let updatedReplies: Array<ReplyData> = []

    updatedComments.forEach((comment) =>{
      if(comment.id === parentId){
        updatedReplies = [...comment.replies, newReply]
        comment.replies = updatedReplies
      }
    })

    setComments(updatedComments)
  }

  const deleteComment = (id: number, type: string, parentId: number) =>{
    let updatedComments: Array<CommentData> = [...comments]
    let updatedReplies: Array<ReplyData> = []

    if (type === 'comment'){
      updatedComments = updatedComments.filter((comment) => comment.id !== id)
    }
    else if (type === 'reply'){
      updatedComments.forEach((comment) => {
        if (comment.id === parentId) {
          updatedReplies = comment.replies.filter((reply) => reply.id !== id)
          comment.replies = updatedReplies
        }
      })
    }
    setComments(updatedComments)
  }

  return (
    <main className='app'>
      {comments.map(items =>{
        return (
          <Comment
            key={items.id}
            id={items.id}
            content={items.content}
            createdAt={items.createdAt}
            score={items.score}
            user={items.user}
            replies={items.replies}
            currUser={currUser}
            addReply={addReply}
            deleteComment={deleteComment}
          />
        )
      })}
      {currUser.username && currUser.username.length > 0 &&
        <CommentAdder
          username={currUser.username}
          image={currUser.image}
          replyingTo=''
          addComment={addComment}
        />
      }
    </main>
  )
}

export default App
