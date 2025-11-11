🌺 Flower AI Recognition & Persistent History System
Giới thiệu dự án (Professional Overview)
Dự án này là một ứng dụng web full-stack, được thiết kế để giải quyết bài toán Phân loại Hình ảnh (Image Classification) trong lĩnh vực Học Sâu (Deep Learning). Mục tiêu là cung cấp một giải pháp mượt mà, tốc độ nhanh để nhận diện 102 loài hoa từ ảnh đầu vào của người dùng, đồng thời lưu trữ lịch sử tìm kiếm thông qua hệ thống xác thực.

Dự án nhấn mạnh vào việc tích hợp các công nghệ hiện đại thành một kiến trúc phân tách rõ ràng (Decoupled Architecture).

🏗️ Kiến trúc & Công nghệ (Architecture & Technology Stack)
Hệ thống được xây dựng theo kiến trúc 3 Lớp (3-Tier Architecture), đảm bảo khả năng mở rộng và bảo mật:

1. 🖥️ Lớp Giao diện (Frontend - React.js)
Mục tiêu: Cung cấp Trải nghiệm Người dùng (UX) hiện đại, Single Page Application (SPA).

Công nghệ: React.js, JavaScript, CSS Modules.

Tính năng nổi bật: Giao diện kéo/thả ảnh (Drag-and-Drop), Modal Login, Quản lý trạng thái đăng nhập.

2. 🧠 Lớp Logic (Backend - Python/Flask)
Mục tiêu: Đảm nhận mọi tác vụ nặng (xử lý AI, bảo mật, giao tiếp DB).

Công nghệ: Python/Flask, PyJWT (JSON Web Tokens), TensorFlow/Keras (Mô hình AI).

API Cốt lõi:

/login: Xác thực người dùng và cấp Token.

/predict: Nhận Token, chạy mô hình AI (Xception), và lưu lịch sử.

3. 💾 Lớp Dữ liệu (AI Model & MongoDB)
AI Model: Sử dụng Transfer Learning trên kiến trúc Xception (Fine-tuned trên bộ dữ liệu Oxford 102).

Database: MongoDB (Dùng PyMongo).

Cấu trúc dữ liệu: users (Xác thực) và histories (Lưu bản ghi nhận diện).

⚡ Hướng dẫn triển khai (Deployment & Setup)
Bạn bắt buộc phải khởi chạy Backend (API) trước, sau đó là Frontend (Client).

Bước 1: Chuẩn bị Nguyên liệu & Database
MongoDB: Đảm bảo MongoDB Server đang chạy (Local: 27017 hoặc Atlas).

File AI: Đảm bảo 3 file sau nằm trong thư mục backend/:

flower_model.h5

cat_to_name.json

model_classes.json

Bước 2: Khởi chạy Backend Server (API)
Server này sẽ tải mô hình AI vào bộ nhớ và chạy trên cổng 5000.

Bash

# 1. Di chuyển vào thư mục backend
cd backend 

# 2. Cài đặt và kích hoạt môi trường ảo
python -m venv venv
source venv/bin/activate  # Dùng .\venv\Scripts\activate cho Windows

# 3. Cài đặt thư viện Python
pip install -r requirements.txt

# 4. Chạy Server
python api.py
Bước 3: Khởi chạy Frontend Client (React)
Mở một Terminal mới.

Di chuyển vào thư mục frontend:

Bash

cd frontend
Cài đặt dependencies và chạy Server:

Bash

npm install
npm start
Ứng dụng sẽ tự động mở tại http://localhost:3000.

🔑 Hướng dẫn Test (Testing Flow)
Truy cập http://localhost:3000.

Click Account Icon > Login.

Đăng nhập bằng tài khoản thử nghiệm trong MongoDB (đã sửa sang plain text).

Sau khi đăng nhập thành công, hãy kéo/thả một ảnh hoa.

Kiểm tra thành công: Bản ghi mới sẽ xuất hiện trong collection histories trên MongoDB của bạn.
