from flask import Flask
from pymongo import MongoClient


app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')  # Replace with your MongoDB connection string
db = client['netflix']  # Replace with your database name

@app.route('/')
def hello():
    collection = db['client_list']  # Replace with your collection name
    data = collection.find()
    result = [item for item in data]
    return str(result)
if __name__ == '__main__':
    app.run()