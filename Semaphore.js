Semaphore: function Semaphore() {
}

// take one resource, if the semaphore is occupied, try 10 seconds after
Semaphore.p = function(sem, callback) {
	if (sem.sem <= 0) {
		setTimeout(function() {
			Semaphore.p(sem, callback);
		}.bind(this), 500);
	}
	else {
		sem.sem--; // /!\ First, we decrement sem, then we execute the callback
		callback();
	}
};

// free one resource
Semaphore.v = function(sem) {
	sem.sem++;
};