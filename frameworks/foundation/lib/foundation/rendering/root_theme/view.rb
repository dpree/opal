# 
# view.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
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

require 'foundation/rendering/root_theme'

module CherryKit
  
  class RootTheme
    
    # View renderer that is in charge of rendering most basic settings. Every 
    # view, including windows, will have a view renderer, so any settings in
    # here must be generic enough for every view/window. For this reason, we
    # only set basic element id, element classname and any generic background
    # color we need for the element.
    class View < Renderer
      
      # Initial render
      def render(render_context)
        # view id
        render_context.id = "ck-view-#{@view.object_id}"
        # general class names
        render_context.add_class_name('ck-view ' + @view.class_names.join(" "))
        render_context.set_class_names calculate_class_names
        # special style names (for layout)
        render_context.css calculate_layout_style
      end
      
      def calculate_class_names
        {
          'hidden'  => !@view.visible?,
          'focus'   => @view.first_responder?
        }
      end
      
      # Calcultae a hash of layout styles for the view
      # 
      # @returns {Hash}
      # 
      def calculate_layout_style
        layout = @view.layout
        {
          :left   => "#{layout[:left]}px",
          :top    => "#{layout[:top]}px",
          :right  => "#{layout[:right]}px",
          :bottom => "#{layout[:bottom]}px",
          :height => "#{layout[:height]}px"
        }
      end
      
    end # View
  end # RootTheme
end