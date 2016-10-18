/*
 * Author : David
 * Repositorie : https://github.com/dada17xs/Semaphore
 * Release date : 2016-10-17
 * Version : 1.0
 */
// This script was developed in october 2016.
//
// At this time, Javascript was mono-processor and each function is atomic. If this change in the futur, this script will no longer work.
// This script use the fact that JavaScript function is atomic. Without this fact, interblocage can happen
//
// This script is useless if you have one page application
// This script is usefull if you have a critics section in your code that you want can be executed precisely X time maximum at the same time. This significate that Semaphore.js will not let Javascript enter in your critic section if it already in execution X time, X your choice.
// This script is usefull if you have deffered function in your code
// See the example for better comprehension
// 
// If you have several function in your Javascript, that you don't know in which order they will be executed, you can use Semaphore to be sure that a function or a portion of code will be executed only a number time you choose at the same time
//
// Learn more on semaphore on : https://en.wikipedia.org/wiki/Semaphore_(programming)
// 
// You can tell Semaphore.js to wait between each function, for this, when you call p() function, give him a third argument in milliseconds : p(sem, MyFunction, 10000) will wait 10 seconds if the semaphores is already occupied



// *****************************************
// *************   Object methods   *************
// *****************************************

// Faire un système de priorité avec priorité par défaut, greater is more prioriter
Semaphore: function Semaphore(numberResources, defaultPriority, defaultTimeoutBetweenCallback, lifo) { // faire si ça prend le dernier ou le premier élément du tableau, et timeout default
	this.numberResources = (typeof numberResources !== "undefined" && !isNaN(parseInt(numberResources)) && isFinite(numberResources)) ? parseInt(numberResources) : 1;
	//this.numberFreeResources = this.numberResources;
	this.queue = this.numberResources;
	this.setDefaultPriority(defaultPriority);
	this.setDefaultTimeoutBetweenCallback(defaultTimeoutBetweenCallback);
	this.setLifo(lifo);
	this.functionCallbacks = []; // The array that will contains the callback to execute when the resource will be free
}

Semaphore.prototype.init = function(numberResources) {
	this.setNumberResources(numberResources);
}

// Getters et setters
/*Semaphore.prototype.setNumberResources = function(numberResources) {
	if (typeof numberResources !== "undefined" && !isNaN(parseInt(numberResources)) && isFinite(numberResources)) {
		numberResources = parseInt(numberResources);
		if (numberResources > this.numberResources) {
			console.log("____setNumberResources(): add(" + (numberResources - this.numberResources) + ") n="+numberResources+" this="+this.numberResources+"");
			this.addResources(numberResources - this.numberResources);
		}
		else if (numberResources < this.numberResources) {
			console.log("____setNumberResources(): sub(" + (this.numberResources - numberResources) + ") n="+numberResources+" this="+this.numberResources+"");
			this.subResources(this.numberResources - numberResources);
		}
	}
}*/
Semaphore.prototype.getNumberResources = function() {
	return this.numberResources;
}
/*Semaphore.prototype.getNumberFreeResources = function() {
	return this.numberFreeResources;
}*/

Semaphore.prototype.setDefaultPriority = function(defaultPriority) {
	this.defaultPriority = (typeof defaultPriority !== "undefined" && !isNaN(parseInt(defaultPriority)) && isFinite(defaultPriority)) ? parseInt(defaultPriority) : 0;
}
Semaphore.prototype.getDefaultPriority = function() {
	return this.defaultPriority;
}

Semaphore.prototype.setDefaultTimeoutBetweenCallback = function(defaultTimeoutBetweenCallback) {
	this.defaultTimeoutBetweenCallback = (typeof defaultTimeoutBetweenCallback !== "undefined" && !isNaN(parseInt(defaultTimeoutBetweenCallback)) && isFinite(defaultTimeoutBetweenCallback)) ? parseInt(defaultTimeoutBetweenCallback) : null;
}
Semaphore.prototype.getDefaultTimeoutBetweenCallback = function() {
	return this.defaultTimeoutBetweenCallback;
}

