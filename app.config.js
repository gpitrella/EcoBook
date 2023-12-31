export default ({ config }) => ({
  ...config,
  "expo": {
    "name": "Book List",
    "slug": "book-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/LogoEco.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/LogoEco.png",
      "resizeMode": "contain",
      "backgroundColor": "#fff",
      "imageResizeMode": "cover", 
      "statusBar": {
        "style": "dark", 
        "backgroundColor": "#ffffff" 
      }
    },
    "backgroundColor": "#fff",
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.gpitrella.bookapp"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/LogoEco.png",
        "backgroundColor": "#ff6b6b"
      },
      "versionCode": 1,
      "package": "com.gpitrella.bookapp",
      "permissions": [
        "android.permission.RECORD_AUDIO"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png",
      "bundler": "metro"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ]
    ],
    "extra": {
      "eas": {
        "projectId": "733fb006-a12b-4da5-a82f-5f88c1e1a589"
      }
    }
  }
});
