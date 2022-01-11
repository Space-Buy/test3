import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Detail(){
    const params = useParams();
    const navigate = useNavigate();
    const [getId,setGetId] = useState("");
    const [putPrice, setputPrice]=useState("");
    const [putTax,setputTax] = useState("");
    const [putTags, setputTags] = useState("");
    const [putValueName,setputValueName] = useState("");
    const [putUrl,setputUrl] = useState("");
    const [putImageName,setputImageName] = useState("");

    useEffect(() =>{
        deleteItem();
    },[]);

    fetch(`http://127.0.0.1:8000/get_item/${params.id}`, {
            method:"GET",
            headers: {
                'accept': 'application/json'
            }
    })
        .then((res)=> res.json())
        .then((json) => {
            setGetId(json.id)
            setputPrice(json.price)
            setputTags(json.tags)
            setputTax(json.tax)
            setputValueName(json.value_list.name)
            setputImageName(json.value_list.image_list.name)
            setputUrl(json.value_list.image_list.url)
        })
    function deleteItem(id){
        fetch(`http://127.0.0.1:8000/delete_item/${id}`, {
            method: 'DELETE',
            headers: {
                'accept': 'application/json'
            }
        })
        .then((res)=>{
            if (res.status === 200){
                window.alert("Deleted")
                navigate("/list");
            }
        })
    }
    function updateItem(id){
        navigate(`/update/${id}`)
    }
    
    return(
        <div>
            <div>
            <a href="/create"><h2>Create Items</h2></a>
            <a href="/list"><h2>Data List</h2></a>
            </div>
            <h2>Product</h2>
            Price = {putPrice}<pre/>
            Tags = {putTags}<pre/>
            Tax = {putTax}<pre/>
            <h3><pre/>Value:<pre/></h3>
            Name ={putValueName}<pre/>
            <h3><pre/>Image:<pre/></h3>
            Name = {putImageName}<pre/>
            Urls = {putUrl}
            <div>
                <button onClick={() => deleteItem(params.id)}>Delete</button>
                <button onClick={() => updateItem(params.id)}>Update</button>
            </div>
        </div>
    )
}

export default Detail;