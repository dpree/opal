# 
#  build.rb
#  vienna
#  
#  Created by Adam Beynon on 2009-05-02.
#  Copyright 2009 Adam Beynon. All rights reserved.
# 

module Vienna
  
  class Tools
    
    def self.build
      # parser = ObjectiveCParser.new
      #       parser.tokenize_file "MyFile.m"
      #       parser.tokens.each do |first, second|
      #         #puts "[#{first}, #{second}]"
      #       end
      #       parser.parse
      #       puts parser.result
      # parser = ObjectiveCParser.new
      # parser.parse_file_to_output("MyFile.m", "MyFile.js")
      d = Dir.new(Dir.getwd)
      p = Project.new d
      p.build!
    end
    
  end
  
end