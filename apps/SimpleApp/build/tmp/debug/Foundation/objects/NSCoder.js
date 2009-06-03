var the_class = objc_allocateClassPair(NSObject, "NSCoder");
var meta_class = the_class.isa;
objc_registerClassPair(the_class);
class_addIvar(the_class, "isa", "Class");

class_addMethod(the_class, "encodeValueOfObjCType:at:", function(self, _cmd, type, addr) {
}, "void");

class_addMethod(the_class, "encodeDataObject:", function(self, _cmd, data) {
}, "void");

class_addMethod(the_class, "decodeValueOfObjCType:at:", function(self, _cmd, type, data) {
}, "void");

class_addMethod(the_class, "decodeDataObject", function(self, _cmd) {
}, "void");

class_addMethod(the_class, "versionForClassName:", function(self, _cmd, className) {
}, "void");

