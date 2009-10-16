var $VN_1 = RModule.define('Vienna');
var $VN_2 = RClass.define_under($VN_1, 'Control',$VN_2.$c_g_full('View'));
$VN_2.$def('initialize',function(self,_cmd,frame){
VN$sup(arguments.callee, self,_cmd,[frame]);
return self.$i_s('@cell',VN$(VN$(VN$(self,'class'),'cell_class'),'new'));
});
$VN_2.$def_s('cell_class=',function(self,_cmd,cell_class){
});
$VN_2.$def_s('cell_class',function(self,_cmd){
return (self.$k_d('@@cell_class') ? self.$k_g('@@cell_class') : self.$k_s('@@cell_class',self.$c_g_full('Vienna').$c_g('Cell')));
});
$VN_2.$def('draw_rect',function(self,_cmd,rect){
VN$(self,'puts','drawing rect from control');
return VN$(self.$i_g('@cell'),'draw_with_frame:in_view:',self.$i_g('@bounds'),self);
});
$VN_2.$def('size_to_fit',function(self,_cmd){
});
$VN_2.$def('calc_size',function(self,_cmd){
});
$VN_2.$def('cell',function(self,_cmd){
});
$VN_2.$def('cell=',function(self,_cmd,a_cell){
VN$(self, 'will_change_value_for_key', 'cell');
VN$(self, 'did_change_value_for_key', 'cell');
});
$VN_2.$def('selected_cell',function(self,_cmd){
});
$VN_2.$def('target',function(self,_cmd){
});
$VN_2.$def('target=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'target');
VN$(self, 'did_change_value_for_key', 'target');
});
$VN_2.$def('action',function(self,_cmd){
});
$VN_2.$def('action=',function(self,_cmd,selector){
VN$(self, 'will_change_value_for_key', 'action');
VN$(self, 'did_change_value_for_key', 'action');
});
$VN_2.$def('tag',function(self,_cmd){
});
$VN_2.$def('tag=',function(self,_cmd,tag){
VN$(self, 'will_change_value_for_key', 'tag');
VN$(self, 'did_change_value_for_key', 'tag');
});
$VN_2.$def('selected_tag',function(self,_cmd){
});
$VN_2.$def('ignores_multi_click=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'ignores_multi_click');
VN$(self, 'did_change_value_for_key', 'ignores_multi_click');
});
$VN_2.$def('ignores_multi_click?',function(self,_cmd){
});
$VN_2.$def('send_action_on',function(self,_cmd,mask){
});
$VN_2.$def('continuous?',function(self,_cmd){
});
$VN_2.$def('continuous=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'continuous');
VN$(self, 'did_change_value_for_key', 'continuous');
});
$VN_2.$def('enabled?',function(self,_cmd){
});
$VN_2.$def('enabled=',function(self,_cmd,flag){
VN$(self, 'will_change_value_for_key', 'enabled');
VN$(self, 'did_change_value_for_key', 'enabled');
});
$VN_2.$def('alignment',function(self,_cmd){
});
$VN_2.$def('alignment=',function(self,_cmd,mode){
VN$(self, 'will_change_value_for_key', 'alignment');
VN$(self, 'did_change_value_for_key', 'alignment');
});
$VN_2.$def('font',function(self,_cmd){
});
$VN_2.$def('font=',function(self,_cmd,font){
VN$(self, 'will_change_value_for_key', 'font');
VN$(self, 'did_change_value_for_key', 'font');
});
$VN_2.$def('formatter=',function(self,_cmd,new_formatter){
VN$(self, 'will_change_value_for_key', 'formatter');
VN$(self, 'did_change_value_for_key', 'formatter');
});
$VN_2.$def('formatter',function(self,_cmd){
});
$VN_2.$def('object_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'object_value');
VN$(self, 'did_change_value_for_key', 'object_value');
});
$VN_2.$def('string_value=',function(self,_cmd,obj){
VN$(self, 'will_change_value_for_key', 'string_value');
VN$(self, 'did_change_value_for_key', 'string_value');
});
$VN_2.$def('text=',function(self,_cmd,text){
VN$(self, 'will_change_value_for_key', 'text');
var string_value = text;
VN$(self, 'did_change_value_for_key', 'text');
});
$VN_2.$def('int_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'int_value');
VN$(self, 'did_change_value_for_key', 'int_value');
});
$VN_2.$def('float_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'float_value');
VN$(self, 'did_change_value_for_key', 'float_value');
});
$VN_2.$def('double_value=',function(self,_cmd,val){
VN$(self, 'will_change_value_for_key', 'double_value');
VN$(self, 'did_change_value_for_key', 'double_value');
});
$VN_2.$def('object_value',function(self,_cmd){
});
$VN_2.$def('string_value',function(self,_cmd){
});
$VN_2.$def('to_s',function(self,_cmd){
return VN$(self, 'string_value');
});
$VN_2.$def('int_value',function(self,_cmd){
});
$VN_2.$def('to_i',function(self,_cmd){
return VN$(self, 'int_value');
});
$VN_2.$def('float_value',function(self,_cmd){
});
$VN_2.$def('to_f',function(self,_cmd){
return VN$(self, 'float_value');
});
$VN_2.$def('double_value',function(self,_cmd){
});
$VN_2.$def('needs_display',function(self,_cmd){
});
$VN_2.$def('update_cell',function(self,_cmd,cell){
});
$VN_2.$def('update_cell_inside',function(self,_cmd,cell){
});
$VN_2.$def('draw_cell_inside',function(self,_cmd,cell){
});
$VN_2.$def('draw_cell',function(self,_cmd,cell){
});
$VN_2.$def('select_cell',function(self,_cmd,cell){
});
$VN_2.$def('send_action:to:',function(self,_cmd,action,target){
});
$VN_2.$def('take_int_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_float_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_double_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_object_value_from',function(self,_cmd,sender){
});
$VN_2.$def('take_string_value_from',function(self,_cmd,sender){
});
$VN_2.$def('current_editor',function(self,_cmd){
});
$VN_2.$def('abort_editing',function(self,_cmd){
});
$VN_2.$def('validate_editing',function(self,_cmd){
});
$VN_2.$def('mouse_down',function(self,_cmd,the_event){
});
