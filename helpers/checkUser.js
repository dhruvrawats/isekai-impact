let player;

firebase.auth().onAuthStateChanged((user) => {
	if (user) {
		player = {
			name: user.displayName,
			email: user.email,
			id: user.uid,
			isVerified: user.emailVerified,
		}
		console.log("user found ", player);
	} else {
		console.log("no user found ");
	}
  });