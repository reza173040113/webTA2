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
        
        
        
        function signOut(){
            
            auth.signOut();
            alert("Signed Out");
            window.location.replace("../dist/login.html");
            
        }

        
        
    
    