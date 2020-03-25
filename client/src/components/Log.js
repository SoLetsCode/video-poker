import React from "react";
import { Chart } from "react-google-charts";

import { v4 as uuidv4 } from "uuid";

export default function Log({ playerLog }) {
  const data = playerLog.map((data, index) => [index, data.credit]);
  data.unshift(["Times Played", "Credit"]);

  const correctMove = (player, trainer) => {
    return player === trainer;
  };

  const log = playerLog.reverse().map((data, index) => {
    let className = correctMove(data.playerhold, data.trainerhold)
      ? "log__container log__container-correct"
      : "log__container log__container-wrong";

    return (
      <div className={className} key={uuidv4()}>
        <div className={"log__wrapper log__wrapper-index"}>
          <div className="log__description">{playerLog.length - index}</div>
        </div>
        <div className={"log__wrapper log__wrapper-hand"}>
          <div className="log__description">
            {JSON.parse(data.hand).join(" ")}
          </div>
        </div>
        <div className="log__wrapper log__wrapper-playerhold">
          <div className="log__description">
            {JSON.parse(data.playerhold).join(" ")}
          </div>
        </div>
        <div className="log__wrapper log__wrapper-trainerhold">
          <div className="log__description">
            {JSON.parse(data.trainerhold).join(" ")}
          </div>
        </div>
        <div className="log__wrapper log__wrapper-outcome">
          <div className="log__description">{data.outcome}</div>
        </div>
      </div>
    );
  });

  const generateBarchartData = () => {
    let handOutcomes = {
      rf: "Royal Flush",
      sf: "Straight Flush",
      fk: "Four of A Kind",
      fh: "Full House",
      f: "Flush",
      s: "Straight",
      tk: "Three of a Kind",
      tp: "Two Pair",
      jp: "High Pair",
      LOSER: "Loser"
    };
    let dataArray = [["Hand", "Times"]];

    for (let each in handOutcomes) {
      let count = playerLog.filter(data => data.result === each).length;
      if (count > 0) {
        dataArray.push([handOutcomes[each], count]);
      }
    }

    return dataArray;
  };

  return (
    <section className="log">
      {playerLog.length === 0 ? (
        <p style={{ textAlign: "center" }}>No history</p>
      ) : (
        <>
          <Chart
            chartType="LineChart"
            data={data}
            width="100%"
            height="400px"
            loader={<div>Loading Chart</div>}
            options={{
              // Material design options
              chart: {
                title: "Credits over Time"
              },
              animation: {
                duration: 1000,
                easing: "out",
                startup: true
              },
              backgroundColor: "transparent",
              fontSize: 20,
              fontName: "Russo One",
              title: "Credits over Time",
              colors: ["orange"],
              hAxis: {
                textStyle: { color: "black" }
              },
              vAxis: {
                textStyle: { color: "black" }
              }
            }}
          />
          <Chart
            width={"100%"}
            height={"400px"}
            chartType="BarChart"
            loader={<div>Loading Chart</div>}
            data={generateBarchartData()}
            options={{
              // Material design options
              chart: {
                title: "Hand Outcomes"
              },
              animation: {
                duration: 1000,
                easing: "out",
                startup: true
              },
              backgroundColor: "transparent",
              fontSize: 20,
              fontName: "Russo One",
              title: "Hand Outcomes",
              colors: ["orange"],
              hAxis: {
                textStyle: { color: "black" }
              },
              vAxis: {
                textStyle: { color: "black" }
              }
            }}
          />
        </>
      )}
      <div className="log__container" key={uuidv4()}>
        <div className="log__wrapper log__wrapper-hand">
          <label className="log__title">Hand</label>
        </div>
        <div className="log__wrapper log__wrapper-playerhold">
          <label className="log__title">Player Hold</label>
        </div>
        <div className="log__wrapper log__wrapper-trainerhold">
          <label className="log__title">Trainer Hold</label>
        </div>
        <div className="log__wrapper log__wrapper-outcome">
          <label className="log__title">Result</label>
        </div>
      </div>
      {log}
    </section>
  );
}
