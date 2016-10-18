var semaphore = require("./Semaphore.js");

function log(message) {
	var d = new Date();
	console.log( d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds() + ": " + message);
}

function thread(thread_name, priority, timeout) {
	//function_with_semaphore("thread " + i, priority);
	
	semaphore.Semaphore.p(numberResources, function() { // In this example, we use Semaphore with 1 resource
		setTimeout(function() {
			log(thread_name + " iteration start critic section");
			function_with_semaphore(thread_name, 1);
		}, 20);
	}); /////////////////// Your critic section start when you call sem.p()
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
			semaphore.Semaphore.v(numberResources); /////////////////// Your critic section finish when you call sem.v()
		}, 75);
	}
	
}

// Init an object that contains .numberResources property to pass it to the semaphore (because int is not passed by reference in JavaScript)
numberResources = {numberResources: 1}; // We declare 1 resource only

// start 3 threads
thread("thread 1");
thread("thread 2");
thread("thread 3");

// RESULT :
// With 1 resource, function_with_semaphore() is executed once a time
// time: thread iteration
/*
16:3:14.384: thread 1 iteration start critic section
16:3:14.415: thread 1 iteration 1
16:3:14.446: thread 1 iteration 2
16:3:14.462: thread 1 iteration 3
16:3:14.493: thread 1 iteration 4
16:3:14.540: thread 1 iteration 5
16:3:14.618: thread 1 iteration finish critic section
16:3:14.899: thread 2 iteration start critic section
16:3:14.914: thread 2 iteration 1
16:3:14.946: thread 2 iteration 2
16:3:14.961: thread 2 iteration 3
16:3:14.992: thread 2 iteration 4
16:3:15.390: thread 2 iteration 5
16:3:15.117: thread 2 iteration finish critic section
16:3:15.414: thread 3 iteration start critic section
16:3:15.429: thread 3 iteration 1
16:3:15.460: thread 3 iteration 2
16:3:15.476: thread 3 iteration 3
16:3:15.507: thread 3 iteration 4
16:3:15.554: thread 3 iteration 5
16:3:15.632: thread 3 iteration finish critic section
*/