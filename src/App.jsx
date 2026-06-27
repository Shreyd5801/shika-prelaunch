import Hero             from './components/Hero';
import TopNav           from './components/TopNav';
import Ticker           from './components/Ticker';
import FounderSection   from './components/FounderSection';
import WhatWeStandFor   from './components/WhatWeStandFor';
import InnerCircle      from './components/InnerCircle';
import SocialBanner     from './components/SocialBanner';
import SiteFooter       from './components/SiteFooter';
export default function App() {
  return (
    <>
      <TopNav />
      <Hero />
      <WhatWeStandFor />
      <FounderSection />
      <Ticker />
      <InnerCircle />
      <SocialBanner />
      <SiteFooter />
    </>
  );
}
