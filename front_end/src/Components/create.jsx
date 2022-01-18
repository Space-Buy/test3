import React, { useState } from "react";

function Create(){
    const [getPrice, setGetPrice]=useState();
    const [getTax,setGetTax] = useState();
    const [getTags, setGetTags] = useState("");
    const [getValueName,setGetValueName] = useState("");
    const [getUrl,setGetUrl] = useState("");
    const [getImageName,setGetImageName] = useState("");

    function saveData(){
        let data= {
            "price": getPrice,
            "tax": getTax,
            "tags": getTags,
            "value_list": {
              "name": getValueName,
              "image_list": {
                "url": getUrl,
                "name": getImageName
              }
            }
          }
        fetch(`http://3.110.83.156:8000/items/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response)=>{
            window.alert(response.status)
        })
    }

    return(
        <div>
            <a href="/list"><h2>Data List</h2></a>
            <div id='create_items'>
                <h2>Product</h2>
                Price:<input type="number" value={getPrice} onChange={(e)=>{setGetPrice(e.target.value)}}/>(required)<pre/>
                Tax:<input type="number" value={getTax} onChange={(e)=>{setGetTax(e.target.value)}}/>(required)<pre/>
                Tags:<input value={getTags} onChange={(e)=>{setGetTags(e.target.value)}}/><pre/>
                <h3>Value List</h3>
                Value Name:<input value={getValueName} onChange={(e)=>{setGetValueName(e.target.value)}}/><pre/>
                <h3>Image List</h3>
                URL:<input value={getUrl} onChange={(e)=>{setGetUrl(e.target.value)}}/><pre/>
                Image Name:<input value={getImageName} onChange={(e)=>{setGetImageName(e.target.value)}}/><pre/>
                <button type='button' onClick={saveData} >Create</button>
            </div>
        </div>
    )
}

export default Create;