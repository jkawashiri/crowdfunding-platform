import sendRequest from "./send-request"
const BASE_URL = '/api/campaigns'

export function createItem(campaignId, comment) {
    return sendRequest(`${BASE_URL}/${campaignId}/comments`, 'POST', comment)
}

export function deleteItem(campaignId, commentId) {
    return sendRequest(`${BASE_URL}/${campaignId}/comments/${commentId}`, 'DELETE')
}