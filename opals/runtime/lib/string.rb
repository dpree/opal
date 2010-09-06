# 
#  string.rb
#  vienna
#  
#  Created by Adam Beynon on 2010-06-30.
#  Copyright 2010 Adam Beynon. All rights reserved.
# 

class String
  
  # def initialize(string="")
    # `#{self} = #{string};`
  # end
  
  def index(string)
    `var res = #{self}.indexOf(#{string});
    if (res != -1) {
      return res;
    }
    return #{nil};`
  end
  
  def include?(str)
    `var res = #{self}.indexOf(#{str});
    if (res != -1) {
      return #{true};
    }
    return #{false};`
  end
  
  def slice(start, finish)
    `return #{self}.substr(#{start}, #{finish});`
  end
  
  def == other
    `return (#{self} == #{other}) ? #{true} : #{false};`
  end
  
  def +(other)
    `return #{self} + #{other};`
  end
  
  def <<(string)
    # `#{self} += #{string.to_s};`
    self
  end
  
  def to_s
    self
  end
  
  def to_sym
    `return #{self}.Y(#{self});`
  end
  
  def inspect
    self
  end
  
  def length
    `return #{self}.length;`
  end
  
  def split(str)
    `return #{self}.split(#{str});`
  end
  
end