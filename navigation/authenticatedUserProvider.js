import React, { useState, createContext } from 'react';
import * as Keychain from 'react-native-keychain';

export const AuthenticatedUserContext = createContext({});

export const AuthenticatedUserProvider = ({ children }) => {
  const [user, setUser] = useState({
    authenticatedUser: null,
    accessToken: null,
    refreshToken: null,
  });

  return (
    <AuthenticatedUserContext.Provider value={{ user, setUser }}>
      {children}
    </AuthenticatedUserContext.Provider>
  );
};
