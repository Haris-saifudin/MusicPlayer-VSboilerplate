// @flow

import React, {PureComponent} from 'react';
import {Provider} from 'react-redux';
import createStore from './index';
import PropTypes from 'prop-types';

let store;

class AppStoreProvider extends PureComponent {
  static childContextTypes = {
    store: PropTypes.shape({})
  };

  getChildContext() {
    return {
      store
    };
  }

  render() {
    const {children} = this.props;

    store = store || createStore();

    return <Provider store={store}>{children}</Provider>;
  }
}

export default AppStoreProvider;
