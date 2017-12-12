// not sure if i need this
$(document).ready(function(){
// Initialize Firebase
  var config = {
    apiKey: "AIzaSyD1NaPqtCKzVskbP3AYgLmCGbYqhtnWVfw",
    authDomain: "traintime-144a3.firebaseapp.com",
    databaseURL: "https://traintime-144a3.firebaseio.com",
    projectId: "traintime-144a3",
    storageBucket: "",
    messagingSenderId: "567095252165"
  };
  firebase.initializeApp(config);

  var database = firebase.database();
