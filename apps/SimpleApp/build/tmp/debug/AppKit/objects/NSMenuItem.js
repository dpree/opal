var the_class = objc_allocateClassPair(NSObject, "NSMenuItem");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");
class_addIvar(the_class, "_menu", "NSMenu");
class_addIvar(the_class, "_subMenu", "NSMenu");
class_addIvar(the_class, "_title", "NSString");
class_addIvar(the_class, "_keyEquivalent", "NSString");
class_addIvar(the_class, "_keyEquivalentModifierMask", "NSUInteger");
class_addIvar(the_class, "_mnenomicLocation", "NSInteger");
class_addIvar(the_class, "_state", "NSInteger");
class_addIvar(the_class, "_onStateImage", "NSImage");
class_addIvar(the_class, "_offStateImage", "NSImage");
class_addIvar(the_class, "_target", "id");
class_addIvar(the_class, "_action", "SEL");
class_addIvar(the_class, "_tag", "NSInteger");
class_addIvar(the_class, "_extraData", "id");
class_addIvar(the_class, "_isEnabled", "BOOL");
class_addIvar(the_class, "_isHidden", "BOOL");

class_addMethod(the_class, "init", function(self, _cmd) {
with(self) {
objc_msgSendSuper({super_class:NSObject, receiver:self}, "init");
_title = "";
_action = null;
_keyEquivalent = null;
return self;
}
}, "void");

class_addMethod(the_class, "initWithTitle:action:keyEquivalent:", function(self, _cmd, itemName, anAction, charCode) {
with(self) {
objc_msgSend(self, "init");
if (self)
{
_title = itemName;
_action = anAction;
_keyEquivalent = charCode;
_keyEquivalentModifierMask = 0;
_menu = null;
_subMenu = null;
_tag = -1;
_target = null;
_isEnabled = YES;
_isHidden = NO;

}

return self;
}
}, "void");

class_addMethod(the_class, "initWithCoder:", function(self, _cmd, aCoder) {
with(self) {
_title = objc_msgSend(aCoder, "decodeStringForKey:", "NSTitle");
_keyEquivalent = objc_msgSend(aCoder, "decodeStringForKey:", "NSKeyEquiv");
_action = objc_msgSend(aCoder, "decodeStringForKey:", "NSAction");
_target = objc_msgSend(aCoder, "decodeObjectForKey:", "NSTarget");
_menu = objc_msgSend(aCoder, "decodeObjectForKey:", "NSMenu");
_subMenu = objc_msgSend(aCoder, "decodeObjectForKey:", "NSSubmenu");
_isEnabled = YES;
_isHidden = NO;
return self;
}
}, "void");

class_addMethod(the_class, "setEnabled:", function(self, _cmd, flag) {
with(self) {
if (flag == 0)
flag = NO;

_isEnabled = flag;
}
}, "void");

class_addMethod(the_class, "isEnabled", function(self, _cmd) {
with(self) {
return _isEnabled;
}
}, "void");

class_addMethod(the_class, "setHidden:", function(self, _cmd, hidden) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isHidden", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isHiddenOrHasHiddenAncestor", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTarget:", function(self, _cmd, anObject) {
with(self) {
_target = anObject;
}
}, "void");

class_addMethod(the_class, "target", function(self, _cmd) {
with(self) {
return _target;
}
}, "void");

class_addMethod(the_class, "setAction:", function(self, _cmd, aSelector) {
with(self) {
_action = aSelector;
}
}, "void");

class_addMethod(the_class, "action", function(self, _cmd) {
with(self) {
return _action;
}
}, "void");

class_addMethod(the_class, "setTitle:", function(self, _cmd, aString) {
with(self) {
_title = aString;
}
}, "void");

class_addMethod(the_class, "title", function(self, _cmd) {
with(self) {
return _title;
}
}, "void");

class_addMethod(the_class, "setAttributedTitle:", function(self, _cmd, string) {
with(self) {
}
}, "void");

class_addMethod(the_class, "attributedTitle", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTag:", function(self, _cmd, anInt) {
with(self) {
_tag = anInt;
}
}, "void");

class_addMethod(the_class, "tag", function(self, _cmd) {
with(self) {
return _tag;
}
}, "void");

class_addMethod(the_class, "setState:", function(self, _cmd, itemState) {
with(self) {
_state = itemState;
}
}, "void");

class_addMethod(the_class, "state", function(self, _cmd) {
with(self) {
return _state;
}
}, "void");

class_addMethod(the_class, "setImage:", function(self, _cmd, menuImage) {
with(self) {
}
}, "void");

class_addMethod(the_class, "image", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setOnStateImage:", function(self, _cmd, itemImage) {
with(self) {
}
}, "void");

class_addMethod(the_class, "onStateImage", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setOffStateImage:", function(self, _cmd, itemImage) {
with(self) {
}
}, "void");

class_addMethod(the_class, "offStateImage", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMixedStateImage:", function(self, _cmd, itemImage) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mixedStateImage", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setSubmenu:", function(self, _cmd, aSubmenu) {
with(self) {
_subMenu = aSubmenu;
}
}, "void");

class_addMethod(the_class, "submenu", function(self, _cmd) {
with(self) {
return _subMenu;
}
}, "void");

class_addMethod(the_class, "hasSubmenu", function(self, _cmd) {
with(self) {
if (_subMenu)
return YES;

return NO;
}
}, "void");

class_addMethod(the_class, "isSeparatorItem", function(self, _cmd) {
with(self) {
if ((_title == "") || (_title == null))
return YES;

return NO;
}
}, "void");

class_addMethod(the_class, "setMenu:", function(self, _cmd, aMenu) {
with(self) {
_menu = aMenu;
}
}, "void");

class_addMethod(the_class, "menu", function(self, _cmd) {
with(self) {
return _menu;
}
}, "void");

class_addMethod(the_class, "setKeyEquivalent:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyEquivalent", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setKeyEquivalentModifierMask:", function(self, _cmd, mask) {
with(self) {
}
}, "void");

class_addMethod(the_class, "keyEquivalentModifierMask", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setMnemonicLocation:", function(self, _cmd, location) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mnemonicLocation", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setTitleWithMnemonic:", function(self, _cmd, aString) {
with(self) {
}
}, "void");

class_addMethod(the_class, "mnemonic", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "userKeyEquivalent", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setAlternate:", function(self, _cmd, isAlternate) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isAlternate", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setIndentationLevel:", function(self, _cmd, indentationLevel) {
with(self) {
}
}, "void");

class_addMethod(the_class, "indentationLevel", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setToolTip:", function(self, _cmd, toolTip) {
with(self) {
}
}, "void");

class_addMethod(the_class, "toolTip", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setRepresentedObject:", function(self, _cmd, anObject) {
with(self) {
}
}, "void");

class_addMethod(the_class, "representedObject", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "setView:", function(self, _cmd, view) {
with(self) {
}
}, "void");

class_addMethod(the_class, "view", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(the_class, "isHighlighted", function(self, _cmd) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "separatorItem", function(self, _cmd) {
with(self) {
return objc_msgSend(objc_msgSend(NSMenuItem, "alloc"), "initWithTitle:action:keyEquivalent:", "", null, null);
}
}, "void");

class_addMethod(meta_class, "setUsesUserKeyEquivalents:", function(self, _cmd, flag) {
with(self) {
}
}, "void");

class_addMethod(meta_class, "usesUserKeyEquivalents", function(self, _cmd) {
with(self) {
}
}, "void");
