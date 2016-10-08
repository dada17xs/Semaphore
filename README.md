# Semaphore
To use semaphore with JavaScript

# Example
```
sem = {sem: 1}; // if you want a semaphore with 1 resource
Semaphore.p(sem, function_in_semaphore() { // Critic section start here, take one resource
  // do some stuff
  // ...
  // This code is accessible only once a time
  // ...
  Semaphore.v(sem); // Critic section end here, free one resource
});
```
Take a look at Semaphore_test_without_Semaphore.js, Semaphore_test_with_Semaphore_1_resource.js and Semaphore_test_with_Semaphore_2_resources.js for a more complete understanding

## Using in browser
Just add the file to your script
```
<script src="Semaphore.js"></script> <!-- Semaphore.js is in the same folder than your script -->
sem = {sem: 2};
Semaphore.p(sem, function() { /* critic code */ });
Semaphore.v(sem);
```

## Using with Node.js
Just add the following code at the end of Semaphore.js
```
module.exports = {
	Semaphore: Semaphore
}
```

Then, import the file in your script and use it
```
var semaphore = require("./Semaphore.js"); // Semaphore.js is in the same folder than your script
sem = {sem: 2};
semaphore.Semaphore.p(sem, function() { /* critic code */ });
semaphore.Semaphore.v(sem);
```

## Using with Mozilla add-ons SDK
Just add the following code at the end of Semaphore.js
```
exports.Semaphore = Semaphore;
```

Then, import the file in your script and use it
```
var Semaphore = require("./Semaphore.js"); // Semaphore.js is in the same folder than your script
sem = {sem: 2};
semaphore.Semaphore.p(sem, function() { /* critic code */ });
semaphore.Semaphore.v(sem);
```

## Using with other
Just import the file Semaphore.js in your script

# Release V0.1
The simpliest version, in 20 lines
If they are no resource when call Semaphore.p(), Semaphore will retry every 500ms to take the resource
