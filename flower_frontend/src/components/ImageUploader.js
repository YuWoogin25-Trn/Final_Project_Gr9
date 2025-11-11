import React, { useState, useRef } from 'react';
import './ImageUploader.css';
import cloudIcon from '../assets/cloud_icon.png';

function ImageUploader() {
  const [imagePreview, setImagePreview] = useState(null);
  const [status, setStatus] = useState('idle');
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = async (file) => {
    if (!file) return;
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('Loại file không hợp lệ. Vui lòng chọn .JPG, .PNG, .GIF');
      setImagePreview(null);
      setStatus('idle');
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Kích thước file quá lớn. Vui lòng chọn file dưới 5MB');
      setImagePreview(null);
      setStatus('idle');
      return;
    }

    setError(null);
    setResult(null);
    setImagePreview(URL.createObjectURL(file));
    setStatus('loading');

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Bạn chưa đăng nhập. Vui lòng đăng nhập để nhận diện.');
      setStatus('error');
      return;
    }

    const formData = new FormData();
    formData.append('flowerImage', file);

    try {
      const API_ENDPOINT = 'http://localhost:5000/predict';
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `Lỗi từ server: ${response.statusText}`);
      }
      
      setResult(data);
      setStatus('success');
    } catch (err) {
      console.error("Lỗi khi gọi API:", err);
      setError(err.message || 'Không thể kết nối tới mô hình.');
      setStatus('error');
    }
  };

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    setImagePreview(null);
    setStatus('idle');
    setError(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const renderResultContent = () => {
    switch (status) {
      case 'loading':
        return <div className="loading-spinner">Đang phân tích...</div>;
      case 'success':
        return (
          <div className="result-content">
            <h3>Kết quả nhận diện</h3>
            <p>{result?.tenHoa || 'Không rõ tên'}</p>
            <span>Độ tương tự: {result?.doChinhXac || 0}%</span>
          </div>
        );
      case 'error':
        return (
          <div className="error-text-result">
            <strong>Đã xảy ra lỗi!</strong>
            <p>{error}</p>
          </div>
        );
      case 'idle':
      default:
        return <div className="result-placeholder">Kết quả sẽ hiển thị ở đây</div>;
    }
  };

  return (
    <div className="uploader-container">
      <div className="drop-zone-wrapper">
        <div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onClick={() => (imagePreview ? null : fileInputRef.current.click())}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{ cursor: imagePreview ? 'default' : 'pointer' }}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileSelect(e.target.files[0])}
            style={{ display: 'none' }}
            accept="image/png, image/jpeg, image/gif"
          />
          {imagePreview ? (
            <>
              <img src={imagePreview} alt="Xem trước" className="image-preview" />
              <button className="remove-image-btn" onClick={handleRemoveImage}>
                &times;
              </button>
            </>
          ) : (
            <>
              <img src={cloudIcon} alt="Cloud" className="cloud-icon" />
              <p>Kéo & Thả hoặc <strong>bấm để tải ảnh</strong></p>
            </>
          )}
        </div>
        {error && status === 'idle' ? (
          <p className="error-text">{error}</p>
        ) : (
          <p className="helper-text">Hỗ trợ .JPG, .PNG, .GIF (Tối đa 5MB)</p>
        )}
      </div>
      <div className="result-box">
        {renderResultContent()}
      </div>
    </div>
  );
}

export default ImageUploader;