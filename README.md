# Semaphore
To use semaphore with JavaScript

# Constructor
```javascript
MySemaphore = new Semaphore(numberResources, defaultPriority, defaultTimeoutBetweenCallback, lifo);
MySemaphore.p(function() {  }); // Take one resource
MySemaphore.v(); // Free one resource
```
__numberResources__ : the number of resources of your semaphore, default value : ``1``<br>
__defaultPriority__ : the default priority for each callback, default value : ``0``<br>
__defaultTimeoutBetweenCallback__ : the default timeout for each callback, default value ``null``<br>
__lifo__ : (Last In First Out) If ``true``, the last function want the resource will be the first to take it (except if they have function with higer priority), default value : ``false``;<br>

You can put ``null`` to ignore an argument : ``new Semaphore(numberResources, null, null, lifo);``

# Examples
## Basics examples
```javascript
MySemaphore = new Semaphore(1); // semaphore with 1 resource

Semaphore.p(function_in_semaphore() { // Critic section start here, take one resource
  // do some stuff
  // ...
  // This code is accessible only once a time
  // ...
  MySemaphore.v(); // Critic section end here, free one resource
});

// This code will be executed when MySemaphore.v() will be called, when one resource will be free
Semaphore.p(function_in_semaphore() { // Critic section start here, take one resource
  // do some stuff
  // ...
  // This code is accessible only once a time
  // ...
  MySemaphore.v(); // Critic section end here, free one resource
});
```
Take a look at Semaphore_example_xxx.js for a more complete understanding

## More complexes examples
For the following examples, we consider these functions, and a global var sem
```javascript
function thread(name, priority, timeout) {
	sem.p(function() {
		setTimeout(function(element) {
			log(thread_name + " iteration start critic section");
			function_with_semaphore(thread_name, 1);
		}, 20);
	}, priority, timeout); /////////////////// Your critic section start when you call sem.p()
}

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
```

### Example without Semaphore.js
```javascript
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
```
You can found this example in Semaphore_example_without_Semaphore.js

### Example with 1 resource
```javascript
var sem = new semaphore.Semaphore(1); // We declare 1 resource only

// start 3 threads
thread("thread 1");
thread("thread 2");
thread("thread 3");

// RESULT :
// You can see that it's a beautiful order
// With 1 resource, function_with_semaphore() is executed once a time
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
```
You can found this example in Semaphore_example_with_1_resource.js

### Example with 2 resources
```javascript
var sem = new semaphore.Semaphore(2); // We declare 2 resources

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
```
You can found this example in Semaphore_example_with_2_resources.js

### Example with 1 resource and priority
```javascript
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
```
You can found this example in Semaphore_example_with_1_resource_priority.js

### Example with 1 resource and timeout
```javascript
var sem = new semaphore.Semaphore(1); // We declare 1 resource only

// start 3 threads
thread("thread 1", null, 1000); // thread 1 with priority 10
thread("thread 2"); // thread 2 with priority 20
thread("thread 3", null, 2000); // thread 3 with priority 15

// RESULT :
// You can see that 2 seconds have passed before thread 3 start
// time: thread iteration
/*
15:32:27.900: thread 1 iteration start critic section
15:32:27.250: thread 1 iteration 1
15:32:27.560: thread 1 iteration 2
15:32:27.720: thread 1 iteration 3
15:32:27.103: thread 1 iteration 4
15:32:27.150: thread 1 iteration 5
15:32:27.228: thread 1 iteration finish critic section
15:32:27.259: thread 2 iteration start critic section // <== direct
15:32:27.274: thread 2 iteration 1
15:32:27.306: thread 2 iteration 2
15:32:27.321: thread 2 iteration 3
15:32:27.352: thread 2 iteration 4
15:32:27.399: thread 2 iteration 5
15:32:27.477: thread 2 iteration finish critic section
15:32:29.521: thread 3 iteration start critic section // <== 2 seconds after
15:32:29.536: thread 3 iteration 1
15:32:29.568: thread 3 iteration 2
15:32:29.583: thread 3 iteration 3
15:32:29.614: thread 3 iteration 4
15:32:29.661: thread 3 iteration 5
15:32:29.739: thread 3 iteration finish critic section
*/
```
You can found this example in Semaphore_example_with_1_resource_timeout.js

### Example with 1 resource and LIFO (Last In First Out)
```javascript
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
```
You can found this example in Semaphore_example_with_1_resource_lifo.js

### Example with 1 resource and default priority
```javascript
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
```
You can found this example in Semaphore_example_with_1_resource_default_priority.js

### Example with 1 resource and default timeout
```javascript
var sem = new semaphore.Semaphore(1, null, 1000); // We declare 1 resource only with a default timeout at 1000 milliseconds between each callback

// start 4 threads
thread("thread 1"); // thread 1, default timeout
thread("thread 2"); // thread 2, default timeout
thread("thread 3", null, 2000); // thread 3, 2000milliseconds timeout
thread("thread 4"); // thread 3, default timeout

// RESULT :
// You can see that between each thread, 1 second have passed except between thread 2 and 3 where 2 seconds have passed
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
```
You can found this example in Semaphore_example_with_1_resource_default_timeout.js

