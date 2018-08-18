//
//  MyNativeAlert.m
//  UnicornApp
//
//  Created by Harrison Miller on 8/17/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

// MyNativeAlert.m
#import "MyNativeAlert.h"

@implementation MyNativeAlertManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(alert:(NSString *)title message:(NSString *)message)
{
  UIAlertView *alert = [[UIAlertView alloc] initWithTitle:[NSString title] message:[NSString message]  delegate:nil cancelButtonTitle:@"Ok" otherButtonTitles:nil];
  [alert show];
}

@end
