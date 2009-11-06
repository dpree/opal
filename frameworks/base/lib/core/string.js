/* 
 * string.js
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

var rb_cString = cString;

String.prototype.$klass = rb_cString;
String.prototype.$type = T_STRING;

rb_cString.$define_alloc_func(function() {
  return new String();
});

rb_define_method(rb_cString, "try_convert", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "initialize", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "initialize_copy", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "<=>", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "==", function(self, _cmd, obj) {
  return (self == obj) && (obj.$type == T_STRING) ? true : false;
});

rb_define_method(rb_cString, "eql?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "hash", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "casecmp", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "+", function(self, _cmd, obj) {
  return self + obj;
});

rb_define_method(rb_cString, "*", function(self, _cmd, obj) {
  
});

rb_define_method(rb_cString, "%", function(self, _cmd, obj) {
  
});

rb_define_method(rb_cString, "[]", function(self, _cmd, key) {
  
});

rb_define_method(rb_cString, "[]=", function(self, _cmd, key, val) {
  
});

rb_define_method(rb_cString, "insert", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "length", function(self, _cmd) {
  return self.length;
});

rb_define_method(rb_cString, "size", function(self, _cmd) {
  return self.size;
});

rb_define_method(rb_cString, "empty?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "=~", function(self, _cmd, match) {
  
});
  
rb_define_method(rb_cString, "succ", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "next", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "upto", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "index", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "rindex", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "replace", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "clear", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chr", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "to_i", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "to_f", function(self, _cmd) {
  
});
 
rb_define_method(rb_cString, "to_s", function(self, _cmd) {
  return new String(self);
}); 

rb_define_method(rb_cString, "to_str", function(self, _cmd) {
  return new String(self);
});

rb_define_method(rb_cString, "inspect", function(self, _cmd) {
  return new String('"' + self + '"');
});

rb_define_method(rb_cString, "dump", function(self, _cmd) {
  
});


rb_define_method(rb_cString, "upcase", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "downcase", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "capitalize", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "swapcase", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "camelize", function(self, _cmd) {
  var parts = self.split('_');
  var length = parts.length;
  
  if (length == 1) return parts[0];
  
  var camelized = self.charAt(0) == '-'
    ? parts[0].charAt(0).toUpperCase() + parts[0].substring(1)
    : parts[0];
    for (var i = 1; i < length; i++)
      camelized += parts[i].charAt(0).toUpperCase() + parts[i].substring(1);

    return camelized;
});

rb_define_method(rb_cString, "hex", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "oct", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "split", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "lines", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "bytes", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chars", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "codepoints", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "reverse", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "concat", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "<<", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "crypt", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "intern", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "to_sym", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "ord", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "include?", function(self, _cmd) {
  
});
  
rb_define_method(rb_cString, "start_with?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "end_with?", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "scan", function(self, _cmd) {
  
});
  
rb_define_method(rb_cString, "ljust", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "rjust", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "center", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "sub", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "gsub", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chop", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "chomp", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "strip", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "lstrip", function(self, _cmd) {
  
});
  
rb_define_method(rb_cString, "rstrip", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "tr", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "tr_s", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "delete", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "squeeze", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "count", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_line", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_byte", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_char", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "each_codepoint", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "sum", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "partition", function(self, _cmd) {
  
});

rb_define_method(rb_cString, "rpartition", function(self, _cmd) {
  
});
