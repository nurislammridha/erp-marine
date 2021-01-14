import React from "react";
// import "./styles.css";

import { Line, Polar } from "react-chartjs-2";
const PolarChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: "rgba(0, 0, 0, 192)",
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
