var semaphore = require("./Semaphore.js");

function log(message) {
	var d = new Date();
	console.log( d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds() + ": " + message);
}

function thread(thread_name, priority, timeout) {
	//function_with_semaphore("thread " + i, priority);
	
	sem.p(function() { // In this example, we use Semaphore with 1 resource
		setTimeout(function() {
			log(thread_name + " iteration start critic section");
			function_with_semaphore(thread_name, 1);
		}, 20);
	}, priority, timeout); /////////////////// Your critic section start when you call sem.p()
}

// take at least 200 milliseconds to execute
function function_with_semaphore(thread_name, execution_number) {
	
	// initialisation
	if (typeof execution_number === "undefined") {
		
	}
	else if (execution_number === 1) {
		setTimeout(function() {
			log(thread_name + " iteration 1");
			function_with_semaphore(thread_name, 2);
		}, 10);
	}
	else if (execution_number === 2) {
		setTimeout(function() {
			log(thread_name + " iteration 2");
			function_with_semaphore(thread_name, 3);
		}, 30);
	}
	else if (execution_number === 3) {
		setTimeout(function() {
			log(thread_name + " iteration 3");
			function_with_semaphore(thread_name, 4);
		}, 15);
	}
	else if (execution_number === 4) {
		setTimeout(function() {
			log(thread_name + " iteration 4");
			function_with_semaphore(thread_name, 5);
		}, 25);
	}
	else if (execution_number === 5) {
		setTimeout(function() {
			log(thread_name + " iteration 5");
			function_with_semaphore(thread_name, 6);
		}, 35);
	}
	// end of the function
	else if (execution_number === 6) {
		setTimeout(function() {
			log(thread_name + " iteration finish critic section");
			sem.v(); /////////////////// Your critic section finish when you call sem.v()
		}, 75);
	}
	
}

var sem = new semaphore.Semaphore(1); // We declare 1 resource only

// start 3 threads
thread("thread 1", null, 1000); // thread 1 with priority 10
thread("thread 2"); // thread 2 with priority 20
thread("thread 3", null, 2000); // thread 3 with priority 15

// RESULT :
// You can see that 2 seconds have passed before thread 3 start
// time: thread iteration
/*
15:32:27.900: thread 1 iteration start critic section
15:32:27.250: thread 1 iteration 1
15:32:27.560: thread 1 iteration 2
15:32:27.720: thread 1 iteration 3
15:32:27.103: thread 1 iteration 4
15:32:27.150: thread 1 iteration 5
15:32:27.228: thread 1 iteration finish critic section
15:32:27.259: thread 2 iteration start critic section // <== direct
15:32:27.274: thread 2 iteration 1
15:32:27.306: thread 2 iteration 2
15:32:27.321: thread 2 iteration 3
15:32:27.352: thread 2 iteration 4
15:32:27.399: thread 2 iteration 5
15:32:27.477: thread 2 iteration finish critic section
15:32:29.521: thread 3 iteration start critic section // <== 2 seconds after
15:32:29.536: thread 3 iteration 1
15:32:29.568: thread 3 iteration 2
15:32:29.583: thread 3 iteration 3
15:32:29.614: thread 3 iteration 4
15:32:29.661: thread 3 iteration 5
15:32:29.739: thread 3 iteration finish critic section
*/