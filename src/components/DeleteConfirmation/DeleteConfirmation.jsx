import './DeleteConfirmation.css'

export default function DeleteConfirmation({handleDeleteCampaign, onDeleteClick, campaign}) {
    return (
        <div className='delete-confirmation'>
            <p>Are you sure you want to delete <span style={{color: '#5271FF', fontWeight: 'bold'}}>{campaign.name}</span>?</p>
            <button onClick={handleDeleteCampaign}>Yes, I'm sure</button>
            <button onClick={onDeleteClick}>Cancel</button>
        </div>
    )
}