export default function Update({update}) {
    const formattedDate = new Date(update.createdAt).toLocaleString()
    return (
        <li>
            {update.update} - {formattedDate}
        </li>
    )
}