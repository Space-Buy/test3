FROM python:slim

COPY ./app /app/

COPY requirements.txt ./
RUN pip install -r requirements.txt

CMD [ "uvicorn", "app.main:app" ]
