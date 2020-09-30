
import { CardContent, Grid } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import MyAreaChart from "./MyAreaChart.js";
import Filter from "./Filter.js";
import moment from "moment";
import VolatilityDisplay, { AttributeDisplay } from  "./Volatility.js"
import {SalesLast72Display} from "./SalesLast72"

// core components
// import Button from "./imported/CustomButtons/Button.js";
import Card from "./imported/Card/Card.js";
import CardBody from "./imported/Card/CardBody.js";
import GridItem from "./imported/Grid/GridItem.js";
import CardHeader from "./imported/Card/CardHeader.js";
import CardFooter from "./imported/Card/CardFooter.js";
import styles from "././imported/assets/jss/material-dashboard-react/cardImagesStyles.js";
import Button from "././imported/CustomButtons/Button.js";

const useStyles = makeStyles(styles);
const axios = require("axios");


// Grid Function; allocates space for components
export default function CenteredGrid() {
  const classes = useStyles();

  // this block of code finds the date of one day in the future to make sure the graph is showing all results as default
  const today = new Date();
  var tomorrow = today.setDate(today.getDate() + 1);
  tomorrow = moment(tomorrow).format("YYYY-MM-DD");
  var start = new Date(2018, 1, 1);
  start = moment(start).format("YYYY-MM-DD");

  // sets the size hook to 0 (all sizes) as defualt
  const [size, setSize] = React.useState(0);

  // sets the date hook to the date of tommorow to ensure that all results are shown as default
  const [endDate, setEndDate] = React.useState(tomorrow);

  const [startDate, setStartDate] = React.useState(start);

    // attribute hook initialised
    const [attributes, setAttributes] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    // url for my attribute API endpoint
    const attributeUrl = "http://localhost:5000/api/attributes"

  
    // this code sets the attribute hook to data from my api
    useEffect(() => {
      setLoading(true)
      axios
        .get(attributeUrl)
        .then((res) => {
          setAttributes(res.data.attributes);
          setLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });
    }, []); 

  return (
    <div
      style={{
        backgroundColor: "#152028",
        width: "1859",
        height: "950px",
      }}
    >
      <Grid container spacing={1}>
        <GridItem xs={13} sm={100} md={13}>
          <Card style={{ width: "40rem" }}>
            <CardHeader color="danger">
              <h4>Sales Graph</h4>
            </CardHeader>
            <CardBody>
              <MyAreaChart
                size={size}
                startDate={startDate}
                endDate={endDate}
              ></MyAreaChart>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={6} sm ={6} md={6}>
          <Card style={{ width: "40rem"}}>
            <CardContent style={{backgroundColor: "#001a33"}}>
            <CardHeader color="#152028">
              <h4>Volatility</h4>
            </CardHeader>
            <CardBody>
              <VolatilityDisplay></VolatilityDisplay>
            </CardBody>
            </CardContent>
          </Card>
        </GridItem>

        <GridItem xs={6} sm={6} md={6}>
          <Card style={{ width: "40rem"}}>
            <CardHeader color="warning">
              <h4>Sales In The Last 72 Hours</h4>
            </CardHeader>
            <CardBody>
              <SalesLast72Display></SalesLast72Display>
            </CardBody>
          </Card>
          
        </GridItem>

        <GridItem xs={6} sm={6} md={6}>
          <Card style={{ width: "40rem" }}>
            <CardHeader color="warning">
              <h4>Filter</h4>
            </CardHeader>
            <CardBody>
              <Filter
                size={size}
                setSize={setSize}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              ></Filter>
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    </div>
  );
}
