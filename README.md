eventscheduler
==============

Emit a (possibly hierarchical) sequence of events

Use
---

var EventScheduler = require('./eventscheduler.js').EventScheduler;

var eventscheduler = new EventScheduler(myseqobject);

eventscheduler.on("eventA", eventAHandler);

eventscheduler.on("eventB", eventBHandler);

function done() {

};

eventscheduler.start(done);

Dependencies
------------

node.js


The Event Sequence Object 
-------------------------

The EventScheduler constructor expects an object containing a valid 
sequence object. 

The following is the syntax of a valid sequence object:   
```javascript
<sequence> ::= { sequence : [<command>*], count: <number> } 

 <command> ::= <event> | <sequence>

   <event> ::= { id : <string> , delay: <number> }
```
 
for example, 

```javascript
var seq = {
    sequence : [
        {id : "event1", delay : 300},
        {id : "event2", delay : 400},
        {id : "event3", delay : 50},
        {sequence : [
           {id : "subevent1", delay : 1000},
        ],
        count : 10
        }
    ],
    count : 1
};
```

