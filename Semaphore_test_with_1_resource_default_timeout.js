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
// We declare 1 resource only
var sem = new semaphore.Semaphore(1, null, 1000); // 1000 milliseconds is the default timeout between each callback

// start 4 threads
thread("thread 1"); // thread 1, default timeout
thread("thread 2"); // thread 2, default timeout
thread("thread 3", null, 2000); // thread 3, 2000milliseconds timeout
thread("thread 4"); // thread 3, default timeout


// RESULT :
// time: thread iteration
/*
15:18:52.414: thread 1 iteration start critic section
15:18:52.429: thread 1 iteration 1
15:18:52.460: thread 1 iteration 2
15:18:52.476: thread 1 iteration 3
15:18:52.507: thread 1 iteration 4
15:18:52.554: thread 1 iteration 5
15:18:52.632: thread 1 iteration finish critic section
15:18:53.677: thread 2 iteration start critic section
15:18:53.693: thread 2 iteration 1
15:18:53.724: thread 2 iteration 2
15:18:53.740: thread 2 iteration 3
15:18:53.771: thread 2 iteration 4
15:18:53.818: thread 2 iteration 5
15:18:53.896: thread 2 iteration finish critic section
15:18:55.939: thread 3 iteration start critic section
15:18:55.955: thread 3 iteration 1
15:18:55.986: thread 3 iteration 2
15:18:56.200: thread 3 iteration 3
15:18:56.330: thread 3 iteration 4
15:18:56.800: thread 3 iteration 5
15:18:56.158: thread 3 iteration finish critic section
15:18:57.203: thread 4 iteration start critic section
15:18:57.218: thread 4 iteration 1
15:18:57.250: thread 4 iteration 2
15:18:57.265: thread 4 iteration 3
15:18:57.296: thread 4 iteration 4
15:18:57.343: thread 4 iteration 5
15:18:57.421: thread 4 iteration finish critic section
*/