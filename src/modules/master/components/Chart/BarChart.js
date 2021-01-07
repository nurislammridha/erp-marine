import React from "react";
import { Bar } from "react-chartjs-2";
const BarChart = () => {
  const barProperties = {
    labels: ["Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"],

    datasets: [
      {
        label: "User Count",

        backgroundColor: [
          "rgba(119, 100, 228, 1)",
          "rgba(119, 100, 228, 1)",
          "rgba(119, 100, 228, 1)",
          "rgba(119, 100, 228, 1)",
          "rgba(119, 100, 228, 1)",
          "rgba(119, 100, 228, 1)",
          "rgba(119, 100, 228, 1)",
        ],
        borderColor: [],

        borderWidth: 1,
        data: [55223, 69368, 81338, 83806, 92436, 90027, 106062],
      },
    ],
  };
    return ( 
    <>
             <div className="chart__box  bg-white">
              <p>All</p>
              <h4 className="text-bold">Users Count</h4>
              <div className="test">
                <Bar
                  data={barProperties}
                  width={120}
                  height={60}
                  options={
                    {
                      // title: {
                      //   display: true,
                      //   text: "User Count",
                      //   fontSize: 12,
                      // },
                      // legend: {
                      //   display: true,
                      //   position: "left",
                      // },
                    }
                  }
                />
              </div>
            </div>

    </>

     );
}
 
export default BarChart;