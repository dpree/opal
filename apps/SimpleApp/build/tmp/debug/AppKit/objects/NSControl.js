var the_class = objc_allocateClassPair(NSView, "NSControl");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_nextResponder", "id");
class_addIvar(the_class, "_frame", "NSRect");
class_addIvar(the_class, "_bounds", "NSRect");
class_addIvar(the_class, "_window", "NSWindow");
class_addIvar(the_class, "_gState", "id");
class_addIvar(the_class, "_menu", "NSMenu");
class_addIvar(the_class, "_superview", "NSView");
class_addIvar(the_class, "_subviews", "NSMutableArray");
class_addIvar(the_class, "_nextKeyView", "NSView");
class_addIvar(the_class, "_previousKeyView", "NSView");
class_addIvar(the_class, "_isHidden", "BOOL");
class_addIvar(the_class, "_postsNotificationOnFrameChange", "BOOL");
class_addIvar(the_class, "_postsNotificationOnBoundsChange", "BOOL");
class_addIvar(the_class, "_autoresizesSubviews", "BOOL");
class_addIvar(the_class, "_inLiveResize", "BOOL");
class_addIvar(the_class, "_autoresizingMask", "int");
class_addIvar(the_class, "_tag", "int");
class_addIvar(the_class, "_draggedTypes", "NSArray");
class_addIvar(the_class, "_defaultToolTipTag", "NSToolTipTag");
class_addIvar(the_class, "_toolTip", "NSString");
class_addIvar(the_class, "_invalidRect", "NSRect");
class_addIvar(the_class, "_validTransforms", "BOOL");
class_addIvar(the_class, "_transformFromWindow", "CGAffineTransform");
class_addIvar(the_class, "_transformToWindow", "CGAffineTransform");
class_addIvar(the_class, "_visibleRect", "NSRect");
class_addIvar(the_class, "_DOMContainer", "id");
class_addIvar(the_class, "_DOMGraphicsContext", "id");
class_addIvar(the_class, "_tag", "NSInteger");
class_addIvar(the_class, "_cell", "NSCell");
class_addIvar(the_class, "_currentEditor", "NSText");
class_addIvar(the_class, "_value", "id");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
self = objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
if (self)
{
objc_msgSend(self, "setCell:", objc_msgSend(objc_msgSend(objc_msgSend(self, "cellClass"), "alloc"), "init"));

}

return self;
}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
self = objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder");
_cell = objc_msgSend(aCoder, "decodeObjectForKey:", "NSCell");
return self;
}, "void");

class_addMethod(the_class, "sizeToFit", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "calcSize", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "cell", function(self, _cmd) {
return _cell;
}, "void");

class_addMethod(the_class, "setCell:", function(self, _cmd, aCell) {
_cell = aCell;
objc_msgSend(_cell, "setControlView:", self);
objc_msgSend(self, "setNeedsDisplay:", YES);
}, "void");

class_addMethod(the_class, "selectedCell", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
return objc_msgSend(_cell, "target");
}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, anObject) {
objc_msgSend(_cell, "setTarget:", anObject);
}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
return objc_msgSend(_cell, "action");
}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, aSelector) {
objc_msgSend(_cell, "setAction:", aSelector);
}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, anInt) {
}, "void");

class_addMethod(the_class, "selectedTag", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "setIgnoresMultiClick:", function(self, _cmd, flag) {
}, "void");

class_addMethod(the_class, "ignoresMultiClick", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "sendActionOn:", function(self, _cmd, mask) {
}, "void");

class_addMethod(the_class, "isContinuous", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "setContinuous:", function(self, _cmd, flag) {
}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {
return objc_msgSend(_cell, "isEnabled");
}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, flag) {
objc_msgSend(_cell, "setEnabled:", flag);
}, "void");

class_addMethod(the_class, "setFloatingPointFormat:left:right:", function(self, _cmd, autoRange, leftDigits, rightDigits) {
}, "void");

class_addMethod(the_class, "alignment", function(self, _cmd) {
return objc_msgSend(_cell, "alignment");
}, "void");

class_addMethod(the_class, "setAlignment:", function(self, _cmd, mode) {
objc_msgSend(_cell, "setAlignment:", mode);
objc_msgSend(self, "setNeedsDisplay:", YES);
}, "void");

class_addMethod(the_class, "font", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "setFont:", function(self, _cmd, fontObj) {
}, "void");

class_addMethod(the_class, "setFormatter:", function(self, _cmd, newFormatter) {
}, "void");

class_addMethod(the_class, "formatter", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "setObjectValue:", function(self, _cmd, obj) {
objc_msgSend(_cell, "setObjectValue:", obj);
}, "void");

class_addMethod(the_class, "setStringValue:", function(self, _cmd, aString) {
objc_msgSend(_cell, "setStringValue:", aString);
}, "void");

class_addMethod(the_class, "setIntValue:", function(self, _cmd, anInt) {
objc_msgSend(_cell, "setIntValue:", anInt);
}, "void");

class_addMethod(the_class, "setFloatValue:", function(self, _cmd, aFloat) {
objc_msgSend(_cell, "setFloatValue:", aFloat);
}, "void");

class_addMethod(the_class, "setDoubleValue:", function(self, _cmd, aDouble) {
objc_msgSend(_cell, "setDoubleValue:", aDouble);
}, "void");

class_addMethod(the_class, "objectValue", function(self, _cmd) {
return objc_msgSend(_cell, "objectValue");
}, "void");

