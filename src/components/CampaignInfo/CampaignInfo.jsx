import { Link, Routes, Route } from "react-router-dom"
import { useState } from "react"
import CampaignOverview from "../CampaignOverview/CampaignOverview"
import CampaignUpdates from "../CampaignUpdates/CampaignUpdates"
import CampaignComments from "../CampaignComments/CampaignComments"
import './CampaignInfo.css'
import { motion } from "framer-motion"

export default function CampaignInfo({campaign, addComment, deleteComment, addUpdate, user, formattedDate, formattedRaiseGoal}) {
    const [selectedTab, setSelectedTab] = useState('overview')
    return (
        <div className="window-container">
            <div className="window">
                <nav className="campaign-info-nav">
                    <motion.div layout>
                        <Link 
                            to={`overview`} 
                            className={selectedTab === 'overview' ? 'selected' : ''} 
                            onClick={() => setSelectedTab('overview')}
                        >
                            Overview
                            {selectedTab === 'overview' ? (
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
                    <Route path="/" element={<CampaignOverview campaign={campaign} formattedDate={formattedDate} formattedRaiseGoal={formattedRaiseGoal} />} index />
                    <Route path="overview" element={<CampaignOverview campaign={campaign} formattedDate={formattedDate} formattedRaiseGoal={formattedRaiseGoal} />} />
                    <Route path="updates" element={<CampaignUpdates addUpdate={addUpdate} campaign={campaign} user={user} />} />
                    <Route path="comments" element={<CampaignComments addComment={addComment} comments={campaign.comments} campaignId={campaign._id} deleteComment={deleteComment} user={user} />} />
                </Routes>
            </div>
        </div>
    )
}