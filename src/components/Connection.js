const axios = require("axios");

exports.GrabData = () => {
  return axios
    .get("http://localhost:5000/api/stockx")
    .then((result) => console.log(result.data.express))
    .catch((error) => console.log(error));
};

// This just formats all the dates from the file from ISO format to YYYY-MM-DD format which makes it easier to read for the user
// function formatdate() {
//   moment().format();
//   for (var i = 0; i < data.length; i++) {
//     data[i].ProductActivity__createdAt = moment(
//       data[i].ProductActivity__createdAt
//     ).format("YYYY-MM-DD");
//   }
// }

// filters json file returning an array of sales with the requested size
// function filtersize(size) {
//   var filtered = [];
//   for (var i = 0; i < data.length - 1; i++) {
//     if (data[i]["shoeSize"] == size) {
//       filtered.push(data[i]);
//     } else if (size == 0) {
//       return data;
//     }
//   }
//   return filtered;
// }

// this function returns an array of sales up to the date that is passed as a paramater
// function filterdate(date) {
//   var filtered2 = [];
//   var datetofilter = new Date(date);
//   datetofilter = datetofilter.getTime();
//   for (var i = 0; i < data.length; i++) {
//     var comparisondate = new Date(data[i].createdAt);
//     if (comparisondate.getTime() < datetofilter) {
//       filtered2.push(data[i]);
//     }
//   }
//   return filtered2;
// }

// function filterbydateandsize(size, date, dataa) {
//   var filtered = [];
//   var datetofilter = new Date(date);
//   datetofilter = datetofilter.getTime();
//   for (var i = 0; i < dataa.length; i++) {
//     var comparisondate = new Date(dataa[i].ProductActivity_createdAt);
//     if (
//       dataa[i]["ProductActivity_shoeSize"] == size &&
//       comparisondate.getTime() < datetofilter
//     ) {
//       filtered.push(dataa[i]);
//     } else if (size == 0 && comparisondate.getTime() < datetofilter) {
//       filtered = filterdate(date, dataa);
//     }
//   }
//   return filtered;
// }

// console.log("YO SAMIR THIS IS IT", filterdate("2020-07-16T19:15:00+00:00"));

// formatdate();
