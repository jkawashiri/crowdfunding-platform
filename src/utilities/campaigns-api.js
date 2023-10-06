import sendRequest from "./send-request"
const BASE_URL = '/api/campaigns'

export function getAll() {
    return sendRequest(BASE_URL)
}

export function createItem(campaign) {
    return sendRequest(BASE_URL, 'POST', campaign)
}

export function editItem(campaignId, updatedCampaign) {
    return sendRequest(`${BASE_URL}/${campaignId}`, 'PUT', updatedCampaign)
}

export function deleteItem(campaignId) {
    return sendRequest(`${BASE_URL}/${campaignId}`, 'DELETE')
}