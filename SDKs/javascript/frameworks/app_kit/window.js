/* 
 * window.js
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

include('foundation/geometry');
include('app_kit/responder');
include('app_kit/graphics');
include('app_kit/text');
include('app_kit/application');
include('app_kit/gradient');

var NSBorderlessWindowMask              = 0;
var NSTitledWindowMask                  = 1 << 0;
var NSClosableWindowMask                = 1 << 1;
var NSMiniaturizableWindowMask          = 1 << 2;
var NSResizableWindowMask               = 1 << 3;
var NSTexturedBackgroundWindowMask      = 1 << 8;
var NSUnifiedTitleAndToolbarWindowMask  = 1 << 12;

var NSNormalWindowLevel                 = 10;
var NSFloatingWindowLevel               = 10;
var NSSubmenuWindowLevel                = 10;
var NSTornOffMenuWindowLevel            = 10;
var NSMainMenuWindowLevel               = 10;
var NSStatusWindowLevel                 = 10;
var NSModalPanelWindowLevel             = 10;
var NSPopUpMenuWindowLevel              = 10;
var NSScreenSaverWindowLevel            = 10;

var NSWindowCloseButton                 = 0;
var NSWindowMiniaturizeButton           = 1;
var NSWindowZoomButton                  = 2;
var NSWindowToolbarButton               = 3;
var NSWindowDocumentIconButton          = 4;

var NSWindowDidBecomeKeyNotification            = "NSWindowDidBecomeKeyNotification";
var NSWindowDidBecomeMainNotification           = "NSWindowDidBecomeMainNotification";
var NSWindowDidChangeScreenNotification         = "NSWindowDidChangeScreenNotification";
var NSWindowDidDeminiaturizeNotification        = "NSWindowDidDeminiaturizeNotification";
var NSWindowDidExposeNotification               = "NSWindowDidExposeNotification";
var NSWindowDidMiniaturizeNotification          = "NSWindowDidMiniaturizeNotification";
var NSWindowDidMoveNotification                 = "NSWindowDidMoveNotification";
var NSWindowDidResignKeyNotification            = "NSWindowDidResignKeyNotification";
var NSWindowDidResignMainNotification           = "NSWindowDidResignMainNotification";
var NSWindowDidResizeNotification               = "NSWindowDidResizeNotification";
var NSWindowDidUpdateNotification               = "NSWindowDidUpdateNotification";
var NSWindowWillCloseNotification               = "NSWindowWillCloseNotification";
var NSWindowWillMiniaturizeNotification         = "NSWindowWillMiniaturizeNotification";
var NSWindowWillMoveNotification                = "NSWindowWillMoveNotification";
var NSWindowWillBeginSheetNotification          = "NSWindowWillBeginSheetNotification";
var NSWindowDidEndSheetNotification             = "NSWindowDidEndSheetNotification";
var NSWindowDidChangeScreenProfileNotification  = "NSWindowDidChangeScreenProfileNotification";


var NSWindow = NSResponder.extend({
    
    _contentRectOrigin: null,
    _contentRectSize: null,

    _isVisible: false,

    _hasShadow: true,
    _hidesOnDeactivate: false,
    _releasedWhenClosed: true,
    _styleMask: 0,
    _title: "Window",
    _visibleAtLaunch: true,
    _resizable: true,

    _showNormalTitlebar: true,
    _unifiedTitleAndToolbar: false,

    _toolbar: null,

    _contentView: null,

    _delegate: null,
    _windowNumber: -1,

    _frame: null,
    _bounds: null,
    _visible: false,

    _level: 0,
    _keyWindow: false,
    _mainWindow: false,
    _firstResponder: null,

    _movableByWindowBackground: true,

    _eventBindingCurrentX: null,
    _eventBindingCurrentY: null,

    _windowCloseButton: null,
    _fieldEditor: null,

    _maxSize: null,
    _minSize: null,
    _wtFlags: 0,
    _windowClass: null,


    _DOMContainer: null,         // Usually an "outer div" to hold the graphics context aswell as subviews' containers
    _DOMGraphicsContext: null,   // Rendering context: usually a canvas (exceptions for DOM rendering and VML)
    _graphicsContext: null,      // a cache of the actual graphics context (from canvas, or VML representation).
    
    DOMContainer: function() {
        return this._DOMContainer;
    },
    
    contentRectForFrameRect: function(frameRect) {
        return CGRectMake(0, 0, frameRect.size.width, frameRect.size.height);
    },
    
    frameRectForContentRect: function(contentRect) {
        
        return contentRect;
    },
    
    init: function() {
        this._super();
        return this;
    },
    
    initWithContentRectAndStyleMask: function(contentRect, aStyle) {
        this.init();
                
        // DOM etc
        this._DOMContainer = document.createElement('div');
        this._DOMGraphicsContext = document.createElement('canvas');
        this._DOMContainer.appendChild(this._DOMGraphicsContext);
        document.body.appendChild(this._DOMContainer);
        
        this._DOMContainer.style.display = "block";
        this._DOMContainer.style.position = "absolute";
        
        this._DOMGraphicsContext.style.display = "block";
        this._DOMGraphicsContext.style.position = "absolute";
        
        this._windowNumber = NSApplication.sharedApplication().addWindow(this);
        this._styleMask = aStyle;
        this._level = NSNormalWindowLevel;
        
        this._minSize = NSMakeSize(0.0, 0.0);
        this._maxSize = NSMakeSize(9999.0, 9999.0);
        this._frame = this.frameRectForContentRect(contentRect);
        this._firstResponder = this;
        
        this.setContentView(NSView.create('initWithFrame', contentRect));
        this.setNextResponder(NSApplication.sharedApplication());
        this.setFrame(this.frameRectForContentRect(contentRect), false);
        this.setNeedsDisplay(true);
        
        return this;
    },
    
    mouseDown: function(theEvent) {
        this.makeMainWindow();
    },

    title: function() {
        return this._title;
    },
    
    setTitle: function(aString) {
        this._title = aString;
        this.setNeedsDisplay(true);
    },
    
    setRepresentedURL: function(url) {
        
    },
    
    representedURL: function() {
        
    },
    
    representedFilename: function() {
        
    },
    
    setRepresentedFilename: function(aString) {
        
    },
    
    isExcludedFromWindowsMenu: function() {
        return false;
    },
    
    setContentView: function(aView) {
        if (this._contentView)
            this._contentView.removeFromSuperview();
    
        this._contentView = aView;
        
        aView.viewWillMoveToSuperview(null);
        aView.viewWillMoveToWindow(this);
        aView.setFrame(this.contentRectForFrameRect(this.frame()));
        aView.viewDidMoveToSuperview();
        aView.viewDidMoveToWindow();
        aView.setNextResponder(this);
        this._DOMContainer.appendChild(aView._DOMContainer);
    },
    
    contentView: function() {
        return this._contentView;
    },
    
    setDelegate: function(anObject) {
        this._delegate = anObject;
    },
    
    delegate: function() {
        return this._delegate;
    },
    
    windowNumber: function() {
        return this._windowNumber;
    },
    
    fieldEditorForObject: function(createFlag, anObject) {
        if (!this._fieldEditor) {
            this._fieldEditor = NSTextView.create('initWithFrame', NSMakeRect(0, 0, 0, 0));
            this._fieldEditor.viewWillMoveToWindow(this);
            return this._fieldEditor;
        }
        else {
            if (this._fieldEditor.resignFirstResponder())
                return this._fieldEditor;
            
            this._fieldEditor = NSTextView.create('initWithFrame', NSMakeRect(0, 0, 0, 0));        
            this._fieldEditor.viewWillMoveToWindow(this);
            return this._fieldEditor;
        }
    },
    
    endEditingFor: function(anObject) {
        this._fieldEditor.removeFromSuperview();
        this._fieldEditor.setString("");
    },
    
    setFrame: function(frameRect, flag, animate) {
        this._frame = frameRect;
        CGDOMElementSetFrame(this._DOMContainer, this._frame);
        CGDOMElementSetFrame(this._DOMGraphicsContext, this.bounds());
        this.setNeedsDisplay(true);
    },
    
    setContentSize: function(aSize) {
        
    },
    
    setFrameOrigin: function(aPoint) {
        
    },
    
    frame: function() {
        return this._frame;
    },
    
    bounds: function() {
        return NSMakeRect(0, 0, this._frame.size.width, this._frame.size.height);
    },
    
    animationResizeTime: function(newFrame) {
        
    },

    setShowsResizeIndicator: function(show) {
        
    },
    
    showsResizeIndication: function() {
        
    },
    
    setResizeIncrements: function(increments) {
        
    },
    
    reszieIncrements: function() {
        
    },
    
    setAspectRatio: function(ratio) {
        
    },
    
    aspectRatio: function() {
        
    },
    
    useOptimizedDrawing: function(flag) {
        
    },
    
    setViewsNeedDisplay: function(flag) {
        
    },
    
    viewsNeedDisplay: function() {
        
    },
    
    displayIfNeeded: function() {
        
    },
    
    display: function() {
        
    },
    
    setAutodisplay: function(flag) {
        
    },
    
    isAutodisplay: function() {
        
    },
    
    preservesContentDuringLiveResize: function() {
        
    },
    
    setPreservesContentDuringLiveResize: function(flag) {
        
    },
    
    update: function() {
        
    },
    
    makeFirstResponder: function(aResponder) {
        
    },
    
    firstResponder: function() {
        
    },
    
    resizeFlags: function() {
        
    },
    
    keyDown: function(theEvent) {
        
    },
    
    close: function() {
        
    },
    
    setReleasedWhenClosed: function(flag) {
        
    },
    
    isReleasedWhenClosed: function() {
        
    },
    
    miniaturize: function(sender) {
        
    },
    
    deminiaturize: function(sender) {
        
    },
    
    isZoomed: function() {
        
    },
    
    zoom: function(sender) {
        
    },
    
    isMiniaturized: function() {
        
    },
    
    tryToPerform: function(anAction, anObject) {
        
    },
    
    setBackgroundColor: function(color) {
        
    },
    
    backgroundColor: function() {
        
    },
    
    setContentBorderThicknessForEdge: function(thicknedd, edge) {
        
    },
    
    contentBorderThickneddForEdge: function(edge) {
        
    },
    
    setMovableByWindowBackground: function(flag) {
        
    },
    
    isMovableByWindowBackground: function() {
        
    },
    
    setHidesOnDeactivate: function(flag) {
        
    },
    
    hidesOnDeactivate: function() {
        
    },
    
    center: function() {
        
    },
    
    makeKeyAndOrderFront: function(sender) {
        
    },
    
    orderFront: function(sender) {
        
    },
    
    orderBack: function(sender) {
        
    },
    
    orderOut: function(sender) {
        
    },
    
    orderWindowRelativeTo: function(place, otherWin) {
        
    },
    
    orderFrontRegardless: function() {
        
    },
    
    setMiniwindowImage: function(image) {
        
    },
    
    setMiniwindowTitle: function(title) {
        
    },
    
    miniwindowImage: function() {
        
    },
    
    miniwindowTitle: function() {
        
    },
    
    setDocumentEdited: function(flag) {
        
    },
    
    isDocumentEdited: function() {
        
    },
    
    isVisible: function() {
        
    },
    
    isKeyWindow: function() {
        
    },
    
    isMainWindow: function() {
        
    },
    
    canBecomeKeyWindow: function() {
        
    },
    
    canBecomeMainWindow: function() {
        
    },
    
    makeKeyWindow: function() {
        
    },
    
    makeMainWindow: function() {
        
    },
    
    becomeKeyWindow: function() {
        
    },
    
    becomeMainWindow: function() {
        
    },
    
    resignKeyWindow: function() {
        
    },
    
    resignMainWindow: function() {
        
    },
    
    worksWhenModal: function() {
        return false;
    },
    
    convertBaseToScreen: function(aPoint) {
        
    },
    
    convertScreenToBase: function(aPoint) {
        return {
            x: aPoint.x - this._frame.origin.x,
            y: aPoint.y - this._frame.origin.y
        };
    },
    
    performClose: function(sender) {
        
    },
    
    performMiniaturize: function(sender) {
        
    },
    
    performZoom: function(sender) {
        
    },
    
    setOneShot: function(flag) {
        
    },
    
    isOneShot: function() {
        
    },
    
    disableCursorRects: function() {
        
    },
    
    enableCursorRects: function() {
        
    },
    
    discardCursorRects: function() {
        
    },
    
    areCursorRectsEnabled: function() {
        
    },
    
    invalidateCursorRectsForView: function(aView) {
        
    },
    
    resetCursorRects: function() {
        
    },
    
    setLevel: function(newLevel) {
        
    },
    
    level: function() {
        
    },
    
    screen: function() {
        
    },
    
    setHasShadow: function(hasShadow) {
        
    },
    
    hasShadow: function() {
        
    },
    
    invalidateShadow: function() {
        
    },
    
    setAlphaValue: function(windowAlpha) {
        
    },
    
    alphaValue: function() {
        
    },
    
    setOpaque: function(isOpaque) {
        
    },
    
    isOpaque: function() {
        
    },
    
    cacheImageInRect: function(aRect) {
        
    },
    
    restoreCachedImage: function() {
        
    },
    
    discardCachedImage: function() {
    
    },
    
    minSize: function() {
        
    },
    
    maxSize: function() {
        
    },
    
    setMinSize: function(size) {
        
    },
    
    setMaxSize: function(size) {
        
    },
    
    postEvent: function(theEvent, flag) {
        
    },
    
    currentEvent: function() {
        
    },
    
    setAcceptsMouseMovedEvents: function(flag) {
        
    },
    
    acceptsMouseMovedEvents: function() {
        
    },
    
    setIgnoresMouseEvents: function(flag) {
        
    },
    
    ignoresMouseEvents: function() {
        
    },
    
    sendEvent: function(theEvent) {
        var hitTest, aPoint = theEvent.locationInWindow();
        
        switch (theEvent.type()) {
            case NSLeftMouseDown:
                hitTest = this._contentView.hitTest(aPoint);
                if (hitTest) {
                    hitTest.mouseDown(theEvent);
                    // console.log(hitTest);
                }
                else {
                    console.log('Sending mouse down to (else)');
                }
                break;
            case NSLeftMouseUp:
                console.log('mouse up;');
                break;
        }
    },
    
    mouseLocationOutsideOfEventStream: function() {
        
    },
    
    windowController: function() {
        
    },
    
    setWindowController: function(windowController) {
        
    },
    
    isSheet: function() {
        
    },
    
    attatchedSheet: function() {
        
    },
    
    addChildWindow: function(childWin, place) {
        
    },
    
    removeChildWindow: function(childWin) {
        
    },
    
    childWindows: function() {
        
    },
    
    parentWindow: function() {
        
    },
    
    setParentWindow: function(window) {
        
    },
    
    graphicsContext: function() {
        return this._DOMGraphicsContext.getContext('2d');
    },

    setInitialFirstResponder: function(view) {
        
    },
    
    initialFirstResponder: function() {
        
    },
    
    selectNextKeyView: function(sender) {
        
    },
    
    selectPreviousKeyView: function(sender) {
        
    },
    
    selectKeyViewFollowingView: function(aView) {
        
    },
    
    selectKeyViewPrecedingView: function(aView) {
        
    },
    
    keyViewSelectionDirection: function() {
        
    },
    
    setDefaultButtonCell: function(defButt) {
	
	},
	
	defautButtonCell: function() {
		
	},
	
	recalculateKeyViewLoop: function() {
		
	},
	
	setToolbar: function(toolbar) {
		
	},
	
	toolbar: function() {
		
	},
	
	toggleToolbarShown: function(sender) {
		
	},
	
	runToolbarCustomizationPalette: function(sender) {
		
	},
	
	setShowsToolbarButton: function(show) {
		
	},
	
	showsToolbarButton: function() {
		
	},
	
	dragImage: function(anImage, baseLocation, initialOffset, theEvent, pboard, sourceObj, slideFlag) {
		
	},
	
	registerForDraggedTypes: function(newTypes) {
		
	},
	
	unregisterDraggedTypes: function() {
		
	},
	
	canDraw: function() {
		
	},
	
	setNeedsDisplay: function(flag) {
		if (flag)
            this.setNeedsDisplayInRect(this.bounds());
	},
	
	setNeedsDisplayInRect: function(invalidRect) {
		this.displayRect(invalidRect);
	},
	
	needsDisplay: function() {
		
	},
	
	lockFocus: function() {
		if (!this._graphicsContext)
			this._graphicsContext = NSGraphicsContext.graphicsContextWithGraphicsPort(this._DOMGraphicsContext.getContext('2d'), false);
		
		NSGraphicsContext.setCurrentContext(this._graphicsContext);
		CGContextSaveGState(this._graphicsContext.graphicsPort());
	},
	
	unlockFocus: function() {
		CGContextRestoreGState(this._graphicsContext.graphicsPort());
		NSGraphicsContext.setCurrentContext(null);
	},
	
	lockFocusIfCanDraw: function() {
		
	},
	
	lockFocusIfCanDrawInContext: function(context) {
		
	},
	
	display: function() {
		this.displayRect(this.bounds());
	},
	
	displayIfNeeded: function() {
		if (this.needsDisplay())
			this.displayRect(this.bounds());
	},
	
	displayIfNeededIgnoringOpacity: function() {
		
	},
	
	displayRect: function(rect) {
		this.displayRectIgnoringOpacityInContext(rect, null);
	},
	
	displayIfNeededInRect: function(rect) {
		if (this.needsDisplay())
			this.displayRect(this.bounds());
	},

    drawRect: function(rect) {
		var c = NSGraphicsContext.currentContext().graphicsPort();
		CGContextClearRect(c, rect);
		CGContextSaveGState(c);
		console.log('drawing window');
		CGContextSetFillColor(c, [0.944, 0.944, 0.944, 1.0]);
		CGContextFillRect(c, rect);
	},
	
	displayRectIgnoringOpacityInContext: function(aRect, context) {
		this.lockFocus();
		this.drawRect(aRect);
		this.unlockFocus();
	},

    bitmapImageRepForCachingDisplayInRect: function(aRect) {
	
	},
	
	cacheDisplayInRectToBitmapImageRep: function(aRect, bitmapImageRep) {
		
	}
});
