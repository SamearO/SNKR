import React from "react";
import axios from "axios";

function Data() {
  const config = {
    headers: {
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36",
    },
    parameters: {
      state: 480,
      currency: "GBP",
      limit: 10000,
      page: 1,
      sort: "createdAt",
      order: "DESC",
      country: "GB",
    },
  };
  axios
    .get(
      "https://stockx.com/api/products/9a649472-8847-4057-94ad-9b2e944c5990/activity",
      config
    )
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  return (
    <div>
      <p>Component</p>
    </div>
  );
}
export default Data;
