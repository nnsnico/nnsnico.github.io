import React from 'react';
import { Router } from '@reach/router';
import Airkey from '../components/works/airkey/';
import NotFound from '../components/NotFound';

const Works: React.FC = () => {
  return (
    <Router>
      <Airkey path="/works/airkey" />
      <NotFound default />
    </Router>
  );
};

export default Works;
