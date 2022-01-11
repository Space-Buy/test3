from mongoengine.fields import DictField, EmailField, FloatField, IntField, ListField, ReferenceField, StringField
from pydantic import BaseModel,EmailStr
from mongoengine.document import Document
from typing import Dict, ItemsView, Optional, Set, List

class Image_PY(BaseModel):
    url: str
    name: str

class Image(Document):
    url: str =StringField(max_length=100)
    name: str =StringField(max_length=100)

class Value_PY(BaseModel):
    name: str
    image_list: Optional[Image_PY] = None

class Value(Document):
    name: str =StringField(max_length=100)
    image_list= ReferenceField(Image)

class Item_PY(BaseModel):
    price: float
    tax: Optional[float] = None
    tags: str 
    value_list: Optional[Value_PY] = None

class Item(Document):
    price = FloatField()
    tax = FloatField()
    tags =StringField()
    value_list =ReferenceField(Value)

class UserIn_PY(BaseModel):
    username: str
    password: str
    email: EmailStr
    full_name: Optional[str] = None

# values=('true','false')

class UserIn(Document):
    username: str =StringField(max_length=100)
    password: str =StringField(max_length=100)
    email: EmailStr =EmailField(unique=True)
    full_name: Optional[str] =StringField(max_length=100)