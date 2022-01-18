import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import './App.css';

function CRUD(props) {
    const [getData, setGetData]=useState([]);
    const [putId, setPutId]= useState("");
    const [putPrice, setputPrice]=useState("");
    const [putTax,setputTax] = useState("");
    const [putTags, setputTags] = useState("");
    const [putValueName,setputValueName] = useState("");
    const [putUrl,setputUrl] = useState("");
    const [putImageName,setputImageName] = useState("");

    useEffect(() =>{
        fetch_all();
    },[]);

    
    var fetching;
    const [fetch_status,setFetch_status]=useState();
    const fetch_all=() =>{
        fetching=fetch(`http://3.110.83.156:8000/get_items`,{
            method:"GET",
            header:{'accept': 'application/json'}
        })
        fetching.then((res)=>{
            setFetch_status(res.status);
        })

        fetching.then((res) => res.json())
        .then((json) => {
            setGetData(json.response);
            console.log(json);
        })
        
    }

    

    
return (
	<div className="App">
        

        <div>
            <h3>List of Products</h3>
            
                {
                    (fetch_status === 404)?
                    <table><h2>No Data Found. Plz Create Data</h2></table>:
                    <table>
                    <tr><th>Price</th><th>Value<tr><th>Name</th><pre/><th>Images<tr><pre/></tr></th></tr></th><th>Details</th></tr>
                    {getData.map((item)=>(
                        <tr><td>{item.price}</td><td><tr><td>{item.value_list.name}</td><pre/><tr><pre/><td>{item.value_list.image_list.name}</td></tr></tr></td><td><a href={`/detail/${item.id}`}>Detail</a></td></tr>
                    ))}
                    </table>     
                }
        </div>

    	</div>
);
}

export default CRUD;
