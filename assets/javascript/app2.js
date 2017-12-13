  $(document).ready(function() {
      // Initialize Firebase
      var config = {
          apiKey: "AIzaSyD1NaPqtCKzVskbP3AYgLmCGbYqhtnWVfw",
          authDomain: "traintime-144a3.firebaseapp.com",
          databaseURL: "https://traintime-144a3.firebaseio.com",
          projectId: "traintime-144a3",
          storageBucket: "traintime-144a3.appspot.com",
          messagingSenderId: "567095252165",
      };
      firebase.initializeApp(config);
  	
      var database = firebase.database();

      var trainName = "";
      var destination = "";
      var firstTrain = "";
      var frequency = "";

      // Button for adding trains
      $("#addTrainBtn").on("click", function() {
          event.preventDefault();

          //Set variables from user input
          var trainName = $("#trName").val().trim();
          var destination = $("#trDest").val().trim();
          var firstTrain = moment($("#trTime").val().trim(), "HH,mm").subtract(10, "years").format("X");
          var frequency = $("#trFreq").val().trim();

          //create new object and push to the database
          var newTrain = {
              name: trainName,
              dest: destination,
              first: firstTrain,
              freq: frequency,
          }
          $("#database").push(newTrain);

          console.log(newTrain.name);
          console.log(newTrain.dest);
          console.log(newTrain.first);
          console.log(newTrain.freq);

          //clear out the form fields
          $("#trainName").val("");
          $("#destination").val("");
          $("#firstTrainTime").val("");
          $("#frequency").val("");

          return false;
      });
      //firebase event for adding trains to the database
      $("#database").on("child_added", function(childSnapshot, prevChildKey) {
          console.log(childSnapshot.val());
          //store in a variable
          var trName = childSnapshot.val().trainName;
          var trDestination = childSnapshot.val().destination;
          var trFirstTrain = childSnapshot.val().firstTrain;
          var trFrequency = childSnapshot.val().frequency;

          //calculate minutes until arrival
          var diffTime = moment().diff(moment.unix(trFirstTrain), "minutes");
          var timeRemainder = moment().diff(moment.unix(trFirstTrain), "minutes") % trFrequency;
          var minutes = trFrequency - timeRemainder;

          var nextTrainTime = moment().add(minutes, "m").format("HH:mm A");

          console.log(minutes);
          console.log(nextTrainTime);
          console.log(moment().format("HH:mm A"));
          console.log(nextTrainTime);
          console.log(moment().format("X"));

          $("#trainTable > tbody").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" + trFrequency + "</td><td>" + trFrequency + "</td></tr>");

      });
  });