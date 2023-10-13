import { motion, AnimatePresence } from "framer-motion"

export default function CampaignOverview({campaign, formattedDate, formattedRaiseGoal}) {
    return (
        <>
            <AnimatePresence mode='wait'>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Overview</h1>
                    <div>{campaign.description}</div>
                    <div>Raise Goal: ${formattedRaiseGoal}</div>
                    <div>Close Date: {formattedDate}</div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}