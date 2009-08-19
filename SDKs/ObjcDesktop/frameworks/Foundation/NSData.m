// 
//  NSData.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSData.h"

@implementation NSData

- (NSUInteger)length
{
  
}

- (const void *)bytes
{
  return _bytes;
}

@end


@implementation NSData (NSExtendedData)

- (NSString *)description
{
  
}

- (void)getBytes:(void *)buffer
{
  
}

- (void)getBytes:(void *)buffer length:(NSUInteger)length
{
  
}

- (void)getBytes:(void *)buffer range:(NSRange)range
{
  
}

- (BOOL)isEqualToData:(NSData *)other
{
  
}

- (NSData *)subdataWithRange:(NSRange)range
{
  
}

- (BOOL)writeToFile:(NSString *)path atomically:(BOOL)useAuxiliaryFile
{
  
}

- (BOOL)writeToURL:(NSURL *)url atomically:(BOOL)atomically
{
  
}

- (BOOL)writeToFile:(NSString *)path options:(NSUInteger)writeOptionsMask error:(NSError **)errorPtr
{
  
}

- (BOOL)writeToURL:(NSURL *)url options:(NSUInteger)writeOptionsMask error:(NSError **)errorPtr
{
  
}

@end



@implementation NSData (NSDataCreation)

+ (id)data
{
  
}

+ (id)dataWithBytes:(const void *)bytes length:(NSUInteger)length
{
  
}

+ (id)dataWithBytesNoCopy:(void *)bytes length:(NSUInteger)length
{
  
}

+ (id)dataWithBytesNoCopy:(void *)bytes length:(NSUInteger)length freeWhenDone:(BOOL)b
{
  
}

+ (id)dataWithContentsOfFile:(NSString *)path options:(NSUInteger)readOptionsMask error:(NSError **)errorPtr
{
  
}

+ (id)dataWithContentsOfURL:(NSURL *)url options:(NSUInteger)readOptionsMask error:(NSError **)errorPtr
{
  
}

+ (id)dataWithContentsOfFile:(NSString *)path
{
  
}

+ (id)dataWithContentsOfURL:(NSURL *)url
{
  
}

// MARK: Added function for use with callback
+ (id)dataWithContentsOfURL:(NSURL *)url didLoadBlock:(void (^)(NSData *data))block
{
  // return [[NSData alloc] initWithContentsOfURL:url didLoadBlock:block];
  return CFDataCreateFromURL(url, block);
}

+ (id)dataWithContentsOfMappedFile:(NSString *)path
{
  
}

- (id)initWithBytes:(const void *)bytes length:(NSUInteger)length
{
  
}

- (id)initWithBytesNoCopy:(void *)bytes length:(NSUInteger)length
{
  
}

- (id)initWithBytesNoCopy:(void *)bytes length:(NSUInteger)length freeWhenDone:(BOOL)b
{
  
}

- (id)initWithContentsOfFile:(NSString *)path options:(NSUInteger)readOptionsMask error:(NSError **)errorPtr
{
  
}

- (id)initWithContentsOfURL:(NSURL *)url options:(NSUInteger)readOptionsMask error:(NSError **)errorPtr
{
  
}

- (id)initWithContentsOfFile:(NSString *)path
{
  
}

- (id)initWithContentsOfURL:(NSURL *)url
{
  
}

// MARK: Added function for use with callback
- (id)initWithContentsOfURL:(NSURL *)url didLoadBlock:(void (^)(NSData *data))block
{
  
}

- (id)initWithContentsOfMappedFile:(NSString *)path
{
  
}

- (id)initWithData:(NSData *)data
{
  
}

+ (id)dataWithData:(NSData *)data
{
  
}

@end


@implementation NSMutableData

- (void *)mutableBytes
{
  
}

- (void)setLength:(NSUInteger)length
{
  
}

@end


@implementation NSMutableData (NSExtendedMutableData)

- (void)appendBytes:(const void *)bytes length:(NSUInteger)length
{
  
}

- (void)appendData:(NSData *)other
{
  
}

- (void)increaseLengthBy:(NSUInteger)extraLength
{
  
}

- (void)replaceBytesInRange:(NSRange)range withBytes:(const void *)bytes
{
  
}

- (void)resetBytesInRange:(NSRange)range
{
  
}

- (void)setData:(NSData *)data
{
  
}

- (void)replaceBytesInRange:(NSRange)range withBytes:(const void *)replacementBytes length:(NSUInteger)replacementLength
{
  
}

@end


@implementation NSMutableData (NSMutableDataCreation)

+ (id)dataWithCapacity:(NSUInteger)aNumItems
{
  
}

+ (id)dataWithLength:(NSUInteger)length
{
  
}

- (id)initWithCapacity:(NSUInteger)capacity
{
  
}

- (id)initWithLength:(NSUInteger)length
{
  
}

@end
