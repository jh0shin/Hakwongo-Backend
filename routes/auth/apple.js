// api for apple auth callback

var express = require('express');
var router = express.Router();

// for apple login
const AppleAuth = require("apple-auth");
const jwt = require("jsonwebtoken");

// for env variable
const dotenv = require('dotenv');
dotenv.config();

// The callback route used for Android, which will send the callback parameters from Apple into the Android app.
// This is done using a deeplink, which will cause the Chrome Custom Tab to be dismissed and providing the parameters from Apple back to the app.
router.post("/callbacks/sign_in_with_apple", (request, response) => {
    const redirect = `intent://callback?${new URLSearchParams(
        request.body
    ).toString()}#Intent;package=${
        process.env.ANDROID_PACKAGE_IDENTIFIER
    };scheme=signinwithapple;end`;

    console.log(`Redirecting to ${redirect}`);

    response.redirect(307, redirect);
});
  
// Endpoint for the app to login or register with the `code` obtained during Sign in with Apple
//
// Use this endpoint to exchange the code (which must be validated with Apple within 5 minutes) for a session in your system
router.post("/sign_in_with_apple", async (request, response) => {
    const auth = new AppleAuth(
        {
        // use the bundle ID as client ID for native apps, else use the service ID for web-auth flows
        // https://forums.developer.apple.com/thread/118135
        client_id:
            request.query.useBundleId === "true"
            ? process.env.BUNDLE_ID
            : process.env.SERVICE_ID,
        team_id: process.env.TEAM_ID,
        redirect_uri:
            "http://www.hakwongo.com:3000/auth/callbacks/sign_in_with_apple", // does not matter here, as this is already the callback that verifies the token after the redirection
        key_id: process.env.KEY_ID
        },
        process.env.KEY_CONTENTS.replace(/\|/g, "\n"),
        "text"
    );

    console.log(request.query);

    const accessToken = await auth.accessToken(request.query.code);

    const idToken = jwt.decode(accessToken.id_token);

    const userID = idToken.sub;

    console.log(idToken);

    // `userEmail` and `userName` will only be provided for the initial authorization with your app
    const userEmail = idToken.email;
    const userName = `${request.query.firstName} ${request.query.lastName}`;

    // 👷🏻‍♀️ TODO: Use the values provided create a new session for the user in your system
    const sessionID = `NEW SESSION ID for ${userID} / ${userEmail} / ${userName}`;

    console.log(`sessionID = ${sessionID}`);

    response.json({ sessionId: sessionID });
});

module.exports = router;