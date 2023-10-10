import AddCommentForm from "../AddCommentForm/AddCommentForm"
import Comment from "../Comment/Comment"
import './CampaignComments.css'

export default function CampaignComments({addComment, comments, campaignId, deleteComment}) {
    return (
        <>
            <h1>Comments</h1>
            { comments.length > 0 ?
                <ul className="comments-list">
                    {comments.map((comment, idx) => (
                        <Comment comment={comment} campaignId={campaignId} deleteComment={deleteComment} key={idx} />
                    ))}
                </ul>
            :
                <h3>No Comments Yet!</h3>
            }
            <AddCommentForm addComment={addComment} campaignId={campaignId} />
        </>
    )
}