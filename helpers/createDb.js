function createGameDb(gameData){
    db.collection("gameDb").add(gameData)
    .then((res) => {
        console.log("Document successfully written!",res);
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}

const db = firebase.firestore();