import { useState } from 'react'
import { User, ReplyData } from "../../models"
import './Reply.css'

import plus_icon from '../../assets/images/icon-plus.svg'
import minus_icon from '../../assets/images/icon-minus.svg'
import reply_icon from '../../assets/images/icon-reply.svg'
import delete_icon from '../../assets/images/icon-delete.svg'
import edit_icon from '../../assets/images/icon-edit.svg'

import ReplyAdder from '../ReplyAdder/ReplyAdder'
import DeleteModal from '../deleteModal/deleteModal'

interface Props{
  key: number,
  id: number,
  content: string,
  createdAt: string,
  score: number,
  replyingTo: string,
  user: User,
  currUser: User,
  addReplyRequest: (newReply: ReplyData) => void,
  deleteCommentRequest: (id: number, type: string) => void,
}

interface State{
  id: number,
  content: string,
  createdAt: string,
  score: number,
  replyingTo: string,
  user: User,
  currUser: User,
  replyClicked: boolean,
  editEnable: boolean,
  deleteClicked: boolean,
}

const Reply = ({id, content, createdAt, score, replyingTo, user, currUser, addReplyRequest, deleteCommentRequest}: Props) =>{
  
  const [data, setData] = useState<State>({
    id: id,
    content: content,
    createdAt: createdAt,
    score: score,
    replyingTo: replyingTo,
    user: user,
    currUser: currUser,
    replyClicked: false,
    editEnable: false,
    deleteClicked: false,
  })

  const editSwitch = () =>{
    setData((prevData: State) =>{
      return({
        ...prevData,
        editEnable: !prevData.editEnable,
      })
    })
  }

  const updateScore = (modifier: number) =>{
    setData((prevData: State) =>{
      return({
      ...prevData,
      score: Math.max(prevData.score + modifier, 0), 
      })
    })
  }

  const toggleReplyClicked = () =>{
    setData((prevData: State) =>{
      return({
      ...prevData,
      replyClicked: !prevData.replyClicked, 
      })
    })
  }

  const handleReplyRequest = (newReply: ReplyData) =>{
    toggleReplyClicked()
    addReplyRequest(newReply)
  }


  
  const setDeleteClicked = (value: boolean) =>{
    setData((prevData: State) =>{
      return ({
        ...prevData,
        deleteClicked: value
      })
    })
  }
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setData({...data, content: e.target.value.slice(e.target.value.indexOf(',') + 1)})
  }
  
  return (
  <div className='comment-container'>
    <div className='comment-card'>
      <div className='comment-score desktop-view'>
        <img 
          src={plus_icon} className='score-icons plus-icon' onClick={() => updateScore(1)} alt='score plus button'
        />
        <span className='score-value'>{data.score}</span>
        <img 
          src={minus_icon} className='score-icons minus-icon' onClick={() => updateScore(-1)} alt='score minus button'
        />
      </div>
      <div className='comment-content'>
        <div className='comment--header'>
          <div className='primary-data'>
            <img
              src={data.user.image.png} className='commentor-profile-pic' alt={`${user.username} profile pic`}
            />
            <span className='commentor-username'>{data.user.username}</span>
            {data.user.username === currUser.username && (
              <div className='currUser-marker'>
                <span>you</span>
              </div>
            )}
            <span className='comment-age'>{createdAt}</span>
          </div>
          <div className='comment-buttons desktop-view'>
            {data.user.username === data.currUser.username &&
              <div className='delete-button' onClick={()=> setDeleteClicked(true)}>
                <img src={delete_icon} alt='delete button'/>
                <span>Delete</span>
              </div>
            }
            {(data.user && data.user.username === data.currUser.username) ?
              (data.editEnable ? 
                <div className='edit-button'>
                  <img src={edit_icon}  alt='edit button'/>
                  <span>Edit</span>
                </div> 
                :
                <div className='edit-button' onClick={()=> editSwitch()}>
                  <img src={edit_icon}  alt='edit button'/>
                  <span>Edit</span>
                </div>
              )
              :
              <div className='reply-button' onClick={()=> toggleReplyClicked()}>
                <img src={reply_icon} className='reply-icon' alt='reply button'/>
                <span>Reply</span>
              </div>
            }
          </div>
        </div>
        {(data.content && data.content.length > 0 && data.editEnable) ?
          <div className='comment-edit-container'>
            <textarea className='comment-message-edit' onChange={(e) =>handleChange(e)}>
              {`@${data.replyingTo}, ${data.content}`}
            </textarea>
            <button className='update-button' onClick={()=> editSwitch()}>
              UPDATE
            </button>
          </div>
          :
          <p className='comment-message'>
            <span className='reply-target'>{`@${data.replyingTo} `}</span>
            {data.content}
          </p>
        }
        <div className='comment--footer mobile-view'>
          <div className='comment-score'>
            <img 
              src={plus_icon} className='score-icons plus-icon' onClick={() => updateScore(1)} alt='score plus button'
            />
            <span className='score-value'>{data.score}</span>
            <img 
              src={minus_icon} className='score-icons minus-icon' onClick={() => updateScore(-1)} alt='score minus button'
            />
          </div>
          <div className='comment-buttons mobile-view'>
            {data.user.username === data.currUser.username &&
              <div className='delete-button' onClick={()=> setDeleteClicked(true)}>
                <img src={delete_icon} alt='delete button'/>
                <span>Delete</span>
              </div>
            }
            {(data.user && data.user.username === data.currUser.username) ?
              <div className='edit-button' onClick={()=> editSwitch()}>
                <img src={edit_icon} alt='edit button'/>
                <span>Edit</span>
              </div> 
              :
              <div className='reply-button' onClick={()=> toggleReplyClicked()}>
                <img src={reply_icon} className='reply-icon' alt='reply button'/>
                <span>Reply</span>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
    {data.replyClicked &&
      <div className='reply-adder'>
        <ReplyAdder 
          username={data.currUser.username}
          image={data.currUser.image}
          replyingTo={data.user.username} 
          addReplyRequest={handleReplyRequest}
        />
      </div>
    }
    {data.deleteClicked &&
      <DeleteModal
        setDeleteClicked={setDeleteClicked}
        deleteCommentRequest={deleteCommentRequest}
        id={data.id}
        type={'reply'}
      />
    }
  </div>
  )
}

export default Reply