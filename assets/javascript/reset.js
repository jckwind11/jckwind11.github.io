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
        updateUI(`Change password for <em>${email}</em>`, "Please enter a new password below", false);
        // Save the new password.
        auth.confirmPasswordReset(actionCode, "hehehe").then(function (resp) {
            updateUI("Your password has successfully been changed!",
                "You can now return to Cordia and login using your new password", false);
        }).catch(function (error) {
            updateUI("Uh Oh. Something went wrong",
                "Either your password was too weak or your verification token is invalid or expired. Please try to reset the password again", false);
        });
    }).catch(function (error) {
        updateUI("Invalid verification token",
            "Your verification token is invalid or expired. Please try to reset the password again", false);
    });
}

function updateUI(title, reason, load) {
    const loading = load == true;
    document.getElementById("mainIcon").className = (loading) ? "LoadingDisk" : "Disk";
    document.getElementById("statusLabel").innerHTML = title;
    document.getElementById("reasonLabel").innerHTML = reason;
}