/* 
 * attributed_string.js
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


/**
  @class VN.AttributedString
  
  NSAttributedString manages a string with associated attributes that apply to
  individual characters, or ranges within the string. This base class provides
  the necessary basics for constructing and manipulating attributes within the
  string. AppKit adds more functionality, including the ability to draw these
  strings with their attributes. For advanced drawing and handling, a subclass
  NSTextStorage is introduced in AppKit that provides the means for the NSText
  drawing system within Vienna.
  
  Attributes are contained within NSDictionary classes that apply to the
  relevant ranges defined. NSAttributedString === NSMutableAttributedString.
*/
var NSAttributedString = VN.AttributedString = VN.Object.extend({
   
	_string: null,
	_attributes: null,
	
  string: function() {
    return this._string;
  },
  
  attributesAtIndex: function(location, effectiveRange) {
    
  },
  
  length: function() {
    return this._string.length;
  },
  
  attributeAtIndex: function(attrName, location, effectiveRange) {
    
  },
  
  attributedSubstringFromRange: function(string) {
    
  },
  
  isEqualToAttributedString: function(other) {
    
  },
  
  initWithString: function(aString) {
    this.init();
		this._string = new String(aString);
		this._attributes = NSDictionary.create();
		return this;
  },
  
  initWithStringAndAttributes: function(aString, attributes) {
    this.init();
    this._string = new String(aString);
    this._attributes = attributes;
    return this;
  },
  
  initWithAttributedString: function(attrString) {
    
  },
  
  replaceCharactersInRange: function(range, withString) {
    // this._string = this._string.slice(0, range.location) + withString + this._string.slice(range.location + range.length, )
    this._string = this._string.slice(0, range.location) + withString + this._string.slice(range.location + range.length);
  },
  
  setAttributes: function(attributes, range) {
    
  },
  
  addAttribute: function(name, value, range) {
    
  },
  
  removeAttribute: function(name, range) {
    
  },
  
  replaceCharactersInRangeWithAttributedString: function(range, attrString) {
    
  },
  
  insertAttributedString: function(attrString, atIndex) {
    
  },
  
  appendAttributedString: function(attrString) {
    
  },
  
  deleteCharactersInRange: function(range) {
    
  },
  
  setAttributedString: function(attrString) {
    
  },
  
  beginEditing: function() {
    // do nothing....
  },
  
  endEditing: function() {
    // do ntohing/....
  }
});
