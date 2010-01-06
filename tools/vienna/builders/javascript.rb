# 
# javascript.rb
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

Vienna.require_all_libs_relative_to(__FILE__)

module Vienna
  
  module Builder
  
  class Javascript
  
    attr_reader :requirements
  
    def initialize(source, dest, project)
      @source = source
      @destination = dest
      @project = project
      @requirements = []
      
      # puts "building:"
      # puts "from #{@source}"
      # puts "to #{@destination}"
    end
    
    # def link_config
    #   @link_config ||= { "dependencies" => [] }
    # end
    # 
    # def link_frameworks
    #   @link_frameworks ||= []
    # end
    
    def build!
      t = ""
      o = File.new(@destination, 'w')
      File.readlines(@source).map do |l|
        if match = l.match(/^require\(\'(.*)\'\)/) # ^ to make sure it is not commented out..
          # add the requirement to '@requirements' for the project to get at
          # @requirements << match[1]
          o.write(JSMin.minify(t))
          # o.write t
          t = "" # clear t so that we do not carry on minifying stuff before the require statement
          # require_path = @project.require_path_relative_to_file(@source, match[1])
          
          
          should = @project.file_requires_file(@source, match[1])
          # should is nil if we shouldnt 'require' the given file
          if should
            o.write "\nrequire('#{match[1]}');\n"
          end
          
          # if require_path
            # puts "require path #{require_path}"
            # build_path = @project.build_file(require_path)
            # o.write "\nVN.require('#{build_path}');\n"
          # else
            # "cannot require #{require_path}"
          # end
          # puts "\nVN.require('#{require_path}');\n"
        else
          t << l
        end
      end
    
      # write minified of the remaining content... if any
      o.write(JSMin.minify(t))
      # o.write t
      # o.write(t)
      o.close
    end
   
  end
  end
end


#--
# jsmin.rb - Ruby implementation of Douglas Crockford's JSMin.
#
# This is a port of jsmin.c, and is distributed under the same terms, which are
# as follows:
#
# Copyright (c) 2002 Douglas Crockford  (www.crockford.com)
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in all
# copies or substantial portions of the Software.
#
# The Software shall be used for Good, not Evil.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
#++
 
require 'strscan'
 
# = JSMin
#
# Ruby implementation of Douglas Crockford's JavaScript minifier, JSMin.
#
# *Author*::  Ryan Grove (mailto:ryan@wonko.com)
# *Version*::   1.0.1 (2008-11-10)
# *Copyright*:: Copyright (c) 2008 Ryan Grove. All rights reserved.
# *Website*::   http://github.com/rgrove/jsmin
#
# == Example
#
#   require 'rubygems'
#   require 'jsmin'
#
#   File.open('example.js', 'r') {|file| puts JSMin.minify(file) }
#
module JSMin
  CHR_APOS     = "'".freeze
  CHR_ASTERISK   = '*'.freeze
  CHR_BACKSLASH  = '\\'.freeze
  CHR_CR     = "\r".freeze
  CHR_FRONTSLASH = '/'.freeze
  CHR_LF     = "\n".freeze
  CHR_QUOTE    = '"'.freeze
  CHR_SPACE    = ' '.freeze
 
  if RUBY_VERSION >= '1.9'
  ORD_LF  = "\n".freeze
  ORD_SPACE = ' '.freeze
  ORD_TILDE = '~'.freeze
  else
  ORD_LF  = "\n"[0].freeze
  ORD_SPACE = ' '[0].freeze
  ORD_TILDE = '~'[0].freeze
  end
 
  class << self
 
  # Reads JavaScript from _input_ (which can be a String or an IO object) and
  # returns a String containing minified JS.
  def minify(input)
    @js = StringScanner.new(input.is_a?(IO) ? input.read : input.to_s)
 
    @a     = "\n"
    @b     = nil
    @lookahead = nil
    @output  = ''
 
    action_get
 
    while !@a.nil? do
    case @a
    when CHR_SPACE
      if alphanum?(@b)
      action_output
      else
      action_copy
      end
 
    when CHR_LF
      if @b == CHR_SPACE
      action_get
      elsif @b =~ /[{\[\(+-]/
      action_output
      else
      if alphanum?(@b)
        action_output
      else
        action_copy
      end
      end
 
    else
      if @b == CHR_SPACE
      if alphanum?(@a)
        action_output
      else
        action_get
      end
      elsif @b == CHR_LF
      if @a =~ /[}\]\)\\"+-]/
        action_output
      else
        if alphanum?(@a)
        action_output
        else
        action_get
        end
      end
      else
      action_output
      end
    end
    end
 
    @output
  end
 
  private
 
  # Corresponds to action(1) in jsmin.c.
  def action_output
    @output << @a
    action_copy
  end
 
  # Corresponds to action(2) in jsmin.c.
  def action_copy
    @a = @b
 
    if @a == CHR_APOS || @a == CHR_QUOTE
    loop do
      @output << @a
      @a = get
 
      break if @a == @b
 
      if @a[0] <= ORD_LF
      raise "JSMin parse error: unterminated string literal: #{@a}"
      end
 
      if @a == CHR_BACKSLASH
      @output << @a
      @a = get
 
      if @a[0] <= ORD_LF
        raise "JSMin parse error: unterminated string literal: #{@a}"
      end
      end
    end
    end
 
    action_get
  end
 
  # Corresponds to action(3) in jsmin.c.
  def action_get
    @b = nextchar
 
    if @b == CHR_FRONTSLASH && (@a == CHR_LF || @a =~ /[\(,=:\[!&|?{};]/)
    @output << @a
    @output << @b
 
    loop do
      @a = get
 
      if @a == CHR_FRONTSLASH
      break
      elsif @a == CHR_BACKSLASH
      @output << @a
      @a = get
      elsif @a[0] <= ORD_LF
      raise "JSMin parse error: unterminated regular expression " +
        "literal: #{@a}"
      end
 
      @output << @a
    end
 
    @b = nextchar
    end
  end
 
  # Returns true if +c+ is a letter, digit, underscore, dollar sign,
  # backslash, or non-ASCII character.
  def alphanum?(c)
    c.is_a?(String) && !c.empty? && (c[0] > ORD_TILDE || c =~ /[0-9a-z_$\\]/i)
  end
 
  # Returns the next character from the input. If the character is a control
  # character, it will be translated to a space or linefeed.
  def get
    c = @lookahead.nil? ? @js.getch : @lookahead
    @lookahead = nil
 
    return c if c.nil? || c == CHR_LF || c[0] >= ORD_SPACE
    return "\n" if c == CHR_CR
    return ' '
  end
 
  # Gets the next character, excluding comments.
  def nextchar
    c = get
    return c unless c == CHR_FRONTSLASH
 
    case peek
    when CHR_FRONTSLASH
    loop do
      c = get
      return c if c[0] <= ORD_LF
    end
 
    when CHR_ASTERISK
    get
    loop do
      case get
      when CHR_ASTERISK
      if peek == CHR_FRONTSLASH
        get
        return ' '
      end
 
      when nil
      raise 'JSMin parse error: unterminated comment'
      end
    end
 
    else
    return c
    end
  end
 
  # Gets the next character without getting it.
  def peek
    @lookahead = get
  end
  end
end