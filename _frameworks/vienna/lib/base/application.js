/* 
 * application.js
 * vienna
 * 
 * Created by Adam Beynon.
 * Copyright 2009 Adam Beynon.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

Vienna.extend({
  
  APP_DID_BECOME_ACTIVE: "VNApplicationDidBecomeActiveNotification",
  APP_DID_HIDE: "VNApplicationDidHideNotification",
  APP_DID_FINISH_LAUNCHING: "VNApplicationDidFinishLaunchingNotification",
  APP_DID_RESIGN_ACTIVE: "VNApplicationDidResignActiveNotification",
  APP_DID_UNHIDE: "VNApplicationDidUnhideNotification",
  APP_DID_UPDATE: "VNApplicationDidUpdateNotification",
  APP_WILL_BECOME_ACTIVE: "VNApplicationWillBecomeActiveNotification",
  APP_WILL_HIDE: "VNApplicationWillHideNotification",
  APP_WILL_FINISH_LAUNCHING: "VNApplicationWillFinishLaunchingNotification",
  APP_WILL_RESIGN_ACTIVE: "VNApplicationWillResignActiveNotification",
  APP_WILL_UNHIDE: "VNApplicationWillUnhideNotification",
  APP_WILL_UPDATE: "VNApplicationWillUpdateNotification",
  APP_WILL_TERMINATE: "VNApplicationWillTerminateNotification",
  APP_DID_CHANGE_SCREEN_PARAMETERS: "VNApplicationDidChangeScreenParametersNotification",
  
  /*
    Create the application delegate, set it, and run the app
    - This should be almost equivalent to NSApplicationMain();
  */
  AppDelegate: function(props) {    
    var obj = VN.Object.singleton(props);
    VN.App.setDelegate(obj);
    VN.App.run();
    return obj;
  },
  
  /**
    Main class for controlling application lifecycle
  */
  Application: new Class('Application', VN.Responder, {
    
    attrAccessor: ['windows', 'eventQueue', 'viewsNeedingDisplay'],
    attrReader: ['delegate'],
    
    initialize: function() {
      this.callSuper();
      this.$windows = [];
      this.$eventQueue = [];
      this.$viewsNeedingDisplay = [];
      return this;
    },
    
    run: function() {
      // attach all events, window resize.etc
      this.finishLaunching();
    },
    
    finishLaunching: function() {
      var nc = VN.NotificationCenter.defaultCenter();
      nc.postNotification(VN.APP_WILL_FINISH_LAUNCHING, this);
      nc.postNotification(VN.APP_DID_FINISH_LAUNCHING, this);
      this.displayRequiredViews();
    },
    
    /**
      Mark view for needing display on next run of event loop
      
      - {VN.View} view
      - {Boolean} flag
    */
    markViewForDisplay: function(view, flag) {
      if (this.$viewsNeedingDisplay.indexOf(view) == -1) {
        this.$viewsNeedingDisplay.push(view);
      }
    },
    
    /**
      Makes each 'dirty' view re-draw itself
    */
    displayRequiredViews: function() {
      var view;
      while (view = this.$viewsNeedingDisplay.pop()) {
        view.drawRect();
      }
    },
    
    /**
      Set app delegate
      
      - {Object} obj
    */
    setDelegate: function(obj) {
      if (this.$delegate == obj) return ;
      
      var nc = VN.NotificationCenter.defaultCenter();
      
      if (this.$delegate) {
        nc.removeObserver(this.$delegate, VN.APP_WILL_FINISH_LAUNCHING, this);
        nc.removeObserver(this.$delegate, VN.APP_DID_FINISH_LAUNCHING, this);
        nc.removeObserver(this.$delegate, VN.APP_DID_CHANGE_SCREEN_PARAMETERS, this);
      }
      
      this.$delegate = obj ;
      
      if (obj.respondsTo('willFinishLaunching')) {
        nc.addObserver(obj, 'willFinishLaunching', VN.APP_WILL_FINISH_LAUNCHING, this);
      }
      if (obj.respondsTo('didFinishLaunching')) {
        nc.addObserver(obj, 'didFinishLaunching', VN.APP_DID_FINISH_LAUNCHING, this);
      }
      if (obj.respondsTo('didChangeScreenParameters')) {
        nc.addObserver(obj, 'didChangeScreenParameters', VN.APP_DID_CHANGE_SCREEN_PARAMETERS, this);
      }
    },
    
    /**
      Add window
      
      - {VN.Window} win
    */
    addWindow: function(win) {
      var nc = VN.NotificationCenter.defaultCenter();
      nc.addObserver(win, 'didChangeScreenParameters', VN.APP_DID_CHANGE_SCREEN_PARAMETERS, this);
      
      this.$windows.push(win);
      
      return this.$windows.indexOf(win);
    },
    
    $sharedApplication: function() {
      if (!VN.App) {
        VN.App = new VN.Application();
      }
      return VN.App ;
    },
  }),
  
  ApplicationDelegate: VN.Object.protocol({
    
    shouldTerminate: function(sender) { },
    openFile: function(sender) { },
    openFiles: function(sender) { },
    shouldOpenUntitledFile: function(sender) { },
    openUntitledFile: function(sender) { },
    openFileWithoutUI: function(sender) { },
    
    shouldTerminateAfterLastWindowClosed: function(sender) { },
    shouldHanldeReopen: function(sender, visibleWindows) { },
    willPresentError: function(error) { },
    
    willFinishLaunching: function(notification) { },
    didFinishLaunching: function(notification) { },
    willHide: function(notification) { },
    didHide: function(notification) { },
    willUnhide: function(notification) { },
    didUnhide: function(notification) { },
    willBecomeActive: function(notification) { },
    didBecomeActive: function(notification) { },
    willResignActive: function(notification) { },
    didResignActive: function(notification) { },
    willUpdate: function(notification) { },
    didUpdate: function(notification) { },
    willTerminate: function(notification) { },
    didChangeScreenParameters: function(notification) { }
  })
});

VN.App = VN.Application.sharedApplication();
