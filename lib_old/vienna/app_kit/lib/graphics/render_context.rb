# 
# render_context.rb
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

module Vienna
  
  # Render context is a special type of element with additions relevant to 
  # rendering views within Vienna
  class RenderContext < Element
    
    def initialize tag_name, options
      @element_stack = [`document.createElement(#{tag_name.to_s})`]
      @build_stack = []
      @first_time = true
      @type = tag_name.to_s
    end
    
    def self.current_context= current_context
      @current_context = current_context
    end
    
    def self.current_context
      @current_context
    end
    
    def first_time?
      @first_time
    end
    
    def first_time= first_time
      @first_time = first_time
    end
    
    def element
      @element_stack.last
    end
    
    def push_element_stack element
      @element_stack << element
    end
    
    def pop_element_stack
      @element_stack.pop
    end
    
    def selector a_selector, &block
      element = find_selector a_selector
      push_element_stack element

      yield self
      pop_element_stack
    end
    
    def append(tag_name, &block)
      append_element = `document.createElement(#{tag_name.to_s})`
      `#{element}.appendChild(#{append_element});`
      push_element_stack(append_element)
      yield self
      pop_element_stack(append_element)
    end
    
    # will erase inner contents, and append created into stack. use this for
    # the content to be erased between changes
    def build(&block)
      # do this on the current context only... tableview etc use the same context
      # for each row, so if we want to redraw a row, we dont have to use old style.
      @build_stack << ""
      self.inner_html = ""
      block.call(self)
      build_text = @build_stack.pop
      
      # if build_stack.length == 0, then apply the inner_html, otherwise, push it onto last one
      # so that changed are pushed up through the build stacks back to the root build stack
    end
    
    # begin tag
    def begin(tag_name)
      
    end
    
    # end tag
    def end
      
    end
    
    # Returns Integer number of child nodes of current element
    def child_nodes
      `return #{element}.childNodes.length;`
    end
    
    # Selects the child node of the current element. This number is the element order within
    # the current context, i.e. `e.child_node(4) will select the fourth child.
    # This is only kept in context during the block execution.
    def child_node a_number, &block
      e = `#{element}.childNodes[a_number]`
      push_element_stack e
      yield self
      pop_element_stack
    end
    
    def find_selector a_selector
      # `return #{element}.getElementsByClassName(#{a_selector})[0];`
      `var nodes = #{element}.childNodes;
      var length = nodes.length;
      for (var i = 0; i < length; i++) {
        if(nodes[i].className == #{a_selector.to_s}) {
          return nodes[i];
        }
      }
      return #{element}`
    end
    
  end
  
end