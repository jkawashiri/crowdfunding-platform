export default function Comment({comment}) {
    return (
        <li>
            {comment.comment} - {comment.userName}
        </li>
    )
}