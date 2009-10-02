

var require=function require(){};if(typeof console==='undefined'){var console=console||window.console||{};console.log=console.info=console.warn=console.error=function(){};}
Object.extend=function(target,props){for(var key in props){target[key]=props[key];}
return target;};

Object.VNCoreMethods={inherit:function(klass){for(var prop in klass){this[prop]=klass[prop];}
this.superklass=klass;var bridge=function(){};bridge.prototype=klass.prototype;this.prototype=new bridge();this.prototype.klass=this.prototype.constructor=this;},allocate:function(){var bridge=function(){};bridge.prototype=this.prototype;return new bridge();},include:function(){},extend:function(props){var result;for(var prop in props){if(result=prop.match(/^[A-Z][a-zA-Z_]*/)){this.setConst(prop,props[prop]);}
else if(result=prop.match(/^\$([A-Za-z_]*)/)){this[result[1]]=props[prop];}
else if(typeof props[prop]!='function'){if(props[prop]instanceof Array){this[prop].apply(this,props[prop]);}
else{this[prop].call(this,props[prop]);}}
else if(result=prop.match(/^set([A-Za-z_]*)/)){this.addSetterMethod(result[1],result[0],props[prop]);}
else{this.prototype[prop]=props[prop];}}
return this;},create:function(){var C=this;var obj=C.allocate();obj.initialize.apply(obj,arguments);return obj;},setConst:function(name,val){this[name]=val;this.prototype[name]=val;},getConst:function(name){return this[name];}};

var Class=function(){return this.initialize.apply(this,arguments);};Object.extend(Class.prototype,{initialize:function(name,superklass,props){if(typeof name==='string'){this.__classid__=this.displayName=name;}
else{this.__classid__=this.displayName='';props=superklass;superklass=name;}
var klass=function(){this.initialize.apply(this,arguments);};for(var key in this){klass[key]=this[key];}
if(typeof superklass!=='function'){props=superklass;superklass=BasicObject;}
klass.inherit(superklass);klass.klass=klass.constructor=this.klass;klass.extend(props);return klass;},});Object.extend(Class.prototype,Object.VNCoreMethods);

var Module=function(){return this.initialize.apply(this,arguments);};Object.extend(Module.prototype,{initialize:function(name,props){if(typeof name==='string'){this.__classid__=this.displayName=name;}
else{this.__classid__=this.displayName='';props=name;}
var module={};module.prototype={};for(var key in this){module[key]=this[key];}
module.extend(props);return module;},include:function(){},extend:Class.prototype.extend,setConst:Class.prototype.setConst});

var BasicObject=function(){this.initialize.apply(this,arguments);};BasicObject.attrAccessor=function(){this.attrWriter.apply(this,arguments);this.attrReader.apply(this,arguments);};BasicObject.attrWriter=function(){for(var i=0;i<arguments.length;i++){var name=arguments[i];this.prototype['set'+name]=new Function('val','this.$'+name+' = val;');};};BasicObject.attrReader=function(){for(var i=0;i<arguments.length;i++){var name=arguments[i];this.prototype[name]=new Function('return this.$'+name+';');};};BasicObject.prototype.klass=BasicObject;BasicObject.prototype.superklass=BasicObject;BasicObject.prototype.initialize=function(){return this;};BasicObject.extend=Class.prototype.extend;BasicObject.addSetterMethod=function(key,funcName,func){var methodBody='';methodBody+='this._$'+funcName+'(val);';this.prototype[funcName]=new Function('val',methodBody);this.prototype['_$'+funcName]=func;};

var Kernel=new Module('Kernel',{});

Object.extend(Array,Object.VNCoreMethods);Array.extend({wow:function(){}});

var Hash=new Class('Hash',{initialize:function(props){this.$keys=[];this.$values={};this.merge(props);},merge:function(other,block){if(other.klass===Hash){var self=this;other.each(function(key,val){self.store(key,val);});}
else{for(var key in other){this.store(key,other[key]);}}},each:function(block){for(var i=0;i<this.$keys.length;i++){block(this.$keys[i],this.$values[this.$keys[i]]);}},store:function(key,val){if(this.$keys.indexOf(key)==-1){this.$keys.push(key);}
this.$values[key]=val;},set:function(key,val){this.store(key,val);},get:function(key){return this.$values[key];}});

Object.extend(String,Object.VNCoreMethods);String.extend({capitalize:function(){return this.charAt(0).toUpperCase()+this.substr(1);},w:function(){return this.split(' ');}});


var Ajax=new Class('Ajax',{initialize:function(options){console.log('Yeahhh');}});

