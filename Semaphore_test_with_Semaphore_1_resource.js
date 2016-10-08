var semaphore = require("./Semaphore.js");

function thread(i) {
	function_with_semaphore("thread " + i);
}

// take at least 200 milliseconds to execute
function function_with_semaphore(text, execution_number) {
	
	// initialisation
	if (typeof execution_number === "undefined") {
		semaphore.Semaphore.p(sem, function() { // In this example, we use Semaphore with 1 resource
			setTimeout(function(element) {
				console.log(text + " iteration start critic section");
				function_with_semaphore(text, 1);
			}, 20);
		}); /////////////////// Your critic section start when you call sem.p()
	}
	else if (execution_number === 1) {
		setTimeout(function(element) {
			console.log(text + " iteration 1");
			function_with_semaphore(text, 2);
		}, 10);
	}
	else if (execution_number === 2) {
		setTimeout(function(element) {
			console.log(text + " iteration 2");
			function_with_semaphore(text, 3);
		}, 30);
	}
	else if (execution_number === 3) {
		setTimeout(function(element) {
			console.log(text + " iteration 3");
			function_with_semaphore(text, 4);
		}, 15);
	}
	else if (execution_number === 4) {
		setTimeout(function(element) {
			console.log(text + " iteration 4");
			function_with_semaphore(text, 5);
		}, 25);
	}
	else if (execution_number === 5) {
		setTimeout(function(element) {
			console.log(text + " iteration 5");
			function_with_semaphore(text, 6);
		}, 35);
	}
	// end of the function
	else if (execution_number === 6) {
		setTimeout(function(element) {
			console.log(text + " iteration finish critic section");
			semaphore.Semaphore.v(sem); /////////////////// Your critic section finish when you call sem.v()
		}, 75);
	}
	
}

// Init an object that contains .sem property to pass it to the semaphore
// We declare 1 resource only
sem = {sem: 1};

// start 3 threads
thread(1);
thread(2);
thread(3);


// RESULT :
// You can see that it's a beautiful order
// With 1 resource, function_with_semaphore() is exectued once a time

/*
thread 1 iteration start critic section
thread 1 iteration 1
thread 1 iteration 2
thread 1 iteration 3
thread 1 iteration 4
thread 1 iteration 5
thread 1 iteration finish critic section
thread 2 iteration start critic section
thread 2 iteration 1
thread 2 iteration 2
thread 2 iteration 3
thread 2 iteration 4
thread 2 iteration 5
thread 2 iteration finish critic section
thread 3 iteration start critic section
thread 3 iteration 1
thread 3 iteration 2
thread 3 iteration 3
thread 3 iteration 4
thread 3 iteration 5
thread 3 iteration finish critic section
*/