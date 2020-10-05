import React, {useState, useEffect } from "react";
import axios from "axios";
import { CircularProgressbar, CircularProgressbarWithChildren} from "react-circular-progressbar" 
import 'react-circular-progressbar/dist/styles.css';

export const VolatilityDisplay = () => {
    
    // tempoary attributes so that attributes object can be compiled
    const tempAttributes = [{"Id":"771e7335-ac9b-4f3d-8f5a-366bed5417ed","Name":"adidas Yeezy Boost 350 V2 Zyon","Pic_Link":"https://stockx.imgix.net/adidas-Yeezy-Boost-350-V2-Zyon-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1596134320","Volatility":0.055647,"Sales_Last_72":394},{"Id":"610c6dcb-f95d-4d8c-a36b-bd05529600af","Name":"Nike Dunk Low Co.JP Samba (2020)","Pic_Link":"https://stockx.imgix.net/Nike-Dunk-Low-Samba-2020.png?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1596822662","Volatility":0.012595,"Sales_Last_72":94},{"Id":"ea4a2e72-8df9-442d-8ad1-ce3233d76f87","Name":"Jordan 1 Retro High Light Smoke Grey","Pic_Link":"https://stockx.imgix.net/Air-Jordan-1-Retro-High-Light-Smoke-Grey-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1594243826","Volatility":0.073693,"Sales_Last_72":229},{"Id":"e2213059-bad6-4a09-8b3f-e78fe4013256","Name":"Jordan 1 Retro High Bred Toe","Pic_Link":"https://stockx.imgix.net/Air-Jordan-1-Retro-High-Bred-Toe-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1538080256","Volatility":0.082028,"Sales_Last_72":16},{"Id":"1e3ba91f-5350-4fe3-abb7-feb2a6129cc9","Name":"Jordan 1 Retro High Satin Snake Chicago (W)","Pic_Link":"https://stockx.imgix.net/Air-Jordan-1-Retro-High-Satin-Snake-Chicago-W-Product.jpg?fit=fill&bg=FFFFFF&w=700&h=500&auto=format,compress&q=90&dpr=2&trim=color&updated_at=1597678279","Volatility":0.054233,"Sales_Last_72":226}]
    // attribute hook initialised
    const [attributes, setAttributes] = React.useState(tempAttributes);
    const [loading, setLoading] = React.useState(false);
    
    // url for my attribute API endpoint
    const attributeUrl = "http://localhost:5000/api/attributes"

    function storeobj(key, obj){
        for(var i = 0;i < obj.length; i++){
            if(obj[i]["Name"] == key){
                return obj[i]
            }
        }
    }
      
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

    if(loading == true){
        return <h3>Loading...</h3>
    }

    return(
        // <h3>{attributes[3]["Volatility"] * 100 + "%"}</h3>
        // <CircularProgressbar value={attributes[3]["Volatility"] * 100} text={"Volatility"} >
        // </CircularProgressbar>
        
        <CircularProgressbar value={storeobj("Jordan 1 Retro High Bred Toe", attributes)["Volatility"] * 100} text={Math.round(storeobj("Jordan 1 Retro High Bred Toe", attributes)["Volatility"] * 100) +"%"}></CircularProgressbar>
    )
}

export default VolatilityDisplay