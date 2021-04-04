import React from 'react';
import RouteSwitcher from './router';
import { globalStyles } from './App.style';
import { SkeletonTheme } from 'react-loading-skeleton';

const App = () => {
  return (
    <>
      { globalStyles }
      <SkeletonTheme color="#efefef" highlightColor="#ddd">
        <RouteSwitcher></RouteSwitcher>
      </SkeletonTheme>
    </>
  )
}

export default App;
