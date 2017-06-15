/*
 * Home
 * - Route: /
 *
 * @author: Jeff Lee
 * @createdAt: 2016/09/07
 */

import React from 'react';
import SlideShow from '../home/SlideShow';
import Steps from '../home/Steps';
import GetStarted from '../home/GetStarted';
import SignUpForm from '../home/SignUpForm';
import SeenOn from '../home/SeenOn';
import FeaturedCompanies from '../home/FeaturedCompanies';
import FeaturedProjects from '../home/FeaturedProjects';

function Home() {
  return (
    <div className="Home">
      <SlideShow />
      <Steps />
      <GetStarted />
      <SignUpForm />
      <FeaturedCompanies />
      <FeaturedProjects />
      <SeenOn />
    </div>
  );
}

export default Home;
