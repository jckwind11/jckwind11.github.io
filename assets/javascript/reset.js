document.addEventListener('DOMContentLoaded', function () {
    // Get the one-time code from the query parameter.
    const searchData = new URLSearchParams(window.location.search);
    const actionCode = searchData.get('oobCode');
    const apiKey = searchData.get('apiKey');

    if (apiKey) {
        const config = { 'apiKey': apiKey };
        const app = firebase.initializeApp(config);
        const auth = app.auth();

        // Handle the user management action.
        if (actionCode) {
            handleResetPassword(auth, actionCode)
        } else {
            document.getElementById("statusLabel").innerHTML = "Invalid token";
            document.getElementById("reasonLabel").innerHTML = "Could not find verification token";
        }
    } else {
        document.getElementById("statusLabel").innerHTML = "Connectivity issue";
        document.getElementById("reasonLabel").innerHTML = "Could not securely connect to our servers";
    }
}, false);

function handleResetPassword(auth, actionCode) {
    document.getElementById("mainIcon").className = "LoadingDisk";
    auth.verifyPasswordResetCode(actionCode).then(function (email) {
        updateUI(`Change password for <em>${email}</em>`, "Please enter a new password below", false);
        document.getElementById("confirmButton").hidden = false;
        document.getElementById("inputField").hidden = false;
        document.getElementById("confirmButton").addEventListener("click", function () {
            changePassword(auth, actionCode);
        });
    }).catch(function (error) {
        // "Your verification token is invalid or expired. Please try to reset the password again"
        updateUI("Invalid verification token", error, false);
    });
}

function updateUI(title, reason, load) {
    const loading = load == true;
    document.getElementById("mainIcon").className = (loading) ? "LoadingDisk" : "Disk";
    document.getElementById("statusLabel").innerHTML = title;
    document.getElementById("reasonLabel").innerHTML = reason;
}

function changePassword(auth, actionCode) {
    document.getElementById("mainIcon").className = "LoadingDisk";
    document.getElementById("confirmButton").disabled = true;
    document.getElementById("inputField").disabled = true;
    const password = document.getElementById("inputField").value;
    auth.confirmPasswordReset(actionCode, password).then(function () {
        updateUI("Your password has successfully been changed!",
            "You can now return to Cordia and login using your new password", false);
    }).catch(function (error) {
        document.getElementById("confirmButton").disabled = false;
        document.getElementById("inputField").disabled = false;
        updateUI(error.code,
            "Either your password was too weak or your verification token is invalid or expired. Please try to reset the password again", false);
    }).finally(function () {
        document.getElementById("mainIcon").className = "Disk";
    });
}