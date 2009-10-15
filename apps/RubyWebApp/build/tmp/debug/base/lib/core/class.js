/* 
 * class.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */


cClass.$def('new', function(self, _cmd) {
  // var obj = this.$('allocate', []);
  // console.log('In new');
  var obj = VN$(self, 'allocate');
  // split args from 2 (to avoid sending self, _cmd)
  arguments[0] = obj;
  arguments[1] = 'initialize';
  // VN$(obj, 'initialize');
  VN$.apply(obj, arguments);
  // obj.$('initialize', arguments);
  return obj;
});

cClass.$def('allocate', function(obj_alloc) {
  
});

cClass.$def('initialize', function(class_initialize) {
  
});

cClass.$def('initialize_copy', function(class_init_copy) {
  
});

cClass.$def('superclass', function(class_superclass) {
  
});

cClass.$define_alloc_func(function(class_s_alloc) {
  
});

// VN.undef_method(VN.cClass, 'extend_object');
// VN.undef_method(VN.cClass, 'append_features');
