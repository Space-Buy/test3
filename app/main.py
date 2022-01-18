from fastapi import FastAPI
from fastapi import APIRouter, HTTPException
from starlette.requests import Request
from files.models import Item_PY
from files.crud_fun import add_item, remove_item, retrive_item,retrive_items, update_item
app= FastAPI()

from mongoengine import connect
connect(db="project",host="3.110.83.156",port=27017)

origins=["http://3.110.83.156:3000"]

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/")
def get():
    return {"hello":"world"}

@app.post("/items/",response_model=Item_PY)
def create_item(item: Item_PY,request:Request):
    if request:
        add_item(item)
        return item

@app.get('/get_items')
def get_items(request: Request):
    if request:
        item= retrive_items()
        context={"response":item}
        return context

@app.get('/get_item/{id}')
def get_item(id:str, request: Request):
    if request:
        return retrive_item(id)

@app.put('/update_item/{id}')
def put_item(id:str,item: Item_PY,request:Request):
    if request:
        return update_item(id,item)

@app.delete('/delete_item/{id}')
def delete_item(id:str,request:Request):
    if request:
        return remove_item(id)
