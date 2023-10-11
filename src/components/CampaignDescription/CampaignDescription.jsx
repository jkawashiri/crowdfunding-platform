import { motion, AnimatePresence } from "framer-motion"

export default function CampaignDescription({description}) {
    return (
        <>
            <AnimatePresence mode='wait'>
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -10, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1>Description</h1>
                    <div>{description}</div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}