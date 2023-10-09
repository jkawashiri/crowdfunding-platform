import sendRequest from "./send-request"
const BASE_URL = '/api/campaigns'

export function createItem(campaignId, contribution) {
    return sendRequest(`${BASE_URL}/${campaignId}/contributions`, 'POST', contribution)
}