// 
//  array.js
//  vienna
//  
//  Created by Adam Beynon on 2009-10-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

Vienna.extend({
  
  Array: Array.extend({
    
    each: function(block) {
      for (var i = 0; i < this.length; i++) {
        block(this[idx]);
      }
    },
    
    map: function(array) {
      var result = [];
      for (var idx = 0; idx < this.length; idx++) {
        result[idx] = array(this[idx]);
      }

      return result;
    },

    count: function() {
      return this.length;
    },

    objectAtIndex: function(index) {
      return this[index];
    },

    addObject: function(anObject) {
      this.push(anObject);
    },

    lastObject: function() {
      return this.objectAtIndex(this.length - 1);
    },

    removeLastObject: function() {
      this.pop();
    }
  })
});
