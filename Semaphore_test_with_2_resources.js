var semaphore = require("./Semaphore.js");

function log(message) {
	var d = new Date();
	console.log( d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds() + ": " + message);
}

function thread(thread_name, priority, timeout) {
	//function_with_semaphore("thread " + i, priority);
	
	
	sem.p(function() { // In this example, we use Semaphore with 1 resource
		setTimeout(function(element) {
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
		setTimeout(function(element) {
			log(thread_name + " iteration 1");
			function_with_semaphore(thread_name, 2);
		}, 10);
	}
	else if (execution_number === 2) {
		setTimeout(function(element) {
			log(thread_name + " iteration 2");
			function_with_semaphore(thread_name, 3);
		}, 30);
	}
	else if (execution_number === 3) {
		setTimeout(function(element) {
			log(thread_name + " iteration 3");
			function_with_semaphore(thread_name, 4);
		}, 15);
	}
	else if (execution_number === 4) {
		setTimeout(function(element) {
			log(thread_name + " iteration 4");
			function_with_semaphore(thread_name, 5);
		}, 25);
	}
	else if (execution_number === 5) {
		setTimeout(function(element) {
			log(thread_name + " iteration 5");
			function_with_semaphore(thread_name, 6);
		}, 35);
	}
	// end of the function
	else if (execution_number === 6) {
		setTimeout(function(element) {
			log(thread_name + " iteration finish critic section");
			sem.v(); /////////////////// Your critic section finish when you call sem.v()
		}, 75);
	}
	
}

// Init an object that contains .sem property to pass it to the semaphore
// We declare 2 resources
var sem = new semaphore.Semaphore(2);

// start 5 threads
thread("thread 1");
thread("thread 2");
thread("thread 3");
thread("thread 4");
thread("thread 5");

// RESULT :
// You can see : 2 threads is executed at the same time
// time: thread iteration
/*
15:23:33.969: thread 1 iteration start critic section
15:23:33.969: thread 2 iteration start critic section
15:23:33.985: thread 1 iteration 1
15:23:33.985: thread 2 iteration 1
15:23:34.160: thread 1 iteration 2
15:23:34.160: thread 2 iteration 2
15:23:34.320: thread 1 iteration 3
15:23:34.320: thread 2 iteration 3
15:23:34.630: thread 1 iteration 4
15:23:34.630: thread 2 iteration 4
15:23:34.110: thread 1 iteration 5
15:23:34.110: thread 2 iteration 5
15:23:34.188: thread 1 iteration finish critic section
15:23:34.188: thread 2 iteration finish critic section
15:23:34.219: thread 3 iteration start critic section
15:23:34.219: thread 4 iteration start critic section
15:23:34.234: thread 3 iteration 1
15:23:34.234: thread 4 iteration 1
15:23:34.266: thread 3 iteration 2
15:23:34.266: thread 4 iteration 2
15:23:34.281: thread 3 iteration 3
15:23:34.281: thread 4 iteration 3
15:23:34.312: thread 3 iteration 4
15:23:34.312: thread 4 iteration 4
15:23:34.359: thread 3 iteration 5
15:23:34.359: thread 4 iteration 5
15:23:34.437: thread 3 iteration finish critic section
15:23:34.437: thread 4 iteration finish critic section
15:23:34.468: thread 5 iteration start critic section
15:23:34.484: thread 5 iteration 1
15:23:34.515: thread 5 iteration 2
15:23:34.531: thread 5 iteration 3
15:23:34.562: thread 5 iteration 4
15:23:34.609: thread 5 iteration 5
15:23:34.687: thread 5 iteration finish critic section
*/