var fs = require('fs');

var EventScheduler = require('./eventscheduler.js').EventScheduler;

var filename = process.argv[2]; 

fs.readFile(filename, 'ascii', function(err, data) {

    function done() {
        console.log("done");
    }

    test = JSON.parse(data);

    var program = new EventScheduler(test, done);

    program.on("event1", function() {
        console.log("event1");
    });

    program.on("event2", function() {
        console.log("event2");
    });

    program.on("event3", function() {
        console.log("event3");
    });

    program.on("subevent1", function() {
        console.log("subevent1");
    });

    program.on("subevent2", function() {
        console.log("subevent2");
    });


    program.start(done);

});
