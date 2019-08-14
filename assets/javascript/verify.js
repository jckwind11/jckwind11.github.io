const searchData = new URLSearchParams(window.location.search);
const token = searchData.get('token');
const headers = {
    headers: {
        'Token': token,
        "Access-Control-Allow-Origin" : "*"
    }
};
const body = {};
const url = `https://dev.cordia.app/v1/user/verify`;
axios.post(url, body, headers)
    .then(function (response) {
        // handle success
        console.log(response);
    })
    .catch(function (error) {
        alert(error);
        console.log(error);
    })