Semaphore.prototype.setLifo = function(lifo) {
	this.lifo = (typeof lifo !== "undefined" && (lifo === true || lifo === "true" || lifo === 'true' || lifo === 1)) ? true : false;
}
Semaphore.prototype.getLifo = function() {
	return this.lifo;
}


//not tested yet, juste the idea
// on lance plusieurs fois v() pour lancer des tâches qui étaient en attentes et incrémenter numberResources
/*
 * If you pass a negative number argument, it will call subResources with Math.abs(numberResources)
 * If you pass 0, nothing happens
 */
/*Semaphore.prototype.addResources = function(numberResources) {
	if (typeof numberResources !== "undefined" && !isNaN(parseInt(numberResources)) && isFinite(numberResources)) {
		numberResources = parseInt(numberResources);
		if (numberResources < 0) {
			this.subResources(Math.abs(numberResources));
		}
		else if (numberResources > 0) {
			this.numberResources += numberResources;
			//this.numberFreeResources += numberResources;
			for (var i = 0; i < numberResources; i++) {
				this.v();
			}
		}
	}
}*/

// celles qui sont en cours finiront, par contre les autres ne pourront plus prendre de ressource tant qu'il n'y en a pas une qui se libère
/*
 * If you pass a negative number argument, it will call addResources with Math.abs(numberResources)
 * If you pass 0, nothing happens
 */
/*Semaphore.prototype.subResources = function(numberResources) {
	if (typeof numberResources !== "undefined" && !isNaN(parseInt(numberResources)) && isFinite(numberResources)) {
		numberResources = parseInt(numberResources);
		if (numberResources < 0) {
			this.addResources(Math.abs(numberResources));
		}
		else if (numberResources > 0) {
			//this.queue -= numberResources;
			this.numberResources -= numberResources;
			//this.numberFreeResources -= numberResources;
		}
	}
}*/


// fonction pour vider la queue
Semaphore.prototype.emptyStack = function() {
	this.queue += this.getStackSize();
	this.functionCallbacks = [];
};

// fonction pour avoir la longueur de la queue
Semaphore.prototype.getStackSize = function() {
	return this.functionCallbacks.length;
	// normally the same than return Math.abs(this.queue)
};




// take one resource, if the semaphore is occupied, try 10 seconds after
Semaphore.prototype.p = function(callback, priority, timeoutBetweenCallback) {
	//console.log("____prototype.p(): start numberResources=" + this.numberResources);
	this.queue--;
	if (this.queue < 0) {
		//console.log("____prototype.p(): block !");
		/*setTimeout(function() {
			Semaphore.p(numberResources, callback);
		}.bind(this), 500);*/
		this.functionCallbacks.push({ 
													callback: callback, 
													priority: (typeof priority !== "undefined" && !isNaN(parseInt(priority)) && isFinite(priority)) ? parseInt(priority) : this.defaultPriority, 
													timeoutBetweenCallback: (typeof timeoutBetweenCallback !== "undefined" && !isNaN(parseInt(timeoutBetweenCallback)) && isFinite(timeoutBetweenCallback)) ? parseInt(timeoutBetweenCallback) : this.defaultTimeoutBetweenCallback
												});
	}
	else {
		//console.log("____prototype.p(): work !");
		//this.numberFreeResources--;
		callback();
	}
	//console.log("____prototype.p(): end numberResources=" + this.numberResources);
};

