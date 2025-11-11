## 🚀 Project Overview  

**An CNN-based flower image recognition system to support online flower sales** is a **web application** built to perform **Image Classification** on 102 flower species using **Deep Learning (Transfer Learning – Xception Model)**.  

The project provides a smooth and modern interface for users to:
- Upload or drag-and-drop an image of a flower.  
- Get instant AI-based predictions.  
- Store recognition history linked to their authenticated account.  

This system follows a **decoupled 3-tier architecture**, ensuring modularity, scalability, and high performance.

---

## 🏗️ Architecture & Technology Stack  

### 🖥️ Frontend (React.js)
- **Purpose:** Provide a seamless SPA (Single Page Application) experience.  
- **Technologies:** React.js, JavaScript (ES6+), CSS Modules.  
- **Highlights:**  
  - Drag-and-drop image upload  
  - Modal Login/Signup  
  - JWT-based session management  

### 🧠 Backend (Flask API)
- **Purpose:** Handle AI inference, user authentication, and database communication.  
- **Technologies:** Python, Flask, TensorFlow/Keras, PyJWT, Flask-CORS, PyMongo.  
- **Core Endpoints:**
  | Endpoint | Method | Description |
  |-----------|---------|-------------|
  | `/login` | POST | Authenticate user and issue JWT token |
  | `/predict` | POST | Run AI model (Xception) and log prediction history |

### 💾 Data Layer (MongoDB + AI Model)
- **Database:** MongoDB (PyMongo)  
- **Collections:**  
  - `users` → user credentials  
  - `histories` → prediction records  
- **AI Model:** Fine-tuned **Xception** model trained on **Oxford-102 Flowers Dataset**

---

## ⚙️ Deployment & Setup  

> ⚠️ **Important:** Start the **Backend (Flask API)** first, then the **Frontend (React)**.

### Step 1: Prerequisites  
Ensure you have:
- Python 3.8+  
- Node.js & npm  
- MongoDB (Local or Atlas Cluster)

### Step 2: Prepare Backend Files  
Make sure these files exist in the `backend/` directory:
```

flower_model.h5
cat_to_name.json
model_classes.json

````

### Step 3: Run Backend Server  

```bash
# Navigate to backend folder
cd backend

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate      # On Windows: .\venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run Flask API
python api.py
````

> The backend will run on **[http://localhost:5000](http://localhost:5000)**

---

### Step 4: Run Frontend Client

Open a new terminal:

```bash
cd frontend

# Install React dependencies
npm install

# Start the React server
npm start
```

> The client will open automatically on **[http://localhost:3000](http://localhost:3000)**

---

## 🔑 Testing Flow

1. Visit **[http://localhost:3000](http://localhost:3000)**
2. Click the **Account icon** → select **Login**
3. Log in using test credentials (existing in MongoDB `users` collection)
4. Drag and drop a flower image into the app
5. The system predicts the flower type
6. Check MongoDB → `histories` collection for saved records

---

## 🌸 Features Summary

✅  Real-time AI-based flower recognition

✅  Transfer Learning with **Xception Model**

✅  JWT authentication & session handling

✅  MongoDB history persistence

✅  Responsive React interface

✅  Scalable 3-tier architecture

---

## 🧩 Project Structure

```
Final_Project_Gr9/
│
├── backend/                     # Flask Backend
│   ├── api.py                   # Main API script
│   ├── requirements.txt         # Python dependencies
│   ├── flower_model.h5          # Trained AI model
│   ├── cat_to_name.json         # Flower label mapping
│   ├── model_classes.json       # Model classes
│   └── ...                      # Additional modules
│
├── frontend/                    # React Frontend
│   ├── src/                     # Components, Assets, etc.
│   ├── package.json             # Node dependencies
│   └── ...                      # Styles & assets
│
└── README.md
```

---

## 👥 Contributors

**Final Project — Group 9**

* 🧑‍💻 **Thái Khắc Hiếu**
* 👩‍💻 **Nguyễn Trọng Tấn Dũng**
* 👩‍💻 **Nguyễn Hoàng Bảo Trân**

---


> 🌼 *“Let your AI bloom — just like a flower.”* 🌼

