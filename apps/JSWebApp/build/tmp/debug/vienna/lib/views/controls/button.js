
Vienna.extend({ROUNDED_BEZEL:'rounded',REGULAR_SQUARE_BEZEL:'regular_square',THICK_SQUARE_BEZEL:'thick_square',THICKER_SQUARE_BEZEL:'thicker_square',DISCLOSURE_BEZEL:'disclosure',SHADOWLESS_SQUARE_BEZEL:'shadowless_square',CIRCULAR_BEZEL:'circular_bezel',TEXTURED_SQUARE_BEZEL:'textured_square',HELP_BUTTON_BEZEL:'help_button',SMALL_SQUARE_BEZEL:'small_square',TEXTURED_ROUNDED_BEZEL:'textured_rounded',ROUNDED_RECT_BEZEL:'rounded_rect',RECESSED_BEZEL:'recessed',ROUNDED_DISCLOSURE_BEZEL:'rounded_disclosure',MOMENTARY_LIGHT_BUTTON:0,PUSH_ON_PUSH_OFF_BUTTON:1,TOGGLE_BUTTON:2,SWITCH_BUTTON:3,RADIO_BUTTON:4,MOMENTARY_CHANGE_BUTTON:5,ON_OFF_BUTTON:6,MOMENTARY_PUSH_IN_BUTTON:7,Button:new Class(Vienna.Control,{defaultOptions:{bezel:'rounded'},initialize:function(){this.callSuper();console.log('Initing button!');}})});