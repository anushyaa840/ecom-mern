import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/v1/products');
        if (!res.ok) throw new Error('Network response was not ok');
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products: {error}</div>;

  return (
    <div className="products">
      <h1>Products</h1>

      <div className="product-grid">
        {products.map((product) => {
          const imgSrc = product.image
            ? product.image.startsWith('http')
              ? product.image
              : `http://localhost:5000${product.image}`
            : 'https://via.placeholder.com/300';

          return (
            <div key={product._id || product.id} className="product-card">
              <img
                src={imgSrc}
                alt={product.name}
                className="product-img"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/300';
                }}
              />

              <h3>{product.name}</h3>
              <p>₹{product.price}</p>

              <Link
                to={`/products/${product._id || product.id}`}
                className="btn"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Product;
