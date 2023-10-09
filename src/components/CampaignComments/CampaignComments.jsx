import AddCommentForm from "../AddCommentForm/AddCommentForm"
import Comment from "../Comment/Comment"

export default function CampaignComments({addComment, comments, campaignId}) {
    return (
        <>
            <h1>Comments</h1>
            { comments.length > 0 ?
                <ul>
                    {comments.map((comment, idx) => (
                        <Comment comment={comment} key={idx} />
                    ))}
                </ul>
            :
                <h3>No Comments Yet!</h3>
            }
            <AddCommentForm addComment={addComment} campaignId={campaignId} />
        </>
    )
}