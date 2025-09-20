const CLIENT_ID = '20e85ef50f67458696d40b008bb02b26';
const CLIENT_SECRET = 'd0e7d5a0c0f94acba817393e0d241557';

export const requestToken = async () => {
    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials'
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error:', error);
    }
}