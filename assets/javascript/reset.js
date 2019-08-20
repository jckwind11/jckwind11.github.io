document.addEventListener('DOMContentLoaded', function () {
    // TODO: Implement getParameterByName()

    // Get the one-time code from the query parameter.
    const searchData = new URLSearchParams(window.location.search);
    const actionCode = searchData.get('oobCode');

    // Configure the Firebase SDK.
    // This is the minimum configuration required for the API to be used.
    const config = { 'apiKey': "AIzaSyBVFrJiXqMr4H0n3W0TFD3Y8JBqxdB_Akc" };
    var app = firebase.initializeApp(config);
    var auth = app.auth();

    // Handle the user management action.
    if (actionCode) {
        handleResetPassword(auth, actionCode)
    } else {
        document.getElementById("statusLabel").innerHTML = "Invalid token";
        document.getElementById("reasonLabel").innerHTML = "Could not find verification token";
    }
}, false);

function handleResetPassword(auth, actionCode) {
    document.getElementById("mainIcon").className = "LoadingDisk";
    auth.verifyPasswordResetCode(actionCode).then(function (email) {
        document.getElementById("mainIcon").className = "Disk";
        document.getElementById("statusLabel").innerHTML = `Change password for <em>${email}</em>`;
        document.getElementById("reasonLabel").innerHTML = "Please enter a new password below";
        // TODO: Show the reset screen with the user's email and ask the user for
        // the new password.

        // Save the new password.
        auth.confirmPasswordReset(actionCode, newPassword).then(function (resp) {
            document.getElementById("statusLabel").innerHTML = "Your password has successfully been changed!";
            document.getElementById("reasonLabel").innerHTML = "You can now return to Cordia and login using your new password";
        }).catch(function (error) {
            document.getElementById("mainIcon").className = "Disk";
            document.getElementById("statusLabel").innerHTML = "Uh Oh. Something went wrong";
            document.getElementById("reasonLabel").innerHTML = "Either your password was too weak or your verification token is invalid or expired. Please try to reset the password again"
        });
    }).catch(function (error) {
        updateUI("Invalid verification token", error, false);
    });
}

function updateUI(title, reason, load) {
    const loading = load == true;
    document.getElementById("mainIcon").className = (loading) ? "LoadingDisk" : "Disk";
    document.getElementById("statusLabel").innerHTML = title;
    document.getElementById("reasonLabel").innerHTML = reason;
}