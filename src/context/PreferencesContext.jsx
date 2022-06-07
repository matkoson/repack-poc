import React from 'react';

export const PreferencesContext = React.createContext({
  setTheme: () => {},
  setIsThemeCustom: () => {},
  isThemeCustom: false,
});
