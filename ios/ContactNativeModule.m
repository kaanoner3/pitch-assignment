//
//  ContactNativeModule.m
//  pitch
//
//  Created by mac on 19.08.2022.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"


@interface RCT_EXTERN_MODULE(ContactNativeModule, NSObject)
RCT_EXTERN_METHOD(getContacts:(RCTPromiseResolveBlock)resolve reject:(RCTPromiseRejectBlock)reject)


@end
