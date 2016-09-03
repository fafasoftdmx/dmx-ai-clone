import Permissions from 'react-native-permissions';
import { DeviceEventEmitter, Alert } from 'react-native';
import permissionsModalCopy from './../mocks/permissions-modal-copy.json';

const generateToView = function generateToView(type) {
  let toView;
  switch (type) {
    case 'camera':
      toView = 'vin-scan';
      break;
    case 'microphone':
      toView = 'record-audio';
      break;
    case 'location':
      toView = false;
      break;
    default:
      break;
  }
  return toView;
};

const showPermissionsAlert = function showPermissionsAlert(type, canShowSettings = false) {
  // type parameter is here in case we want to show different
  // reauthorization language for different permission request types
  if (canShowSettings) {
    Alert.alert(
      'Please Reauthorize',
      `You have deactivated the settings for this app
       please click OK to open your app settings and 
       reauthorize or Cancel to return home. 
       If you do not reauthorize you will not be 
       able to use DMX Ai`,
      [
        { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
        { text: 'OK', onPress: () => Permissions.openSettings() },
      ]
    );
  } else {
    Alert.alert(
      'Please Reauthorize',
      `You have deactivated the settings for this app. 
      Please go to Settings > Apps > DMX Ai > Permissions
       and activate the appropriate permission.`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('User has dismissed permissions alert'),
        },
      ]
    );
  }
};

const validatePermissionType = function validatePermissionType(type) {
  let typeIsValid = false;
  if (type === 'camera' || type === 'microphone' || type === 'location') {
    typeIsValid = true;
  }
  return typeIsValid;
};

const api = {
  checkPermission(type) {
    if (validatePermissionType(type)) {
      return Permissions.getPermissionStatus(type);
    }
    return false;
  },
  packagePermissionsModalContent(type) {
    const modalContent = {
      type,
      headerText: permissionsModalCopy.type[type].headerText,
      bodyText: permissionsModalCopy.type[type].bodyText,
      ctaText: permissionsModalCopy.type[type].ctaText,
      primaryBtnText: permissionsModalCopy.type[type].primaryBtnText,
      secondaryBtnText: permissionsModalCopy.type[type].secondaryBtnText,
      icon: permissionsModalCopy.type[type].icon,
      toView: generateToView(type),
      showModal: true,
    };
    return modalContent;
  },
  handleDeniedRequest(type) {
    Permissions.canOpenSettings()
      .then(response => {
        showPermissionsAlert(type, response);
      });
  },
  handleRestrictedRequest() {

  },
  requestPermission(type) {
    let permissionsRequestSuccess = false;
    console.log('requesting permission for type', type);
    DeviceEventEmitter.emit('dmx-showmodal', { showModal: false, onClose: generateToView(type) });
    Permissions.requestPermission(type)
      .then(response => {
        console.log('permission request response after the request', response);
        if (response !== 'authorized' && type === 'camera') {
          Alert.alert(
            'Please Authorize',
            'You will not be able to use this application until you authorize this permission',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () => console.log('User has dismissed permissions must authorize alert'),
              },
            ]
          );
          permissionsRequestSuccess = false;
        } else {
          permissionsRequestSuccess = true;
        }
        return permissionsRequestSuccess;
      })
      .catch((error) => {
        console.log('Permissions request error is', error);
      });
  },
};

export default api;
