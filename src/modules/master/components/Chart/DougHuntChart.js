import React from "react";
import { Doughnut } from "react-chartjs-2";

const DougHuntChart = () => {
  const donut = {
    datasets: [
      {
        label: "My First Dataset",
        data: [300, 50, 100, 40],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
          "rgb(238, 130, 238)",
        ],
        hoverOffset: 4,
      },
    ],

    // These labels appear in the legend and in the tooltips when hovering different arcs
    //  labels: ["Red", "Yellow", "Blue"],
  };
  return (
    <>
      <div className="chart__box  bg-white ">
        <p>OVERVIEW</p>
        <h4 className="text-bold">Purchased</h4>

        <div className="dough__main">
          <div className="doug__left">
            <Doughnut data={donut} width="60%" height="45%" />
          </div>

          <div className="doug__right">
            <div className="doughunt__stat">
              <p className="stat__1">
              
                <span className="dough__list list__1">Sales Module</span>{" "}
                <span className="dough__num">$122,900</span>{" "}
              </p>
              <p className="stat__2">
             
                <span className="dough__list list__2">Finance Module</span>{" "}
                <span className="dough__num">$96,785</span>{" "}
              </p>
              <p className="stat__3">
              
                <span className="dough__list list__3">Spain</span>{" "}
                <span className="dough__num">$35,785</span>{" "}
              </p>
              <p className="stat__4">
               
                <span className="dough__list list__4">Russia</span>{" "}
                <span className="dough__num">$22,123</span>{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DougHuntChart;
