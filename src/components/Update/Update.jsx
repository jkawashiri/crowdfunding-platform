import './Update.css'

export default function Update({update, idx}) {
    const formattedDate = new Date(update.createdAt).toLocaleString()
    const updateNumber = idx + 1
    return (
        <li className='update-item'>
            <div style={{fontSize:'3vmin'}}>Update #{updateNumber}</div>
            <div style={{color:'gray', fontSize:'1.5vmin'}}>{formattedDate}</div>
            <div style={{marginTop:'10px', fontSize:'2vmin', textAlign:'left', whiteSpace:'pre-line'}}>{update.update} </div>
        </li>
    )
}