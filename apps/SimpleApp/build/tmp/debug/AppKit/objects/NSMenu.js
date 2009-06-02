var the_class = objc_allocateClassPair(NSObject, "NSMenu");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_superMenu", "NSMenu");
class_addIvar(the_class, "_title", "NSString");
class_addIvar(the_class, "_itemArray", "id");
class_addIvar(the_class, "_name", "NSString");

class_addMethod(the_class, "init", function(self, _cmd) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "init");
_title = "";
_itemArray = objc_msgSend(NSMutableArray, "arrayWithCapacity:", 0);
return self;

}, "void");

class_addMethod(the_class, "initWithTitle:", function(self, _cmd, aTitle) {
objc_msgSend(self, "init");
_title = aTitle;
return self;

}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
_title = objc_msgSend(aCoder, "decodeStringForKey:", "NSTitle");
_name = objc_msgSend(aCoder, "decodeStringForKey:", "NSName");
_itemArray = objc_msgSend(aCoder, "decodeObjectForKey:", "NSMenuItems");
return self;

}, "void");

class_addMethod(the_class, "insertItem:atIndex:", function(self, _cmd, newItem, index) {
objc_msgSend(self, "addItem:", newItem);

}, "void");

class_addMethod(the_class, "insertItemWithTitle:action:keyEquivalent:atIndex:", function(self, _cmd, aString, aSelector, keyEquiv, index) {
objc_msgSend(self, "addItemWithTitle:action:keyEquivalent:", aString, aSelector, keyEquiv);

}, "void");

class_addMethod(the_class, "addItem:", function(self, _cmd, newItem) {
objc_msgSend(_itemArray, "addObject:", newItem);
objc_msgSend(newItem, "setMenu:", self);

}, "void");

class_addMethod(the_class, "addItemWithTitle:action:keyEquivalent:", function(self, _cmd, aString, aSelector, keyEquiv) {
var newItem = objc_msgSend(objc_msgSend(NSMenuItem, "alloc"), "initWithTitle:action:keyEquivalent:", aString, aSelector, keyEquiv);
objc_msgSend(self, "addItem:", newItem);
return newItem;

}, "void");

class_addMethod(the_class, "removeItem:", function(self, _cmd, anItem) {

}, "void");

class_addMethod(the_class, "removeItemAtIndex:", function(self, _cmd, index) {

}, "void");

class_addMethod(the_class, "itemChanged:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "itemWithTag:", function(self, _cmd, aTag) {

}, "void");

class_addMethod(the_class, "itemWithTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "itemAtIndex:", function(self, _cmd, index) {
return objc_msgSend(_itemArray, "objectAtIndex:", index);

}, "void");

class_addMethod(the_class, "numberOfItems", function(self, _cmd) {
return objc_msgSend(_itemArray, "count");

}, "void");

class_addMethod(the_class, "itemArray", function(self, _cmd) {
return _itemArray;

}, "void");

class_addMethod(the_class, "indexOfItem:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "indexOfItemWithTitle:", function(self, _cmd, aTitle) {

}, "void");

class_addMethod(the_class, "indexOfItemWithTag:", function(self, _cmd, aTag) {

}, "void");

class_addMethod(the_class, "indexOfItemWithTarget:andAction:", function(self, _cmd, anObject, actionSelector) {

}, "void");

class_addMethod(the_class, "indexOfItemWithRepresentedObject:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "indexOfItemWithSubmenu:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "setSubmenu:forItem:", function(self, _cmd, aMenu, anItem) {

}, "void");

class_addMethod(the_class, "submenuAction:", function(self, _cmd, sender) {

}, "void");

class_addMethod(the_class, "attachedMenu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "isAttached", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "locationForSubmenu:", function(self, _cmd, aSubmenu) {

}, "void");

class_addMethod(the_class, "supermenu", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setSupermenu:", function(self, _cmd, supermenu) {

}, "void");

class_addMethod(the_class, "isTornOff", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "autoenablesItems", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setAutoenablesItems:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "update", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "performKeyEquivalent:", function(self, _cmd, theEvent) {

}, "void");

class_addMethod(the_class, "performActionForItemAtIndex:", function(self, _cmd, index) {

}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {

}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "menuChangedMessagesEnabled", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setMenuChangedMessagesEnabled:", function(self, _cmd, flag) {

}, "void");

class_addMethod(the_class, "sizeToFit", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "helpRequested:", function(self, _cmd, event) {

}, "void");

class_addMethod(the_class, "setShowsStateColumn:", function(self, _cmd, showsState) {

}, "void");

class_addMethod(the_class, "showsStateColumn", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "highlightedItem", function(self, _cmd) {

}, "void");

class_addMethod(the_class, "setDelegate:", function(self, _cmd, anObject) {

}, "void");

class_addMethod(the_class, "delegate", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "menuBarVisible", function(self, _cmd) {

}, "void");

class_addMethod(meta_class, "setMenuBarVisible:", function(self, _cmd, visible) {

}, "void");

class_addMethod(meta_class, "menuBarHeight", function(self, _cmd) {
return 29;

}, "void");

class_addMethod(meta_class, "popUpContextMenu:withEvent:forView:", function(self, _cmd, menu, event, view) {

}, "void");

class_addMethod(meta_class, "popUpContextMenu:withEvent:forView:withFont:", function(self, _cmd, menu, event, view, font) {

}, "void");

