//
//  MyNativeAlert.m
//  UnicornApp
//
//  Created by Harrison Miller on 8/17/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

// MyNativeAlert.m
#import <Foundation/Foundation.h>
#import "MyNativeAlert.h"

@implementation MyNativeAlertManager

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(alert:(NSString *)title message:(NSString *)message)
{
  UIAlertController* alert = [UIAlertController alertControllerWithTitle:title
                                                                 message:message
                                                          preferredStyle:UIAlertControllerStyleAlert];
  
  UIAlertAction* defaultAction = [UIAlertAction actionWithTitle:@"OK" style:UIAlertActionStyleDefault
                                                        handler:^(UIAlertAction * action) {}];
  
  [alert addAction:defaultAction];
  [self presentViewController:alert animated:NO completion:nil];
}

@end
