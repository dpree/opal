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

require 'foundation/core/responder'
require 'foundation/core/builder'

module CherryKit
  
  class View < Responder
    
    # Get the layout hash from the receiver (Hash)
    attr_reader :layout
    
    def initialize(frame)
      # initialize
      # default layout
      @layout = {
        :left   => 0,
        :top    => 0,
        :right  => 0,
        :bottom => 0
      }
      # all of our subviews
      @subviews = []
    end
    
    # Return the theme name to use for the view. In all systems, root_theme is
    # used as the default. To use another theme, set the theme_name property for
    # the window when created so that all subviews will inherit that theme.
    # 
    # @returns {Symbol} theme name
    # 
    def theme_name
      :root_theme
    end
    
    # Returns the receivers container view
    # 
    # @returns [View] containing view
    # 
    def superview
      @superview
    end
    
    def render_context
      @render_context
    end
    
    def create_render_context
      return @render_context if @render_context
      
      render_context = RenderContext.new tag_name      
      render_with_render_context render_context
      
      @render_context = render_context
    end
    
    def render_with_render_context(render_context)
      __update_renderer
      
      @view_renderer.render render_context
      
      # if we have set renderer.. might not always be set (root view etc)
      if @renderer
        @renderer.render render_context
      end
      
      # We immeditaely call update on both the view_renderer and the main
      # renderer, again, if it exists
      @view_renderer.update render_context
      
      if @renderer
        @renderer.update render_context
      end
    end
    
    def visible?
      true
    end
    
    # Update the renderer. We assume we have our render context, so we just need
    # to make sure we have our actual renderer available (usually from a theme)
    def __update_renderer
      if @view_renderer
        puts "need to call on renderer to update"
      else
        __create_renderer
      end
    end
    
    # create the renderer - private method that calls actual create_renderer
    def __create_renderer
      # find the right theme
      theme = Theme.find_theme theme_name
      
      unless theme
        raise "Cannot find theme named #{theme_name}"
      end
      
      # every view will have a view_renderer that handles the basics
      @view_renderer = theme.view self
      # the renderer for our custom view. Our renderer might be nil. The base
      # view for example does not create a renderer, so do not always assume
      # that one will exist
      @renderer = create_renderer theme
    end
    
    # create the renderer just for this view. By default this implementation is
    # empty, but this should be overridden to create the necessary rendererer
    # from the given theme for your view.
    # 
    # @param {CherryKit::Theme} theme to create renderer from
    # @returns {CherryKit::Renderer} renderer
    # 
    def create_renderer(theme)
      # do nothing by default
    end
    
    def update_renderer
      # do we actually need this?
    end
    
    # Root element tag_name used for building the responder context. Should be a
    # Symbol. Default is <tt>:div</tt>
    # 
    # @returns {Symbol} tag name
    # 
    def tag_name
      :div
    end
    
    # Default class name for views. Override this method
    def class_names
      ['ck-view']
    end
    
    # NEVER EVER call this method directly. This will create and / or update
    # the rendering context as needed
    # 
    def display
      puts "Displaying init"
      if @render_context
        # if we already have our render context, just update it
        puts "need to update render context"
      else
        puts "need to create render context"
        render_context = create_render_context
        @superview.render_context.element << render_context.element
      end
    end
    
    # Add subview
    # 
    # @param {CherryKit::View} view to append as subview
    # @returns {self}
    # 
    def <<(subview)
      # inform subview that it must first remove itself from its superview
      subview.remove_from_superview
      # privately set the window to our current window
      subview._window = @window
      # notify subview that it is soon to move to this view
      subview.will_move_to_superview self
      # set private superview variable on subview
      subview.instance_variable_set :@superview, self
      # do DOM manipulation here
      @subviews << subview
      # reset responder chain for subview
      subview.next_responder = self
      # alert subview that its move is complete
      subview.did_move_to_superview self
      # any callbacks that might be ndded
      did_add_subview subview
    end
    
    # Remove the receiver from its current superview
    # 
    def remove_from_superview
      
    end
    
    # Perform additonal actions once the subview has been added to the 
    # receiver
    # 
    # @param {CherryKit::View} subview that was added
    # @returns {nil}
    # 
    def did_add_subview(subview)
      # nothing by default
    end
    
    # Called when the receiver is about to move to the given superview
    # 
    # @param {CherryKit::View} view to move to
    # 
    def will_move_to_superview(superview)
      # nothing by default
    end
    
    # Called when the receiver has just moved to the given superview. Default 
    # action is to simply call self.needs_display which marks this view as 
    # needing display. This should always be called in a custom overridden
    # method, or just use super().
    # 
    # @param {CherryKit::View} view that is now the superview
    # 
    def did_move_to_superview(superview)
      self.needs_display = true
    end
    
    # Marks the receiver as needing displaying (rendering). Windows are in
    # charge of calling renderers etc as needed, so this method simply
    # registers itself with its window as needing display.
    # 
    # @param {true|false} needs_displaying
    # 
    def needs_display=(needs_displaying)
      # we should only mark ourself as needing display if we have a window
      if @window
        window.mark_view_for_display self
      end
    end
    
    # Sets the window for the view. This method should never be directly called.
    # Instead, use <tt><<</tt> to add the view to another view within the window
    # hierarchy.
    # 
    # @private
    # 
    # @param {CherryKit::Window} window to set
    # 
    def _window=(window)
      puts "setting window to #{window} for #{self}"
      # if we already belong to the window, just return
      return if @window == window
      # callback
      will_move_to_window window
      
      @window = window
      
      # mark ourselves as needing redisplay (before our subviews are)
      self.needs_display = true
      
      # inform each subview that we are all moving
      @subviews.each do |subview|
        subview._window = window
      end
      
      # second callback
      did_move_to_window window
    end
    
    # Callback informing the receiver that it is about to join the new window
    # 
    # @param {CherryKit::Window} window to join
    # 
    def will_move_to_window(window)
      # do nothing by default
    end
    
    # Inform the receiver that it has joined the new window
    # 
    # @param {CherryKit::Window} window just joint
    # 
    def did_move_to_window(window)
      # do nothing by default
    end
  end
end