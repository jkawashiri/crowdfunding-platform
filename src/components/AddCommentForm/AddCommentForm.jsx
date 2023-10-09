import { useState } from "react"

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
        <form onSubmit={handleAddComment}>
            <textarea name="comment" onChange={handleForm} value={comment.comment}></textarea>
            <button type="submit">Comment</button>
        </form>
    )
}