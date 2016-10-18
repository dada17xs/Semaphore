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

// start 4 threads
thread("thread 1", 10); // thread 1 with priority 10
thread("thread 2", 20); // thread 2 with priority 20
thread("thread 3", 15); // thread 3 with priority 15
thread("thread 4", 25); // thread 4 with priority 25

// RESULT :
// You can see that thread 4 is executed first because of it's priority
// time: thread iteration
/*
15:32:11.284: thread 1 iteration start critic section
15:32:11.300: thread 1 iteration 1
15:32:11.331: thread 1 iteration 2
15:32:11.346: thread 1 iteration 3
15:32:11.378: thread 1 iteration 4
15:32:11.424: thread 1 iteration 5
15:32:11.502: thread 1 iteration finish critic section
15:32:11.534: thread 4 iteration start critic section
15:32:11.549: thread 4 iteration 1
15:32:11.580: thread 4 iteration 2
15:32:11.596: thread 4 iteration 3
15:32:11.627: thread 4 iteration 4
15:32:11.674: thread 4 iteration 5
15:32:11.752: thread 4 iteration finish critic section
15:32:11.783: thread 2 iteration start critic section
15:32:11.799: thread 2 iteration 1
15:32:11.830: thread 2 iteration 2
15:32:11.846: thread 2 iteration 3
15:32:11.877: thread 2 iteration 4
15:32:11.924: thread 2 iteration 5
15:32:12.200: thread 2 iteration finish critic section
15:32:12.330: thread 3 iteration start critic section
15:32:12.480: thread 3 iteration 1
15:32:12.800: thread 3 iteration 2
15:32:12.950: thread 3 iteration 3
15:32:12.126: thread 3 iteration 4
15:32:12.173: thread 3 iteration 5
15:32:12.251: thread 3 iteration finish critic section
*/