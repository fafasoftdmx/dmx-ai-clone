#import "LoginTestCase.h"
#import "KIFUITestActor+EXAdditions.h"

@implementation LoginTests

- (void)beforeEach
{
  //[tester loginToApp];
}

- (void)afterEach
{
  //[tester returnToLoggedOutHomeScreen];
}

- (void)testSuccessfulLogin
{
  [tester enterText:@"fabricio.foruria@dmx.io" intoViewWithAccessibilityLabel:@"USERNAME"];
  [tester enterText:@"Dmx2016!" intoViewWithAccessibilityLabel:@"PASSWORD"];
  [tester tapViewWithAccessibilityLabel:@"LOGIN"];
  
  // Verify that the login succeeded
  [tester waitForTappableViewWithAccessibilityLabel:@"NEW APRAISAL"];
}

@end
