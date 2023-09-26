import skybg from './skybg.mp4';
import menu from './menu-button.png';
import github from './github.png'

import React, { useEffect, useState, useRef } from "react";
import axios from 'axios';
import { Parallax, ParallaxLayer } from '@react-spring/parallax';
import { Link, Element } from 'react-scroll';
import Chart from 'chart.js/auto';

const Header = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className={`fade-in ${visible ? 'visible' : ''}`}>
      <div className="header-title">
        <h1>Temperature Data</h1>
      </div>
    </header>
  );
};

const VideoBackground = () => {
  return (
    <div className="video-background">
      <video autoPlay loop muted>
        <source src={skybg} type="video/mp4" />
      </video>
    </div>
  );
};

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <nav className={`navbar ${dropdownVisible ? 'show-dropdown' : ''}`}>
      <div className="menu-icon" onClick={toggleDropdown}>
        <img src={menu} alt="Menu" style={{ width: '50px', height: '50px'}} />
      </div>
      {dropdownVisible && (
        <ul className="dropdown-menu">
          <li className="list-item">
            <Link to="uppsala" smooth={true} duration={500}>
              Uppsala
            </Link>
          </li>
          <li className="list-item">
            <Link to="stockholm-e" smooth={true} duration={500}>
              Stockholm E
            </Link>
          </li>
          <li className="list-item">
            <Link to="stockholm-w" smooth={true} duration={500}>
              Stockholm W
            </Link>
          </li>
        </ul>
      )}
      <div className="right-menu">
        <a href="https://github.com/Kkabylion/Gruppuppgift" target="_blank" rel="noopener noreferrer">
          <img src={github} alt="Github" style={{ width: '30px', height: '30px'}} />
        </a>
      </div>
    </nav>
  );
};

const TempGraph = ({ selectOption }) => {
  const [backendData, setBackendData] = useState([]);
  const chartContainerRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    fetchData(selectOption);
  }, [selectOption]);

  useEffect(() => {
    if (backendData.length > 0 && chartContainerRef.current) {
      const ctx = chartContainerRef.current.getContext('2d');

      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }

      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: backendData.map((dataPoint, index) => index + 1),
          datasets: [
            {
              label: 'Temperature (°C)',
              data: backendData.map((dataPoint) => dataPoint.temp),
              fill: true,
              borderColor: 'rgb(255, 255, 255)',
              BackgroundColor: 'rgba(0,0,255,0.3)',
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              type: 'linear',
              grid: {
                color: 'rgba(255,255,255,0.3)'
              },
              ticks: {
                color: 'rgba(255,255,255,0.3)',
              }
            },
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(255,255,255,0.3)'
              },
              ticks: {
                color: 'rgba(255,255,255,0.3)',
              }
            },
          },
        },
      });

      chartInstanceRef.current = newChartInstance;
    }
  }, [backendData]);

  const fetchData = (selectOption) => {
    axios.get(`http://localhost:8080/${selectOption}`)
    .then((response) => {
      console.log(response.data);
      setBackendData(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  return (
    <div className="graph">
      <canvas ref={chartContainerRef}></canvas>
    </div>
  );
};

function App() {

  return (
    <div>
      <VideoBackground />
      <Parallax pages={4}>
        <ParallaxLayer offset={0} speed={1}>
          <Navbar />
          <Header />
        </ParallaxLayer>

        <ParallaxLayer offset={1} speed={0.5}>
          <Element name="uppsala">
            <div className="graph-background">
              <TempGraph selectOption="uppsala" />
            </div>
          </Element>
        </ParallaxLayer>

        <ParallaxLayer offset={2} speed={0.5}>
          <Element name="stockholm-e">
            {/* <TempGraph selectOption="stockholm-e" /> */}
          </Element>
        </ParallaxLayer>

        <ParallaxLayer offset={3} speed={0.5}>
          <Element name="stockholm-w">
            {/* <TempGraph selectOption="stockholm-w" /> */}
          </Element>
        </ParallaxLayer>
      </Parallax>
    </div>
  );
}

export default App;