var Element=new Class('Element',{$find:function(name){},initialize:function(options){options=new Hash({type:'div',className:'',id:''}).merge(options);}});

var JSON=new Class('JSON',{});

var Vienna=new Module('Vienna',{VERSION:'0.0.1',$version:function(){return this.VERSION;}});var VN=Vienna;var YES=true;var NO=false;


BasicObject.extend({respondsTo:function(name){return(this[name]&&(typeof this[name]=='function'))?true:false;},perform:function(name,obj1,obj2){if(this.respondsTo(name)){return this[name].call(this,obj1,obj2);}
else{return null;}}});

Vienna.extend({UNDEFINED_KEY_EXCEPTION:"VNUndefinedKeyException",AVERAGE_KEY_VALUE_OPERATOR:"VNAverageKeyValueOperator",COUNT_KEY_VALUE_OPERATOR:"VNCountKeyValueOperator",DISTINCT_UNION_OF_ARRAYS_KEY_VALUE_OPERATOR:"VNDistinctUnionOfArraysKeyValueOperator",DISTINT_UNION_OF_OBJECTS_KEY_VALUE_OPERATOR:"VNDistinctUnionOfObjectsKeyValueOperator",DISTINCT_UNION_OF_SETS_KEY_VALUE_OPERATOR:"VNDistinctUnionOfSetsKeyValueOperator",MAXIMUM_KEY_VALUE_OPERATOR:"VNMaximumKeyValueOperator",MINIMUM_KEY_VALUE_OPERATOR:"VNMinimumKeyValueOperator",SUM_KEY_VALUE_OPERATOR:"VNSumKeyValueOperator",UNION_OF_ARRAYS_KEY_VALUE_OPERATOR:"VNUnionOfArraysKeyValueOperator",UNION_OF_OBJECTS_KEY_VALUE_OPERATOR:"VNUnionOfObjectsKeyValueOperator",UNION_OF_SETS_KEY_VALUE_OPERATOR:"VNUnionOfSetsKeyValueOperator"});BasicObject.extend({valueForKey:function(key){var accessor=key;if(this.respondsTo(key)){return this.perform(accessor);}},setValueForKey:function(val,key){},get:function(key){return this.valueForKeyPath(key);},set:function(key,val){return this.setValueForKeyPath(val,key);},validateValueForKey:function(val,key){},arrayValueForKey:function(key){},valueForKeyPath:function(key){},setValueForKeyPath:function(val,key){},validateValueForKeyPath:function(val,key){},arrayValueForKeyPath:function(key){},valueForUndefinedKey:function(key){},setValueForUndefinedKey:function(val,key){}});

Vienna.extend({KVO_OPTION_NEW:'VNKVOOptionNew',KVO_OPTION_OLD:'VNKVOOptionOld',KVO_OPTION_INITIAL:'VNKVOOptionInitial',KVO_OPTION_PRIOR:'VNKVOOptionPrior'});

Vienna.extend({Notification:new Class('Notification',{attrAccessor:['name','obj','info'],initialize:function(name,obj,info){this.$name=name;this.$obj=obj;this.$info=info;}}),NotificationCenter:new Class('NotificationCenter',{initialize:function(){this.callSuper();this.$dispatchTable=[];},$defaultCenter:function(){if(!this.$defaultCenter){this.$defaultCenter=new VN.NotificationCenter();}
return this.$defaultCenter;},addObserver:function(observer,action,name,sender){},postNotification:function(name,sender,info){}})});


