export default function DeleteConfirmation({handleDeleteCampaign, onDeleteClick}) {
    return (
        <>
            <p>Are you sure you want to delete?</p>
            <button onClick={handleDeleteCampaign}>Yes, I'm sure</button>
            <button onClick={onDeleteClick}>Cancel</button>
        </>
    )
}