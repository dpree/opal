var the_class = objc_allocateClassPair(NSView, "NSScrollView");
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
class_addIvar(the_class, "_verticalScroller", "NSView");
class_addIvar(the_class, "_horizontalScroller", "NSView");
class_addIvar(the_class, "_clipView", "NSView");
class_addIvar(the_class, "_headerClipView", "NSView");
class_addIvar(the_class, "_cornerView", "NSView");
class_addIvar(the_class, "_hasVerticalScroller", "BOOL");
class_addIvar(the_class, "_hasHorizontalScroller", "BOOL");
class_addIvar(the_class, "_borderType", "NSInteger");
class_addIvar(the_class, "_contentView", "NSView");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithCoder:", aCoder);
var flags = objc_msgSend(aCoder, "decodeIntForKey:", "NSsFlags");
if (Unhandled output_expression: [&(), flags (IDENTIFIER), 0x10 (CONSTANT)])
_hasVerticalScroller = YES;
else
_hasVerticalScroller = NO;

if (Unhandled output_expression: [&(), flags (IDENTIFIER), 0x20 (CONSTANT)])
_hasHorizontalScroller = YES;
else
_hasHorizontalScroller = NO;

_borderType = Unhandled output_expression: [&(), flags (IDENTIFIER), 0x303 (CONSTANT)];
FOR (FOR)objc_msgSend(self, "tile");
return self;

}, "void");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSView, receiver:self}, "initWithFrame:", frameRect);
_contentView = objc_msgSend(objc_msgSend(NSView, "alloc"), "initWithFrame:", NSMakeRect(0000));
return self;

}, "void");

class_addMethod(the_class, "resizeSubviewsWithOldSize:", function(self, _cmd, oldBoundsSize) {
objc_msgSend(self, "tile");

}, "void");

class_addMethod(the_class, "tile", function(self, _cmd) {
var tilingFrame;
if (_headerClipView)
{
NSLog("got header clip view");
tilingFrame = NSMakeRect(1Unhandled output_expression: [-(), [.(.), [.(.), _frame (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], [.(.), [.(.), [M(), _headerClipView (IDENTIFIER), bounds (IDENTIFIER)], size (IDENTIFIER)], height (IDENTIFIER)]]_frame.size.widthobjc_msgSend(_headerClipView, "bounds").size.height);
objc_msgSend(_headerClipView, "setFrame:", tilingFrame);

}

if (_clipView)
{
NSLog("got header clip view");
tilingFrame = NSMakeRect(11_frame.size.widthobjc_msgSend(_clipView, "bounds").size.height);
objc_msgSend(_clipView, "setFrame:", tilingFrame);

}


}, "void");

class_addMethod(the_class, "drawRect:", function(self, _cmd, dirtyRect) {
objc_msgSend(objc_msgSend(NSColor, "colorWithCalibratedRed:green:blue:alpha:", 0.851, 0.851, 0.851, 1.0), "set");
objc_msgSend(NSBezierPath, "strokeRect:", NSMakeRect(0.50.5Unhandled output_expression: [-(), [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], width (IDENTIFIER)], 1 (CONSTANT)]Unhandled output_expression: [-(), [.(.), [.(.), _bounds (IDENTIFIER), size (IDENTIFIER)], height (IDENTIFIER)], 1 (CONSTANT)]));

}, "void");

