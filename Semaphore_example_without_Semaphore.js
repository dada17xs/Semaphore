var semaphore = require("./Semaphore.js");

function log(message) {
	var d = new Date();
	console.log( d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds() + "." + d.getMilliseconds() + ": " + message);
}

function thread(thread_name, priority, timeout) {
	setTimeout(function() {
		log(thread_name + " iteration start critic section");
		function_with_semaphore(thread_name, 1);
	}, 20);
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

// start 3 threads
thread("thread 1");
thread("thread 2");
thread("thread 3");

// RESULT :
// You can see that it's a total disorder
// time: thread iteration
/*
15:27:57.845: thread 1 iteration start critic section
15:27:57.845: thread 2 iteration start critic section
15:27:57.845: thread 3 iteration start critic section
15:27:57.861: thread 1 iteration 1
15:27:57.861: thread 2 iteration 1
15:27:57.861: thread 3 iteration 1
15:27:57.892: thread 1 iteration 2
15:27:57.892: thread 2 iteration 2
15:27:57.892: thread 3 iteration 2
15:27:57.908: thread 1 iteration 3
15:27:57.908: thread 2 iteration 3
15:27:57.908: thread 3 iteration 3
15:27:57.939: thread 1 iteration 4
15:27:57.939: thread 2 iteration 4
15:27:57.939: thread 3 iteration 4
15:27:57.986: thread 1 iteration 5
15:27:57.986: thread 2 iteration 5
15:27:57.986: thread 3 iteration 5
15:27:58.640: thread 1 iteration finish critic section
15:27:58.640: thread 2 iteration finish critic section
15:27:58.640: thread 3 iteration finish critic section
*/
