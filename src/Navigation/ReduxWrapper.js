import React from 'react';
import AppStoreProvider from '../Redux/Provider';

export default function ReduxWrapper(Component) {
  return function inject(props) {
    const EnhancedComponent = () => (
      <AppStoreProvider>
        <Component {...props} />
      </AppStoreProvider>
    );

    return <EnhancedComponent />;
  };
}
