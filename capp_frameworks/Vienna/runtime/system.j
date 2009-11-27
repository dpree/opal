/**
    rb_yield takes different parameters to vanilla ruby. The first parameter
    is the 'arguments object' from the calling method. rb_yield takes sole
    responsibility for checking an argument object is valid. i.e., it checks
    the last argument, verifies it, and then runs it if valid. Any other
    parameters will be the arguments for the block.
    
    function rb_obj_yield(self, _cmd, block) {
        rb_yield(arguments, arg1, arg2);
    }
*/
function rb_yield(args) {
    if (rb_block_defined_p(args)) {
        // do block
        var a = Array.prototype.slice.call(args, 1);
        var b = arguments[arguments.length - 1];
        return b.apply(b, a);
    }
    throw 'yield: block not given exception.'
}

/**
    Operates as block_defined? from Kernel.
    
    Returns true or false if the given arguments contains a block. (This will
    be as the last argument in the obj.)
    
    Temporarily, block_defined? is actually a keyword in the vienna parser. This
    will change soon once this method has had a rewrite.
*/
function rb_block_defined_p(args) {
    var b = arguments[arguments.length - 1];
    if ((b.isa == rb_cProc) && (b.rb_is_block)) {
        return true;
    }
    return false;
}