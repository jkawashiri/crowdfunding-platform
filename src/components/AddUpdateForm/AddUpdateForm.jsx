import { useState } from "react"

export default function AddUpdateForm({addUpdate, campaignId}) {
    const [update, setUpdate] = useState({update: ''})

    function handleForm(evt) {
        setUpdate(update => ({...update, [evt.target.name]: evt.target.value}))
    }

    async function handleAddUpdate(evt) {
        evt.preventDefault()
        await addUpdate(campaignId, {update: update.update})
        setUpdate({update: ''})
    }
    return (
        <form onSubmit={handleAddUpdate}>
            <textarea name="update" onChange={handleForm} value={update.update}></textarea>
            <button type="submit">Post Update</button>
        </form>
    )
}