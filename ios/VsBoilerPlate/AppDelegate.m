#import "AppDelegate.h"
#import <ReactNativeNavigation/ReactNativeNavigation.h>

#import <Firebase.h>
#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <CodePush/CodePush.h>
#import <AppCenterReactNative.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

@import Bugsee;

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  NSDictionary * options = @{
    BugseeMaxRecordingTimeKey   : @60,
    BugseeShakeToReportKey      : BugseeTrue,
    BugseeScreenshotToReportKey : BugseeTrue,
    BugseeCrashReportKey        : BugseeTrue
  };
  
  [Bugsee launchWithToken:@"9d8d1117-beb0-4efe-8c8e-8ba4c339abf8" andOptions:options];
  [AppCenterReactNative register];
  [FIRApp configure]; 
  [ReactNativeNavigation bootstrapWithDelegate:self launchOptions:launchOptions];
  self.window.backgroundColor = [UIColor whiteColor];
  return YES;
}

- (NSArray<id<RCTBridgeModule>> *)extraModulesForBridge:(RCTBridge *)bridge {
  return [ReactNativeNavigation extraModulesForBridge:bridge];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [CodePush bundleURL];
     //  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
