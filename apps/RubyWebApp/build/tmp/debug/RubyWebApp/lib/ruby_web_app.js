
VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/base/lib/base.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/browser/lib/browser.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/vienna/lib/vienna.js');
var $VN_1 = RModule.define('RubyWebApp');
$VN_1.$c_s('VERSION',"0.0.1");
$VN_1.$def_s('version',function(self,_cmd){
return self.$c_g_full('VERSION');
});

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/RubyWebApp/lib/builders/main_menu.js');

VN.require('/Users/adam/Development/vienna/apps/RubyWebApp/build/tmp/debug/RubyWebApp/lib/controllers/app_controller.js');
VN$(cObject.$c_g('Vienna').$c_g('App'),'run',function(app){
return VN$(cObject.$c_g('VN').$c_g('Builder'),'build','main_menu',VN.$h('owner',cObject.$c_g('VN').$c_g('App'),'top_level_objects',[]),function(builder){
VN$(VN.self,'puts',"builder finished!");
VN$(VN.self,'puts','AppDelegate');
VN$(VN.self,'puts',VN$(cObject.$c_g('VN').$c_g('App'),'delegate'));
VN$(VN.self,'puts','Setting value for adam to 20');
VN$(VN$(cObject.$c_g('VN').$c_g('App'),'delegate'),'set_value:for_key:',20,'adam');
return VN$(VN.self,'puts',VN$(VN$(cObject.$c_g('VN').$c_g('App'),'delegate'),'value_for_key','adam'));
});
});
