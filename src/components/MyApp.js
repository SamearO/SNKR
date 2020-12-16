import { Avatar, CardActions, CardContent, Grid, flexWrap } from "@material-ui/core";
import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import MyAreaChart from "./MyAreaChart.js";
import emailButton from "./Email"
import Filter from "./Filter.js";
import moment from "moment";
import { AttributeDisplay } from  "./Attributes.js"

// core components
// import Button from "./imported/CustomButtons/Button.js";
import Card from "./imported/Card/Card.js";
import CardBody from "./imported/Card/CardBody.js";
import GridItem from "./imported/Grid/GridItem.js";
import CardHeader from "./imported/Card/CardHeader.js";
import { dark } from "@material-ui/core/styles/createPalette";
import { cardHeader } from "./imported/assets/jss/material-dashboard-react.js";

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
      backgroundColor: '#161662',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white'
    }

  return (
    <div style={darkStyling}>
      <Grid container spacing={1}  direction = "row">
        <GridItem>
        <Card raised={true}>
            <CardHeader color="#152028">
                <h4>Volatility</h4>
              </CardHeader>
              <CardBody>
                <AttributeDisplay typeof = "Volatility"></AttributeDisplay>
              </CardBody>
        </Card>
        </GridItem>

        <GridItem>
          <Card raised={true} >
            <CardHeader>
                <h4>Sales In The Last 72 Hours</h4>
              </CardHeader>
              <CardBody>
                <AttributeDisplay typeof = "Sales_Last_72"></AttributeDisplay>
              </CardBody>
          </Card>
        </GridItem>

        <GridItem xs={6}>
          <Card raised={true} >
            <CardBody>
              <AttributeDisplay typeof = "Pic_Link"></AttributeDisplay>
            </CardBody>
          </Card>
        </GridItem>

        <emailButton></emailButton>
        

        <GridItem xs={12}>
          <Card raised={true} >
            <CardHeader>
              <h4>Sales Graph</h4> <Avatar src= "https://www.shareicon.net/data/128x128/2015/08/20/87935_red_512x512.png"></Avatar>
            </CardHeader>
            <CardBody>
              <MyAreaChart
              size={size}
              startDate={startDate}
              endDate={endDate}
              >
              </MyAreaChart>
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

      </Grid>
    </div>
  );
}
