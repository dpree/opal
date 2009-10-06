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

String.prototype.$klass = cString ;
String.prototype.$type = VN.STRING ;

String.prototype.$call = RObject.prototype.$call;



cString.$define_alloc_func(function() {
  return new String();
});

cString.$def_s('try_convert', function(obj) {
  
});

cString.$def('initialize', function(str_init) {
  
});

cString.$def('initialize_copy', function(str_replace) {
  
});

cString.$def('<=>', function(str_cmp_m) {
  
});

cString.$def('==', function(str_equal) {
  
});

cString.$def('eql?', function(str_eql) {
  
});

cString.$def('hash', function(str_hash_m) {
  
});

cString.$def('casecmp', function(str_casecmp) {
  
});

cString.$def('+', function(str_plus) {
  
});

cString.$def('*', function(str_times) {
  
});

cString.$def('%', function(str_format_m) {
  
});

cString.$def('[]', function(str_aref_m) {
  
});

cString.$def('[]=', function(str_aset_m) {
  
});

cString.$def('insert', function(str_insert) {
  
});

cString.$def('length', function() {
  return this.length;
});

cString.$def('size', function() {
  return this.length;
});

cString.$def('bytesize', function(str_bytesize) {
  
});

cString.$def('empty?', function(str_empty) {
  
});

cString.$def('=~', function(str_match) {
  
});

cString.$def('match', function(str_match_m) {
  
});

cString.$def('succ', function(str_succ) {
  
});

cString.$def('next', function(str_succ) {
  
});

cString.$def('upto', function(str_upto) {
  
});

cString.$def('index', function(str_index_m) {
  
});

cString.$def('rindex', function(str_rindex_m) {
  
});

cString.$def('replace', function(str_replace) {
  
});

cString.$def('clear', function(str_clear) {
  
});

cString.$def('chr', function(str_chr) {
  
});

cString.$def('getbyte', function(str_getbyte) {
  
});

cString.$def('setbyte', function(str_setbyte) {
  
});


cString.$def('to_i', function(str_to_i) {

});

cString.$def('to_f', function(str_to_f) {
  
});


cString.$def('to_s', function() {
  return new String(this);
});

cString.$def('to_str', function() {
  return new String(this);
});

cString.$def('inspect', function() {
  return new String('"' + this + '"');
});

cString.$def('dump', VN.str_dump, 0);

cString.$def('upcase', VN.str_upcase, 0);
cString.$def('downcase', VN.str_downcase, 0);
cString.$def('capitalize', VN.str_capitalize, 0);
cString.$def('swapcase', VN.str_swapcase, 0);

cString.$def('upcase!', VN.str_upcase_bang, 0);
cString.$def('downcase!', VN.str_downcase_bang, 0);
cString.$def('capitalize!', VN.str_capitalize_bang, 0);
cString.$def('swapcase!', VN.str_swapcase_bang, 0);

cString.$def('hex', VN.str_hex, 0);
cString.$def('oct', VN.str_oct, 0);
cString.$def('split', VN.str_split_m, -1);
cString.$def('lines', VN.str_each_line, -1);
cString.$def('bytes', VN.str_each_byte, 0);
cString.$def('chars', VN.str_each_char, 0);
cString.$def('codepoints', VN.str_each_codepoint, 0);
cString.$def('reverse', VN.str_reverse, 0);
cString.$def('reverse!', VN.str_reverse_bang, 0);
cString.$def('concat', VN.str_concat, 1);
cString.$def('<<', VN.str_concat, 1);
cString.$def('crypt', VN.str_crypt, 1);
cString.$def('intern', VN.str_intern, 0);
cString.$def('to_sym', VN.str_intern, 0);
cString.$def('ord', VN.str_ord, 0);

cString.$def('include?', VN.str_include, 1);
cString.$def('start_with?', VN.str_start_with, -1);
cString.$def('end_with?', VN.str_end_with, -1);

cString.$def('scan', VN.str_scan, 1);

cString.$def('ljust', VN.str_ljust, -1);
cString.$def('rjust', VN.str_rjust, -1);
cString.$def('center', VN.str_center, -1);

cString.$def('sub', VN.str_sub, -1);
cString.$def('gsub', VN.str_gsub, -1);
cString.$def('chop', VN.str_chop, 0);
cString.$def('chomp', VN.str_chomp, -1);
cString.$def('strip', VN.str_strip, 0);
cString.$def('lstrip', VN.str_lstrip, 0);
cString.$def('rstrip', VN.str_rstrip, 0);

cString.$def('sub!', VN.str_sub_bang, -1);
cString.$def('gsub!', VN.str_gsub_bang, -1);
cString.$def('chop!', VN.str_chop_bang, 0);
cString.$def('chomp!', VN.str_chomp_bang, -1);
cString.$def('strip!', VN.str_strip_bang, 0);
cString.$def('lstrip!', VN.str_lstrip_bang, 0);
cString.$def('rstrip!', VN.str_rstrip_bang, 0);

cString.$def('tr', VN.str_tr, 2);
cString.$def('tr_s', VN.str_tr_s, 2);
cString.$def('delete', VN.str_delete, -1);
cString.$def('squeeze', VN.str_squeeze, -1);
cString.$def('count', VN.str_count, -1);

cString.$def('tr!', VN.str_tr_bang, 2);
cString.$def('tr_s!', VN.str_tr_s_bang, 2);
cString.$def('delete!', VN.str_delete_bang, -1);
cString.$def('squeeze!', VN.str_squeeze_bang, -1);

cString.$def('each_line', VN.str_each_line, -1);
cString.$def('each_byte', VN.str_each_byte, 0);
cString.$def('each_char', VN.str_each_char, 0);
cString.$def('each_codepoint', VN.str_each_codepoint, 0);

cString.$def('sum', VN.str_sum, -1);

cString.$def('slice', VN.str_aref_m, -1);
cString.$def('slice!', VN.str_slice_bang, -1);

cString.$def('partition', VN.str_partition, 1);
cString.$def('rpartition', VN.str_rpartition, 1);

cString.$def('encoding', VN.obj_encoding, 0); /* in encoding.c */
cString.$def('force_encoding', VN.str_force_encoding, 1);
cString.$def('valid_encoding?', VN.str_valid_encoding_p, 0);
cString.$def('ascii_only?', VN.str_is_ascii_only_p, 0);