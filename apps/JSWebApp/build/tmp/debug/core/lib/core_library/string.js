
Object.extend(String,Object.VNCoreMethods);String.extend({capitalize:function(){return this.charAt(0).toUpperCase()+this.substr(1);},w:function(){return this.split(' ');}});