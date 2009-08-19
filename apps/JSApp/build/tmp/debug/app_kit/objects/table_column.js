/* 
 * table_column.js
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


// NSTablecolumn resizing
var NSTableColumnNoResizing     = 0;
var NSTableColumnAutoresizingMask   = ( 1 << 0 );
var NSTableColumnUserResizingMask   = ( 1 << 1 );

var NSTableColumn = VN.TableColumn = VN.Object.extend({

  /**
    Every column maintains its own renderContext for rendering each cell in
    that table column. The data cell is used with the renderContext, so that
    the element for the context is set between cell draws.
    
    @type VN.RenderContext
  */
  renderContext: null,
  
  
  _value: null,
  
  /**
    @param {VN.Coder} aCoder
    @returns VN.TableColumn
  */
  initWithCoder: function(aCoder) {
    // this._super(aCoder);
    // render context
    this.renderContext = VN.RenderContext.create();
    
    this._identifier = aCoder.decodeObjectForKey("NSIdentifier");
    this._headerCell = aCoder.decodeObjectForKey("NSHeaderCell");
    this._dataCell = aCoder.decodeObjectForKey("NSDataCell");
    this._width = aCoder.decodeIntForKey("NSWidth");
    this._minWidth = aCoder.decodeIntForKey("NSMinWidth");
    this._maxWidth = aCoder.decodeIntForKey("NSMaxWidth");
    this._tableView = aCoder.decodeObjectForKey("NSTableView");
    
    return this;
  },
  
  /*
    Instantiate a binding to the object. Placeholders and other information
    can be specified in the options dictionary.
    
    @param binding - NSString
    @param toObject - NSObject
    @param withKeyPath - NSString
    @param options - NSDictionary
  */
  bind: function(binding, toObject, withKeyPath, options) {
    if (binding == "value") {
      toObject.addObserverForKeyPath(this, withKeyPath, 0, NSValueBinding);
      
      var bindingInfo = NSDictionary.dictionaryWithObjectsForKeys(
        [toObject, withKeyPath, options],
        [NSObservedObjectKey, NSObservedKeyPathKey, NSOptionsKey]);

      this._kvb_info.setObjectForKey(bindingInfo, NSValueBinding);
    }
  },

  /*
    @param {NSString} keyPath
 		@param {NSObject} ofObject
 		@param {NSDictionary} change
 		@param {Object} context
 	*/
  observeValueForKeyPath: function(keyPath, ofObject, change, context) {
    if (context == NSValueBinding) {
      var newValue = ofObject.valueForKeyPath(keyPath);
      // this.setObjectValue(newValue);
      console.log('table column, new value = ');
      console.log(newValue);
     }
  },
  
  /**
    @type VN.TableView
  */
  _tableView: null,
  
  /**
    @param {VN.TableView} aTableView
  */
  setTableView: function(aTableView) {
    this._tableView = aTableView;
  },
  
  /**
    @returns VN.TableView
  */
  tableView: function() {
    return this._tableView;
  },

  /**
    @type VN.String
  */
  _identifier: null,
  
  /**
    @param {VN.String} identifier
  */
  setIdentifier: function(identifier) {
    this._identifier = identifier;
  },
  
  /**
    @returns VN.String
  */
  identifier: function() {
    return this._identifier;
  },
  
  /**
    @type Float
  */
  _width: null,
  
  setWidth: function(width) {
    this._width = width;
  },
  
  width: function() {
    return this._width;
  },
  
  /**
    @type Float
  */
  _minWidth: null,
  
  setMinWidth: function(minWidth) {
    this._minWidth = minWidth;
  },
  
  minWidth: function() {
    return this._minWidth;
  },
  
  /**
    @type Float
  */
  _maxWidth: null,
  
  setMaxWidth: function(maxWidth) {
    this._maxWidth = maxWidth;
  },
  
  maxWidth: function() {
    return this._maxWidth;
  },
  
  /**
    @type VN.Cell
  */
  _headerCell: null,
  
  setHeaderCell: function(cell) {
    this._headerCell = cell;
  },
  
  headerCell: function() {
    return this._headerCell;
  },
  
  /**
    @type VN.Cell
  */
  _dataCell: null,
  
  setDataCell: function(cell) {
    this._dataCell = cell;
  },
  
  dataCell: function() {
    return this._dataCell;
  },
  
  dataCellForRow: function() {
    return this._dataCell;
  },
  
  setEditable: function(flag) {
    this._isEditable = flag;
  },
  
  isEditable: function() {
    return this._isEditable;
  },
  
  sizeToFit: function() {
    
  },
  
  setSortDescriptorPrototype: function(sortDescriptor) {
    this._sortDescriptorPrototype = sortDescriptor;
  },
  
  sortDescriptorPrototype: function() {
    return this._sortDescriptorPrototype;
  },
  
  setResizingMask: function(resizingMask) {
    this._resizingMask = resizingMask;
  },
  
  resizingMask: function() {
    return this._resizingMask;
  },
  
  setHeaderToolTip: function(aString) {
    this._headerToolTip = aString;
  },
  
  headerToolTip: function() {
    return this._headerToolTip;
  },
  
  isHidden: function() {
    return this._isHidden;
  },
  
  setHidden: function(flag) {
    this._isHidden = flag;
  }  
});
