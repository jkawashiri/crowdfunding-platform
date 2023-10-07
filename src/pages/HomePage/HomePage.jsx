import Campaign from "../../components/Campaign/Campaign"
import * as campaignsAPI from '../../utilities/campaigns-api';
import { useEffect } from "react";

export default function HomePage({campaigns, setCampaigns}) {
    useEffect(function() {
        async function getCampaigns() {
          const campaigns = await campaignsAPI.getAll()
          setCampaigns(campaigns)
        }
        getCampaigns()
      }, [])

    return (
        <>
            {campaigns.map((campaign, idx) => (
                <Campaign campaign={campaign} key={idx} />
            ))}
        </>
    )
}