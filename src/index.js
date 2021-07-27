import React from 'react';
import ReactDOM from 'react-dom';

import Routes from './routes';

const Root = () => (
  <Routes />
);

ReactDOM.render(
    <Root/>,
    document.getElementById('root')
);