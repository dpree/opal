// 
//  CFURL.h
//  vienna
//  
//  Created by Adam Beynon on 2009-06-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <CoreFoundation/CFString.h>

typedef struct CFURL {
  CFStringRef *_url;
} *CFURLRef;