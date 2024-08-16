import './ReplyAdder.css'

import { useState } from 'react'
import { User, ReplyData } from '../../models'

interface Props{
  username: string,
  image: {
    png: string,
    webp: string,
  }
  replyingTo: string,
  addReplyRequest: (newReply: ReplyData) => void,
}

interface State {
  currUser: User,
  replyingTo: string,
  text: string,
}


const ReplyAdder = ({username, image, replyingTo, addReplyRequest}: Props) =>{

  const [context, setContext] = useState<State>({
    currUser: {
      username: username,
      image: image,
    },
    replyingTo: replyingTo,
    text: ``,
  })

  const sendReply = () =>{
    const newReply: ReplyData ={
      id: Math.floor(Math.random() * 100) + 5,
      content: context.text,
      createdAt: 'Just Now',
      score: 0,
      replyingTo: replyingTo,
      user: context.currUser,
    }

    addReplyRequest(newReply)
    setContext({...context, text: ''})
  }


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContext({...context, text: e.target.value.slice(e.target.value.indexOf(',') + 1)})
  }



  return <div className='replyadder-section'>
    <div className='adder--body'>
      <img 
        src={context.currUser.image.png} 
        className='adder-profile desktop-view'
        alt='juliusomo profile pic'
      />
      <textarea
        className='replyadder-textbox'
        placeholder='Add a reply...'
        
        onChange={(e) => handleChange(e)}
      >
        {`@${context.replyingTo}, ${context.text}`}
      </textarea>
      <button
        className='replyadder-send desktop-view'
        onClick={() => sendReply()}
      >
        REPLY
      </button>
    </div>
    <div className='adder--footer'>
      <img 
        src={context.currUser.image.png} 
        className='adder-profile'
        alt='juliusomo profile pic'/>
      <button
        className='adder-send'
        onClick={() =>sendReply()}
      >
        {replyingTo ? 'REPLY' : 'SEND'}
      </button>
    </div>
  </div>

}


export default ReplyAdder