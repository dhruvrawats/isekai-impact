    //Get Elements
    const txtEmailLogin = document.getElementById("txtEmail_login");
    const txtEmailForget = document.getElementById("txtEmail_forget");
    const txtPasswordLogin = document.getElementById("txtPassword_login");    
    const btnLogin = document.getElementById("btnLogin");
    const forgotPassword = document.getElementById("forgot-password");
    const resetPassword = document.getElementById("reset-password");
    const mainPage = document.getElementById("main-page");
    const forgetPage = document.getElementById("forget-page");
    const backToLogin = document.getElementById("back-to-login");
    const backToLoginAgain = document.getElementById("back-to-login-again");
    const resetPage = document.getElementById("reset-page");
    const resetMessage = document.getElementById("reset-message");

    const googleBtn = document.querySelector("#google");
    const facebookBtn = document.querySelector("#facebook");
    const twitterBtn = document.querySelector("#twitter");
    const githubBtn = document.querySelector("#github");

    function resetEmailMessage(m){
        resetMessage.innerText = m;
        resetPage.hidden = false;
        mainPage.hidden = true;
        forgetPage.hidden = true;
        txtEmailForget.value = "";
    }

    //Add Login Event
    btnLogin.addEventListener('click', e => {
        e.preventDefault();
        const email = txtEmailLogin.value;
        const password = txtPasswordLogin.value;

        const auth = firebase.auth();

        //sign in with firebase auth
        auth.signInWithEmailAndPassword(email, password).then(user =>{
            if (user !== null) redirectToDashboard("Login Successful :) ");
        }).catch(err => {
            alert(err.message);
        });
        
    });

    forgotPassword.addEventListener('click', (e)=>{
        e.preventDefault();
        const auth = firebase.auth();
        firebase.auth().sendPasswordResetEmail(txtEmailForget.value)
        .then(m=>{
            resetEmailMessage("Check your email to reset password ");
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            resetEmailMessage(errorMessage);
        });

    })

    resetPassword.addEventListener('click',()=>{
        mainPage.hidden = true;
        forgetPage.hidden = false;
        resetPage.hidden = true;
    })

    backToLogin.addEventListener('click',()=>{
        mainPage.hidden = false;
        forgetPage.hidden = true;
        resetPage.hidden = true;
    })
    
    backToLoginAgain.addEventListener('click',()=>{
        mainPage.hidden = false;
        forgetPage.hidden = true;
        resetPage.hidden = true;
    })

    googleBtn.addEventListener('click',()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(m => redirectToDashboard(m))
        .catch(e => console.log(e));
    });

    facebookBtn.addEventListener('click', (e)=>{
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then(m => redirectToDashboard(m))
        .catch(e => console.log(e));
    });

    twitterBtn.addEventListener('click', ()=>{
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then(m => redirectToDashboard(m))
        .catch(e => console.log(e));
    });

    githubBtn.addEventListener('click', (e)=>{
        var provider = new firebase.auth.GithubAuthProvider();
        firebase.auth()
        .signInWithPopup(provider)
        .then(m => redirectToDashboard(m))
        .catch(e => console.log(e));
    });
