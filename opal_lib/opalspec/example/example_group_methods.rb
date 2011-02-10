module Spec
  module Example
    module ExampleGroupMethods
      
      include Spec::Example::BeforeAndAfterHooks
      
      def describe group_name, &group_block
        subclass group_name, &group_block
      end
      
      def subclass group_name, &group_block
        #puts "in subclass"
        @class_count ||= 0
        `console.log("ssss")`
        #puts "1"
        klass = const_set "Subclass#{@class_count}", Class.new(self)
        #puts "2"
        #`console.log(klass)`
        klass.description = group_name
        #puts "3"
        Spec::Example::ExampleGroupFactory.register_example_group klass
        #puts "4"
        klass.module_eval(&group_block)
        klass
      end
      
      def example(example_name, &implementation)
        example_proxy = Spec::Example::ExampleProxy.new example_name
        example_proxies << example_proxy
        example_implementations[example_proxy] = implementation || pending_implementation
        example_proxy
      end
      
      alias_method :it, :example
      alias_method :specify, :example
      
      def description
        @description ||= "PLACEHOLDER DESCRIPTION"
      end
      
      def description=(description)
        @description = description
        self
      end
      
      def pending_implementation
        proc {
          raise Spec::Example::NotYetImplementedError.new
        }
      end
      
      def run(run_options)
        puts "aright, running"
        examples = examples_to_run run_options
        puts "notifying"
        notify run_options.reporter
        success = true
        before_all_instance_variables = nil
        
        run_before_all run_options
        puts "running"
        run_examples success, before_all_instance_variables, examples, run_options
        puts "finished run"
        run_after_all run_options
      end
      
      def run_examples(success, instance_variables, examples, run_options)
        puts "running examples"
        examples.each do |example|
          #puts "running example #{example}"
          #puts "example is #{example_implementations[example]}"
         # puts "it is"
          #`console.log(#{example_implementations[example]})`
          #puts "to_s is"
          #puts example_implementations[example].to_s
      
          #puts "ok, jere"
          puts(new example, &example_implementations[example])      
    

          example_group_instance = new example, 
                                       &example_implementations[example]
          #puts "executing.."
          example_group_instance.execute run_options, instance_variables
          #puts "done executing"
        end
      end
      
      def run_before_all(run_options)
        before_all_parts.each do |part|
          part.call
        end
      end
      
      def run_after_all(run_options)
        after_all_parts.each do |part|
          part.call
        end
      end
      
      def notify(reporter)
       reporter.example_group_started Spec::Example::ExampleGroupProxy.new(self)
      end
      
      def examples_to_run(run_options)
        example_proxies
      end
      
      def example_proxies
        @example_proxies ||= []
      end
      
      def example_implementations
        @example_implementations ||= {}
        @example_implementations
      end
      
      def example_group_hierarchy
        @example_group_hierarchy ||= Spec::Example::ExampleGroupHierarchy.new self
      end
    end
  end
end
