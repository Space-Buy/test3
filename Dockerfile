FROM python:slim

COPY ./app /app/

COPY requirements.txt ./
RUN pip install -r requirements.txt

CMD [ "uvicorn","--host","0.0.0.0","--port","80","app.main:app"]
