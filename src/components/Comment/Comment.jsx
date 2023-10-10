export default function Comment({comment, campaignId, deleteComment}) {
    async function handleDeleteComment() {
        await deleteComment(campaignId, comment._id)
    }
    return (
        <li>
            {comment.comment} - {comment.userName}
            <button onClick={handleDeleteComment}>X</button>
        </li>
    )
}