
var RModule={};RModule.define=function(id){var module;if(cObject.$c_d(id)){module=cObject.$c_g(id);if(module.$type==VN.MODULE){return module;}
VN.type_error(id+' is not a module');}
module=RModule.define_module_id(id);VN.class_tbl[id]=module;cObject.$c_s(id,module);return module;};RModule.define_module_under=function(){var module;if(VN.const_defined_at(outer,id)){module=VN.const_get_at(outer,id);if(module.type==VN.MODULE){return module;}
VN.type_error(id+' is not a module');}
module=VN.define_module_id(id);VN.const_set(outer,id,module);VN.set_class_path(module,outer,name);return module;};RModule.define_module_id=function(id){var mdl=RModule.create();mdl.$name(id);return mdl;};RModule.create=function(){var mdl=RClass.alloc(VN.MODULE,cModule);mdl.$super=cObject;return mdl;};RModule.include=function(klass,module){RModule.include_class_new(module,klass);};RModule.include_class_new=function(mod,sup){var klass=RClass.alloc(VN.T_ICLASS,cClass);klass.iv_tbl=mod.iv_tbl;klass.m_tbl=mod.m_tbl;klass.$super=sup;klass.$klass=mod;return klass;};