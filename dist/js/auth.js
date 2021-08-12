// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDzdN5Ies6hxarwNYKcAIe296Znmij922k",
    authDomain: "flutter-c76ac.firebaseapp.com",
    databaseURL: "https://flutter-c76ac.firebaseio.com",
    projectId: "flutter-c76ac",
    storageBucket: "flutter-c76ac.appspot.com",
    messagingSenderId: "241175124681",
    appId: "1:241175124681:web:cd82d5dba795e0765a0b18",
    measurementId: "G-HZ55R99NMK"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

var roles;


function signUp() {

    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("Signed Up");
}

function signOut() {

    auth.signOut();
    alert("Signed Out");
    roles = "1";

    // window.location.replace("../dist/login.html");

}

function signIn() {

    var email = document.getElementById("inputEmailAddress");
    var password = document.getElementById("inputPassword");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    // firebase.firestore().collection("Users").onSnapshot(function (snapshot) {
    //     snapshot.forEach(function (kategoriValue) {
    //         var kategori = kategoriValue.data();

    //         if (kategori.role == "2") {

    //             var email = user.email;
    //             alert("active user " + kategori.role );

    //             //Take user to a different or home page
    //             window.location.replace("../dist/index.html");
    //         } else{

    //             alert("Silahkan masukkan akun yang benar "+ kategori.role );
    //             // auth.signOut();
    //             window.location.replace ("../dist/login.html");
    //         }
    //         // window.location.replace("../dist/login.html");

    //     })
    // })
    promise.catch(e => alert(e.message));

    // window.location.replace("../dist/index.html/");
    console.log("berhasil login")




}





auth.onAuthStateChanged(function (user) {
    // var docRef = firebase.firestore().collection("Users").doc(user.uid);
    // roles = "1";
    if (user) {
        var userRef = firebase.firestore().collection('Users').doc(user.uid);
        return userRef
            .get()
            .then(doc => {
                // var kategori = kategoriValue.data();

                if (doc.data().role == 2) {
                    roles = true;
                }

                // tinggal get data per field 

                if (roles) {

                    var email = user.email;
                    alert("active user admin");

                    //Take user to a different or home page
                    window.location.replace("../dist/index.html");
                } else {
                    alert("masukkan akun yang benar ");
                }

            })
    


                //is signed in
               
                
            }else {

    alert("No Active User");
    // roles = 1;
    //no user is signed in
}
            
            
            
        });

// function getUser() {
//     firebase.firestore().collection("Users").onSnapshot(function (snapshot) {
//       snapshot.forEach(function (kategoriValue) {
//         var kategori = kategoriValue.data();

//         var roles = kategori.role;
//         return roles;
//     })
//   }
//     )}

function readUser() {
    firebase.firestore().collection("Kategori").onSnapshot(function (snapshot) {
        snapshot.forEach(function (kategoriValue) {
            var kategori = kategoriValue.data();

            document.getElementById("kategoriAdd").innerHTML += `
                <option value="${kategori.namaKat}">${kategori.namaKat}</option>
          `
        });
    })
}