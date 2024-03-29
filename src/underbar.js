/*jshint eqnull:true, expr:true*/

var _ = {};

(function() {
  // Returns whatever value is passed as the argument. This function doesn't
  // seem very useful, but remember it--if a function needs to provide an
  // iterator when the user does not pass one in, this will be handy.
  _.identity = function(val) {
    return val;
  };

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   *
   *
   * IMPORTANT NOTE!
   * ===========
   *
   * The .first function is implemented for you, to help guide you toward success
   * in your work on the following functions. Whenever you see a portion of the
   * assignment pre-completed, be sure to read and understand it fully before
   * you proceed. Skipping this step will lead to considerably more difficulty
   * implementing the sections you are responsible for.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (!n) {
      return array[0];
    }

    return array.slice(0, n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (!n) return array[array.length - 1];
    if (n > array.length) return array;

    let newArray = [];

    for (let i = array.length - n; i < array.length; i++) {
      if (!array[i]) return newArray;
      newArray.push(array[i]);
    }

    return newArray;
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  //
  // Note: _.each does not have a return value, but rather simply runs the
  // iterator function over each item in the input collection.
  _.each = function(collection, iterator) {
    if (Array.isArray(collection)) {
      for (let i = 0; i < collection.length; i++) {
        iterator(collection[i], i, collection);
      }
    } else {
      for (const item in collection) {
        iterator(collection[item], item, collection);
      }
    }
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target) {
    // Instead of using a standard `for` loop,
    // use the iteration helper `each`, which you will need to write.
    let result = -1;

    _.each(array, (item, index) => {
      // Set result to be a default value of -1 to indicate that a match has NOT been found. If it is no longer -1 then that means a previous iteration has found and match and we should NOT be updating it.
      // Remember that we want the first match
      if (item === target && result === -1) result = index;
    });

    return result;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, test) {
    let newArray = [];

    _.each(collection, item => {
      if (test(item)) newArray.push(item);
    });

    return newArray;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, test) {
    // TIP: see if you can re-use _.filter() here, without simply
    // copying code in and modifying it
    return _.filter(collection, item => !test(item));
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    let newArray = [];

    _.each(array, item => _.indexOf(newArray, item) < 0 && newArray.push(item));
    // _.each(array, item => {
    //   if (_.indexOf(newArray, item) < 0) newArray.push(item);
    // });

    return newArray;
  };

  // Return the results of applying an iterator to each element.
  _.map = function(collection, iterator) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    let newArray = [];

    _.each(collection, item => newArray.push(iterator(item)));

    return newArray;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(collection, key) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(collection, item => item[key]);
  };

  // Calls the method named by methodName on each value in the list.
  // Note: you will nead to learn a bit about .apply to complete this.
  _.invoke = function(collection, functionOrKey, args) {
    return _.map(collection, item => {
      if (typeof functionOrKey === 'function')
        return functionOrKey.apply(item, args);
      return item[functionOrKey].apply(item, args);
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. If initialValue is not explicitly passed in, it should default to the
  // first element in the collection.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6

  // Shouldn't reduce be defaulting to the first value and then skipping it? This function has the accumlator defaulting to the first element and then using the element again in _.each
  // MDN notes 'If initialValue is not provided, reduce() will execute the callback function starting at index 1, skipping the first index. If initialValue is provided, it will start at index 0.'
  // Updated spec
  _.reduce = function(collection, iterator, accumulator) {
    // Fix it. FIX IT
    if (accumulator === undefined) {
      accumulator = collection[0];
      _.each(collection.slice(1), item => {
        accumulator = iterator(accumulator, item);
      });
    } else {
      _.each(collection, item => {
        accumulator = iterator(accumulator, item);
      });
    }

    return accumulator;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(
      collection,
      (accumulator, item) => {
        if (accumulator) return true;
        // Set accumulator here, check next time around.
        return (accumulator = item === target);
      },
      false
    );
  };

  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator) {
    // TIP: Try re-using reduce() here.
    return _.reduce(
      collection,
      (accumulator, item) => {
        // If any accumulator value is false then return right away
        if (accumulator) {
          // Do we have an iterator? If so then run it and cast to boolean
          if (iterator) return iterator(item) ? true : false;
          // No iterator. Cast the item to boolean
          else return item ? true : false;
        } else {
          return false;
        }
      },
      true
    );
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator) {
    // TIP: There's a very clever way to re-use every() here.
    // We want to force the first truthy value in every to become false. This kicks us out of the iteration with a false value.
    // We change the false value to true and return it.

    // We want to _.every to fail as soon as there is one truthy value. Handle this in the callback
    return !_.every(collection, item => {
      // if not iterator then evaluate each item. Set truthy value to falsy. If we leave it as true then the function keeps running
      return iterator ? !iterator(item) : !item;
    });
  };

  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = (...obj) => {
    let newObjProps = obj.slice(1);
    let newObject = obj[0];

    _.each(newObjProps, item => {
      _.each(item, (value, key) => {
        newObject[key] = value;
      });
    });
    return newObject;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = (...obj) => {
    let newObjProps = obj.slice(1);
    let newObject = obj[0];

    _.each(newObjProps, item => {
      _.each(item, (value, key) => {
        if (!newObject.hasOwnProperty(key)) newObject[key] = value;
      });
    });
    return newObject;
  };

  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    let hasCalled = false;
    let result;

    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function() {
      if (!hasCalled) {
        result = func.apply(null, arguments);
        hasCalled = true;
      }
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // _.memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    // Recursive calls. Memorizing previous results
    // Cache anything you're holding temporarily
    // Example - Fibonacci recursion. Recursion is like a tree, memoize makes it more linear. Remembers what we've looked at before in a cache to look up.
    // Saves time, but has memory cost.
    // Use a lot.
    let results = {};

    return function() {
      if (!results[arguments[0]]) {
        results[arguments[0]] = func.apply(null, arguments);
      }

      return results[arguments[0]];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    const args = _.map(arguments, item => item).slice(2);

    setTimeout(function() {
      func.apply(null, args);
    }, wait);
  };

  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Randomizes the order of an array's contents.
  //
  // TIP: This function's test suite will ask that you not modify the original
  // input array. For a tip on how to make a copy of an array, see:
  // http://mdn.io/Array.prototype.slice
  _.shuffle = function(array) {
    let clonedArray = array.slice();
    let shuffled = [];
    let randomIndex;
    let temp;

    // Loop from back
    for (let i = clonedArray.length - 1; i >= 0; i--) {
      // Grab last array element. Set to temp variable
      temp = clonedArray[i];
      // Get random index
      randomIndex = Math.floor(Math.random() * Math.floor(i));
      // Modify current array element to equal the random index value.
      clonedArray[i] = clonedArray[randomIndex];
      // Change whatever random index to our current element. Essentially swaps them
      clonedArray[randomIndex] = temp;
      // Remove last element and add to shuffled array
      shuffled.push(clonedArray.pop());
    }

    return shuffled;
  };

  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    return collection.sort((left, right) => {
      if (typeof iterator === 'string') {
        return left[iterator] > right[iterator]
          ? 1
          : left[iterator] < right[iterator]
          ? -1
          : 0;
      } else {
        return iterator(left) > iterator(right)
          ? 1
          : iterator(left) < iterator(right)
          ? -1
          : 0;
      }
    });
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    let zippedArray = [];

    for (let i = 0; i < arguments.length; i++) {
      zippedArray[i] = _.pluck(arguments, i);
    }

    return zippedArray;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray, result) {
    let flattenedArray = [];

    const makeFlat = arr => {
      _.each(arr, item => {
        if (!Array.isArray(item)) {
          flattenedArray.push(item);
        } else {
          makeFlat(item);
        }
      });
    };

    makeFlat(nestedArray);

    return flattenedArray;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    let commons = [];

    _.each(arguments[0], item => {
      if (_.contains(arguments[1], item)) {
        commons.push(item);
      }
    });

    return commons;
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    // Search arrays and filter out repeating elements from the first array
    // Convert arguments (array-like object) to an array. Bind arguments
    const testArrays = _.flatten(Array.prototype.slice.call(arguments, 1));
    return _.filter(array, item => {
      return !_.contains(testArrays, item);
    });
  };

  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.

  // USE A LOT
  _.throttle = function(func, wait) {
    let lastTrigger;
    let timer;
    let results;

    return () => {
      const now = Date.now();

      if (lastTrigger && now < lastTrigger + wait) {
        clearTimeout(timer);
        timer = setTimeout(() => {
          lastTrigger = now;
          results = func.apply(this, arguments);
        }, wait);
      } else {
        lastTrigger = now;
        results = func.apply(this, arguments);
      }
      return results;
    };
  };
}.call(this));
