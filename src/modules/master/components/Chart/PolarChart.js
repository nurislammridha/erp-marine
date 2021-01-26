import React from "react";
// import "./styles.css";

import { Line, Polar } from "react-chartjs-2";
const PolarChart = () => {
  const data = {
    // labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(0, 0, 0, 192)",
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 0.9)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 0.9)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        // borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="App card mt-5 p-5 line-chartsection">
      <Polar data={data} />
    </div>
  );
};
export default PolarChart;
