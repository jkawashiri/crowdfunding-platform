import Update from "../Update/Update"
import AddUpdateForm from "../AddUpdateForm/AddUpdateForm"
import './CampaignUpdates.css'
import { motion, AnimatePresence } from "framer-motion"

export default function CampaignUpdates({addUpdate, campaign, user}) {
    const campaignUpdates = campaign.updates
    return (
        <>
            <AnimatePresence mode='wait'>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Updates</h1>
                    { campaignUpdates.length > 0 ?
                        <ul className="updates-list">
                            {campaignUpdates.map((update, idx) => (
                                <Update update={update} campaignId={campaign._id} key={idx} />
                            ))}
                        </ul>
                    :
                        <h3>No Updates Yet!</h3>
                    }
                    { user._id === campaign.user ?
                        <AddUpdateForm addUpdate={addUpdate} campaignId={campaign._id} />
                    :
                        null          
                    }
                </motion.div>
            </AnimatePresence>
        </>
    )
}