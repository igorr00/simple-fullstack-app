import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductDialog.css';

const ProductDialog = ({ product, onClose }) => {
  const isEdit = !!product;

  const [name, setName] = useState(product?.name || '');
  const [category, setCategory] = useState(product?.category || '');
  const [price, setPrice] = useState(product?.price || '');
  const [imageFile, setImageFile] = useState(null);

  const categories = [
    "tablets",
    "smartphones",
    "laptops",
    "cameras",
    "gaming",
    "audio",
    "wearables",
    "accessories",
  ];

  useEffect(() => {
    if (isEdit) {
      setName(product.name);
      setPrice(product.price);
    }
  }, [product, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', name);
    formData.append('category', category);
    formData.append('price', price);
    if (imageFile) formData.append('image', imageFile);
  
    const url = product
      ? `http://localhost:5000/api/products/${product.id}`
      : 'http://localhost:5000/api/products';
  
    const method = product ? 'put' : 'post';
  
    try {
      await axios[method](url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      onClose(true);
    } catch (err) {
      console.error('Error saving product', err);
    }
  };

  return (
    <div className="dialog-backdrop" onClick={() => onClose(false)}>
      <div className="dialog" onClick={(e) => e.stopPropagation()}>
        <h2>{isEdit ? 'Edit Product' : 'Add Product'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />

          {imageFile && (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Preview"
              style={{ width: '100px', marginTop: '1rem' }}
            />
          )}

          <button className='btn-edit-add' type="submit">{product ? 'Update' : 'Add'} Product</button>
        </form>
      </div>
    </div>
  );
};

export default ProductDialog;