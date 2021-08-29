import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
	apiKey: "AIzaSyCq4vrlYMqb77wJ2m3UXkxcECkixunqphQ",
	authDomain: "dots-e59d1.firebaseapp.com",
	projectId: "dots-e59d1",
	storageBucket: "dots-e59d1.appspot.com",
	messagingSenderId: "859075249272",
	appId: "1:859075249272:web:347d9e295b25f4a9ce198d"
};

firebase.initializeApp(firebaseConfig);

export default firebase;