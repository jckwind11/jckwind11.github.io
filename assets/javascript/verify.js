const searchData = new URLSearchParams(window.location.search);
const token = searchData.get('token');
if (token) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        alert(this.status);
    };
    xhttp.open("POST", "https://dev.cordia.app/v1/user/verify", true);
    xhttp.setRequestHeader("Token", token);
    xhttp.send();
};
