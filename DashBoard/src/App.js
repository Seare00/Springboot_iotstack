import Header from './components/Header'
import Navbar from './components/Navbar'
import VideoBackground from './components/VideoBackground'
import TempGraph from './components/TempGraph'

import React, { useRef } from "react";
import { Parallax, ParallaxLayer } from '@react-spring/parallax'

function App() {
  const parallaxRef = useRef();

  return (
    <div>
      <VideoBackground />
      <Parallax ref={parallaxRef} pages={4}>
        <ParallaxLayer offset={0} speed={1}>
          <Navbar parallaxRef={parallaxRef} />
          <Header optionHeader={"Temperature Data"} />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={0.5}>
          <Header optionHeader={"Uppsala"} />
          <div className="graph-background">
            <TempGraph selectOption="uppsala" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={2} speed={0.5}>
          <Header optionHeader={"Stockholm E"} />
          <div className="graph-background">
            <TempGraph selectOption="stockholm-e" />
          </div>
        </ParallaxLayer>
        <ParallaxLayer offset={3} speed={0.5}>
          <Header optionHeader={"Stockholm W"} />
          <div className="graph-background">
            <TempGraph selectOption="stockholm-w" />
          </div>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default App;
