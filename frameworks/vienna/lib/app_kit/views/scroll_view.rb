# 
# scroll_view.rb
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
  
  class ScrollView < View
    
    def self.frame_size_for_content_size(content_size, has_horizontal_scroller:h_flag, has_vertical_scroller:v_flag, border_type:a_type)
      
    end
    
    def self.content_size_for_frame_size(content_size, has_horizontal_scroller:h_flag, has_vertical_scroller:v_flag, border_type:a_type)
      
    end
    
    def initialize(frame)
      super frame
      @content_view = ClipView.new(Rect.new(0, 0, 100, 100))
      @border_type = :none
      add_subview(@content_view)
    end
    
    def class_name
      'vn-scroll-view'
    end
    
    def document_visible_rect
      
    end
    
    def content_size
      
    end
    
    def document_view=(a_view)
      @content_view.document_view = a_view
      reflect_scrolled_clip_view(@content_view)
    end
    
    def document_view
      @content_view.document_view
    end
    
    def content_view=(content_view)
      @content_view.remove_from_superview
      @content_view = content_view
      add_subview(@content_view)
      tile
    end
    
    def content_view
      @content_view
    end
    
    def document_cursor=(an_obj)
      @document_cursor = an_obj
    end
    
    def document_cursor
      @document_cursor
    end
    
    def border_type=(a_type)
      @border_type = a_type
    end
    
    def border_type
      @border_type
    end
    
    def background_color=(a_color)
      @background_color = a_color
    end
    
    def background_color
      @background_color
    end
    
    def draws_background=(flag)
      @draws_background = flag
    end
    
    def draws_background
      @draws_background
    end
    
    def has_vertical_scroller=(flag)
      if flag
        unless @has_vertical_scroller
          @has_vertical_scroller = true
          # create scroller
          unless @vertical_scroller
            @vertical_scroller = Scroller.new(Rect.new(150, 40, 40, 15))
            @vertical_scroller.target = self
            @vertical_scroller.action = :scroll_v
          end
          add_subview(@vertical_scroller)
        end
      else
        if @has_vertical_scroller
          @has_vertical_scroller = false
          @vertical_scroller.remove_from_superview
        end
      end
      
      tile
    end
    
    def has_vertical_scroller?
      @has_vertical_scroller
    end
    
    def has_horizontal_scroller=(flag)
      if flag
        unless @has_horizontal_scroller
          @has_horizontal_scroller = true
          # create scroller
          unless @horizontal_scroller
            @horizontal_scroller = Scroller.new(Rect.new(150, 20, 40, 15))
            @horizontal_scroller.target = self
            @horizontal_scroller.action = :scroll_h
          end
          add_subview(@horizontal_scroller)
        end
      else
        if @has_horizontal_scroller
          @has_horizontal_scroller = false
          @horizontal_scroller.remove_from_superview
        end
      end
      
      tile
    end
    
    def has_horizontal_scroller?
      @has_horizontal_scroller
    end
    
    def vertical_scroller=(a_scroller)
      @vertical_scroller = a_scroller
    end
    
    def vertical_scroller
      @vertical_scroller
    end
    
    def horizontal_scroller=(a_scroller)
      @horizontal_scroller = a_scroller
    end
    
    def horizontal_scroller
      @horizontal_scroller
    end
 
    def autohides_scrollers?
      @autohides_scrollers
    end
    
    def autohides_scrollers=(flag)
      @autohides_scrollers = flag
    end
    
    
    
    def horizontal_line_scroll=(value)
      @horizontal_line_scroll = value
    end
    
    def horizontal_line_scroll
      @horizontal_line_scroll
    end
    
    def vertical_line_scroll=(value)
      @vertical_line_scroll = value
    end
    
    def vertical_line_scroll
      @vertical_line_scroll
    end
    
    def line_scroll=(value)
      @line_scroll = value
    end
    
    def line_scroll
      @line_scroll
    end
    
    
    
    def horizontal_page_scroll=(value)
      @horizontal_page_scroll = value
    end
    
    def horizontal_page_scroll
      @horizontal_page_scroll
    end
    
    def vertical_page_scroll=(value)
      @vertical_page_scroll = value
    end
    
    def vertical_page_scroll
      @vertical_page_scroll
    end
    
    def page_scroll=(value)
      @page_scroll = value
    end
    
    def page_scroll
      @page_scroll
    end
    
   
   
    def scrolls_dynamically=(flag)
      @scrolls_dynamically = flag
    end
    
    def scrolls_dynamically?
      @scrolls_dynamically
    end
    
    def tile
      
      if @has_vertical_scroller
        frame = Rect.new(0, 0, 0, 0)
        frame.x = @bounds.width - Scroller.scroller_width
        frame.width = Scroller.scroller_width
        frame.height = @bounds.height
        frame.height -= Scroller.scroller_width if @has_horizontal_scroller
        
        @vertical_scroller.frame = frame
      end
      
      if @has_horizontal_scroller
        frame = Rect.new(0, 0, 0, 0)
        frame.y = @bounds.height - Scroller.scroller_width
        frame.width = @bounds.width
        frame.height = Scroller.scroller_width
        frame.width -= Scroller.scroller_width if @has_vertical_scroller
        
        @horizontal_scroller.frame = frame
      end
      
      if @content_view
        frame = Rect.new(0, 0, 0, 0)
        frame.width = @bounds.width
        frame.width -= Scroller.scroller_width if @has_vertical_scroller
        frame.height = @bounds.height
        frame.height -= Scroller.scroller_width if @has_horizontal_scroller
        
        @content_view.frame = frame
      end
            
    end
    
    def reflect_scrolled_clip_view(clip_view)
      
    end
    
    
    def scroll_wheel(the_event)
      
    end
  end
end
