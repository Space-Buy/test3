import React, { useEffect, useState } from 'react';
import './App.css';

function CRUD() {
    const [getData, setGetData]=useState([]);
    const [getPrice, setGetPrice]=useState("");
    const [getTax,setGetTax] = useState("");
    const [getTags, setGetTags] = useState("");
    const [getValueName,setGetValueName] = useState("");
    const [getUrl,setGetUrl] = useState("");
    const [getImageName,setGetImageName] = useState("");

    const [putId, setPutId]= useState("");
    const [putPrice, setputPrice]=useState("");
    const [putTax,setputTax] = useState("");
    const [putTags, setputTags] = useState("");
    const [putValueName,setputValueName] = useState("");
    const [putUrl,setputUrl] = useState("");
    const [putImageName,setputImageName] = useState("");

    useEffect(() =>{
        fetch_all();
    });

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
        fetch(`http://127.0.0.1:8000/items/`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response)=>{
            console.warn(response.status)
        })
    }
    
    var fetching;
    const [fetch_status,setFetch_status]=useState();
    const fetch_all=() =>{
        fetching=fetch(`http://127.0.0.1:8000/get_items`,{
            method:"GET",
            header:{'accept': 'application/json'}
        })
        fetching.then((res)=>{
            setFetch_status(res.status);
        })

        fetching.then((res) => res.json())
        .then((json) => {
            setGetData(json.response);
        })
        
    }

    function selectItem(id){
        fetch(`http://127.0.0.1:8000/get_item/${id}`, {
            method:"GET",
            headers: {
                'accept': 'application/json'
            }
        })
        .then((res)=> res.json())
        .then((json) => {
            setPutId(json.id)
            setputPrice(json.price)
            setputTags(json.tags)
            setputTax(json.tax)
            setputValueName(json.value_list.name)
            setputImageName(json.value_list.image_list.name)
            setputUrl(json.value_list.image_list.url)
        })
    }

    function updateItem(){
        let item= {"price": putPrice,"tax": putTax,"tags": putTags,"value_list": {"name": putValueName,"image_list": {"url": putUrl,"name": putImageName}}}
        
        fetch(`http://127.0.0.1:8000/update_item/${putId}`, {
            method: 'PUT',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item)
        });
    }




    function deleteItem(id){
        fetch(`http://127.0.0.1:8000/delete_item/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json'
            }
        });
    }

return (
	<div className="App">
        <div id='create_items'>
            <h2>Product</h2>
            Price:<input value={getPrice} onChange={(e)=>{setGetPrice(e.target.value)}}/><br/> (required)<br/>
            Tax:<input value={getTax} onChange={(e)=>{setGetTax(e.target.value)}}/><br/>(required)<br/>
            Tags:<input value={getTags} onChange={(e)=>{setGetTags(e.target.value)}}/><br/>
            <h3>Value List</h3>
            Value Name:<input value={getValueName} onChange={(e)=>{setGetValueName(e.target.value)}}/><br/>
            <h3>Image List</h3>
            URL:<input value={getUrl} onChange={(e)=>{setGetUrl(e.target.value)}}/><br/>
            Image Name:<input value={getImageName} onChange={(e)=>{setGetImageName(e.target.value)}}/><br/>
            <button type='button' onClick={saveData} >Create</button>
        </div>

        <div>
            <h3>List of Products</h3>
            
                {
                    (fetch_status === 404)?
                    <table><h2>No Data Found. Plz Create Data</h2></table>:
                    <table>
                    <tr><th>Price</th><th>Tags</th><th>Tax</th><th>Value<tr><th>Name</th><pre/><th>Images<tr><th>url</th><pre/><th>Name</th></tr></th></tr></th><th>Update</th><th>Delete</th></tr>
                    {getData.map((item)=>(
                        <tr><td>{item.price}</td><td>{item.tags}</td><td>{item.tax}</td><td><tr><td>{item.value_list.name}</td><pre/><td><tr><td>{item.value_list.image_list.url}</td><pre/><td>{item.value_list.image_list.name}</td></tr></td></tr></td><td><button onClick={() => selectItem(item.id)}>Update</button></td><td><button onClick={() => deleteItem(item.id)}>Delete</button></td></tr>
                    ))}
                    </table>     
                }
                
            
        </div>

        <div>
            <h2>Update Products</h2>
            Price:<input value={putPrice} onChange={(e)=>{setputPrice(e.target.value)}}/><br/>
            Tax:<input value={putTax} onChange={(e)=>{setputTax(e.target.value)}}/><br/>
            Tags:<input value={putTags} onChange={(e)=>{setputTags(e.target.value)}}/><br/>
            <h3>Value List</h3>
            Value Name:<input value={putValueName} onChange={(e)=>{setputValueName(e.target.value)}}/><br/>
            <h3>Image List</h3>
            URL:<input value={putUrl} onChange={(e)=>{setputUrl(e.target.value)}}/><br/>
            Image Name:<input value={putImageName} onChange={(e)=>{setputImageName(e.target.value)}}/><br/>
            <button type='button' onClick={updateItem} >Update</button>
        </div>
	</div>
);
}

export default CRUD;
