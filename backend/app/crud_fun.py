from app.models import (UserIn,UserIn_PY,Item,Item_PY,Value,Value_PY,Image,Image_PY)
from fastapi import HTTPException

def add_item(item):
    Images =Image(**item.value_list.image_list.dict())
    Images.save()
    Values= Value(**item.value_list.dict())
    Values.image_list = Images
    Values.save()
    Items=Item(**item.dict())
    Items.value_list = Values
    Items.save()

def retrive_items():
    datas=[]
    if Item.objects:
        for item in Item.objects:
            data={
                "id":str(item.id),
                "price":item.price,
                "tax":item.tax,
                "tags":item.tags,
                "value_list":{
                    "id":str(item.value_list.id),
                    "name":item.value_list.name,
                    "image_list":{
                        "id":str(item.value_list.image_list.id),
                        "url":item.value_list.image_list.url,
                        "name":item.value_list.image_list.name,
                    }
                }
            }
            datas.append(data)
        return datas
    else:
        raise HTTPException(status_code=404,detail="empty Items")

def retrive_item(id: str):
    if Item.objects(id=id):
        for item in Item.objects(id=id):
            data={
                "id":str(item.id),
                "price":item.price,
                "tax":item.tax,
                "tags":item.tags,
                "value_list":{
                    "id":str(item.value_list.id),
                    "name":item.value_list.name,
                    "image_list":{
                        "id":str(item.value_list.image_list.id),
                        "url":item.value_list.image_list.url,
                        "name":item.value_list.image_list.name,
                    }
                }
            }
            return data
    else:
            raise HTTPException(status_code=404,detail="Invalid Id")


def update_item(id:str,item):
    if Item.objects(id=id):
        for __item__ in Item.objects(id=id):
            item_id: str=__item__.id
            value_id:str=__item__.value_list.id
            image_id:str=__item__.value_list.image_list.id
        
        item_obj=Item.objects(id=item_id)
        value_obj=Value.objects(id=value_id)
        image_obj=Image.objects(id=image_id)

        if item_obj and value_obj and image_obj:
            item_obj.update_one(price=item.price,tax=item.tax,tags=item.tags,)
            value_obj.update_one(name=item.value_list.name)
            image_obj.update_one(url=item.value_list.image_list.url,name=item.value_list.image_list.name)
            return "Success"
    else:
        raise HTTPException(status_code=404,detail="Invalid Id")

def remove_item(id: str):
    if Item.objects(id=id):
        for __item__ in Item.objects(id=id):
            item_id: str=__item__.id
            value_id:str=__item__.value_list.id
            image_id:str=__item__.value_list.image_list.id
        item_obj=Item.objects(id=item_id)
        value_obj=Value.objects(id=value_id)
        image_obj=Image.objects(id=image_id)
        if item_obj and value_obj and image_obj:
            Item.objects(id=item_id).delete()
            Value.objects(id=value_id).delete()
            Image.objects(id=image_id).delete()
            return "Success"
    else:
        raise HTTPException(status_code=404,detail="Invalid Id")

