import React from "react";
import data from "./geodata_quiz.json";

//sort data from older to newer
var sortedData = data.sort((a, b) => {
  return new Date(a.devicetime) - new Date(b.devicetime);
});

//add id attribute
sortedData.forEach((elm, idx) => {
  elm.id = idx + 1;
});

//add status attribute for each obj
for (var i = 0; i < sortedData.length; i++) {
  if (sortedData[i]["id"] === 1 && sortedData[i]["speed"] > 2) {
    sortedData[i]["status"] = "start";
  } else if (sortedData[i]["id"] === 1 && sortedData[i]["speed"] < 2) {
    sortedData[i]["status"] = "no trip";
  } else if (sortedData[i]["speed"] > 2 && sortedData[i - 1]["speed"] < 2) {
    sortedData[i]["status"] = "start";
  } else if (sortedData[i]["speed"] > 2 && sortedData[i - 1]["speed"] > 2) {
    sortedData[i]["status"] = "continue";
  } else if (sortedData[i]["speed"] < 2 && sortedData[i - 1]["speed"] > 2) {
    sortedData[i]["status"] = "end";
  } else {
    sortedData[i]["status"] = "no trip";
  }
}

//filter to be only start and end
var filterData = sortedData.filter(
  elm => elm.status === "start" || elm.status === "end"
);

var cou = [...Array(filterData.length / 2).keys()];

var count = [];

for (let i = 0; i < cou.length; i += 1) {
  count.push(cou[i] + 1);
}

var num = [...count, ...count].sort((a, b) => {
  return a - b;
});

console.log(cou);
console.log(num);

//add name
for (let i = 0; i < filterData.length; i += 2) {
  if (i % 2 === 0) {
    filterData[i].name = `start ${num[i]}`;
    filterData[i + 1].name = `end ${num[i]}`;
  }
}

//add round
for (let i = 0; i < filterData.length; i += 2) {
  if (i % 2 === 0) {
    filterData[i].round = num[i];
    filterData[i + 1].round = num[i];
  }
}

export const tripData = filterData;

export const mapInfo = () => {
  return (
    <div>
      {tripData.map(data => (
        <div>
          ID : {data.id} || DateTime : {data.devicetime}
          || Name : {data.name}|| Latitude : {data.latitude} || Longitude : {data.longitude}
        </div>
      ))}
    </div>
  );
}