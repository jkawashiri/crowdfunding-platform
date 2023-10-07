import AuthPage from '../AuthPage/AuthPage';
import NavBar from '../../components/NavBar/NavBar';
import NewCampaignPage from "../../pages/NewCampaignPage/NewCampaignPage";
import CampaignPage from '../CampaignPage/CampaignPage';
import HomePage from '../HomePage/HomePage';
import './App.css';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getUser } from '../../utilities/users-service';

export default function App() {
  const [user, setUser] = useState(getUser())
  const [campaigns, setCampaigns] = useState([])
  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage campaigns={campaigns} setCampaigns={setCampaigns} />} />
            <Route path="/campaigns/new" element={<NewCampaignPage campaigns={campaigns} setCampaigns={setCampaigns} />} />
            <Route path="/campaigns/:id" element={<CampaignPage />} />
          </Routes>
        </>
        :
        <AuthPage setUser={setUser} />
      }
    </main>
  );
}
