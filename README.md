programevents
=============

Emit a (possibly recursive) sequence of events

Use
---

var Program = require('./programevents.js').Program;

var program = new Program(myseqobject);


function done() {

};

program.start(done);

Dependencies
------------

node.js must be installed. Download the latest stable version from www.nodejs.org.

Also, the xmlhttprequest package for node.js must be installed.  After node is 
installed, run

% npm install xmlhttprequest

event sequence object 
---------------------

The programevents function expects an object containing a valid 
sequence object. 

The following is the syntax of a valid sequence object:   

<sequence> ::= { sequence : [<command>*], count: <number> } 

 <command> ::= <event> | <sequence>

   <event> ::= { id : <string> , delay: <number> }

 
for example, 

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


