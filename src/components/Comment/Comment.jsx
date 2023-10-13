import './Comment.css'
import { MdOutlineClose } from 'react-icons/md'

export default function Comment({comment, campaignId, deleteComment, user}) {
    const formattedDate = new Date(comment.createdAt).toLocaleString()
    async function handleDeleteComment() {
        await deleteComment(campaignId, comment._id)
    }
    return (
        <li className="comment-item">
            <div className="comment-header">
                <div style={{fontSize:'2vmin', fontWeight:'bold'}}>{comment.userName} </div>
                { user && user._id === comment.user ?
                <   MdOutlineClose onClick={handleDeleteComment} className='delete-comment' />
                :
                    null
                }
            </div>
            <div className="comment-body">
                <div style={{color:'gray', fontSize:'1.5vmin'}}>{formattedDate}</div>
                <div style={{marginTop:'5px', fontSize: '1.75vmin', textAlign: 'left', whiteSpace:'pre-line'}}>{comment.comment}</div>
            </div>
        </li>
    )
}