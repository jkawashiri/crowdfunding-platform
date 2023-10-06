import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import NewCampaignPage from "../../pages/NewCampaignPage/NewCampaignPage";
import Campaign from '../../components/Campaign/Campaign';
import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';
import * as campaignsAPI from '../../utilities/campaigns-api';

export default function App() {
  const [user, setUser] = useState(getUser())
  const [campaigns, setCampaigns] = useState([])

  useEffect(function() {
    async function getCampaigns() {
      const campaigns = await campaignsAPI.getAll()
      setCampaigns(campaigns)
    }
    getCampaigns()
  }, [])
  return (
    <main className="App">
      { user ?
        <>
          <Routes>
            <Route path="/campaigns/new" element={<NewCampaignPage campaigns={campaigns} setCampaigns={setCampaigns} />} />
          </Routes>
          <NavBar user={user} setUser={setUser} />
          {campaigns.map((campaign, idx) => (
            <Campaign campaign={campaign} key={idx} />
          ))}
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
