function setName(name){
    const user = firebase.auth().currentUser;
    user.updateProfile(name)
    .then(console.log("sucess",name))
    .catch((error) => console.log(error));  
}