// free one resource
Semaphore.prototype.v = function() {
	//console.log("____prototype.v(): start numberResources=" + this.numberResources);
	this.queue++;
	//this.numberFreeResources++;
	if (this.queue <= 0 && this.functionCallbacks.length > 0) {
	//if (this.functionCallbacks.length > 0 && this.queue <= 0 && this.numberFreeResources > 0) {
		//console.log("____prototype.v(): callback arrive");
		//var thisCallback = (this.lifo === true) ? this.functionCallbacks.pop() : this.functionCallbacks.shift();
		// take the priest
		//console.log("______déb_______");
		var indexCallback = 0;
		this.functionCallbacks.forEach(function(element, index, array) {
			//console.log(index)
			//console.log(element)
			if (this.lifo === true && element.priority != null && element.priority >= array[indexCallback].priority) {
				indexCallback = index;
				//console.log("ok1");
			}
			else if (this.lifo === false && element.priority != null && element.priority > array[indexCallback].priority) {
				indexCallback = index;
				//console.log("ok1");
			}
		}.bind(this));
		var selectedCallback = this.functionCallbacks.splice(indexCallback, 1)[0]; // remove from functionCallbacks
		//console.log("_____fin________");
		//console.log(selectedCallback);
		//this.numberFreeResources--;
		if ((selectedCallback.timeoutBetweenCallback != null && selectedCallback.timeoutBetweenCallback >= 0)) {
			//console.log("____prototype.v(): if : setTimeout");
			setTimeout(function() {
				selectedCallback.callback();
			}, (selectedCallback.timeoutBetweenCallback != null && selectedCallback.timeoutBetweenCallback >= 0) ? selectedCallback.timeoutBetweenCallback : (this.defaultTimeoutBetweenCallback != null && this.defaultTimeoutBetweenCallback >= 0) ? this.defaultTimeoutBetweenCallback : 0); // setTimeout(function(){}, 0); re-queues the function at the end of the JavaScript execution queue
		}
		else {
			//console.log("____prototype.v(): else");
			selectedCallback.callback(); // Keep the if and the else, the if with the setTimeout and the esle without the SetTimeout to make some different possibilities if discover bug...
		}
	}
	//console.log("____prototype.v(): end numberResources=" + this.numberResources);
};





// *****************************************
// *************   Static methods   *************
// *****************************************

// faire si y a que deux arguments, c'est à dire pas de tableau de callback, dans ce cas, on réitère toutes les 500ms

// you can use is staticly, but you must give the sem, the callback, the array of callback, the timeout
// without the callback array, the function will wait and try each Timeout milliseconds to take the semaphore

// take one resource, if the semaphore is occupied, try 10 seconds after
Semaphore.p = function(numberResources, functionCallbacks, callback) {
	//console.log("____p(): start numberResources=" + numberResources.numberResources);
	if (typeof callback === "function") {
		numberResources.numberResources--;
		if (numberResources.numberResources < 0) {
			functionCallbacks.unshift(callback);
		}
		else {
			callback();
		}
	}
	else { // with callback array
		if (numberResources.numberResources <= 0) {
			setTimeout(function() {
				Semaphore.p(numberResources, functionCallbacks);
			}.bind(this), 500);
		}
		else {
			numberResources.numberResources--;
			functionCallbacks();
		}
	}
	//console.log("____p(): end numberResources=" + numberResources.numberResources);
};

// free one resource
Semaphore.v = function(numberResources, functionCallbacks) {
	//console.log("____v(): start numberResources=" + numberResources.numberResources);
	numberResources.numberResources++;
	if (numberResources.numberResources <= 0 && typeof functionCallbacks !== "undefined") {
		//console.log("____v(): callback arrive");
		var thisCallback = functionCallbacks.pop();
		thisCallback();
	}
	//console.log("____v(): end numberResources=" + numberResources.numberResources);
};




//console.log("Semaphore.js finish loading");


// *****************************************
// *************   Exports   *************
// *****************************************

// For Node.js
module.exports = {
	Semaphore: Semaphore
}

// For add-ons SDK Mozilla using
//var {Cc, Ci} = require("chrome");
//exports.Semaphore = Semaphore;

// For browser using
// include this file in your script:
// <script src="Semaphore.js"></script>
