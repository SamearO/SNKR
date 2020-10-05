import { Avatar, CardActions, CardContent, Grid } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import MyAreaChart from "./MyAreaChart.js";
import Filter from "./Filter.js";
import moment from "moment";
import VolatilityDisplay from  "./Volatility.js"
import {SalesLast72Display} from "./SalesLast72"
import PicLinkDisplay from "./PicLink.js"

// core components
// import Button from "./imported/CustomButtons/Button.js";
import Card from "./imported/Card/Card.js";
import CardBody from "./imported/Card/CardBody.js";
import GridItem from "./imported/Grid/GridItem.js";
import CardHeader from "./imported/Card/CardHeader.js";
import CardFooter from "./imported/Card/CardFooter.js";
import styles from "././imported/assets/jss/material-dashboard-react/cardImagesStyles.js";
import Button from "././imported/CustomButtons/Button.js";
import { cardHeader, container } from "./imported/assets/jss/material-dashboard-react.js";
import { CircularProgressbar} from "react-circular-progressbar" 

const axios = require("axios");

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  display: "flex",
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

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

    const darkStyling = {
      backgroundColor: "#02064a",
      height: "900px",
      width: "1900",
      backgroundTint: "#27272c",
    }

  return (
    <div style={darkStyling}>
      <Grid container spacing={1} sm={"auto"} md={"auto"} lg={"auto"}>

        <GridItem xs={6}>
          <Card raised={true}  >
            <CardHeader>
              <h4>Sales Graph</h4> <Avatar src= "https://www.shareicon.net/data/128x128/2015/08/20/87935_red_512x512.png"></Avatar>
            </CardHeader>
            <CardBody>
              <MyAreaChart
              size={size}
              startDate={startDate}
              endDate={endDate}
              ></MyAreaChart>
            </CardBody>
            <CardActions>
              <Filter
                size={size}
                setSize={setSize}
                startDate={startDate}
                setStartDate={setStartDate}
                endDate={endDate}
                setEndDate={setEndDate}
              ></Filter>
            </CardActions>
          </Card>
        </GridItem>

        <GridItem xs={6}>
          <Card raised={true} className={classes.root}>
            <CardBody>
              <PicLinkDisplay></PicLinkDisplay>
            </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card raised={true} className={classes.root}>
            <CardHeader>
                <h4>Sales In The Last 72 Hours</h4>
              </CardHeader>
              <CardBody>
                <SalesLast72Display></SalesLast72Display>
              </CardBody>
          </Card>
        </GridItem>

        <GridItem>
          <Card raised={true} className={classes.root}>
            <CardHeader color="#152028">
                <h4>Volatility</h4>
              </CardHeader>
              <CardBody>
                <VolatilityDisplay></VolatilityDisplay>
              </CardBody>
          </Card>
        </GridItem>

      </Grid>
    </div>
  );
}
