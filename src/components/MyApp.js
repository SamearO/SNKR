// import { Grid } from "@material-ui/core";
// import React from "react";
// import Paper from "@material-ui/core/Paper";
// import { makeStyles } from "@material-ui/core/styles";
// import MyAreaChart from "./MyAreaChart.js";
// import Filter from "./Filter.js";
// import moment from "moment";

// // styling (CSS)
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
// }));

// // Grid Function; allocates space for components
// export default function CenteredGrid() {
//   const classes = useStyles();

//   // this block of code finds the date of one day in the future to make sure the graph is showing all results as default
//   const today = new Date();
//   var tomorrow = new Date(today + 1);
//   tomorrow = moment(tomorrow).format("YYYY-MM-DD");

//   // sets the size hook to 0 (all sizes) as defualt
//   const [size, setSize] = React.useState(0);

//   // sets the date hook to the date of tommorow to ensure that all results are shown as default
//   const [date, setDate] = React.useState(tomorrow);

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={3}>
//         <Grid item xs={4}>
//           <Paper className={classes.paper}>
//             <Filter
//               size={size}
//               setSize={setSize}
//               date={date}
//               setDate={setDate}
//             />
//           </Paper>
//         </Grid>
//         <Grid item xs={12}>
//           <Paper className={classes.paper}>
//             <MyAreaChart size={size} date={date} />
//           </Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }
import { Grid } from "@material-ui/core";
import React from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import MyAreaChart from "./MyAreaChart.js";
import Filter from "./Filter.js";
import moment from "moment";

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

  return (
    <div
      style={{
        backgroundColor: "lightblue",
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
