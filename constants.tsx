
import { DeviceBrand, DeviceInstruction, AppInfo } from './types';

export const DEVICE_INSTRUCTIONS: Record<DeviceBrand, DeviceInstruction> = {
  [DeviceBrand.SAMSUNG]: {
    brand: DeviceBrand.SAMSUNG,
    steps: [
      'Tap the "Settings" app (looks like a gear).',
      'Tap "Connections".',
      'Tap "More connection settings" at the bottom.',
      'Tap "Private DNS".',
      'Select "Private DNS provider hostname".',
      'Type: dns.adguard.com',
      'Tap "Save".'
    ],
    note: "This stops most ads from showing up in your games and websites.",
    safeModeSteps: {
      enter: [
        'Hold the "Power" button on the side of your phone until the power menu appears on the screen.',
        'Press and hold your finger on the "Power off" icon on the screen for 2 seconds.',
        'Tap the "Safe mode" icon that appears.'
      ],
      uninstall: [
        'Once the phone restarts, you will see "Safe mode" written in the bottom corner.',
        'Go to "Settings" > "Apps".',
        'Find the app that is causing trouble and tap "Uninstall".'
      ],
      exit: [
        'Simply restart your phone normally to go back to regular mode.'
      ]
    }
  },
  [DeviceBrand.MOTOROLA]: {
    brand: DeviceBrand.MOTOROLA,
    steps: [
      'Open your "Settings" app.',
      'Tap "Network & internet".',
      'Tap "Advanced".',
      'Tap "Private DNS".',
      'Select "Private DNS provider hostname".',
      'Type: dns.adguard.com',
      'Tap "Save".'
    ],
    safeModeSteps: {
      enter: [
        'Hold the "Power" button until the "Power off" option appears on the screen.',
        'Press and hold your finger on the "Power off" option on the screen.',
        'Tap "OK" when asked to reboot to Safe Mode.'
      ],
      uninstall: [
        'Wait for the phone to restart. You will see "Safe mode" at the bottom.',
        'Go to "Settings" > "Apps & notifications" > "See all apps".',
        'Find the bad app and tap "Uninstall".'
      ],
      exit: [
        'Restart your phone normally.'
      ]
    }
  },
  [DeviceBrand.PIXEL]: {
    brand: DeviceBrand.PIXEL,
    steps: [
      'Open "Settings".',
      'Tap "Network & internet".',
      'Tap "Private DNS" (you may need to scroll down).',
      'Select "Private DNS provider hostname".',
      'Type: dns.adguard.com',
      'Tap "Save".'
    ],
    safeModeSteps: {
      enter: [
        'Hold the "Power" button until the menu appears.',
        'Press and hold your finger on "Power off" or "Restart" on the screen.',
        'Tap "OK" to enter Safe Mode.'
      ],
      uninstall: [
        'Look for "Safe mode" at the bottom of your screen after it restarts.',
        'Go to "Settings" > "Apps" > "See all apps".',
        'Find the malicious app and tap "Uninstall".'
      ],
      exit: [
        'Restart your phone normally.'
      ]
    }
  },
  [DeviceBrand.REVVL]: {
    brand: DeviceBrand.REVVL,
    steps: [
      'Open "Settings".',
      'Tap "Network & internet".',
      'Tap "Advanced" or "Private DNS".',
      'Select "Private DNS provider hostname".',
      'Type: dns.adguard.com',
      'Tap "Save".'
    ],
    safeModeSteps: {
      enter: [
        'Hold the "Power" button until the power menu appears.',
        'Press and hold "Power off" on the screen.',
        'Tap "OK" to restart in Safe Mode.'
      ],
      uninstall: [
        'Wait for the restart. "Safe mode" will be visible at the bottom.',
        'Go to "Settings" > "Apps" > "See all apps".',
        'Find the app causing ads and tap "Uninstall".'
      ],
      exit: [
        'Restart your phone normally.'
      ]
    }
  }
};

export const GENERAL_SAFE_MODE = {
  enter: [
    'Hold the "Power" button until the power menu appears.',
    'Press and hold "Power off" on the screen for 2 seconds.',
    'Tap "OK" or "Safe Mode" to restart.'
  ],
  uninstall: [
    'Wait for restart. "Safe mode" should be in the bottom corner.',
    'Go to "Settings" > "Apps".',
    'Find the app you want to remove and tap "Uninstall".'
  ],
  exit: [
    'Restart your phone normally.'
  ]
};
