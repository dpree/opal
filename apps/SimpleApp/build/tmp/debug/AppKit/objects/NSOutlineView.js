var the_class = objc_allocateClassPair(NSTableView, "NSOutlineView");
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
class_addIvar(the_class, "_dataSource", "id");
class_addIvar(the_class, "_delegate", "id");
class_addIvar(the_class, "_scrollView", "NSScrollView");
class_addIvar(the_class, "_headerView", "NSTableHeaderView");
class_addIvar(the_class, "_cornerView", "NSView");
class_addIvar(the_class, "_tableColumns", "NSMutableArray");
class_addIvar(the_class, "_tableColumnViews", "NSMutableArray");
class_addIvar(the_class, "_numberOfRows", "NSUInteger");
class_addIvar(the_class, "_numberOfColumns", "NSUInteger");
class_addIvar(the_class, "_tableCells", "NSMutableArray");
class_addIvar(the_class, "_intercellSpacing", "NSSize");
class_addIvar(the_class, "_rowHeight", "NSUInteger");
class_addIvar(the_class, "_selectedRowIndexes", "NSMutableIndexSet");
class_addIvar(the_class, "_editedColumn", "NSUInteger");
class_addIvar(the_class, "_editedRow", "NSUInteger");
class_addIvar(the_class, "_drawsGrid", "BOOL");
class_addIvar(the_class, "_alternatingRowBackground", "BOOL");

class_addMethod(the_class, "initWithFrame:", function(self, _cmd, frameRect) {
objc_msgSendSuper({super_class:NSTableView, receiver:self}, "initWithFrame:", frameRect);
return self;

}, "void");

