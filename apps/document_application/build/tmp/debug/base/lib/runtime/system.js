
var metaclass;var rb_cBasicObject=boot_defclass('BasicObject',null);var rb_cObject=boot_defclass('Object',rb_cBasicObject);var rb_cModule=boot_defclass('Module',rb_cObject);var rb_cClass=boot_defclass('Class',rb_cModule);metaclass=rb_make_metaclass(rb_cBasicObject,rb_cClass);metaclass=rb_make_metaclass(rb_cObject,metaclass);metaclass=rb_make_metaclass(rb_cModule,metaclass);metaclass=rb_make_metaclass(rb_cClass,metaclass);boot_defmetametaclass(rb_cModule,metaclass);boot_defmetametaclass(rb_cObject,metaclass);boot_defmetametaclass(rb_cBasicObject,metaclass);var RSymbol=function(ptr){this.$klass=rb_cSymbol;this.$type=T_SYMBOL;this.toString=function(){return this.ptr;};this.ptr=ptr;return this;};var rb_sym_table={};function ID2SYM(id){if(rb_sym_table.hasOwnProperty(id)){return rb_sym_table[id];}
var sym=new RSymbol(id);rb_sym_table[id]=sym
return sym;};