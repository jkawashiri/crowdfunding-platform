import sendRequest from "./send-request"
const BASE_URL = '/api/campaigns'

export function createItem(campaignId, update) {
    return sendRequest(`${BASE_URL}/${campaignId}/updates`, 'POST', update)
}