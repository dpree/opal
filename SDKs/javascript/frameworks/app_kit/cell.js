/* 
 * cell.js
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

include('foundation/foundation');
include('app_kit/text');


var NSAnyType				        = 0;
var NSIntType				        = 1;
var NSPositiveIntType			    = 2;
var NSFloatType				        = 3;
var NSPositiveFloatType			    = 4;
var NSDoubleType			        = 6;
var NSPositiveDoubleType		    = 7;

// NSCellType
var NSNullCellType			        = 0;
var NSTextCellType			        = 1;
var NSImageCellType			        = 2;

// NSCellAttribute
var NSCellDisabled			        = 0;
var NSCellState				        = 1;
var NSPushInCell			        = 2;
var NSCellEditable			        = 3;
var NSChangeGrayCell			    = 4;
var NSCellHighlighted			    = 5;
var NSCellLightsByContents		    = 6;
var NSCellLightsByGray			    = 7;
var NSChangeBackgroundCell		    = 8;
var NSCellLightsByBackground		= 9;
var NSCellIsBordered			    = 10;
var NSCellHasOverlappingImage		= 11;
var NSCellHasImageHorizontal		= 12;
var NSCellHasImageOnLeftOrBottom	= 13;
var NSCellChangesContents		    = 14;
var NSCellIsInsetButton			    = 15;
var NSCellAllowsMixedState		    = 16;

// NSCellImagePosition
var NSNoImage				        = 0;
var NSImageOnly				        = 1;
var NSImageLeft				        = 2;
var NSImageRight			        = 3;
var NSImageBelow			        = 4;
var NSImageAbove			        = 5;
var NSImageOverlaps			        = 6;


// NSImageScaling
var NSImageScaleProportionallyDown  = 0;
var NSImageScaleAxesIndependently   = 1;
var NSImageScaleNone                = 2;
var NSImageScaleProportionallyUpOrDown = 3;

// NSCellStateValue
var NSMixedState                    = -1;
var NSOffState                      = 0;
var NSOnState                       = 1;

var NSNoCellMask			        = 0;
var NSContentsCellMask			    = 1;
var NSPushInCellMask			    = 2;
var NSChangeGrayCellMask		    = 4;
var NSChangeBackgroundCellMask		= 8;

// NSControlTint
var NSDefaultControlTint            = 0;
var NSBlueControlTint               = 1;
var NSGraphiteControlTint           = 6;
var NSClearControlTint              = 7;

// NSControlSize
var NSRegularControlSize            = 0;
var NSSmallControlSize              = 1;
var NSMiniControlSize               = 2;

var NSCell = NSObject.extend({
    
    _value: null,
    _state: null,
    _isHighlighted: null,
    _isEnabled: null,
    _isEditable: null,
    _isBordered: null,
    _isBezeled: null,
    _isSelectable: null,
    _isScrollable: null,
    _alignment: null,
    _controlSize: null,
    
    _isContinuous: null,
    
    _lineBreakMode: null,
    _wraps: null,
    
    _controlView: null,
    
    _target: null,
    _action: null,
    
    initTextCell: function(aString) {
        
    },
    
    initImageCell: function(image) {
        
    },
    
    initWithCoder: function(aCoder) {
        
        // this._super(aCoder);
        
        this._value = aCoder.decodeObjectForKey("NSContents");
        var flags = aCoder.decodeIntForKey("NSCellFlags");
        var flags2 = aCoder.decodeIntForKey("NSCellFlags2");
        
        this._state = (flags & 0x80000000) ? NSOnState : NSOffState;
        this._isHighlighted = (flags & 0x40000000) ? true : false;
        this._isEnabled = (flags & 0x20000000) ? false : true;

        this._isEditable = (flags & 0x10000000) ? true : false;
        this._isBordered = (flags & 0x00800000) ? true : false;
        this._isBezeled = (flags & 0x00400000) ? true : false;
        this._isSelectable = (flags & 0x00200000) ? true : false;
        this._isScrollable = (flags & 0x00100000) ? true : false;
        this._alignment = (flags2 & 0x1c000000) >> 26;
        this._controlSize = (flags2 & 0xE0000) >> 17;
        this._isContinuous = (flags & 0x00080100) ? true : false;
        
        this._lineBreakMode = (flags & 0x00007000) >> 12;
        this._wraps = (flags & 0x40) ? false : true;
        
        this._font = aCoder.decodeObjectForKey("NSSupport");
        
        return this;
    },
    
    controlView: function() {
        return this._controlView;
    },
    
    setControlView: function(view) {
        this._controlView = view;
    },
    
    cellClass: function() {
        return NSCell;
    },
    
    type: function() {
        
    },
    
    setType: function(aType) {
        
    },
    
    state: function() {
        return this._state;
    },
    
    setstate: function(value) {
        this._state = value;
    },
    
    target: function() {
        return this._target;
    },
    
    setTarget: function(anObject) {
        this._target = anObject;
    },
    
    action: function() {
        return this._action;
    },
    
    setAction: function(aSelector) {
        this._action = aSelector;
    },
    
    tag: function() {
        return this._tag;
    },
    
    setTag: function(anInt) {
        this._tag = anInt;
    },
    
    title: function() {
        
    },
    
    setTitle: function(aString) {
        
    },
    
    isOpaque: function() {
        
    },
    
    isEnabled: function() {
        return this._isEnabled;
    },
    
    setEnabled: function(flag) {
        this._isEnabled = flag;
    },
    
    sendActionOn: function(mask) {
        
    },
    
    isContinuous: function() {
        return this._isContinuous;
    },
    
    setContinuous: function(flag) {
        this._isContinuous = flag;
    },
    
    isEditable: function() {
        return this._isEditable;
    },
    
    setEditable: function(flag) {
        this._isEditable = flag;
    },
    
    isSelectable: function() {
        return this._isSelectable;
    },
    
    setSelectable: function(flag) {
        this._isSelectable = flag;
    },
    
    isBordered: function() {
        
    },
    
    setBordered: function(flag) {
        
    },
    
    isBezeled: function() {
        
    },
    
    setBezeled: function(flag) {
        
    },
    
    isScrollable: function() {
        
    },
    
    setScrollable: function(flag) {
        
    },
    
    isHighlighted: function() {
        return this._isHighlighted;
    },
    
    setHighlighted: function(flag) {
        this._isHighlighted = flag;
    },
    
    alignment: function() {
        return this._alignment;
    },
    
    setAlignment: function(mode) {
        this._alignment = mode;
    },
    
    wraps: function() {
        
    },
    
    setWraps: function(flag) {
        
    },
    
    font: function() {
        return this._font;
    },
    
    setFont: function(fontObj) {
        this._font = fontObj;
    },
    
    entryType: function() {
        
    },
    
    setEntryType: function(aType) {
        
    },
    
    isEntryAcceptable: function(aString) {
        
    },
    
    keyEquivalent: function() {
        
    },
    
    setFormatter: function(newFormatter) {
        
    },
    
    formatter: function() {
        
    },
    
    objectValue: function() {
        
    },
    
    setObjectValue: function(obj) {
        this._value = obj;
    },
    
    hasValidObjectValue: function() {
        
    },
    
    stringValue: function() {
        return this._value;
    },
    
    setStringValue: function(aString) {
        this._value = aString;
    },
    
    compare: function(otherCell) {
        
    },
    
    intValue: function() {
        
    },
    
    setIntValue: function(anInt) {
        
    },
    
    floatValue: function() {
        
    },
    
    setFloatValue: function(aFloat) {
        
    },
    
    doubleValue: function() {
        return this._value;
    },
    
    setDoubleValue: function(aDouble) {
        this._value = aDouble;
    },
    
    takeIntValueFrom: function(sender) {
        
    },
    
    takeFloatValueFrom: function(sender) {
        
    },
    
    takeDoubleValueFrom: function(sender) {
        this.setDoubleValue(sender.doubleValue());
    },
    
    takeStringValueFrom: function(sender) {
        
    },
    
    takeObjectValueFrom: function(sender) {
        
    },
    
    image: function() {
        
    },
    
    setImage: function(image) {
        
    },
    
    setControlTint: function(controlTint) {
        
    },
    
    controlTint: function() {
        
    },
    
    setControlSize: function(size) {
        
    },
    
    controlSize: function() {
        
    },
    
    representedObject: function() {
        
    },
    
    setRepresentedObject: function(anObject) {
        
    },
    
    imageRectForBounds: function(theRect) {
        
    },
    
    titleRectForBounds: function(theRect) {
        return theRect;
    },
    
    drawingRectForBounds: function(theRect) {
        
    },
    
    cellSize: function() {
        
    },
    
    cellSizeForBounds: function(aRect) {
        
    },
    
    highlightColorWithFrame: function(cellFrame, controlView) {
        
    },
    
    calcDrawInfo: function(aRect) {
        
    },
    
    setUpFieldEditorAttributes: function(textObj) {
        textObj.setAlignment(this.alignment());
        textObj.setString(this.stringValue());
        textObj.setSelectable(this.isSelectable());
        textObj.setEditable(this.isEditable());
        textObj.setFont(this.font());
        
        if (this.respondsTo('drawsBackground'))
            textObj.setDrawsBackground(this.drawsBackground());
        
        if (this.respondsTo('backgroundColor'))
            textObj.setBackgroundColor(this.backgroundColor());
        
        return textObj;
    },

    drawInteriorWithFrame: function(cellFrame, controlView) {
        
    },
    
    drawWithFrame: function(cellFrame, controlView) {
        this.drawInteriorWithFrame(cellFrame, controlView);
    },
    
    renderWithFrame: function(cellFrame, controlView) {
        this.renderInteriorWithFrame(cellFrame, controlView);
    },
    
    renderInteriorWithFrame: function(cellFrame, controlView) {
        
    },
    
    displayWithFrame: function(cellFrame, controlView) {
        
    },
    
    displayInteriorWithFrame: function(cellFrame, controlView) {
        
    },
    
    highlightInView: function(flag, cellFrame, controlView) {
        
        if (this.isHighlighted() != flag) {
            this.setHighlighted(flag);
            this.displayWithFrame(cellFrame, controlView);
        }
    },
    
    mouseDownFlags: function() {
        
    },
    
    getPeriodicDelay: function(delay, interval) {
        
    },
    
    startTrackingInView: function(startPoint, controlView) {
        return this.isEnabled() ? true : false;
    },
    
    continueTrackingInView: function(lastPoint, currentPoint, controlView) {
        
        return true;
    },
    
    stopTrackingInView: function(lastPoint, stopPoint, controlView, mouseUp) {
        
        // empty implementation
    },
    
    trackMouseInView: function(theEvent, cellFrame, controlView, untilMouseUp) {
        
        controlView.lockFocus();
        
        var location = controlView.convertPointFromView(theEvent.locationInWindow(), null);
        
        if (!(this.startTrackingInView(theEvent.locationInWindow(), controlView))) {
            this.drawWithFrame(cellFrame, controlView);
            controlView.unlockFocus();
            return false;
        }
        
        this.highlightInView(true, controlView.bounds(), controlView);
        controlView.unlockFocus();
        if (this.isContinuous()) {
            // mouse down, so only send if control is continous
            NSApplication.sharedApplication().sendAction(this._action, this._target, this);
        }
        
        // for each further event...
        NSApplication.sharedApplication().bindEventsMatchingMask((NSLeftMouseUpMask | NSMouseMovedMask), this, function(theEvent) {
            controlView.lockFocus();
            var location = controlView.convertPointFromView(theEvent.locationInWindow(), null);
            
            if (untilMouseUp) {
                if (theEvent.type() == NSLeftMouseUp) {
                    this.stopTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView, true);
                    NSApplication.sharedApplication().unbindEvents();
                    
                    if (this.state() == NSOffState)
                        this._state = NSOnState;
                    else
                        this._state = NSOffState;
                    
                    this.setHighlighted(false);
                    this.drawWithFrame(cellFrame, controlView);
                    controlView.unlockFocus();
                    
                    NSApplication.sharedApplication().unbindEvents();
                    if (NSPointInRect(location, cellFrame)) {
                        // only send action is mouse up was in rect
                        NSApplication.sharedApplication().sendAction(this._action, this._target, this);
                    }
                    
                    return;
                }
                else {
                    if (NSPointInRect(location, cellFrame))
                        this.setHighlighted(true);
                    else
                        this.setHighlighted(false);
                    
                    if (!(this.continueTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView)))
                        NSApplication.sharedApplication().unbindEvents();
                }
            }
            else if (NSPointInRect(location, cellFrame)) {
                console.log("Got here, in frame");
            }
            else {
                console.log("moved out of frame");
                this.stopTrackingInView(theEvent.locationInWindow(), theEvent.locationInWindow(), controlView, false);
                NSApplication.sharedApplication().unbindEvents();
            }
            
            this.drawWithFrame(cellFrame, controlView);
            controlView.unlockFocus();
            
            if (this.isContinuous()) {
                // mouse moved, so only send if control is continous
                NSApplication.sharedApplication().sendAction(this._action, this._target, this);
            }
                
        });
    },
    
    editWithFrame: function(aRect, controlView, textObj, anObject, theEvent) {
        
        if (!this.isEditable() && !this.isSelectable())
            return;
        
        textObj.setFrame(this.titleRectForBounds(aRect));
        controlView.addSubview(textObj);
        controlView.window().makeFirstResponder(textObj);
        textObj.setDelegate(anObject);
        textObj.mouseDown(theEvent);
    },
    
    selectWithFrameInView: function(aRect, controlView, textObj, anObject, selStart, selLength) {
        
        if (!this.isEditable() && !this.isSelectable()) return;
        
        textObj.setFrame(this.titleRectForBounds(aRect));
        controlView.addSubview(textObj);
        controlView.window().makeFirstResponder(textObj);
        textObj.setDelegate(anObject);
        textObj.setSelectedRange(null);
    },
    
    endEditing: function(textObj) {
        
        this.setStringValue(textObj.string());
    },
    
    resetCursorRectInView: function(cellFrame, controlView) {
        
    },
    
    setMenu: function(aMenu) {
        
    },
    
    menu: function() {
        
    },
    
    menuForEvent: function(theEvent, cellFrame, view) {
        
    },
    
    setSendsActionOnEndEditing: function(flag) {
        
    },
    
    sendsActionOnEndEditing: function() {
        
    },
    
    baseWritingDirection: function() {
        
    },
    
    setBaseWritingDirection: function(writingDirection) {
        
    },
    
    setLineBreakMode: function(mode) {
        this._lineBreakMode = mode;
    },
    
    lineBreakMode: function() {
        return this._lineBreakMode;
    },
    
    setAllowsUndo: function(flag) {
        
    },
    
    allowsUndo: function() {
        
    },
    
    setIntegerValue: function(anInteger) {
        
    },
    
    integerValue: function() {
        
    },
    
    trunacatesLastVisibleLine: function() {
        
    },
    
    setTrunacatesLastVisibleLine: function(flag) {
        
    }
});     
