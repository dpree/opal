// 
//  NSTextField.m
//  vienna
//  
//  Created by Adam Beynon on 2009-05-22.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSTextField.h"

@implementation NSTextField

- (id)initWithCoder:(NSCoder *)aCoder
{
    [super initWithCoder:aCoder];
    
    if ([self isEditable])
    {
        _frame.origin.x = _frame.origin.x - 3;
        _frame.origin.y = _frame.origin.y - 3;
        _frame.size.width = _frame.size.width + 6;
        _frame.size.height = _frame.size.height + 6;
        [self setFrame:_frame];
    }
    
    return self;
}

- (void)observeValueForKeyPath:(NSString *)keyPath ofObject:(id)object change:(NSDictionary *)change context:(void *)context
{
    if (context == @"value")
    {
        [_cell setValue:[object valueForKeyPath:keyPath]];
        [self setNeedsDisplay:YES];
    }
    else if (context == @"hidden")
    {
        [_cell setHidden:[object valueForKey:keyPath]];
        [self setNeedsDisplay:YES];
    }
    else if (context == @"enabled")
    {
        [_cell setEnabled:[object valueForKey:keyPath]];
        [self setNeedsDisplay:YES];
    }
    else if (context == @"editable")
    {
        [_cell setEditable:[object valueForKey:keyPath]];
        [self setNeedsDisplay:YES];
    }
    else
    {
        [super observeValueForKeyPath:keyPath ofObject:object change:change context:context];
    }
}

-(BOOL)becomeFirstResponder
{
    [self selectText:nil];
    return YES;
}

- (BOOL)acceptsFirstResponder
{
    return YES;
}

- (void)selectText:(id)sender
{
    NSLog(@"oh yeah");
    if (![_cell isEnabled])
        return;
    
    if ([_cell isSelectable] || [_cell isEditable]) {
        if (!_currentEditor) {
            _currentEditor = [[self window] fieldEditor:YES forObject:self];
            _currentEditor = [_cell setUpFieldEditorAttributes:_currentEditor];
        }
        
        [_cell selectWithFrame:_bounds inView:self editor:_currentEditor delegate:self start:0 length:0];
    }
}

- (void)mouseDown:(NSEvent *)theEvent
{
    NSLog(@"hmm");
    if (![_cell isEnabled])
        return;
    
    if ([_cell isSelectable] || [_cell isEditable]) {
        
        if (!_currentEditor) {
            NSLog(@"first one");
            _currentEditor = [[self window] fieldEditor:YES forObject:self];
            NSLog(@"second one");
            _currentEditor = [_cell setUpFieldEditorAttributes:_currentEditor];
        }
        [_cell setHighlighted:YES];
        [_cell editWithFrame:_bounds inView:self editor:_currentEditor delegate:self event:theEvent];
    }
}

- (void)mouseUp:(NSEvent *)theEvent
{
    [_cell setHighlighted:NO];
    [self setNeedsDisplay:YES];
	if ([_cell action] && [_cell target])
        [[NSApplication sharedApplication] sendAction:[_cell action] to:[_cell target] from:self];
}

- (BOOL)drawsBackground {
    if (_cell)
        return [_cell drawsBackground];
}

- (void)setDrawsBackground:(BOOL)flag {
    if (_cell)
        [_cell setDrawsBackground:flag];
    
    [self setNeedsDisplay:YES];
}

- (void)setBezeled:(BOOL)flag
{
    [_cell setBezeled:flag];
    [self setNeedsDisplay:YES];
}

- (BOOL)isBezeled
{
    return [_cell isBezeled];
}

- (void)setBezelStyle:(NSTextFieldBezelStyle)style
{
    [_cell setBezelStyle:style];
    [self setNeedsDisplay:YES];
}

- (NSTextFieldBezelStyle)bezelStyle
{
    return [_cell bezelStyle];
}

// MARK: NSTextNotifications
- (void)textDidEndEditing:(NSNotification *)aNotification
{
    NSLog(@"first");
    [super textDidEndEditing:aNotification];
    NSLog(@"second");
    _currentEditor = nil;
    NSLog(@"third");
    [self lockFocus];
    NSLog(@"fourth");
    [_cell highlight:NO withFrame:_bounds inView:self];
    NSLog(@"fifth");
    [self unlockFocus];
}

@end
