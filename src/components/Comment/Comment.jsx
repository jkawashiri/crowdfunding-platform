export default function Comment({comment, campaignId, deleteComment, user}) {
    const formattedDate = new Date(comment.createdAt).toLocaleString()
    async function handleDeleteComment() {
        await deleteComment(campaignId, comment._id)
    }
    return (
        <li>
            {comment.comment} - {comment.userName} - {formattedDate}
            { user && user._id === comment.user ?
                <button onClick={handleDeleteComment}>X</button>
            :
                null
            }
        </li>
    )
}