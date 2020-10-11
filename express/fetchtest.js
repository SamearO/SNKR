import axios from "axios"

axios({
    method: "get",
    url:"https://stockx.com/api/products/af8ae222-4eff-4a2d-b674-c3592efa5252/chart?start_date=all&end_date=2020-09-24&intervals=1000000&format=highstock&currency=GBP&country=GB",
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36",
      "sec-fetch-dest": "none",
      accept: "*/*",
      "sec-fetch-site": "cross-site",
      "sec-fetch-mode": "cors",
      "accept-language": "en-US",
    },
  }).then((res) => {
      console.log(res.data)
  })