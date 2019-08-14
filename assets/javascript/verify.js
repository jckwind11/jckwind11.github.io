const searchData = new URLSearchParams(window.location.search);
const token = searchData.get('token');
main(token)

async function main(token) {
    if (token) {
        try {
            await verifyUser(token)
            window.location.replace("https://cordia.app/verified");
        } catch (error) {
            alert(error);
            const code = error.response.status;
            document.getElementById("statusLabel").innerHTML = errorMessage((code) ? code : 502);
        }
    } else {
        document.getElementById("statusLabel").innerHTML = "Site not found";
    }
}

async function verifyUser(token) {
    const headers = { headers: { 'Token': token } };
    const body = JSON.stringify({});
    const url = 'https://dev.cordia.app/v1/user/verify';
    return axios.post(url, body, headers);
}

const errorMessage = (code) => {
    switch (code) {
        case 401:
            return ""
        case 404:
            return ""
        default:
            return "Uh oh. An unknown error occured. Please try again later"
    }
}