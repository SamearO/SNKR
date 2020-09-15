import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const axios = require("axios");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const sqlite3 = require("sqlite3").verbose();

// first route to search the stockX API, this is the route stockx uses to display autocomplete searches, therefore the limit is 20
// could be very helpful when building a seach bar
function searchBar(query) {
  axios({
    method: "post",
    url:
      "https://xw7sbct9v6-1.algolianet.com/1/indexes/products/query?x-algolia-agent=Algolia%20for%20vanilla%20JavaScript%203.32.1&x-algolia-application-id=XW7SBCT9V6&x-algolia-api-key=6bfb5abee4dcd8cea8f0ca1ca085c2b3",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
    },
    data: `{\"params\":\"query=${encodeURIComponent(
      query
    )}&facets=*&filters=\"}`,
  }).then((res) => {
      var data = res.data.hits
      console.log(data)
  })
}

// second route to search the stockX API, this is the route stockx uses to display products. Limit is 40, there are 25 'pages' of results
const searchDirect = (query) => {
    const xhr = new XMLHttpRequest();
    const url = "https://stockx.com/api/browse?_search="+query;
    const headers =  {
        "user-agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
        "sec-fetch-dest": "none",
        accept: "*/*",
        "sec-fetch-site": "cross-site",
        "sec-fetch-mode": "cors",
        "accept-language": "en-US",
      }
    xhr.open("GET", url);
    for(let key in headers){
        xhr.setRequestHeader(key, headers[key]) 
      }
    xhr.send();
    // function executes when the ready state is changed
    xhr.onreadystatechange = (e) => {
        // if the request is done and the server is returning an ok response then execute
        if (xhr.readyState == 4 && xhr.status == 200) {
            var data = JSON.parse(xhr.responseText)
            console.log(data)
        }
        else{
            console.log("server error")
        }
    }
}
// this function takes product URL or the exact product name as a paramater, it then displays neccasary info about the product
const grabProductInfo = (product) => {
  let webURL;
  if (typeof product == "string") {
    if (product.includes("stockx.com/"))
      webURL = product.split("stockx.com/")[1].split("/")[0];
    else webURL = product;
  } else webURL = product.urlKey;

  axios({
    method: "get",
    url:
      "https://stockx.com/api/products/" +
      webURL +
      "?includes=market&currency=GBP",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
      "sec-fetch-dest": "none",
      accept: "*/*",
      "sec-fetch-site": "cross-site",
      "sec-fetch-mode": "cors",
      "accept-language": "en-US",
    },
  })
    .then((res) => {
        var data = res.data
      const variants = data.Product.children;
      var variantArray = [];
      for (let key in variants) {
        variantArray.push({
          size: variants[key].shoeSize,
          uuid: key,
          market: variants[key].market,
        });
      }
      console.log({
        name: data["Product"].title,
        image: data["Product"].media.imageUrl,
        urlKey: data["Product"].urlKey,
        pid: data["Product"].styleId,
        uuid: data["Product"].uuid,
        marketData: data["Product"].market,
        variants: variantArray,
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function updateProduct(product) {
    let webURL;
    if (typeof product == "string") {
        if (product.includes("stockx.com/"))
        webURL = product.split("stockx.com/")[1].split("/")[0];
        else webURL = product;
    } 
    // else webURL = product.urlKey;
  axios({
    method: "get",
    url:
      "https://stockx.com/api/products/" +
      webURL +
      "?includes=market&currency=GBP",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
      "sec-fetch-dest": "none",
      accept: "*/*",
      "sec-fetch-site": "cross-site",
      "sec-fetch-mode": "cors",
      "accept-language": "en-US",
    },
  })
    .then((res) => {
        var data = res.data
        const variants = data.Product.children;
        var variantArray = [];
        for (let key in variants) {
            variantArray.push({
                size: variants[key].shoeSize,
                uuid: key,
                market: variants[key].market,
            });
        }
        var datatoupload = {
            name: data["Product"].title,
            image: data["Product"].media.imageUrl,
            urlKey: data["Product"].urlKey,
            pid: data["Product"].styleId,
            uuid: data["Product"].uuid,
            marketData: data["Product"].market,
            variants: variantArray,
        }
        let db = new sqlite3.Database("stockx.db");
        // the sql command which should be run
        let sql =
          "INSERT INTO PRODUCT (Id, Name, Pic_Link, Volatility, Sales_Last_72) VALUES (?,?,?,?,?)";
        let datatoinsert = [
            datatoupload.uuid,
            datatoupload.name,
            datatoupload.image,
            datatoupload.marketData.volatility,
            datatoupload.marketData.salesLast72Hours
        ];
        // this function executes the sql command using db.run
        db.serialize(function () {
            db.run(sql, datatoinsert, function (err) {
                // error condition
                if (err){
                  if (err.code == 'SQLITE_BUSY') {
                    console.log("Database is busy, retrying in 5 seconds...")
                    setInterval ( function() { 
                      updateProduct(product)
                    }, 1000 * 5);
                  }
                  else{
                    console.log(err)
                  }
                };
            }
            ,)});
        }).catch((err) =>{
            console.log(err)
        })
    }       
    
export function updateDbFromApi1(names){
    for(var i = 0; i < names.length; i++){
        updateProduct(names[i])
        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;
        console.log("Product" ,i + 1, "Updated At:", dateTime)
    }
}

// updates database with data which is passed
function updateProductActivity(apidata) {
    const sqlite3 = require("sqlite3").verbose();
    let db = new sqlite3.Database("stockx.db");
    // the sql command which should be run
    let sql =
      "INSERT INTO PRODUCTACTIVITY (ProductActivity__chainId,ProductActivity__amount,ProductActivity__createdAt,ProductActivity__shoeSize,ProductActivity__productId,ProductActivity__skuUuid,ProductActivity__state,ProductActivity__localAmount,ProductActivity__localCurrency) VALUES (?,?,?,?,?,?,?,?,?)";
    // for every object in apidata
    for (var i = 0; i < apidata.length; i++) {
      let datatoinsert = [
        apidata[i].chainId,
        apidata[i].amount,
        apidata[i].createdAt,
        apidata[i].shoeSize,
        apidata[i].productId,
        apidata[i].skuUuid,
        apidata[i].state,
        apidata[i].localAmount,
        apidata[i].localCurrency,
      ];
      // this function executes the sql command using db.run
      db.serialize(function () {
        db.run(sql, datatoinsert, function (err) {
          // error condition
          if (err){
            if (err.code == 'SQLITE_BUSY') {
              var isLocked = true
              if(isLocked = true){
                console.log("Database is busy, retrying in 5 seconds...")
                setInterval ( function() { 
                  updateProductActivity(apidata)
                }, 1000 * 5);
              } 
            }
            else{
              console.log(err)
            }
          };
        });
      });
    }
  }

// this function grabs data from the stockx api, automatically filters already uploaded sales and then inserts filtered sales to the database
export function updateDbFromApi2() {
  var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
  const xhr = new XMLHttpRequest();
  const url =
    "https://stockx.com/api/products/e2213059-bad6-4a09-8b3f-e78fe4013256/activity?state=480&currency=GBP&limit=10000&page=1&sort=createdAt&order=DESC&country=GB";
  xhr.open("GET", url);
  xhr.setRequestHeader(
    "user-agent",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36"
  );
  xhr.send();
  // function executes when the ready state is changed
  xhr.onreadystatechange = (e) => {
    // if the request is done and the server is returning an ok response then execute
    if (xhr.readyState == 4 && xhr.status == 200) {
      // initialise myobj to the json response to the API
      var myobj = JSON.parse(xhr.responseText)["ProductActivity"];
    //   for(var i = 0; i < myobj.length; i++){
    //     updateProductActivity(myobj[i]);
    //   }
    updateProductActivity(myobj)
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    console.log("ProductActivity Table Updated At:", dateTime)
    }
  };
}

