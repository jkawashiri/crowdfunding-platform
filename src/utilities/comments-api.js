import sendRequest from "./send-request"
const BASE_URL = '/api/campaigns'

export function createItem(campaignId, comment) {
    return sendRequest(`${BASE_URL}/${campaignId}/comments`, 'POST', comment)
}