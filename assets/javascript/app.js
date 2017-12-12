           // Initialize Firebase
            var config = {
                apiKey: "AIzaSyD1NaPqtCKzVskbP3AYgLmCGbYqhtnWVfw",
                authDomain: "traintime-144a3.firebaseapp.com",
                databaseURL: "https://traintime-144a3.firebaseio.com",
                projectId: "traintime-144a3",
                storageBucket: "traintime-144a3.appspot.com/",
                messagingSenderId: "567095252165"
            };
            firebase.initializeApp(config);

            var database = firebase.database();
            // Button for adding trains
            $("#addTrainBtn").on("click", function(){
                //Set variables from user input
                var trainName = $("#trainNameInput").val().trim();
                var destination = $("#destInput").val().trim();
                var firstTrainTime = moment($("#timeInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
                var frequency = $("#frequencyInput").val().trim();

                //create new object and push to the database
                var newTrain = {
                    name: trainName,
                    dest: destination,
                    first: firstTrainTime,
                    freq: frequency,
                }
                database.ref().push(newTrain);

                console.log(newTrain.name); console.log(newTrain.dest); console.log(first); console.log(freq);

                //clear out the form fields
                $("#trainName").val(""); $("#destination").val(""); $("#firstTrainTime").val(""); $("#frequency").val("");

                return false;
            })