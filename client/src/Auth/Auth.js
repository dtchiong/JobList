import auth0 from 'auth0-js';
import history from '../history';

export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: 'restless-wave-6342.auth0.com',
        clientID: 'TBsCF5yXo62R4yGknsy6eq6PHLc3iuEm',
        redirectUri: (process.env.NODE_ENV === "production")? 'https://job-logger.herokuapp.com/callback' : 'http://localhost:3000/callback',
        responseType: 'token id_token',
        scope: 'openid'
    });

    login() {
        this.auth0.authorize();
    }

    constructor() {
        console.log("process: " + JSON.stringify(process.env));

        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    //pass routes.doSetProfile() to this, then pass as 2nd param to setSession
    handleAuthentication(doSetUserProfile) {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult, doSetUserProfile);
                history.replace('/home');
            }else if (err) {
                history.replace('/home');
                console.log(err);
          }
        });
        console.log("end of handleAuth");
    }

    setSession(authResult, doSetUserProfile) {
        // Set the time that the Access Token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        
        //console.log("setSession idTokenPayload: "+JSON.stringify(authResult.idTokenPayload));
        doSetUserProfile({sub: authResult.idTokenPayload.sub})
        //this.doSetUserProfile(authResult.idTokenPayload);
        // navigate to the home route
        history.replace('/home');
        console.log("end of setSession");
    }

    /* Uses the access token from local storage to get the user profile of the authenticated user */
    getUserProfile(callback) {
        let access_token = localStorage.getItem('access_token');
        
        if (access_token == null) {
            callback("Access token is null", null);
            return;
        }
        
        //this.auth0.client.userInfo(access_token, callback);
        this.auth0.client.userInfo(access_token, callback);
    }

    logout() {
        // Clear Access Token and ID Token from local storage
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // navigate to the home route
        history.replace('/home');
    }

    isAuthenticated() {
        // Check whether the current time is past the 
        // Access Token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}