# 
#  tools.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-10.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

require 'rake'

module Vienna
  
  class Tools
    
    attr_accessor :bob
    
    def initialize
      @bob = "hey"
    end
    
  end
  
end

Vienna.require_all_libs_relative_to(__FILE__)
