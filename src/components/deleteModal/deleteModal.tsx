
import './deleteModal.css'

interface Props{
  setDeleteClicked: (value: boolean) => void,
  deleteCommentRequest: (id: number, type: string) => void,
  id: number,
  type: string,
}

const DeleteModal = ({setDeleteClicked, deleteCommentRequest, id, type}: Props) =>{

  const cancelClicked = () =>{
    setDeleteClicked(false)
  }

  const deleteClicked = () =>{
    deleteCommentRequest(id, type)
    setDeleteClicked(false)
  }

  return (
    <div className='delete-wrapper'>
      <div className='delete-container'>
        <h1 className='delete-title'>
          Delete comment
        </h1>
        <div className="confirmation-message">
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </div>
        <div className='button-container'>
          <button
            className='cancel-button'
            onClick={()=> cancelClicked()}
          >
            NO, CANCEL
          </button>
          <button
            className='delete-button'
            onClick={()=> deleteClicked()}
          >
            YES, DELETE
          </button>
        </div>
      </div>
    </div>

  )
}

export default DeleteModal