# 
# button_cell.rb
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

require 'button_cell_images'

module Vienna
  
  class ButtonCell < Cell
    
    SWITCH_IMAGE = Image.sprite :controls, [0, 357, 16, 16]
    SWITCH_HIGHLIGHTED_IMAGE = Image.sprite :controls, [16, 357, 16, 16]
        
    def init_text_cell str
      super str
      @transparent = false
      @highlights_by = :push_in
      @shows_state_by = :none
      @alternate_title = ""
      @alternate_image = nil
      @image_dims_when_disabled = false
      @bordered = true
      @bezeled = true
      @alignment = :center
      
      @key_equivalent = ""
      @key_equivalent_modifier_mask = 0   
    end
    
    def init_image_cell img
      
    end
    
    def initialize
      init_text_cell 'ButtonCell'
    end
    
    # Button override
    def control_tint= control_tint
      super control_tint
      _update_button_images if @type == :switch || @type == :radio
    end

    # Button override
    def control_size= size
      super size
      _update_button_images if @type == :switch || @type == :radio
    end
    
    # Updates button images only if they are built in switch/radio
    # We should really keep track if user manually sets the image or alt image
    # for the cell - if so, we should not do any of this, and just use the user
    # supplied images. - Add bool to image= and alternate_image= so we can catch
    # this. To make sure we dont accidentally set it, only use @image to set
    # images. Nice and clean?
    # FIXME: Also decide on blue or graphite as default - blue makes more sense?
    # in which case change _BLUE to _GRAPHITE so default also lies to _BLUE, as 
    # well as if the user doesnt set anything (i.e. it uses default => blue)
    def _update_button_images
      size_str = ''
      tint_str = ''
      
      case @control_size
      when :regular
        size_str = '_REGULAR'
      when :small
        size_str = '_SMALL'
      when :mini
        size_str = '_MINI'
      end
      
      case @control_tint
      when :blue
        tint_str = '_BLUE'
      when :hud
        tint_str = '_HUD'
      else
        # graphite or default, or anything else really..
      end
      
      if @type == :switch
        @image = "SWITCH_IMAGE#{size_str}#{tint_str}"
        @alternate_image = "SWITCH_HIGHLIGHTED_IMAGE#{size_str}#{tint_str}"
      elsif @type == :radio
        @image = "RADIO_IMAGE#{size_str}#{tint_str}"
        @alternate_image = "RADIO_HIGHLIGHTED_IMAGE#{size_str}#{tint_str}"
      end
    end
    
    
    def class_name
      'vn-button'
    end
    
    def title
      @title
    end
    
    def title= str
      @title = str
    end
    
    def alternate_title
      @alternate_title
    end
    
    def alteernate_title= str
      @alternate_title = str
    end
    
    
    
    def alternate_image
      @alternate_image
    end
    
    def alternate_image= img
      @alternate_image = img
    end
    
    def image_position
      @image_position
    end
    
    def image_position= position
      @image_position = position
    end
    
    def image_scaling
      @image_scaling
    end
    
    def image_scaling= image_scaling
      @image_scaling = image_scaling      
    end
    
    # Values can be - :on :off, :mixed
    def state=(val)
      @state = val
    end
    
    def state
      @state
    end
    
    def on?
      @state == :on
    end
    
    def off?
      @state == :off
    end
    
    def mixed?
      @state == :mixed
    end
    
    
    
    def highlights_by
      @highlights_by
    end
    
    def highlights_by= a_type
      @highlights_by = a_type
    end
    
    def shows_state_by= a_type
      @shows_state_by = a_type
    end
    
    def shows_state_by
      @shows_state_by
    end
    
    def type= a_type
      @type = a_type
      case a_type
      when :momentary_light
        @highlights_by = :change_background
        @shows_state_by = :none
        @image_dims_when_disabled = true
      
      when :push_on_push_off
        @highlights_by = :push_in
        @shows_state_by = :change_background
        @image_dims_when_disabled = true
      
      when :toggle
        @highlights_by = :push_in
        @shows_state_by = :contents
        @image_dims_when_disabled = true
      
      when :switch
        @highlights_by = :contents
        @shows_state_by = :contents
        @image_dims_when_disabled = false
        @image_position = :left
        @image = SWITCH_IMAGE
        @alternate_image = SWITCH_HIGHLIGHTED_IMAGE
        @bordered = false
        @bezeled = false
        @alignment = :left
      
      when :radio
        @highlights_by = :contents
        @shows_state_by = :contents
        @image_dims_when_disabled = false
        @image_position = :left
        @image = Image.image_named :vn_radio
        @alternate_image = Image.image_named :vn_highlighted_radio
        @bordered = false
        @bezeled = false
        @alignment = :left
      
      when :momentary_change
        @highlights_by = :contents
        @shows_state_by = :none
        @image_dims_when_disabled = true
      
      when :on_off
        @highlights_by = :change_background
        @shows_state_by = :change_background
        @image_dims_when_disabled = true
      
      when :momentary_push_in
        @highlights_by = :push_in
        @shows_state_by = :none
        @image_dims_when_disabled = true
      end
      # @control_view.update_cell self
    end
    
    def type
      @type
    end
    
    def opaque?
      @opaue
    end
    
    def font= font_obj
      @font = font_obj
    end
    
    def transparent?
      @transparent
    end
    
    def transparent= flag
      @transparent = flag
    end
    
    
    
    def set_periodic_delay delay, interval:interval
      
    end
    
    def get_periodic_delay delay, interval:interval

    end
    
    def key_equivalent
      @key_equivalent
    end
    
    def key_equivalent= equiv
      @key_equivalent = equiv
    end
    
    def key_equivalent_modifier_mask= mask
      @key_equivalent_modifier_mask = mask
    end
    
    def key_equivalent_modifier_mask
      @key_equivalent_modifier_mask
    end
    
    def key_equivalent_font= font
      @key_equivalent_font = font
    end
    
    def key_equivalent_font
      @key_equivalent_font
    end
    
    def set_key_equivalent_font font_name, size:size
      
    end
    
    def perform_click sender
      
    end
    
    
    
    def draw_image images, with_frame:frame, in_view:control_view
      
    end
    
    def draw_title title, with_frame:frame, in_view:control_view
      
    end
    
    def draw_bezel_with_frame frame, in_view:control_view
      
    end
    
    # Rendering
    def render_bezel_with_frame cell_frame, in_view:control_view
      ctx = RenderContext.current_context
      
      if ctx.first_time?
        ctx << "<div class='left'></div>"
        ctx << "<div class='middle'></div>"
        ctx << "<div class='right'></div>"
        ctx << "<div class='title'>Wow!</div>"
        ctx << "<div class='image'></div>"
        ctx.first_time = false
      end
      
      class_name_array = [class_name, theme_name]      
      class_name_array << :disabled unless enabled?

      if bordered?
        class_name_array << :bordered
         if highlighted? && @highlights_by == :push_in
           class_name_array << :highlighted
         else
           # normal button... not highlighted...
         end
      end
      
      ctx.class_name = class_name_array.join ' '
    end
    
    def render_interior_with_frame cell_frame, in_view:control_view
      ctx = RenderContext.current_context
      
      ctx.selector 'title' do |title|
        title.inner_html = @title
        title.css :text_align => alignment
        # title.frame = title_rect_for_bounds cell_frame
      end
      
      if @image
        if on?
          # img = @alternate_image || @image
          render_image @alternate_image, with_frame:cell_frame, in_view:control_view
        else
          render_image @image, with_frame:cell_frame, in_view:control_view
        end
      end
    end
    
    
    def render_image image, with_frame:frame, in_view:control_view
      ctx = RenderContext.current_context
      
      ctx.selector 'image' do |img|
        image.render_in_rect Rect.new(0, 0, image.size.width, image.size.height)
      end
    end
    
    def render_title title, with_frame:frame, in_view:control_view
      
    end
  
    
    # How to set first_time? for cells? make it Cell/View method? think of tableviews
    # re drawing cells= cells must keep state,plus tableview draws some stuff itself
    def render_with_frame cell_frame, in_view:control_view
      @control_view = control_view
      
      return if transparent?
      
      render_bezel_with_frame cell_frame, in_view:control_view
      render_interior_with_frame cell_frame, in_view:control_view  
    end
    
    def mouse_entered the_event
      
    end
    
    def mouse_exited the_event
      
    end
    
    
    def background_color
      @background_color
    end
    
    def background_color= color
      @background_color = color
    end
    
    
    
    def attributed_title
      @attributed_title
    end
    
    def attributed_title= obj
      @attributed_title = obj
    end
    
    def attributed_alternate_title
      @attributed_alternate_title
    end
    
    def attributed_alternate_title= obj
      @attributed_alternate_title = obj
    end
    
    
    
    def bezel_style= bezel_style
      @bezel_style = bezel_style
    end
    
    def bezel_style
      @bezel_style
    end
    
    
    
    def sound= a_sound
      @sound
    end
    
    def sound
      @sound
    end
    
  end
end

puts 'BUTTON CELL'
puts VN::ButtonCell
