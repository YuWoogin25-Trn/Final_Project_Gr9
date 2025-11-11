from pymongo import MongoClient
from bson import ObjectId
import datetime

MONGO_URI = "mongodb://localhost:27017/"

DATABASE_NAME = "flowershop" 

client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]

users_collection = db["users"]
histories_collection = db["histories"]

def find_user_by_email(email):
    return users_collection.find_one({"email": email})

