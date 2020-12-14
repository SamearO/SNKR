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
  ResponsiveContainer,
  ComposedChart,
  Legend,
  Line
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

  const cardstyle = {
    backgroundColor: '#F0FFFF',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: "wrap",
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white'
  }

  axios.get("http://localhost:5000/api/pytest").then((res) => {
    console.log(res.data)
  })

  let sampleData = {"ds":{"0":1534773624990,"1":1549851424400,"2":1587219535460,"3":1587347130200,"4":1587900029300,"5":1588110654530,"6":1588892741600,"7":1588920584800,"8":1589001773600,"9":1590870970910},"trend":{"0":216.6697855225,"1":261.4668420264,"2":395.878245541,"3":397.6215655049,"4":405.2774604431,"5":408.2300856015,"6":419.1936857619,"7":419.5840025946,"8":420.7221388459,"9":446.9252749244},"yhat_lower":{"0":221.2098040048,"1":249.4850598212,"2":351.2462362596,"3":363.9277348285,"4":373.2892646388,"5":372.7197038708,"6":414.9479686465,"7":413.1381270042,"8":415.4358038478,"9":422.5739467131},"yhat_upper":{"0":253.9532335931,"1":284.5858380406,"2":386.5041275113,"3":397.9341684778,"4":407.9528290128,"5":408.5455432044,"6":451.0552953786,"7":447.5942233977,"8":448.540323748,"9":454.6858973854},"trend_lower":{"0":216.6697855225,"1":261.4668420264,"2":395.878245541,"3":397.6215655049,"4":405.2774604431,"5":408.2300856015,"6":419.1936857619,"7":419.5840025946,"8":420.7221388459,"9":446.9252749244},"trend_upper":{"0":216.6697855225,"1":261.4668420264,"2":395.878245541,"3":397.6215655049,"4":405.2774604431,"5":408.2300856015,"6":419.1936857619,"7":419.5840025946,"8":420.7221388459,"9":446.9252749244},"additive_terms":{"0":21.0260226558,"1":5.8448497707,"2":-25.9918363648,"3":-17.0926385754,"4":-14.7746477378,"5":-17.4253957567,"6":13.1371870441,"7":10.5787365994,"8":10.3482095296,"9":-8.4235690634},"additive_terms_lower":{"0":21.0260226558,"1":5.8448497707,"2":-25.9918363648,"3":-17.0926385754,"4":-14.7746477378,"5":-17.4253957567,"6":13.1371870441,"7":10.5787365994,"8":10.3482095296,"9":-8.4235690634},"additive_terms_upper":{"0":21.0260226558,"1":5.8448497707,"2":-25.9918363648,"3":-17.0926385754,"4":-14.7746477378,"5":-17.4253957567,"6":13.1371870441,"7":10.5787365994,"8":10.3482095296,"9":-8.4235690634},"daily":{"0":-1.6644557327,"1":2.480697153,"2":-1.6534545838,"3":3.1146613532,"4":0.9917133973,"5":-2.1450283591,"6":2.1908416918,"7":-0.6653464607,"8":1.306093078,"9":-4.9558790889},"daily_lower":{"0":-1.6644557327,"1":2.480697153,"2":-1.6534545838,"3":3.1146613532,"4":0.9917133973,"5":-2.1450283591,"6":2.1908416918,"7":-0.6653464607,"8":1.306093078,"9":-4.9558790889},"daily_upper":{"0":-1.6644557327,"1":2.480697153,"2":-1.6534545838,"3":3.1146613532,"4":0.9917133973,"5":-2.1450283591,"6":2.1908416918,"7":-0.6653464607,"8":1.306093078,"9":-4.9558790889},"weekly":{"0":2.0299547674,"1":2.4551630893,"2":-1.7444386277,"3":2.4670732248,"4":1.8988680085,"5":-1.932767418,"6":2.5865834073,"7":2.1599688173,"8":-2.0541285626,"9":-0.7269819263},"weekly_lower":{"0":2.0299547674,"1":2.4551630893,"2":-1.7444386277,"3":2.4670732248,"4":1.8988680085,"5":-1.932767418,"6":2.5865834073,"7":2.1599688173,"8":-2.0541285626,"9":-0.7269819263},"weekly_upper":{"0":2.0299547674,"1":2.4551630893,"2":-1.7444386277,"3":2.4670732248,"4":1.8988680085,"5":-1.932767418,"6":2.5865834073,"7":2.1599688173,"8":-2.0541285626,"9":-0.7269819263},"yearly":{"0":20.6605236211,"1":0.9089895285,"2":-22.5939431533,"3":-22.6743731534,"4":-17.6652291436,"5":-13.3475999796,"6":8.359761945,"7":9.0841142428,"8":11.0962450141,"9":-2.7407080482},"yearly_lower":{"0":20.6605236211,"1":0.9089895285,"2":-22.5939431533,"3":-22.6743731534,"4":-17.6652291436,"5":-13.3475999796,"6":8.359761945,"7":9.0841142428,"8":11.0962450141,"9":-2.7407080482},"yearly_upper":{"0":20.6605236211,"1":0.9089895285,"2":-22.5939431533,"3":-22.6743731534,"4":-17.6652291436,"5":-13.3475999796,"6":8.359761945,"7":9.0841142428,"8":11.0962450141,"9":-2.7407080482},"multiplicative_terms":{"0":0.0,"1":0.0,"2":0.0,"3":0.0,"4":0.0,"5":0.0,"6":0.0,"7":0.0,"8":0.0,"9":0.0},"multiplicative_terms_lower":{"0":0.0,"1":0.0,"2":0.0,"3":0.0,"4":0.0,"5":0.0,"6":0.0,"7":0.0,"8":0.0,"9":0.0},"multiplicative_terms_upper":{"0":0.0,"1":0.0,"2":0.0,"3":0.0,"4":0.0,"5":0.0,"6":0.0,"7":0.0,"8":0.0,"9":0.0},"yhat":{"0":237.6958081782,"1":267.3116917971,"2":369.8864091762,"3":380.5289269295,"4":390.5028127053,"5":390.8046898448,"6":432.330872806,"7":430.1627391941,"8":431.0703483755,"9":438.501705861}}

  return (

  //   <ResponsiveContainer width = "95%" height = {400}>
  //         <AreaChart
  //   width= {1800}
  //   height={500}
  //   data={data}
  //   margin={{
  //     top: 30,
  //     right: 30,
  //     left: 30,
  //     bottom: 30,
  //   }}
  // >
  //   <CartesianGrid strokeDasharray="3 3" />
  //   {/* settings for x axis */}
  //   <XAxis
  //     dataKey="ProductActivity__createdAt"
  //     label={{ value: "Date Of Sale", dy: 20 }}
  //   />
  //   {/* settings for y axis */}
  //   <YAxis
  //     label={{
  //       value: "Price (£)",
  //       position: "insideLeft",
  //       angle: -90,
  //       dy: -10,
  //     }}
  //   />
  //   <Tooltip />
  //   {/* settings for area under line */}
  //   <Area
  //     type="monotone"
  //     dataKey="ProductActivity__localAmount"
  //     stroke="#8884d8"
  //     fill="#DC143C"
  //   />
  // </AreaChart>
  //   </ResponsiveContainer>

  <ResponsiveContainer width = "95%" height = {400}>
      <ComposedChart width={1800} height={500} margin = {{top: 30,right: 30,left: 30,bottom: 30,  }}> 
  <XAxis dataKey="ProductActivity__createdAt" label={{ value: "Date Of Sale", dy: 20 }} />
  <YAxis
      label={{
        value: "Price (£)",
        position: "insideLeft",
        angle: -90,
        dy: -10,
      }}
    />
  <Tooltip />
  {/* <Legend /> */}
  {/* <CartesianGrid strokeDasharray="3 3" /> */}
  <Area type="monotone" dataKey="ProductActivity__localAmount" stroke="##8884d8" fill="#DC143C" data={data} />
  <Line type="monotone" dataKey="yhat" stroke="#ff7300" data={sampleData}/>
</ComposedChart>
  </ResponsiveContainer>

  );
};

export default MyAreaChart;
