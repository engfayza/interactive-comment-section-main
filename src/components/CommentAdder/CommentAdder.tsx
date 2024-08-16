import './CommentAdder.css'

import { useState} from 'react'
import { User, CommentData} from '../../models'

interface Props{
    username: string,
    image: {
        png: string,
        webp: string,
    }
    replyingTo: string,
    addComment: (newComment: CommentData)=> void,
}

interface State{
    currUser: User,
    replyingTo: string,
    text: string,
}

const CommentAdder = ({username, image, replyingTo, addComment}: Props) =>{

  const [context, setContext] = useState<State>({
    currUser: {
        username: username,
        image: image,
    },
    replyingTo: replyingTo,
    text: replyingTo ? `@${replyingTo}`: '',
  })

  const sendComment = () => {
    const newComment: CommentData = {
      id: Math.floor(Math.random() * 100) + 5,
      content: context.text,
      createdAt: 'Just Now',
      score: 0,
      user: context.currUser,
      replies: [],
    }

    addComment(newComment)
    setContext({...context, text: ''})
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext({...context, text: e.target.value})
  }

  return <div className='adder-section'>
    <div className='adder--body'>
      <img 
        src={context.currUser.image.png} 
        className='adder-profile desktop-view'
        alt='juliusomo profile pic'/>
      <textarea
        className='adder-textbox'
        placeholder='Add a comment...'
        value={context.text}
        onChange={(e) =>handleChange(e)}
      >
      </textarea>
      <button
        className='adder-send desktop-view'
        onClick={() =>sendComment()}
      >
        {replyingTo ? 'REPLY' : 'SEND'}
      </button>
    </div>
    <div className='adder--footer'>
      <img 
        src={context.currUser.image.png} 
        className='adder-profile'
        alt='juliusomo profile pic'/>
      <button
        className='adder-send'
        onClick={() =>sendComment()}
      >
        {replyingTo ? 'REPLY' : 'SEND'}
      </button>
    </div>
  </div>

}

export default CommentAdder