import { useState } from "react"
import './AddCommentForm.css'
import { VscSend } from 'react-icons/vsc'

export default function AddCommentForm({addComment, campaignId}) {
    const [comment, setComment] = useState({comment: ''})

    function handleForm(evt) {
        setComment(comment => ({...comment, [evt.target.name]: evt.target.value}))
    }

    async function handleAddComment(evt) {
        evt.preventDefault()
        await addComment(campaignId, {comment: comment.comment})
        setComment({comment: ''})
    }
    return (
        <form onSubmit={handleAddComment} className="comment-form">
            <textarea name="comment" onChange={handleForm} value={comment.comment} className="comment-box"></textarea>
            <button type="submit" className="form-button"> Post Comment <VscSend size={20} style={{marginLeft:"5px"}} /></button>
        </form>
    )
}