### Example with static methods, non-object methods
```javascript
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
```
You can found this example in Semaphore_example_with_1_resource_in_static_mode.js

### Example with static methods, non-object methods with a callbacks array
```javascript
// Init an object that contains .numberResources property to pass it to the semaphore (because int is not passed by reference in JavaScript)
numberResources = {numberResources: 1}; // We declare 1 resource only
callbacksArray = [];

// start 3 threads
thread("thread 1");
thread("thread 2");
thread("thread 3");

// RESULT :
// With 1 resource, function_with_semaphore() is exectued once a time
// With the callbkacks array, they don't have time elapsed between callbacks
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
```
You can found this example in Semaphore_example_with_1_resource_in_static_mode_with_callback_array.js

# How to use ?

### Using in browser
Just add the file to your script
```javascript
<script src="Semaphore.js"></script> <!-- Semaphore.js is in the same folder than your script -->

// Object way
mySem = new Semaphore(1);
mySem.p(function() { /* critic code*/ mySem.v(); } );

// Static way
sem = {sem: 1};
Semaphore.p(sem, function() { /* critic code */ });
Semaphore.v(sem);
```

### Using with Node.js
Just add the following code at the end of Semaphore.js
```javascript
module.exports = {
	Semaphore: Semaphore
}
```

Then, import the file in your script and use it
```javascript
var semaphore = require("./Semaphore.js"); // Semaphore.js is in the same folder than your script

// Object way
sem = new semaphore.Semaphore(1);
sem.p(function() { /* critic code*/ mySem.v(); } );

// Static way
sem = {sem: 1};
semaphore.Semaphore.p(sem, function() { /* critic code */ });
semaphore.Semaphore.v(sem);
```

### Using with Mozilla add-ons SDK
Just add the following code at the end of Semaphore.js
```javascript
var {Cc, Ci} = require("chrome");
exports.Semaphore = Semaphore;
```

Then, import the file in your script and use it
```javascript
var Semaphore = require("./Semaphore.js"); // Semaphore.js is in the same folder than your script

// Object way
sem = new Semaphore.Semaphore(1);
sem.p(function() { /* critic code*/ mySem.v(); } );

// Static way
sem = {sem: 1};
semaphore.Semaphore.p(sem, function() { /* critic code */ });
semaphore.Semaphore.v(sem);
```

### Using with other
Just import the file Semaphore.js in your script

# Other methods
```javascript
MySemaphore = new Semaphore(numberResources, defaultPriority, defaultTimeoutBetweenCallback, lifo);
MySemaphore.getNumberResources(); // Get the number of resources
MySemaphore.setDefaultPriority(defaultPriority); // Change the default priority
MySemaphore.getDefaultPriority(); // Get the default priority
MySemaphore.setDefaultTimeoutBetweenCallback(defaultTimeoutBetweenCallback); // Set the default timeout between callback
MySemaphore.getDefaultTimeoutBetweenCallback(); // Get the default timeout between callback
MySemaphore.setLifo(lifo); // Set the LIFO mode, true/false
MySemaphore.getLifo(); // Get the LIFO mode, return true/false
MySemaphore.emptyStack(); // empty the queue
MySemaphore.getStackSize(); // get the actual queue size
```

# How it's possible
JavaScript is a monothread language. But sometimes, if you have a lot of asynchrones functions, you'll want that a portion of your code is executed once a time. So you can use Semaphore.js to do this.
This is possible in JavaScript because each function is atomic and because JavaScript is monothread. This is important, if JavaScript will not stay monothread in the futur, this script will no longer work. If JavaScript functions were not atomic, errors could have happen.

# School example
## hairdressing example
coming soon...

# Release V0.2 (2016-10-18)
Adding object methods, see Semaphore_test_xxx.js files to learn more, adding examples. The complete script.

# Release V0.1 (2016-10-08)
The simpliest version, in 20 lines
If they are no resource when call Semaphore.p(), Semaphore will retry every 500ms to take the resource

# Later...
```javascript
MySemaphore = new Semaphore(numberResources, defaultPriority, defaultTimeoutBetweenCallback, lifo);
MySemaphore.setNumberResources(numberResources); // Set the number of resource, let the actual callbacks end or execute callback in the queue. Be careful, if you set a negative number, it will block the Semaphore
MySemaphore.addResources(numberResources); // add numberResources, if negative, call subResources(Math.abs(numberResources))
MySemaphore.subResources(numberResources); // sub numberResources, if negative, call addResources(Math.abs(numberResources))
MySemaphore.getNumberFreeResources(); // Get the number of free resources
```