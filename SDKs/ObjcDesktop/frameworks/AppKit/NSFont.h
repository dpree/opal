// 
//  NSFont.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/NSObject.h>
#import <Foundation/NSString.h>
#import <AppKit/NSCell.h>

@class NSFontDescriptor, NSAffineTransform, NSGraphicsContext;

typedef unsigned int NSGlyph;

enum {
    NSControlGlyph  = 0x00FFFFFF,
    NSNullGlyph     = 0x0
};

extern const CGFloat *NSFontIdentityMatrix;

enum {
    NSNativeShortGlyphPacking = 5
};
typedef NSUInteger NSMultibyteGlyphPacking;

enum {
    NSFontDefaultRenderingMode                          = 0,
    NSFontAntialiasedRenderingMode                      = 1,
    NSFontIntegerAdvancementsRenderingMode              = 2,
    NSFontAntialiasedIntegerAdvancementsRenderingMode   = 3
};
typedef NSUInteger NSFontRenderingMode;


@interface NSFont : NSObject <NSCopying, NSCoding>
{
    NSString    *_name;
    CGFloat      _size;
}

+ (NSFont *)fontWithName:(NSString *)fontName size:(CGFloat)fontSize;
+ (NSFont *)fontWithName:(NSString *)fontName matrix:(const CGFloat *)fontMatrix;

+ (NSFont *)userFontOfSize:(CGFloat)fontSize;
+ (NSFont *)userFixedPitchFontOfSize:(CGFloat)fontSize;
+ (void)setUserFont:(NSFont *)aFont;
+ (void)setUserFixedPitchFont:(NSFont *)aFont;

+ (NSFont *)systemFontOfSize:(CGFloat)fontSize;
+ (NSFont *)boldSystemFontOfSize:(CGFloat)fontSize;
+ (NSFont *)labelFontOfSize:(CGFloat)fontSize;

+ (NSFont *)titleBarFontOfSize:(CGFloat)fontSize;
+ (NSFont *)menuFontOfSize:(CGFloat)fontSize;
+ (NSFont *)menuBarFontOfSize:(CGFloat)fontSize;
+ (NSFont *)messageFontOfSize:(CGFloat)fontSize;
+ (NSFont *)paletteFontOfSize:(CGFloat)fontSize;
+ (NSFont *)toolTipsFontOfSize:(CGFloat)fontSize;
+ (NSFont *)controlContentFontOfSize:(CGFloat)fontSize;

+ (CGFloat)systemFontSize;
+ (CGFloat)smallSystemFontSize;
+ (CGFloat)labelFontSize;

+ (CGFloat)systemFontSizeForControlSize:(NSControlSize)controlSize;

- (NSString *)fontName;
- (CGFloat)pointSize;
- (const CGFloat *)matrix;
- (NSString *)familyName;
- (NSString *)displayName;

- (void)set;
- (void)setInContext:(NSGraphicsContext *)graphicsContext;

@end