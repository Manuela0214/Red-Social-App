import firebase from "firebase"

class Fire{

    constructor(){
        this.init()
        this.checkAuth()
    }

    init=()=>{
        if(!firebase.apps.length){
            firebase.initializeApp({
                apiKey: "AIzaSyBZd193obyVGv6wQs4ANjl-INFwLL08IYs",
                authDomain: "rredsocciaal-app.firebaseapp.com",
                databaseURL: "https://rredsocciaal-app.firebaseio.com",
                projectId: "rredsocciaal-app",
                storageBucket: "rredsocciaal-app.appspot.com",
                messagingSenderId: "229053740319",
                appId: "1:229053740319:web:c8d4543cd5c7d8cc6fac2a",
                measurementId: "G-0GRSJ1LYN2"
              })
        }
    };

    checkAuth = () =>{
        firebase.auth().onAuthStateChanged(user =>{
            if(!user){
                firebase.auth().signInAnonymously();

            }
        });
    };

    send = messages => {
        messages.forEach(item =>{
            const message = {
                text:item.text,
                timestamp: firebase.database.ServerValue.TIMESTAMP,
                user: item.user
            };

            this.db.push(message);

        });
    };

    parse = message =>{
        const{user,text,timestamp} = message.val()
        const{key, _id}= message
        const createdAt = new Date(timestamp)

        return{
            _id,
            createdAt,
            text,
            user
        }
    }


get = callback =>{
    this.db.on('child_added', snapshot=> callback(this.parse(snapshot)));
    
};

off(){
    this.db.off()
}

    get db(){
        return firebase.database().ref("messages");
    }

    get uid(){
        return(firebase.auth().currentUser || {}).uid
    }
}

export default new Fire();