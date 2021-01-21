import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.indelpro.formas',
  appName: 'Indelpro Formas',
  webDir: '../../dist/apps/formas',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      androidScaleType: 'CENTER_CROP',
      backgroundColor: '#ffffff',
    },
  },
};

export default config;
