import React, { useState, useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import axios from 'axios'


const TempGraph = ({ selectOption }) => {
    const [backendData, setBackendData] = useState([]);
    const chartContainerRef = useRef(null);
    const chartInstanceRef = useRef(null);
    const socket = useRef(null);
    const stompClient = useRef(null);
  
    useEffect(() => {
      const fetchDataAndSubscribe = async () => {
        try {
          const response = await axios.get(`http://localhost:8080/${selectOption}`);
          const initialData = response.data;
          setBackendData(initialData);
    
          socket.current = new SockJS("http://localhost:8080/ws");
          stompClient.current = Stomp.over(socket.current);
    
          await new Promise((resolve) => {
            stompClient.current.connect({}, resolve);
          });
    
          stompClient.current.subscribe(`/topic/temperature/${selectOption}`, (message) => {
            const temperatureData = JSON.parse(message.body);
            setBackendData((prevData) => [...prevData, temperatureData]);
          });
        } catch (error) {
          console.error(error);
        }
      };
    
      fetchDataAndSubscribe();
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
                label: '(°C)',
                data: backendData.map((dataPoint) => dataPoint.temp),
                fill: false,
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
                beginAtZero: false,
                type: 'linear',
                grid: {
                  color: 'rgba(255,255,255,1)'
                },
                ticks: {
                  color: 'rgba(255,255,255,0.3)',
                }
              },
              y: {
                beginAtZero: true,
                grid: {
                  color: 'rgba(255,255,255,1)'
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
  
    return (
      <div className="graph">
        <canvas ref={chartContainerRef}></canvas>
      </div>
    );
};

export default TempGraph