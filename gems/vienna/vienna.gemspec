# -*- encoding: utf-8 -*-

$LOAD_PATH.unshift File.expand_path("../lib", __FILE__)
require "vienna/version"
 
Gem::Specification.new do |s|
  s.name        = "vienna"
  s.version     = Vienna::VERSION
  s.authors     = ["Adam Beynon"]
  s.email       = ["adam@adambeynon.com"]
  s.homepage    = "http://github.com/adambeynon/opal"
  s.summary     = "Vienna metagem"
  s.description = "Vienna metagem encapsulates all subprojects into one" 
  
  s.files       = Dir['lib/**/*.*'].concat Dir['bin/*']
  s.executables = ["vienna"]
end