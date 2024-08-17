// src/AppRoutes.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loader from './component/loader';
import Summary from './component/Summary';

const Home = lazy(() => import('./component/Home'));
const SignIn = lazy(() => import('./component/Login'));
const SignUp = lazy(() => import('./component/signUp'));
const Instructions = lazy(() => import('./component/Instructions '));
const Quiz = lazy(() => import('./component/quiz'));
const Play = lazy(() => import('./component/play'));
const NotFound = lazy(() => import('./component/notfound'));

const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/instructions" element={<Instructions />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/play" element={<Play />} />
        <Route path="/Summary" element={<Summary />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
