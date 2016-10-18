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

var sem = new semaphore.Semaphore(1, null, null, true); // We declare 1 resource only with lifo = true

// start 4 threads
thread("thread 1"); // thread 1
thread("thread 2"); // thread 2
thread("thread 3"); // thread 3
thread("thread 4"); // thread 4

// RESULT :
// You can see that the last thread is executed the first
// time: thread iteration
/*
15:20:52.690: thread 1 iteration start critic section
15:20:52.850: thread 1 iteration 1
15:20:52.116: thread 1 iteration 2
15:20:52.132: thread 1 iteration 3
15:20:52.163: thread 1 iteration 4
15:20:52.210: thread 1 iteration 5
15:20:52.288: thread 1 iteration finish critic section
15:20:52.319: thread 4 iteration start critic section
15:20:52.334: thread 4 iteration 1
15:20:52.366: thread 4 iteration 2
15:20:52.381: thread 4 iteration 3
15:20:52.412: thread 4 iteration 4
15:20:52.459: thread 4 iteration 5
15:20:52.537: thread 4 iteration finish critic section
15:20:52.568: thread 3 iteration start critic section
15:20:52.584: thread 3 iteration 1
15:20:52.615: thread 3 iteration 2
15:20:52.631: thread 3 iteration 3
15:20:52.662: thread 3 iteration 4
15:20:52.709: thread 3 iteration 5
15:20:52.787: thread 3 iteration finish critic section
15:20:52.818: thread 2 iteration start critic section
15:20:52.834: thread 2 iteration 1
15:20:52.865: thread 2 iteration 2
15:20:52.880: thread 2 iteration 3
15:20:52.912: thread 2 iteration 4
15:20:52.958: thread 2 iteration 5
15:20:53.360: thread 2 iteration finish critic section
*/