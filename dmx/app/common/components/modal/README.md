###DMX Modal Component
The DMX Modal component is to be used for showing DMX-branded modal windows which slide up from the bottom and overlay the application.

To initialize the modal, you need to pass an object shaped like the following to the `content` property:


    const modalContent = {
       type: type,
       headerText: permissionsModalCopy.type[type].headerText,
       bodyText: permissionsModalCopy.type[type].bodyText,
       ctaText: permissionsModalCopy.type[type].ctaText,
       primaryBtnText: permissionsModalCopy.type[type].primaryBtnText,
       secondaryBtnText: permissionsModalCopy.type[type].secondaryBtnText,
       icon: permissionsModalCopy.type[type].icon,
       toView: generateToView(type),
       showModal: true
     };
     
`type` - Can be one of `camera`, `location`, or `microphone` 

`handlePressPrimary` - A function which is called when the primary button is pressed

`handlePressSecondary` - A function which is called when the secondary button is pressed

`animationType` - Standard modal animation values defined in the RN documentation. `slide` is the default.

`modalVisible` - A property to control whether the modal is visible or not. Changing to false should trigger the `onClose` function

`onClose` - A function to be called when the modal has closed

####To Do's
- Let developer pass a component into the modal rather than fixed text
- Fix onClose bug within RN
- Get icon assets for the permissions modal