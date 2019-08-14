const searchData = new URLSearchParams(window.location.search);
const token = searchData.get('token');
main(token)

async function main(token) {
    try {
        await verifyUser(token)
        window.location.replace("https://google.com");
    } catch (error) {
        alert(error);
    }
}

async function verifyUser(token) {
    const headers = { headers: { 'Token': token } };
    const body = JSON.stringify({});
    const url = 'https://dev.cordia.app/v1/user/verify';
    return axios.post(url, body, headers);
}