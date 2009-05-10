# 
#  objective_c_interface.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-10.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  # Class extensions for ObjectiveCParser. These should be added after the class
  # is initially defined, and is done by inclusion practices.
  class ObjectiveCParser
    
    # Deals with a parse_tree reprsenting an interface. This could be a standard
    # class interface, or a category, as they are both parsed as similar by the
    # root parsing. This method created an ObjectiveCInterface object which will
    # be instantiated to contain a list of all defined ivars, methods, properties
    # etc, as well as ensuring protocols and categories etc are valid, and that
    # categories do not redefine variables etc etc.
    # 
    # NOTE: new interfaces may not always be generated. Sometime, categories, for
    # example simpy add methods onto existing classes/interfaces. In such a case,
    # if the original interface can not be found, then an error should really be
    # thrown
    def deal_with_interface_declaration(parse_tree)
      # Get class info/values etc from the parse tree so they are easy to reference
      name = parse_tree.left.left.left.left
      super_class = parse_tree.left.left.left.right
      ivar_list = parse_tree.left.right
      category = parse_tree.left.left.right.right
      method_declarations = parse_tree.right
        
      # set interface to be already existing interface, if it exsists
      interface = get_interface_by_name(name)
      
      # If this is a category definition, and there exists no interface by that
      # name, then throw an error: we cant add a category to a non existing class
      if interface.nil? and category
        puts "Error: Unknown interface for category #{name} (#{category})"
        return
      end
      
      # If this is a category, then adding new ivars is not allowed: throw error.
      if category and ivar_list
        puts "Error: Cannot declare new intstance variables with categories #{name} (#{category})"
      end
      
      # If this is a normal class, and no superclass is defined, then default it
      # to NSObject... unless of course we are defining NSObject itself: in which
      # case, it doesn't need a superclass
      if category.nil? and super_class.nil?
        super_class = "NSObject" unless name == "NSObject"
      end
      
      # If interface is nil, this must not be a cateogry, so we must create a
      # new interface object, set its name and super_class, and then add it
      # to the array. Otherwise, we already have the interface, its name and
      # super_class, so we do not need to re-add it, or do anything special
      if interface.nil?
        interface = ObjectiveCInterface.new
        interface.name = name
        interface.super_class = super_class
        @interface_declarations << interface
      end
      
      interface.deal_with_ivar_list(ivar_list) unless ivar_list.nil?
      
      interface.deal_with_method_list(method_declarations) unless method_declarations.nil?
      
	  end
	    
    # Returns the interface object, by name, in its entirety. Method returns nil
    # if such an interface can not be found
	  def get_interface_by_name(name)
      # Simpy go through each interface, and return it if a match is found
	    @interface_declarations.each do |interface|
  	    return interface if interface.name == name
      end
      # return nil if not found...
      return nil
	  end
  end
  

  class ObjectiveCInterface
    attr_accessor :name, :super_class
    
    def initialize
      @name = nil
      @super_class = nil
      @ivars = []
      @class_methods = []
      @instance_methods = []
      @properties = []
    end
    
    # Over-rides to_s method to display class name and superclass, or just class
    # name if the class has no superclass (should just be NSObject...)
    def to_s
      @super_class ? "#{@name} : #{@super_class}" : "#{@name}"
    end
    
    # takes the parse tree of an ivar list, and adds each ivar to the object's
    # array of ivars. at the moment it is assumed that no ivars are private
    # public or protected, and just adds them in the same way. In future this
    # should really be chnaged to identify scope access to ivars
    def deal_with_ivar_list(ivars)
      return unless ivars
      # if the rest of the tree is valid....
      if ivars.value == ","
        deal_with_ivar_list(ivars.left)
        deal_with_ivar_list(ivars.right)
      elsif ivars.value == "i"
        new_ivar = ObjectiveCIvar.new
        new_ivar.type = ivars.left
        new_ivar.name = ivars.right
        @ivars << new_ivar
      end
    end
    
    # Takes the parse tree of method declarations and adds them to the object's
    # list. this also might find @property declarations, in which case these
    # should be dealt with and added to a sepreate list so dot syntax access
    # by other classes on instances of this class can be verified and checked
    # for validity.
    def deal_with_method_list(methods)
      return unless methods
      # If rest of tree is valid...
      if methods.value == ","
        deal_with_method_list(methods.left)
        deal_with_method_list(methods.right)
      elsif methods.value == "m"
        # puts "Found method"
      elsif methods.value == :AT_PROPERTY
        new_prop = ObjectiveCProperty.new
        new_prop.name = methods.right.right
        new_prop.type = methods.right.left
        @properties << new_prop
      else
        puts "unknown method declaration type"
      end
    end
    
  end
end