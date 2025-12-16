import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    axios
      .get(`http://localhost:5000/api/v1/products/${id}`)
      .then((res) => mounted && setProduct(res.data))
      .catch((err) => mounted && setError(err.message || 'Failed to load product'))
      .finally(() => mounted && setLoading(false));
    return () => (mounted = false);
  }, [id]);

  if (loading) return <div>Loading product...</div>;
  if (error) return <h2>Error: {error}</h2>;
  if (!product) return <h2>Product not found</h2>;

  return (
    <div className="product-details">
      <h1>{product.name}</h1>
      {(() => {
        const src = product.image
          ? (product.image.startsWith('http') ? product.image : `http://localhost:5000${product.image}`)
          : 'https://via.placeholder.com/600x400';
        return (
          <img
            src={src}
            alt={product.name}
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x400'; }}
          />
        );
      })()}
      <p>{product.description}</p>
      <h3>₹{product.price}</h3>

      <button className="btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default ProductDetails;

