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
var sem = new semaphore.Semaphore(1);

// start 3 threads
thread("thread 1");
thread("thread 2");
thread("thread 3");


// RESULT :
// You can see that it's a beautiful order
// With 1 resource, function_with_semaphore() is exectued once a time
// time: thread iteration
/*
15:30:36.513: thread 1 iteration start critic section
15:30:36.529: thread 1 iteration 1
15:30:36.560: thread 1 iteration 2
15:30:36.576: thread 1 iteration 3
15:30:36.607: thread 1 iteration 4
15:30:36.654: thread 1 iteration 5
15:30:36.732: thread 1 iteration finish critic section
15:30:36.763: thread 2 iteration start critic section
15:30:36.778: thread 2 iteration 1
15:30:36.810: thread 2 iteration 2
15:30:36.825: thread 2 iteration 3
15:30:36.856: thread 2 iteration 4
15:30:36.903: thread 2 iteration 5
15:30:36.981: thread 2 iteration finish critic section
15:30:37.120: thread 3 iteration start critic section
15:30:37.280: thread 3 iteration 1
15:30:37.590: thread 3 iteration 2
15:30:37.750: thread 3 iteration 3
15:30:37.106: thread 3 iteration 4
15:30:37.153: thread 3 iteration 5
15:30:37.231: thread 3 iteration finish critic section
*/