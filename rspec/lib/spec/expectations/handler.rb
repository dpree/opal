
module Spec  
  module Expectations
    
    class PositiveExpectationHandler
      
      def self.handle_matcher(actual, matcher, message, &block)
        # Spec::Matchers.last_should = :should
        # Spec::Matchers.last_matcher = matcher
                
        # if matcher.nil?
          # return Spec::Matchers::PositiveOperatorMatcher.new actual
        # end 
      end
    end
    
    class NegativeExpectationHandler
      
      def self.handle_matcher(actual, matcher, message, &block)
        # puts "handling matcher..."
        Spec::Matchers.last_should = :should_not
        Spec::Matchers.last_matcher = matcher
        # puts "wow"
        if matcher.nil?
          # puts "how"
          return Spec::Matchers::NegativeOperatorMatcher.new actual
        end
        # puts "row"
      end
    end
    
  end
end