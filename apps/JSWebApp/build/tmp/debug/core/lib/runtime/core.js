
Object.VNCoreMethods={inherit:function(klass){for(var prop in klass){this[prop]=klass[prop];}
this.superklass=klass;var bridge=function(){};bridge.prototype=klass.prototype;this.prototype=new bridge();this.prototype.klass=this.prototype.constructor=this;this.prototype.superklass=this.superklass;},allocate:function(){var bridge=function(){};bridge.prototype=this.prototype;return new bridge();},include:function(){},extend:function(props){var result;for(var prop in props){if(result=prop.match(/^[A-Z][a-zA-Z_]*/)){this.setConst(prop,props[prop]);}
else if(result=prop.match(/^\$([A-Za-z_]*)/)){this[result[1]]=props[prop];}
else if(typeof props[prop]!='function'){if(props[prop]instanceof Array){this[prop].apply(this,props[prop]);}
else{this[prop].call(this,props[prop]);}}
else if(result=prop.match(/^set([A-Za-z_]*)/)){this.addSetterMethod(result[1],result[0],props[prop]);}
else{this.prototype[prop]=(this.superklass&&typeof this.superklass.prototype[prop]=='function')?(function(name,func){return function(){var tmp=this.callSuper;this.callSuper=this.superklass.prototype[name];var ret=func.apply(this,arguments);this.callSuper=tmp;return ret;};})(prop,props[prop]):props[prop];}}
return this;},create:function(){var C=this;var obj=C.allocate();obj.initialize.apply(obj,arguments);return obj;},setConst:function(name,val){if(val.__classid__!=undefined&&!val.__classid__){val.__classid__=name}
this[name]=val;this.prototype[name]=val;},getConst:function(name){return this[name];}};