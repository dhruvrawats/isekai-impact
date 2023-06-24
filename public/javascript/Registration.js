    //Get Elements
    const txtName = document.getElementById("txtName");
    const txtEmailRegister = document.getElementById("txtEmail_register");
    const txtPasswordRegister = document.getElementById("txtPassword_register");
    const btnSignup = document.getElementById("btnSignup");
    const mainPage = document.getElementById("main-page");
    const redirectPage = document.getElementById("redirect-page");

    const googleBtn = document.querySelector("#google");
    const facebookBtn = document.querySelector("#facebook");
    const twitterBtn = document.querySelector("#twitter");
    const githubBtn = document.querySelector("#github");

    //Add Signup Event
    btnSignup.addEventListener('click', e => {

        e.preventDefault();
        //get email and password
        const email = txtEmailRegister.value;
        const password = txtPasswordRegister.value;

        const auth = firebase.auth();

        //sign in with firebase auth
        const promise = auth.createUserWithEmailAndPassword(email, password).then(user => {
            setName({
                displayName : txtName.value ,
            });
            firebase.auth().currentUser.sendEmailVerification()
            .then(m => {
                mainPage.hidden = true;
                redirectPage.hidden = false;
                setTimeout(()=>{
                    redirectToDashboard("Signup Successful ",m);
                },10000)
            })
            .catch((e)=>redirectToDashboard("Signup Successful but email not verified",e))
            // if (user !== null) redirectToDashboard("Signup Successful ");
        }).catch(err => {
            alert(err.message);
        });

    });


    googleBtn.addEventListener('click',()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(m => redirectToDashboard(m))
        .catch(e => console.log(e));
    });

    facebookBtn.addEventListener('click', (e)=>{
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(m => redirectToDashboard(m))
        .catch(e => console.log(e));
    });

    twitterBtn.addEventListener('click', ()=>{
        var provider = new firebase.auth.TwitterAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(m => redirectToDashboard(m))
        .catch(e => console.log(e));
    });

    githubBtn.addEventListener('click', (e)=>{
        var provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider)
        .then(m => redirectToDashboard(m))
        .catch(e => console.log(e));
    });

    mainPage.hidden = false;
    redirectPage.hidden = true;