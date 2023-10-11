import Update from "../Update/Update"
import AddUpdateForm from "../AddUpdateForm/AddUpdateForm"
import './CampaignUpdates.css'
import { motion, AnimatePresence } from "framer-motion"

export default function CampaignUpdates({addUpdate, updates, campaignId}) {
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
                    { updates.length > 0 ?
                        <ul className="updates-list">
                            {updates.map((update, idx) => (
                                <Update update={update} campaignId={campaignId} key={idx} />
                            ))}
                        </ul>
                    :
                        <h3>No Updates Yet!</h3>
                    }
                    <AddUpdateForm addUpdate={addUpdate} campaignId={campaignId} />
                </motion.div>
            </AnimatePresence>
        </>
    )
}