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
                    <div style={{fontWeight:'bold', fontSize:'2vmin'}}>
                        Raise Goal: <span style={{color:'#10a275'}}>${formattedRaiseGoal}</span>
                    </div>
                    <div style={{fontWeight:'bold', fontSize:'2vmin'}}>
                        Close Date: <span style={{color:'#ff6c6c'}}>{formattedDate}</span>
                    </div>
                    <br />
                    <div style={{textAlign:'left', whiteSpace:'pre-line', paddingBottom:'20px'}}>{campaign.description}</div>
                </motion.div>
            </AnimatePresence>
        </>
    )
}