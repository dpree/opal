# 
# responder.rb
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
  class Responder < Object
    
    KEY_BINDINGS = {
      :escape => "cancel",
      :backspace => "delete_backward",
      :delete => "delete_forward",
      :return => "insert_newline",
      :tab => "insert_tab",
      :left => "move_left",
      :right => "move_right",
      :up => "move_up",
      :down => "move_down",
      :home => "move_to_beginning_of_document",
      :end => "move_to_end_of_document",
      :pagedown => "page_down",
      :pageup => "page_up",
      :shift_tab => "insert_backtab",
      :shift_left => 'move_left_and_modify_selection',
      :shift_right => 'move_right_and_modify_selection',
      :shift_up => 'move_up_and_modify_selection',
      :shift_down => 'move_down_and_modify_selection',
      :alt_left => 'move_left_and_modify_selection',
      :alt_right => 'move_right_and_modify_selection',
      :alt_up => 'move_up_and_modify_selection',
      :alt_down => 'move_down_and_modify_selection',
      :ctrl_a => 'select_all'
    }
    
    attr_accessor :next_responder, :menu
    
    def init_with_coder(coder)
      @next_responder = coder.deocode_object_for_key "NSNextResponder"
      self
    end
    
    def try_to_perform(action, object)
      if self.responds? action
        perform action, object
        return true
      end
      @next_responder.try_to_perform action, object        
    end
    
    def perform_key_equivalent(event)
      # 
    end
    
    def interpret_key_events(event_array)
      event_array.each do |event|
        case event.key_code
        when VN::FUNCTION_KEYS(:up_arrow)
          self.do_command_by_selector('move_up')
        end
      end
    end
    
  end
end