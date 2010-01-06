# 
# generate.rb
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

module Vienna
  
  class Tools

    def gen
      if ARGV.length < 2
        abort "Error: At least 2 arguments required for vn-gen"
      end
      
      g = ARGV[0]
      case g
      when "app"
        gen_app(ARGV)
      when "capp"
        gen_capp(ARGV)
      when "browser"
        gen_browser(ARGV)
      end
    end
    
    def gen_app(args)
      puts "need to generate app named #{args[1]}"
    end
    
    def gen_capp(args)
      unless `which capp`.length > 0
        abort "Cappuccino is not available on your system."
      end
      
      capp_name = args[1]
      capp_path = File.join(Dir.getwd, capp_name)
      if File.exist? capp_path
        abort "'#{capp_path}' already exists. Choose a different project name."
      end
      
      FileUtils.mkdir_p(File.join(Dir.getwd, capp_name))
      # puts "Generating Cappuccino frameworks. Might take a second..."
      # `capp gen #{capp_name} -f`
      
      
    end
    
    def gen_browser(args)
      # find_project!
      # puts "need to generate browser app named #{args[1]}"
      name = args[1]
      gen_dir = File.join(PATH, 'gen', 'browser')
      FileUtils.mkdir_p(name)
      Dir.chdir(name)
      find_project!
      
      @project.create_or_update_runtime
    end
    
    def show_help
      s = "Usage:"
      s << "  vn-gen [type] [app_name] [options]"
      s << "\n"
      puts s
    end
  end
end