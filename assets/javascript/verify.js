const searchData = new URLSearchParams(window.location.search);
const token = searchData.get('token');
main(token)

async function main(token) {
    if (token) {
        try {
            await verifyUser(token)
            window.location.replace("https://cordia.app/verified");
        } catch (error) {
            const code = error.response.status;
            document.getElementById("mainIcon").className = "Disk";
            document.getElementById("statusLabel").innerHTML = errorMessage((code) ? code : 502);
            document.getElementById("reasonLabel").innerHTML = errorExplaination((code) ? code : 502);
        }
    } else {
        document.getElementById("mainIcon").className = "Disk";
        document.getElementById("statusLabel").innerHTML = "Site not found";
        document.getElementById("reasonLabel").style.display = "none";
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
        case 403:
            return "Invalid request"
        case 404:
            return ""
        default:
            return "Uh Oh. Something went wrong "
    }
}

const errorExplaination = (code) => {
    switch (code) {
        case 401:
            return ""
        case 403:
            return "It appears you've already validated your email or the request expired. Please try verifying your account again"
        case 404:
            return ""
        default:
            return "An error occured and we don't know what it means. Please try again later while we figure it out"
    }
}