# -*- encoding: utf-8 -*-
 
Gem::Specification.new do |s|
  s.name          = "opalspec"
  s.version       = "0.1.0"
  s.authors       = ["Adam Beynon"]
  s.email         = ["adam@adambeynon.com"]
  s.homepage      = "http://github.com/adambeynon/opal"
  s.summary       = "Opalspec gem"
  s.description   = "Minimal Rspec clone for basic lib testing in opal" 
  
  s.files         = Dir['lib/**/*.*']
  s.test_files    = Dir['spec/**/*.rb']
  s.require_path  = 'lib'
  s.executables   = []
end
