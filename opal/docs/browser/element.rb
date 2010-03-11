# Element class to wrap the native Element objects from the DOM.
# 
# Implementation
# --------------
# 
# The element class simply extends the native browser element instance. Due to
# cross browser differences in element handling, this process takes place at
# two stages. It is not possible to simply extend the prototype of the Element
# class as startup to mixin Opal properties, so each element must be extended
# whenever required. {Element.find} is the logical place to do this. To make a
# native element compatible with Opal as an object, it requires two properties:
# <tt>klass</tt> and <tt>flags</tt>. These are used for message sending. The
# klass will simply be set to {Element} so that it can receive messages defined
# in this file.
# 
# To add these properties, every time an element is found using the {.find}
# method, the native element has these two peropties added. A quick check is
# used to ensure an element that is already "wrapped" is not done so again. This
# allows Opal to use the native browser element directly, instead of a default
# instance of <tt>RObject</tt>. Also, the Element.new method is overidden to
# return a new native element, pre-wrapped, instead of a simple <tt>RObject</tt>
# instance.
# 
class Element
  
  # Creates a new Element of the type passed in.
  # 
  #     # create a simple div. String or symbol names are valid
  #     el = Element.new('div')
  #     # create a simple div with some addition class and id options
  #     el2 = Element.new :div, :class => 'a-title-class', :id => 'main-title'
  # 
  # @param [Symbol|String] element the element tag name
  # @param [Hash] options any options usable in {#set}
  # @return [Element] the newly created DOM element
  # 
  def initialize(element, options={})
    # native implementation
  end
  
  # Find an element, with the given id, inside the document scope. 
  # {.[]} is an alias of this method. Returns nil when not found.
  # 
  #     Element.find(:my_div)             # => element
  #     Element.find('my_div')            # => element
  #     Element[:non_existing_element]    # => nil  
  # 
  # @param [Symbol or String] str the id of the element to look for
  # @return [Element] the found element
  # 
  def self.find(str)
    # native implementation
  end
  
  class << self
    alias [] find
  end
  
  # Returns the body element of the document.
  # 
  # @return [Element] body
  def self.body
    # native implementation
  end
  
  # Register the given block as the action when the DOM event, given by `type`,
  # is triggered. Valid listeners are :click, :mousedown, :mouseup, :mousemove,
  # :mousedragged. :keyup, :keydown, :keypress.
  # 
  # Each of these have their own implementation as instance methods, which 
  # simply call this version. Handles cross browser incompatibilities between
  # addEventListener and attachEvent.
  # 
  #     # assume we have an element 'elem'
  #     elem.add_listener :mouseup do |evt|
  #       puts "my element was clicked!"
  #     end
  # 
  #     # block optionally ommits the event parameter
  #     elem.add_listener :mousedown { puts "I might be clicked..." }
  # 
  # @param [Symbol] type the event name to listen for
  # @param [Proc] block given as a block that will be saved, and exectued when
  # required
  # @return [Element] self
  # 
  def add_listener(type, &block)
    
  end
  
  # Calls {#add_listener} with <tt>:click</tt> as the type. Acts as a shorthand 
  # for registering
  # blocks for click events. See {#add_listener}
  def on_click(&block)
    
  end
  
  # Removes all child elements from the receiving element.
  # 
  # Assume we have the initial HTML:
  # 
  #     <div id="outer_element">
  #       <p>Hey there!</p>
  #       <div class="blue">Blue text!</div>
  #     </div>
  # 
  # Code:
  # 
  #     Element[:outer_element].empty
  # 
  # Result HTML:
  # 
  #     <div id="outer_element"></div>
  # 
  # @return [Element]
  # 
  def empty
    
  end
  
  # Sets multiple css styles on the receiver using the given options hash. All
  # property names should be snake-case symbols, which are automatically 
  # converted to native compatible names before setting.
  # 
  #     elem.css :background_color => 'blue', :height => '40px', :color => 'red'
  # 
  # @param [Hash] styles
  # @return [Element]
  # 
  def css(styles)
    # 
  end
  
  alias style css
  
  # Whether or not the receiver has the given class_name.
  # 
  # Usage
  # -----
  # 
  # HTML:
  # 
  #     <div id="test_element1" class="single"></div>
  #     <div id="test_element2" class="double classes"></div>
  #     <div id="test_element3" class="lots of_classes"></div>
  #     <div id="test_element4" class=""></div>
  # 
  # Code:
  # 
  #     Element[:test_element1].has_class?('single')    # true
  #     Element[:test_element2].has_class?('double')    # true
  #     Element[:test_element3].has_class?('double')    # false
  #     Element[:test_element4].has_class?('double')    # false
  # 
  # @param [String] class_name name to look for
  # @return [Boolean] true or false answer
  # 
  def has_class?(class_name)
    
  end
  
  # Set the Element class name to <tt>class_name</tt>. This method does not
  # append the name to the current class, but completely removes all current
  # class names so that it is uniquely <tt>class_name</tt>.
  # 
  #     elem = Element.new(:div)
  #     elem.class = "main_content"
  # 
  # @param [String] class_name
  # @return [Element]
  # 
  def class_name=(class_name)
    
  end
  
  alias :class= :class_name=
  
  # Return the HTML classname of
  # the receiver. Might be the empty string.
  # 
  # @return [String]
  # 
  def class_name
    
  end
    
  # Custom method missing handler. This is used to create a builder type feature
  # where elements are created using the method name as a tag name, and then any
  # additional option arguments will be sent to the {Element#set} method. Also,
  # the optional block will be yielded as an instance_eval, so that the context
  # of the block will be the new element. This allows a nested builder, where
  # each level, represented by a block, will not need to explicitly state the
  # receivers name, as each tag will be added as a child to its parent.
  # 
  # Usage
  # -----
  # 
  # Initial HTML:
  # 
  #     <div id="outer_div"></div>
  # 
  # Code:
  # 
  #     elem = Element.find('outer_div')
  #     elem.div, :class => 'something_blue' do
  #       div :class => 'something_old' do
  #         div :id => 'foo', :class => "foo_header", :text => "Heading."
  #         p :id => 'bar', :text => "First paragraph!"
  #         p :id => 'baz', :text => "Second paragraph!"
  #       end
  #     end
  # 
  # Result HTML:
  # 
  #     <div id="outer_div">
  #       <div class="something_blue">
  #         <div class="something_old">
  #           <div id="foo" class="foo_header">Heading.</div>
  #           <p id="bar">First paragraph!</p>
  #           <p id="baz">Second paragraph!</p>
  #         </div>
  #       </div>
  #     </div>
  # 
  # Note that both 'div' and 'p' methods trigger method missing. Most common
  # tags will be caught using this technique.
  # 
  # @param [Symbol] sym the tag name to create
  # @param [Array] args an array of remaining arguments. Usually a hash of 
  # properties to set.
  # @param [Proc] block block to instance_eval with the new element
  # @return [Element] new element.
  def method_missing(sym, *args, &block)
    
  end
  
  # Sets the content of the element to the given text. Cross browser differences
  # are handled for setting either the innerText or textContent property of the
  # native element.
  # 
  # Initial HTML:
  # 
  #     <div id="a_div"></div>
  # 
  # Code:
  # 
  #     Element.find('a_div').text = "New content!"
  # 
  # Result HTML:
  # 
  #     <div id="a_div">
  #       New content!
  #     </div>
  # 
  # @param [String] text the text content
  # @return [Element] self
  # 
  def text=(text)
    
  end
  
  # Return the text content of the receiver. Handles cross browser issues
  # 
  # @return [String] element content
  # 
  def text
    
  end
  
  
  def <<(other)
    
  end
  
  def set
    
  end
end