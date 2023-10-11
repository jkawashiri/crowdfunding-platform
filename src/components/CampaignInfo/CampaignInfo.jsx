import { Link, Routes, Route } from "react-router-dom"
import { useState } from "react"
import CampaignDescription from "../CampaignDescription/CampaignDescription"
import CampaignUpdates from "../CampaignUpdates/CampaignUpdates"
import CampaignComments from "../CampaignComments/CampaignComments"
import './CampaignInfo.css'
import { motion } from "framer-motion"

export default function CampaignInfo({description, addComment, comments, campaignId, deleteComment, addUpdate, updates}) {
    const [selectedTab, setSelectedTab] = useState('description')
    return (
        <>
        <div className="window-container">
            <div className="window">
                <nav>
                    <motion.div layout>
                        <Link 
                            to={`description`} 
                            className={selectedTab === 'description' ? 'selected' : ''} 
                            onClick={() => setSelectedTab('description')}
                        >
                            Description
                            {selectedTab === 'description' ? (
                                <motion.div className="underline" layoutId="underline" />
                            ) : null}
                        </Link>
                    </motion.div>
                    <motion.div layout>
                        <Link 
                            to={`updates`} 
                            className={selectedTab === 'updates' ? 'selected' : ''} 
                            onClick={() => setSelectedTab('updates')}
                        >
                            Updates
                            {selectedTab === 'updates' ? (
                                <motion.div className="underline" layoutId="underline" />
                            ) : null}
                        </Link>
                    </motion.div>
                    <motion.div layout>
                        <Link 
                            to={`comments`} 
                            className={selectedTab === 'comments' ? 'selected' : ''} 
                            onClick={() => setSelectedTab('comments')}
                        >
                            Comments
                            {selectedTab === 'comments' ? (
                                <motion.div className="underline" layoutId="underline" />
                            ) : null}
                        </Link>
                    </motion.div>
                </nav>
                <Routes>
                    <Route path="/" element={<CampaignDescription description={description} />} index />
                    <Route path="description" element={<CampaignDescription description={description} />} />
                    <Route path="updates" element={<CampaignUpdates addUpdate={addUpdate} updates={updates} campaignId={campaignId} />} />
                    <Route path="comments" element={<CampaignComments addComment={addComment} comments={comments} campaignId={campaignId} deleteComment={deleteComment} />} />
                </Routes>
            </div>
        </div>
        </>
    )
}