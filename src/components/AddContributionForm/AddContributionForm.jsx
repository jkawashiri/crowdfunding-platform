import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function AddContributionForm({campaignId, addContribution, daysUntilClose, user}) {
    const [contribution, setContribution] = useState({amount: 0})
    const [clicked, setClicked] = useState(true)
    const [campaignClosed, setCampaignClosed] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (daysUntilClose <= 0) {
            onCampaignClose()
        }
    }, [daysUntilClose])

    function handleForm(evt) {
        const value = evt.target.name === 'amount' ? parseFloat(evt.target.value) : evt.target.value
        setContribution(contribution => ({...contribution, [evt.target.name]: value}))
    }

    async function handleAddContribution(evt) {
        evt.preventDefault()
        await addContribution(campaignId, {amount: contribution.amount})
        setContribution({amount: 0})
    }

    function onClick() {
        if (!user) {
            navigate('/auth')   
        } else {
            setClicked(clicked => !clicked )
        }
    }

    function onCampaignClose() {
        setCampaignClosed(true)
    }
    return (
        <>
            { !campaignClosed && (
                clicked ?
                    <button onClick={onClick}>Contribute to this campaign!</button>
                :
                    <>
                        <button onClick={onClick}>Contribute to this campaign!</button>
                        <form onSubmit={(evt) => {handleAddContribution(evt); onClick();}}>
                            <label>Amount:</label>
                                <input type="number" name="amount" onChange={handleForm} value={contribution.amount}></input>
                            <button type="submit">Back this project!</button>
                        </form>
                    </>
                
            )}
        </>
    )
}