/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */

export default {
    sendLinks( postLinks: string[], postTags: boolean) {
        return fetch('/api/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tags: postTags,
                links: postLinks
            })
        })
    }
}