class_addMethod(the_class, "stringValue", function(self, _cmd) {
return objc_msgSend(_cell, "stringValue");
}, "void");

class_addMethod(the_class, "intValue", function(self, _cmd) {
return objc_msgSend(_cell, "intValue");
}, "void");

class_addMethod(the_class, "floatValue", function(self, _cmd) {
return objc_msgSend(_cell, "floatValue");
}, "void");

class_addMethod(the_class, "doubleValue", function(self, _cmd) {
return objc_msgSend(_cell, "doubleValue");
}, "void");

class_addMethod(the_class, "setNeedsDisplay", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "updateCell:", function(self, _cmd, aCell) {
}, "void");

class_addMethod(the_class, "updateCellInside:", function(self, _cmd, aCell) {
}, "void");

class_addMethod(the_class, "drawCellInside:", function(self, _cmd, aCell) {
}, "void");

class_addMethod(the_class, "drawCell:", function(self, _cmd, aCell) {
}, "void");

class_addMethod(the_class, "selectCell:", function(self, _cmd, aCell) {
}, "void");

class_addMethod(the_class, "sendAction:to:", function(self, _cmd, theAction, theTarget) {
if (theAction && theTarget)
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "sendAction:to:from:", theAction, theTarget, self);
return YES;

}

return NO;
}, "void");

class_addMethod(the_class, "takeIntValueFrom:", function(self, _cmd, sender) {
}, "void");

class_addMethod(the_class, "takeFloatValueFrom:", function(self, _cmd, sender) {
}, "void");

class_addMethod(the_class, "takeDoubleValueFrom:", function(self, _cmd, sender) {
}, "void");

class_addMethod(the_class, "takeStringValueFrom:", function(self, _cmd, sender) {
}, "void");

class_addMethod(the_class, "takeObjectValueFrom:", function(self, _cmd, sender) {
}, "void");

class_addMethod(the_class, "currentEditor", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "abortEditing", function(self, _cmd) {
if (_currentEditor)
{
objc_msgSend(objc_msgSend(self, "window"), "endEditingFor:", self);
_currentEditor = null;

}

return NO;
}, "void");

class_addMethod(the_class, "validateEditing", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "mouseDown:", function(self, _cmd, theEvent) {
if (!objc_msgSend(self, "isEnabled"))
return ;

objc_msgSend(self, "lockFocus");
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), null);
if (NSPointInRect(location,_bounds))
objc_msgSend(_cell, "highlight:withFrame:inView:", YES, _bounds, self);

objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", (NSLeftMouseUpMask | NSMouseMovedMask), null, null, null, self, "selector:");
objc_msgSend(self, "unlockFocus");
}, "void");

class_addMethod(the_class, "_mouseDownHandle:", function(self, _cmd, theEvent) {
var location = objc_msgSend(self, "convertPoint:fromView:", objc_msgSend(theEvent, "locationInWindow"), null);
if (NSPointInRect(location,_bounds))
{
if (objc_msgSend(theEvent, "type") == NSLeftMouseUp)
{
objc_msgSend(self, "sendAction:to:", objc_msgSend(self, "action"), objc_msgSend(self, "target"));
objc_msgSend(self, "lockFocus");
objc_msgSend(_cell, "highlight:withFrame:inView:", NO, _bounds, self);
objc_msgSend(self, "unlockFocus");
return ;

}
else
if (objc_msgSend(theEvent, "type") == NSMouseMoved)
{
objc_msgSend(objc_msgSend(NSApplication, "sharedApplication"), "nextEventMatchingMask:untilDate:inMode:dequeue:withTarget:withSelector:", (NSLeftMouseUpMask | NSMouseMovedMask), null, null, null, self, "selector:");
return ;

}



}

objc_msgSend(self, "lockFocus");
objc_msgSend(_cell, "highlight:withFrame:inView:", NO, _bounds, self);
objc_msgSend(self, "unlockFocus");
}, "void");

class_addMethod(the_class, "baseWritingDirection", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "setBaseWritingDirection:", function(self, _cmd, writingDirection) {
}, "void");

class_addMethod(the_class, "integerValue", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "setIntegerValue:", function(self, _cmd, anInteger) {
}, "void");

class_addMethod(the_class, "takeIntegerValueFrom:", function(self, _cmd, sender) {
}, "void");

class_addMethod(meta_class, "setCellClass:", function(self, _cmd, factoryId) {
}, "void");

class_addMethod(meta_class, "cellClass", function(self, _cmd) {
}, "void");

var the_class = NSControl;
var meta_class = the_class.isa;

class_addMethod(the_class, "performClick:", function(self, _cmd, sender) {
}, "void");

class_addMethod(the_class, "setRefusesFirstResponder:", function(self, _cmd, flag) {
}, "void");

class_addMethod(the_class, "refusesFirstResponder", function(self, _cmd) {
}, "void");

var the_class = NSObject;
var meta_class = the_class.isa;

class_addMethod(the_class, "controlTextDidBeginEditing:", function(self, _cmd, obj) {
}, "void");

class_addMethod(the_class, "controlTextDidEndEditing:", function(self, _cmd, obj) {
}, "void");

class_addMethod(the_class, "controlTextDidChange:", function(self, _cmd, obj) {
}, "void");

var the_class = NSControl;
var meta_class = the_class.isa;

class_addMethod(the_class, "attributedStringValue", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "setAttributedStringValue:", function(self, _cmd, obj) {
}, "void");

