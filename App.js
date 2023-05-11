import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';

import {AuthenticatedUserProvider} from './navigation/authenticatedUserProvider';
import RootNavigator from './navigation/rootNavigator';

async function loadAppAplication() {
  await Font.loadAsync({
    'roboto': require('./assets/fonts/Roboto.ttf'),
  });
};

export default function App() {
  const [isReady, setIsReady] = useState(false);

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadAppAplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}/>
    )
  }

  return (
    <AuthenticatedUserProvider>
      <RootNavigator />
    </AuthenticatedUserProvider>
  );
};
