import './Comment.css'
import { MdOutlineClose } from 'react-icons/md'

export default function Comment({comment, campaignId, deleteComment, user}) {
    const formattedDate = new Date(comment.createdAt).toLocaleString()
    async function handleDeleteComment() {
        await deleteComment(campaignId, comment._id)
    }
    return (
        <li className="comment-item">
            {comment.comment} - {comment.userName} - {formattedDate}
            { user && user._id === comment.user ?
                <MdOutlineClose onClick={handleDeleteComment} className='delete-comment' />
            :
                null
            }
        </li>
    )
}