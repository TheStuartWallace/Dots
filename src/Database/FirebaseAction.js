import firebase from 'Database/Firebase';

export default class FirebaseAction{
	static async userLoginAccount(username,password){
		return await firebase.auth().signInWithEmailAndPassword(username,password);
	}

	static async userCreateAccount(username,email){
		return await firebase.auth().createUserWithEmailAndPassword(username,email);
	}

	static async getProfile(uid){
		return await firebase.firestore().collection("userData").doc(uid).get().then(async dat=>{
			if(dat.exists){
				let returnData = {};

				returnData = {...returnData, ...dat.data()};
				
				let boards = await firebase.firestore().collection("userData").doc(uid).collection("boards").get().then(dat=>{
					const mainData = dat.docs.map(doc => doc.data());
					const idData = dat.docs.map(doc => doc.id);
					mainData.map((data,index) => mainData[index].id = idData[index]);
					return mainData;
				});
				returnData = {...returnData, boards : boards};
				
				return returnData;
			}else{
				throw new Error("No records for UID of '"+uid+"'");
			}
		})
	}

	static async getBoards(uid){
		if((await FirebaseAction.getProfile(uid).catch((error)=>{; return error;})).message !== undefined) throw new Error("No records for UID of '"+uid+"'");
		return await firebase.firestore().collection("userData").doc(uid).collection("boards").get().then(dat=>{
			const mainData = dat.docs.map(doc => doc.data());
			const idData = dat.docs.map(doc => doc.id);
			mainData.map((data,index) => mainData[index].id = idData[index]);
			return mainData;
		}).catch(console.error);
	}

	static async getBoard(uid,id){
		let data = await firebase.firestore().collection("userData").doc(uid).collection("boards").doc(id).get();
		return data.data();
	}

	static async updateBoard(uid,id,data){
		return await firebase.firestore().collection("userData").doc(uid).collection("boards").doc(id).update({data : JSON.stringify(data)});
	}

	static async updateSize(uid,id,size){
		return await firebase.firestore().collection("userData").doc(uid).collection("boards").doc(id).update({size : size});
	}
}