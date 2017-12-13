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
            $("#addTrainBtn").on("click", function(event){
            	event.preventDefault();

                //Set variables from user input
                trainName = $("#trName").val().trim();
                destination = $("#trDest").val().trim();
                firstTrain = moment($("#trTime").val().trim(), "HH,mm").subtract(10, "years").format("HH");
                frequency = $("#trFreq").val().trim();

                //create new object and push to the database
    			database.ref().push({
                    name: trainName,
                    dest: destination,
                    first: firstTrain,
                    freq: frequency,
                })
                database.ref().push(newTrain);

                console.log(newTrain.name); console.log(newTrain.dest); console.log(first); console.log(freq);

                //clear out the form fields
                $("#trainName").val(""); $("#destination").val(""); $("#firstTrainTime").val(""); $("#frequency").val("");

                return false;
            })
//firebase event for adding trains to the database
database.ref().on("child_added", function(childSnapshot, prevChildKey){
	console.log(childSnapshot.val());
	//store in a variable
	var trName = childSnapshot.val().trainName;
	var trDestination = childSnapshot.val().destination;
	var trFirstTrain = childSnapshot.val().firstTrain;
	var trFrequency = childSnapshot.val().frequency;

//calculate minutes until arrival
var currentTime = moment();
console.log(moment(currentTime).format("HH:mm"));

var firstTimeConverted = moment(trFirstTrain, "HH:mm").subtract(1,"days");

var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
console.log("Difference in time: " + timeDiff);

var remainder = timeDiff % trFrequency;
console.log("Remainder: ", remainder);

var minsUntilTrain = trFrequency - remainder;
console.log("Time Until Train: " + minsUntilTrain);

var nextTrainTime = moment().add(minsUntilTrain, "minutes");

console.log("Next arrival: " + moment(nextTrainTime).format("HH:mm"));

$("#trainTable > tbody").append("<tr><td>" + trName + "</td><td>" + trDestination + "</td><td>" + trFrequency + "</td><td>" + trFrequency + "</td></tr>");


return false;

});