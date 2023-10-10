export default function Comment({comment, campaignId, deleteComment}) {
    const formattedDate = new Date(comment.createdAt).toLocaleString()
    async function handleDeleteComment() {
        await deleteComment(campaignId, comment._id)
    }
    return (
        <li>
            {comment.comment} - {comment.userName} - {formattedDate}
            <button onClick={handleDeleteComment}>X</button>
        </li>
    )
}