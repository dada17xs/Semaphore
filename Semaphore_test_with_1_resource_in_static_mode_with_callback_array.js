var semaphore = require("./Semaphore.js");

function log(message) {
	var d = new Date();
	console.log( d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds() + ": " + message);
}

function thread(thread_name, priority, timeout) {
	//function_with_semaphore("thread " + i, priority);
	
	semaphore.Semaphore.p(numberResources, callbacksArray, function() { // In this example, we use Semaphore with 1 resource
		setTimeout(function(element) {
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
			semaphore.Semaphore.v(numberResources, callbacksArray); /////////////////// Your critic section finish when you call sem.v()
		}, 75);
	}
	
}

// Init an object that contains .numberResources property to pass it to the semaphore
// We declare 1 resource only
numberResources = {numberResources: 1};
callbacksArray = [];

// start 3 threads
thread("thread 1");
thread("thread 2");
thread("thread 3");


// RESULT :
// You can see that it's a beautiful order
// With 1 resource, function_with_semaphore() is exectued once a time
// time: thread iteration
/*
16:4:29.685: thread 1 iteration start critic section
16:4:29.716: thread 1 iteration 1
16:4:29.747: thread 1 iteration 2
16:4:29.763: thread 1 iteration 3
16:4:29.794: thread 1 iteration 4
16:4:29.841: thread 1 iteration 5
16:4:29.919: thread 1 iteration finish critic section
16:4:29.950: thread 2 iteration start critic section
16:4:29.966: thread 2 iteration 1
16:4:29.997: thread 2 iteration 2
16:4:30.130: thread 2 iteration 3
16:4:30.440: thread 2 iteration 4
16:4:30.910: thread 2 iteration 5
16:4:30.169: thread 2 iteration finish critic section
16:4:30.200: thread 3 iteration start critic section
16:4:30.215: thread 3 iteration 1
16:4:30.247: thread 3 iteration 2
16:4:30.262: thread 3 iteration 3
16:4:30.293: thread 3 iteration 4
16:4:30.340: thread 3 iteration 5
16:4:30.418: thread 3 iteration finish critic section
*/