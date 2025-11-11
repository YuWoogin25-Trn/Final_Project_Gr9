import os
import json
import datetime
import jwt
import io
import numpy as np
from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import tensorflow.keras as keras
from tensorflow.keras.applications.xception import preprocess_input
from bson import ObjectId

from db import find_user_by_email, histories_collection

app = Flask(__name__)
CORS(app)

app.config["SECRET_KEY"] = "my_super_secret_key_12345"


print("Đang tải mô hình AI 'flower_model.h5'...")
model = keras.models.load_model("flower_model.h5")

print("Đang tải 'cat_to_name.json'...")
with open("cat_to_name.json", "r") as f:
    class_names_map = json.load(f)

print("Đang tải 'model_classes.json' (Bản đồ dịch AI)...")
with open("model_classes.json", "r") as f:
    model_classes_list = json.load(f)

def prepare_image(image_file_stream):
    IMG_SIZE = (224, 224) 
    
    img = Image.open(image_file_stream)
    
    if img.mode != 'RGB':
        img = img.convert('RGB')
        
    img = img.resize(IMG_SIZE)
    img_array = keras.preprocessing.image.img_to_array(img)
    img_array_expanded = np.expand_dims(img_array, axis=0)
    
    return preprocess_input(img_array_expanded)

@app.route("/")
def hello():
    return jsonify({"message": "Chào bạn, API Backend đang chạy!"})

@app.route("/login", methods=["POST"])
def login_user():
    try:
        data = request.json
        email = data.get("email")
        password = data.get("password")

        if not email or not password:
            return jsonify({"error": "Vui lòng nhập đủ email và mật khẩu"}), 400

        user = find_user_by_email(email)

        if not user:
            return jsonify({"error": "Email không tồn tại"}), 401

        if user["password"] == password:
            token = jwt.encode(
                {
                    "user_id": str(user["_id"]),
                    "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=24)
                },
                app.config["SECRET_KEY"],
                algorithm="HS256"
            )

            return jsonify({
                "message": "Đăng nhập thành công",
                "token": token,
                "user": {
                    "displayname": user.get("displayname"),
                    "email": user.get("email")
                }
            }), 200
        else:
            return jsonify({"error": "Mật khẩu không đúng"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/predict", methods=["POST"])
def predict_flower():
    token = None
    if "Authorization" in request.headers:
        token = request.headers["Authorization"].split(" ")[1]

    if not token:
        return jsonify({"error": "Bạn chưa đăng nhập (Thiếu token)"}), 401
    
    try:
        data = jwt.decode(token, app.config["SECRET_KEY"], algorithms=["HS256"])
        user_id = data["user_id"]
    except:
        return jsonify({"error": "Token không hợp lệ hoặc đã hết hạn"}), 401

    if 'flowerImage' not in request.files:
        return jsonify({"error": "Không tìm thấy file ảnh"}), 400
    
    file = request.files['flowerImage']
    if file.filename == '':
        return jsonify({"error": "File ảnh không có tên"}), 400

    try:
        prepared_image = prepare_image(file.stream)
        prediction = model.predict(prepared_image)
        
        class_index = int(np.argmax(prediction[0]))
        confidence_score = float(np.max(prediction[0])) * 100
        confidence_score_rounded = round(confidence_score, 2)
        

        folder_label = model_classes_list[class_index]
        
        if folder_label not in class_names_map:
            return jsonify({"error": f"Lỗi: Không tìm thấy nhãn '{folder_label}' trong file JSON"}), 500
            
        flower_name = class_names_map[folder_label]
        
        new_history = {
            "user_id": ObjectId(user_id),
            "flower_label": flower_name,
            "accuracy": confidence_score_rounded,
            "date_up": datetime.datetime.utcnow()
        }
        histories_collection.insert_one(new_history)
        
        return jsonify({
            "tenHoa": flower_name,
            "doChinhXac": confidence_score_rounded
        })
        
    except Exception as e:
        return jsonify({"error": f"Lỗi xử lý: {str(e)}"}), 500


# --- Chạy Server ---
if __name__ == "__main__":
    app.run(debug=True, port=5000)