Vienna.extend({KEY_BINDINGS:{escape:'cancel',backspace:'deleteBackward','delete':'deleteForward','return':'insertNewline',tab:'insertTab',left:'moveLeft',right:'moveRight',up:'moveUp',down:'moveDown',home:'moveToBeginningOfDocument',end:'moveToEndOfDocument',pagedown:'pageDown',pageup:'pageUp',shift_tab:'insertBacktab',shift_left:'moveLeftAndModifySelection',shift_right:'moveRightAndModifySelection',shift_up:'moveUpAndModifySelection',shift_down:'moveDownAndModifySelection',alt_left:'moveLeftAndModifySelection',alt_right:'moveRightAndModifySelection',alt_up:'moveUpAndModifySelection',alt_down:'moveDownAndModifySelection',ctrl_a:'selectAll'},Responder:new Class('Responder',{attrAccessor:['menu','nextResponder'],tryToPerform:function(action,object){if(this.respondsTo(action)){this.perform(action,object);return true;}
return this.nextResponder().tryToPerform(action,object);},performKeyEquivalent:function(event){return false;},mouseDown:function(event){this.$nextResponder.mouseDown(event);},rightMouseDown:function(event){this.$nextResponder.rightMouseDown(event);},otherMouseDown:function(event){this.$nextResponder.otherMouseDown(event);},mouseUp:function(event){this.$nextResponder.mouseUp(event);},rightMouseUp:function(event){this.$nextResponder.rightMouseUp(event);},otherMouseUp:function(event){this.$nextResponder.otherMouseUp(event);},mouseMoved:function(event){this.$nextResponder.mouseMoved(event);},mouseDragged:function(event){this.$nextResponder.mouseDragged(event);},scrollWheel:function(event){this.$nextResponder.scrollWheel(event);},mouseEntered:function(event){this.$nextResponder.mouseEntered(event);},mouseExited:function(event){this.$nextResponder.mouseExited(event);},keyDown:function(event){this.$nextResponder.keyDown(event);},keyUp:function(event){this.$nextResponder.keyUp(event);},acceptsFirstResponder:function(){return false;},becomeFirstResponder:function(){return true;},resignFirstResponder:function(){return true;},interpretKeyEvents:function(events){}})});

Vienna.extend({APP_DID_BECOME_ACTIVE:"VNApplicationDidBecomeActiveNotification",APP_DID_HIDE:"VNApplicationDidHideNotification",APP_DID_FINISH_LAUNCHING:"VNApplicationDidFinishLaunchingNotification",APP_DID_RESIGN_ACTIVE:"VNApplicationDidResignActiveNotification",APP_DID_UNHIDE:"VNApplicationDidUnhideNotification",APP_DID_UPDATE:"VNApplicationDidUpdateNotification",APP_WILL_BECOME_ACTIVE:"VNApplicationWillBecomeActiveNotification",APP_WILL_HIDE:"VNApplicationWillHideNotification",APP_WILL_FINISH_LAUNCHING:"VNApplicationWillFinishLaunchingNotification",APP_WILL_RESIGN_ACTIVE:"VNApplicationWillResignActiveNotification",APP_WILL_UNHIDE:"VNApplicationWillUnhideNotification",APP_WILL_UPDATE:"VNApplicationWillUpdateNotification",APP_WILL_TERMINATE:"VNApplicationWillTerminateNotification",APP_DID_CHANGE_SCREEN_PARAMETERS:"VNApplicationDidChangeScreenParametersNotification",Application:new Class('Application',VN.Responder,{attrAccessor:['windows','eventQueue','viewsNeedingDisplay'],attrReader:['delegate'],initialize:function(){this.$windows=[];this.$eventQueue=[];this.$viewsNeedingDisplay=[];return this;},markViewForDisplay:function(view,flag){if(this.$viewsNeedingDisplay.indexOf(view)==-1){this.$viewsNeedingDisplay.push(view);}},displayRequiredViews:function(){var view;while(view=this.$viewsNeedingDisplay.pop()){view.drawRect();}},setDelegate:function(obj){if(this.$delegate==obj)return;var nc=VN.NotificationCenter.defaultCenter();if(this.$delegate){nc.removeObserver(this.$delegate,VN.APP_WILL_FINISH_LAUNCHING,this);nc.removeObserver(this.$delegate,VN.APP_DID_FINISH_LAUNCHING,this);nc.removeObserver(this.$delegate,VN.APP_DID_CHANGE_SCREEN_PARAMETERS,this);}
this.$delegate=obj;if(obj.respondsTo('willFinishLaunching')){nc.addObserver(obj,'willFinishLaunching',VN.APP_WILL_FINISH_LAUNCHING,this);}
if(obj.respondsTo('didFinishLaunching')){nc.addObserver(obj,'didFinishLaunching',VN.APP_DID_FINISH_LAUNCHING,this);}
if(obj.respondsTo('didChangeScreenParameters')){nc.addObserver(obj,'didChangeScreenParameters',VN.APP_DID_CHANGE_SCREEN_PARAMETERS,this);}},addWindow:function(win){var nc=VN.NotificationCenter.defaultCenter();nc.addObserver(win,'didChangeScreenParameters',VN.APP_DID_CHANGE_SCREEN_PARAMETERS,this);this.$windows.push(win);return this.$windows.indexOf(win);},$sharedApplication:function(){if(!VN.App){VN.App=new VN.Application();}
return VN.App;},})});VN.App=VN.Application.sharedApplication();


