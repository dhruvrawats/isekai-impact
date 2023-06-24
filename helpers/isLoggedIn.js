let isLoggedIn;
let isUserVerified = false;

function isUserLoggedIn(){
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            isUserVerified = user.emailVerified;
            return true;
        } else {
            return false;
        }
      });
};

isLoggedIn = isUserLoggedIn();