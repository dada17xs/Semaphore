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

var sem = new semaphore.Semaphore(1, 10); // We declare 1 resource only with default priority at 10 for each callback

// start 4 threads
thread("thread 1"); // thread 1, default priority
thread("thread 2"); // thread 2, priority 20
thread("thread 3", 20); // thread 3, default priority
thread("thread 4"); // thread 4, default priority

// RESULT :
// You can see that thread 3 is executed the first, because of it's higher priority, then the rest is executed with the same priority at 10
// time: thread iteration
/*
15:19:31.368: thread 1 iteration start critic section
15:19:31.383: thread 1 iteration 1
15:19:31.414: thread 1 iteration 2
15:19:31.430: thread 1 iteration 3
15:19:31.461: thread 1 iteration 4
15:19:31.508: thread 1 iteration 5
15:19:31.586: thread 1 iteration finish critic section
15:19:31.617: thread 3 iteration start critic section
15:19:31.633: thread 3 iteration 1
15:19:31.664: thread 3 iteration 2
15:19:31.680: thread 3 iteration 3
15:19:31.711: thread 3 iteration 4
15:19:31.758: thread 3 iteration 5
15:19:31.836: thread 3 iteration finish critic section
15:19:31.867: thread 2 iteration start critic section
15:19:31.882: thread 2 iteration 1
15:19:31.914: thread 2 iteration 2
15:19:31.929: thread 2 iteration 3
15:19:31.960: thread 2 iteration 4
15:19:32.700: thread 2 iteration 5
15:19:32.850: thread 2 iteration finish critic section
15:19:32.116: thread 4 iteration start critic section
15:19:32.132: thread 4 iteration 1
15:19:32.163: thread 4 iteration 2
15:19:32.179: thread 4 iteration 3
15:19:32.210: thread 4 iteration 4
15:19:32.257: thread 4 iteration 5
15:19:32.335: thread 4 iteration finish critic section
*/