VN.Point=function(x,y){this.x=x;this.y=y;};VN.Size=function(w,h){this.width=w;this.height=h;};VN.Rect=function(x,y,w,h){this.origin=new VN.Point(x,y);this.size=new VN.Size(w,h);};Object.extend(VN.Rect.prototype,{minX:function(){return this.origin.x;},midX:function(){return this.origin.x+(this.size.width/2.0);},maxX:function(){return this.origin.x+this.size.width;},toString:function(){return'{'+this.origin.toString()+', '+this.size.toString()+'}';},toArray:function(){return[this.origin.x,this.origin.y,this.size.width,this.size.height];},containsPoint:function(point){}});Object.extend(VN.Point.prototype,{equalTo:function(point){return(this.x==point.x)&&(this.y==point.y);}});Object.extend(VN.Size.prototype,{equalTo:function(size){return(this.width==size.width)&&(this.height==size.height);}});

Vienna.extend({View:new Class('View',Vienna.Responder,{$displayProperties:function(){},$defaultOptions:function(options){var superDefaults=this.superklass.getConst('DEFAULT_OPTIONS');if(!superDefaults){this.setConst('DEFAULT_OPTIONS',new Hash(options));}
else{var hash=new Hash(superDefaults);hash.merge(options);this.setConst('DEFAULT_OPTIONS',hash);}},$build:function(options,block){var obj=this.allocate();return obj;},initialize:function(frame){console.log('init frame');this.$frame=frame;},initWithOptions:function(options){return this.initialize(options.remove('frame'));}})});Vienna.View.extend({displayProperties:['frame','frameOrigin','frameSize'],defaultOptions:{frame:new VN.Rect(0,0,0,0),toolTip:'Vienna.View',hidden:false,flipped:false},});

VN.extend({MIXED_STATE:'mixed',OFF_STATE:'off',ON_STATE:'on',REGULAR_CONTROL_SIZE:'regular',SMALL_CONTROL_SIZE:'small',MINI_CONTROL_SIZE:'mini',CONTROL_TEXT_DID_BEGIN_EDITING:"VNControlTextDidBeginEditingNotification",CONTROL_TEXT_DID_END_EDITING:"VNControlTextDidEndEditingNotification",CONTROL_TEXT_DID_CHANGE:"VNControlTextDidChangeNotification",Control:new Class('Control',VN.View,{displayProperties:['enabled','selected','state'],initialize:function(frame){this.callSuper(frame);return this;},sizeToFit:function(){},calcSize:function(){},bind:function(binding,toObject,keyPath,options){},sendAction:function(action,target){if(action&&target){VN.App.sendAction(action,target,this);return true;}
return false;},takeValueFrom:function(sender){this.setValue(sender.value());}})});

Vienna.extend({ROUNDED_BEZEL:'rounded',REGULAR_SQUARE_BEZEL:'regular_square',THICK_SQUARE_BEZEL:'thick_square',THICKER_SQUARE_BEZEL:'thicker_square',DISCLOSURE_BEZEL:'disclosure',SHADOWLESS_SQUARE_BEZEL:'shadowless_square',CIRCULAR_BEZEL:'circular_bezel',TEXTURED_SQUARE_BEZEL:'textured_square',HELP_BUTTON_BEZEL:'help_button',SMALL_SQUARE_BEZEL:'small_square',TEXTURED_ROUNDED_BEZEL:'textured_rounded',ROUNDED_RECT_BEZEL:'rounded_rect',RECESSED_BEZEL:'recessed',ROUNDED_DISCLOSURE_BEZEL:'rounded_disclosure',MOMENTARY_LIGHT_BUTTON:0,PUSH_ON_PUSH_OFF_BUTTON:1,TOGGLE_BUTTON:2,SWITCH_BUTTON:3,RADIO_BUTTON:4,MOMENTARY_CHANGE_BUTTON:5,ON_OFF_BUTTON:6,MOMENTARY_PUSH_IN_BUTTON:7,Button:new Class('Button',Vienna.Control,{defaultOptions:{bezel:'rounded'}})});

Vienna.extend({TICK_MARK_BELOW:0,TICK_MARK_ABOVE:1,TICK_MARK_LEFT:1,TICK_MARK_RIGHT:0,LINEAR_SLIDER:0,CIRCULAR_SLIDER:1,Slider:new Class('Slider',Vienna.Control,{TRACK_PADDING:2.0,KNOB_PADDING:9.5,KNOB_PADDING_MINI:6.5,attrAccessor:['minValue','maxValue'],displayProperties:['minValue','maxValue'],bind:function(binding,obj,keyPath,options){}})});