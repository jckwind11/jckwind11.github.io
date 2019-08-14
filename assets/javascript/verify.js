const searchData = new URLSearchParams(window.location.search);
const token = searchData.get('token');
const headers = { headers: { 'Token': token } };
const body = JSON.stringify({});
const url = `https://dev.cordia.app/v1/user/verify`;
axios.post(url, body, headers)
    .then(function (response) {
        alert('You have been verified!')
        console.log(response);
    })
    .catch(function (error) {
        alert(error);
        console.log(error);
    })