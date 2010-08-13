# 
# key_value_binding.rb
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

require 'foundation/core/observable'

class Object
  
  # Exposes the given binding_name on the receiving class. This also defines a
  # method 'key_binding=' for the given key so that its binding information can
  # be set with a hash dynamically. This is more useful for builder when making
  # GUIs, but it can be used from anywhere. It is esentially a shortcut for
  # the more normal Kernel#bind method.
  # 
  # @param {Symbol} binding_name to expose
  # 
  def self.expose_binding(binding_name)
    define_method("#{binding_name}_binding=") do |binding_options|
      bind binding_name, binding_options
    end
  end
end

module CherryKit
  
  module Bindings
    
    # Usage:
    # 
    #     bind :value, :to => some_controller, :path => 'some_key_name'
    # 
    # Keys
    # ----
    # 
    # Required keys:
    #   :to - the object to bind to
    #   :path - the path on the given object to bind to
    # 
    # Optional keys:
    #   
    # 
    # @param {Symbol} binding
    # @param {Hash} binding_options
    # 
    def bind(binding, binding_options)
      to = binding_options[:to] or raise "binding options must have a :to key"
      key = binding_options[:path].to_s or raise "binding options must have :path key"
      # first make sure we unbind any existing binding
      unbind binding
      
      @__ck_bindings[binding] = KVBBindingProxy.new(binding, to, key, nil, self)
    end
    
    def unbind(the_binding)
      # incase this is our first binding for this object
      @__ck_bindings ||= {}
      
      binding = @__ck_bindings[the_binding]

      return unless binding
      # raise "should not get to here yet. need to implement"
    end
    
    # Proxy object to manage the notifications between two bound objects. 
    # Instances of this class deal with all passed options etc to maintain a
    # performant binding system
    class KVBBindingProxy
      
      def initialize(binding, observed, path, options, source)
        @binding = binding
        @observed = observed
        @path = path
        @options = options
        @source = source
        
        # observed.add_observer self, key_path, [:new], binding
        
        observed.observe(path) do |info|
          update_value_for binding
        end
        
        # only if initial?
        update_value_for binding
      end
      
      # Send updates values
      def update_value_for(context)
        new_value = @observed.get_path @path
        # transform values
        # new_value = transform_value new_value, @options
        
        @source.set_attribute context, new_value
      end
      
      def transform_value(value, options)
        
      end
      
    end    
  end
end

Object.include CherryKit::Bindings
