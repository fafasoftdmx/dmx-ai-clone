###Permissions API Documentation
The permissions API is designed to enable a developer to request permissions for camera, location or microphone using one call.

The call will also handle the display of a DMX branded modal to prepare the user for the native permissions request. It will also handle when a user has denied the request for some reason by showing an Alert that leads directly to the settings page for the app where the user can then re-set their permissions

The `checkPermission` function takes a `type` which can be one of `camera`, `microphone`, or `location`. The function returns one of `authorized`, `denied`, `restricted`, or `undetermined`. Undetermined is the base state assuming the user has never given a specific permission to your app. Approved means that they have given the app permission and the other states, denied and restricted are negative cases. You can read more in the [react-native-permissions repo](https://github.com/yonahforst/react-native-permissions)

The `requestPermission` function takes a `type` which can be of any of the acceptable values listed above. The function returns true if the request was successful. If unsuccessful because of denial (and the type is camera) it shows an alert saying that the app will be un-usable without the permission. It then returns false. If an error happens at the react-native-permissions level the error is logged to the console.

####Resetting your permissions
If you are testing a permission related function, to reset your permissions, follow this path: `Settings > General > Reset > Reset Location & Privacy`
####To do's
- Should automatically resume action that was intended by the user's press rather than force them to press again after authorizing