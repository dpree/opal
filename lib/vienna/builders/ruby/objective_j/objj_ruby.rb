# 
# objj_ruby.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2009 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#

# Custom behaviour for writing objective J ruby files
# This should really be merged back into the main generator. This is basically
# a rewrite to make things tidier.
class Vienna::ObjjRuby < Vienna::RubyParser
  
  def initialize(source, destination, project)
    super
    @current_self = ['rb_top_self']
  end
  
  def current_self_push(s)
    @current_self << s
  end
  
  def current_self_pop
    @current_self.pop
  end
  
  def generate_tree(tree)
    push_nametable
    tree.each do |stmt|
      generate_stmt stmt, :instance => true, :full_stmt => true, :last_stmt => false, :top_level => true
    end
    pop_nametable
  end
  
  def generate_stmt stmt, context
    # puts stmt
    case stmt.node
    when :klass
      generate_class stmt, context
    when :module
      generate_module stmt, context
    when :class_shift
      generate_class_shift stmt, context
    when :def
      generate_def stmt, context
    when :numeric
      generate_numeric stmt, context
    when :call
      generate_call stmt, context
    when :super
      generate_super stmt, context
    when :identifier
      generate_identifier stmt, context
    when :ivar
      generate_ivar stmt, context
    when :cvar
      generate_cvar stmt, context
    when :constant
      generate_constant stmt, context
    when :symbol
      generate_symbol stmt, context
    when :self
      generate_self stmt, context
    when :true
      generate_true stmt, context
    when :false
      generate_false stmt, context
    when :nil
      generate_nil stmt, context
    when :if
      generate_if stmt, context
    when :unless
      generate_if stmt, context
    when :if_mod
      generate_if_mod stmt, context
    when :unless_mod
      generate_if_mod stmt, context  
    when :string
      generate_string stmt, context
    when :xstring
      generate_xstring stmt, context
    when :array
      generate_array stmt, context
    when :assign
      generate_assign stmt, context
    when :assoc_list
      generate_assoc_list stmt, context
    when :op_asgn
      generate_op_asgn stmt, context
    when :lparen
      generate_lparen stmt, context
    when :return
      generate_return stmt, context
    when :colon2
      generate_colon2 stmt, context
    when :colon3
      generate_colon3 stmt, context
    when :case
      generate_case stmt, context
    when :yield
      generate_yield stmt, context
    when :orop
      generate_orop stmt, context
    when :andop
      generate_andop stmt, context
    when :not
      generate_not stmt, context
    when :tertiary
      generate_tertiary stmt, context
    when :dot2
      generate_dot2 stmt, context
    else
      raise "Unknown type for generate_stmt: #{stmt}"
    end
  end
  
  def generate_def(definition, context)
    # capture if objective-c style method (as in more than one selector name)
    if label_styled_args?(definition)
      generate_label_styled_def(definition, context)
      return
    end
    
    # new nametabel scope
    push_nametable
    
    if definition[:singleton]
      write "rb_define_singleton_method("
      generate_stmt definition[:singleton], :instance => context[:instance], :full_stmt => false, :last_stmt => false
      write ",'#{defintion[:fname]}',function(self,_cmd"
      
      current_self_push 'self'
    elsif context[:top_level]
      # if top level, current self will be rb_top_self
      write "rb_define_singleton_method(#{current_self},'#{definition[:fname]}',function(self,_cmd"
      current_self_push 'self'
    else
      # 'normal' def methods should be checked to objj-ify them... turn them into a selector (colons) etc. 
      # basicallt, if they are not a label_styled_arg, but only take one parameter, they should really be
      # of the form fname: .. where the def name is also camelcased.
      write "rb_define_singleton_method(#{current_self},'#{definition[:fname]}',function(self,_cmd"
      current_self_push 'self'
    end
    
    # arglist here..
    if definition[:arglist]
      if definition[:arglist][:arg]
        definition[:arglist][:arg].each do |arg|
          write ","
          write arg[:value]
          add_to_nametable arg[:value]
          # write ',' unless definition[:arglist][:arg].last == arg
        end
      end
      # block
      if definition[:arglist][:opt_block_arg]
        write ','
        write definition[:arglist][:opt_block_arg]
        add_to_nametable definition[:arglist][:opt_block_arg]
      end  
    end
    
    
    write ") {\n"
    
    # stmts
    if definition[:bodystmt]
      definition[:bodystmt].each do |stmt|
        
        generate_stmt stmt, :instance => (definition[:singleton] ? false : true),
                            :full_stmt => true,
                            :last_stmt => (definition[:bodystmt].last == stmt),
                            :fname => definition[:fname]
        
      end
    end
    
    # get rid of current self, also, pop nametable
    current_self_pop
    pop_nametable
    
    write "});\n"
  end
  
  # Generate a method call
  def generate_call(call, context)
    # capture objj style calls
    return generate_label_styled_call(call, context) if label_styled_call? call
    
    # Capture require calls...
    if call[:meth] == 'require' and not call[:recv]
      require_path = @project.require_path_for_file(@source, call[:call_args][:args][0][:value][0][:value])
      # puts "found require path: #{call[:call_args][:args][0][:value]}"
      write "#{require_path}\n"
      return
    end
    
    write "return " if context[:last_stmt] and context[:full_stmt]
    
    # detect a block.....
    if call[:brace_block]
      write "rb_funcall_block(["
    else
      # normal
      write "rb_funcall("
    end
    
    # Receiver.
    if call[:recv]
      generate_stmt call[:recv], :instance => context[:instance], :full_stmt => false, :last_stmt => context[:last_stmt], :call_recv => true, :top_level => context[:top_level]
    else
      write current_self
    end
    
    # method name - we should really detect a possible objj call... one parameter, no assoc, no block
    # so we rename it like 'do_something' => 'doSomething:'
    write ",'#{call[:meth]}'"
    
    # normal call args
    unless call[:call_args].nil? or call[:call_args][:args].nil?
      call[:call_args][:args].each do |arg|
        write ","
        generate_stmt arg, :instance => context[:instance], :full_stmt => false
      end
    end
    
    # assocs
    if call[:call_args] and call[:call_args][:assocs]
      write ","
      # puts call[:call_args][:assocs]
      write "rb_hash_new("
      call[:call_args][:assocs].each do |a|
        write "," unless call[:call_args][:assocs].first == a
        
        generate_stmt a[:key], :instance => context[:instance], :full_stmt => false, :top_level => context[:top_level]
        write ","
        generate_stmt a[:value], :instance => context[:instance], :full_stmt => false, :top_level => context[:top_level]
        # write a
      end
      write ")"
      
      # generate_assoc_list call[:call_args][:assocs], :instance => context[:instance], :full_stmt => false
    end
        
    # block
    unless call[:brace_block].nil?
      push_nametable
      
      write ","
      write "function("
      if call[:brace_block][:params]
        call[:brace_block][:params].each do |p|
          write "," unless call[:brace_block][:params].first == p
          write p[:value]
          add_to_nametable p[:value]
        end
      end
      write "){\n"
      
      if call[:brace_block][:stmt]
        call[:brace_block][:stmt].each do |stmt|

          generate_stmt stmt, :instance => (context[:singleton] ? false : true),
                              :full_stmt => true, 
                              :last_stmt => (call[:brace_block][:stmt].last == stmt ? true : false), 
                              :self => current_self,
                              :top_level => context[:top_level]

        end
      end        
      
      write "}"
      pop_nametable
      
    end # end block
    
    write ")"
    write ";\n" if context[:full_stmt]
    
    # write call[:brace_block]
  end
end