// importing react
import React, { useState, useEffect } from "react";
// importing json sales data
import MyData from "../Data/MyData.json";
// importing moment for formatting dates
import moment from "moment";
// importing modules needed from recharts package
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";
import { CircularProgress } from "@material-ui/core";

const axios = require("axios");

// sets data value to sale data part of json file
var data = MyData["ProductActivity"];

// code for area graph component with recharts module
export const MyAreaChart = (props) => {
  // db hook initialised
  const [db, setDb] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  
  // url for my API endpoint
  const productUrl = "http://localhost:5000/api/sales";

  // this code sets the db hook to data from my api
  useEffect(() => {
    setLoading(true)
    axios
      .get(productUrl)
      .then((res) => {
        setDb(res.data.express);
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // sets the data to be displayed as data from the API
  var data = db;

  class Data{
    // This just formats  all the dates from the file from ISO format to YYYY-MM-DD format which makes it easier to read for the user
    static formatdate(){
      moment().format();
      for (var i = 0; i < data.length; i++) {
        data[i].ProductActivity__createdAt = moment(
        data[i].ProductActivity__createdAt
        ).format("YYYY-MM-DD");
    }
    }
    // this code sorts data so that it is in the correct order of dates
    static sortDates(){
      data.sort(function compare(a, b) {
        var dateA = new Date(a.ProductActivity__createdAt);
        var dateB = new Date(b.ProductActivity__createdAt);
        return dateA - dateB;
      });
    }
    // this function returns an array of sales between the dates passed as a paramater
    static filterDates(startDate, endDate){
      var filtered2 = [];
      var datetofilter1 = new Date(startDate);
      datetofilter1 = datetofilter1.getTime();
      var datetofilter2 = new Date(endDate)
      datetofilter2 = datetofilter2.getTime();
      for (var i = 0; i < data.length; i++) {
        var comparisondate = new Date(data[i].ProductActivity__createdAt);
        if (comparisondate.getTime() < datetofilter2 && comparisondate.getTime() > datetofilter1) {
          filtered2.push(data[i]);
        }
      }
      return filtered2;
    }
    // this function returns an array of sales after filtering by the two paramaters
    static filterByDateAndSize(size, startDate, endDate){
      var filtered = [];
      var datetofilter1 = new Date(startDate);
      datetofilter1 = datetofilter1.getTime();
      var datetofilter2 = new Date(endDate);
      datetofilter2 = datetofilter2.getTime();
      for (var i = 0; i < data.length; i++) {
        var comparisondate = new Date(data[i].ProductActivity__createdAt);
        if (
          data[i]["ProductActivity__shoeSize"] == size &&
          comparisondate.getTime() < datetofilter2 && comparisondate.getTime() > datetofilter1
        ) {
          filtered.push(data[i]);
        } else if (size == 0 && comparisondate.getTime() < datetofilter2 && comparisondate.getTime() > datetofilter1) {
          filtered = Data.filterDates(startDate, endDate);
        }
      }
      return filtered;
    }
  }

  Data.sortDates()
  
  // sets data to data filtered by the filtered component
  data = Data.filterByDateAndSize(props.size, props.startDate, props.endDate);

  Data.formatdate();

  console.log("Data being displayed:", data);

  if(loading == true){
    return <CircularProgress></CircularProgress>
  }

  return (
    // settings for the position and size of graph
    <AreaChart
      width={600}
      height={500}
      data={data}
      margin={{
        top: 30,
        right: 30,
        left: 30,
        bottom: 30,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      {/* settings for x axis */}
      <XAxis
        dataKey="ProductActivity__createdAt"
        label={{ value: "Date Of Sale", dy: 20 }}
      />
      {/* settings for y axis */}
      <YAxis
        label={{
          value: "Price (£)",
          position: "insideLeft",
          angle: -90,
          dy: -10,
        }}
      />
      <Tooltip />
      {/* settings for area under line */}
      <Area
        type="monotone"
        dataKey="ProductActivity__localAmount"
        stroke="#8884d8"
        fill="#DC143C"
      />
    </AreaChart>
  );
};

export default MyAreaChart;
