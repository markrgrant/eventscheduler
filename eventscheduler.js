
exports.EventScheduler = function EventScheduler(schedule) {

    var events = require('events');

    var emitter = new events.EventEmitter();

    function runSequence(sched, i, j, done) {

        var seq = sched.sequence;
        var repeat = sched.count;  
        var cmd = null;

        if(i >= seq.length) {
            if(j >= repeat) {
                done();
                return;
            } else {
                runSequence(sched, 0, j+1, done);
                return;
            }
        }

        if(j >= repeat) {
            done();
            return;
        }

        function isEvent(cmd) {
            return typeof cmd === "object" && cmd.id;
        }

        function isSequence(cmd) {
            return typeof cmd === "object" && cmd.sequence && cmd.count; 
        }

        cmd = seq[i];

        if(isEvent(cmd)) { 
            setTimeout((function(mycmd, i, j) {
                return function() {
                   emitter.emit(mycmd.id);
                    runSequence(sched, i+1, j, done);
            }})(cmd, i, j), cmd.delay);
        } else if(isSequence(cmd)) {
            (function(i, j) {
            return runSequence(cmd, 0, j, function() {
                runSequence(sched, i+1, j, done); 
            }); 
            })(i, j);
        } else {
            console.error("Syntax error in schedule object. Exiting.");
            process.exit(1);
        }
    }

    this.start = function(cb) {
        runSequence(schedule, 0, 0, cb);
    }

    this.on = function(cmd, cb) {
        emitter.on(cmd, cb);
    }
};

