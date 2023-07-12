from flask import Flask, render_template, jsonify
import pandas as pd 
import json
from pymongo import MongoClient


app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')  # Replace with your MongoDB connection string
db = client['netflix']  # Replace with your database name

@app.route('/')
def main():
    return render_template('index.html')

@app.route('/api')
def api():
    collection = db['client_list']  # collection name
    data = collection.find({},{"_id":0})
    data= list(data)
    data = json.dumps(data).replace("NaN","0")
    
    return data

if __name__ == '__main__':
    app.run(debug=False,port=5503)