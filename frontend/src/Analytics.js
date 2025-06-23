import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Analytics.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const CATEGORIES = [
  "tablets", "smartphones", "laptops", "cameras",
  "gaming", "audio", "wearables", "accessories"
];

const priceRanges = [
  { label: 'Under $100', min: 0, max: 100 },
  { label: '$100-$500', min: 100, max: 500 },
  { label: '$500-$1000', min: 500, max: 1000 },
  { label: 'Over $1000', min: 1000, max: Infinity }
];

const Analytics = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));
  const isEmpty = (str) => str === null || str === undefined || str === '';
  const userImage = isEmpty(user?.picture) ? 'images/user-default.png' : user.picture;

  useEffect(() => {
    const fetchData = async () => {
      const [productsRes, usersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/products'),
        axios.get('http://localhost:5000/api/users')
      ]);
      setProducts(productsRes.data);
      setUsers(usersRes.data);
    };
    fetchData();
  }, []);

  const categoryCount = CATEGORIES.map(cat => {
    const count = products.filter(p => p.category === cat).length;
    return {
      name: cat.charAt(0).toUpperCase() + cat.slice(1),
      count,
      percent: ((count / products.length) * 100).toFixed(1)
    };
  }).filter(c => c.count > 0);

  const priceDistribution = priceRanges.map(range => ({
    name: range.label,
    value: products.filter(p => p.price >= range.min && p.price < range.max).length
  }));

  return (
    <div className="analytics">
        <header className="top-nav">
            <img src={`http://localhost:5000/${userImage}`} alt="Profile" className="profile-pic" onClick={() => window.location.href = '/profilePicture'} />
            <nav className="nav-links">
            <a href="/homeAdmin"><b>Home</b></a>
            <a href="/activeProducts"><b>Products</b></a>
            <a href="/activeUsers"><b>Users</b></a>
            <a href="/profile"><b>Profile</b></a>
            </nav>
        </header>

        <div className="blob blob-top-right">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad1" x1="50%" y1="25%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#ffee00', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#c703ce', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <path fill="url(#grad1)" d="M28.7,-38.5C34.6,-35.2,35.1,-23.4,38.9,-12.5C42.6,-1.6,49.6,8.4,50.1,19.2C50.6,30,44.6,41.6,35.2,42C25.8,42.5,12.9,31.7,-1.1,33.3C-15.2,34.8,-30.3,48.7,-45.2,50C-60,51.4,-74.6,40.2,-81.1,25.2C-87.6,10.2,-86.1,-8.7,-75.2,-19C-64.3,-29.2,-44.1,-31,-30,-31.7C-15.9,-32.4,-7.9,-32,1.7,-34.4C11.4,-36.8,22.7,-41.9,28.7,-38.5Z" transform="translate(100 100)" />
            </svg>
        </div>

        <div className="blob blob-bottom-left">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="grad2" x1="10%" y1="0%" x2="90%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#e5e7eb', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#8b5cf6', stopOpacity: 1 }} />
                </linearGradient>
            </defs>
            <path fill="url(#grad2)" d="M29.3,-43.4C39.2,-33,49.5,-26.2,52.9,-16.9C56.3,-7.6,52.9,4.2,50.6,18C48.3,31.8,47.1,47.5,38.9,55.3C30.6,63,15.3,62.9,0.7,61.9C-13.9,60.9,-27.7,59.1,-33.5,50.5C-39.3,41.9,-36.9,26.6,-32.8,16.1C-28.7,5.7,-22.8,0.1,-26.1,-14.2C-29.3,-28.5,-41.7,-51.5,-38.9,-64.1C-36.1,-76.8,-18,-79.1,-4.2,-73.3C9.6,-67.5,19.3,-53.7,29.3,-43.4Z" transform="translate(100 100)" />
            </svg>
        </div>

        <div className="main-content-wrapper-analytics">
            <div className="analytics-content">
                <div className="left-panel">
                <div className="card">
                    <h3>Top Categories Performance</h3>
                    {categoryCount.map(cat => (
                    <div key={cat.name} className="category-row">
                        <span className={`dot ${cat.name.toLowerCase()}`}></span>
                        <span>{cat.name}</span>
                        <div className="category-info">
                            <strong>{cat.count} products</strong>
                            <div className="category-percent">{cat.percent}% of total</div>
                        </div>
                    </div>
                    ))}
                </div>

                <div className="card">
                    <h3>Price Distribution</h3>
                    <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={priceDistribution}>
                        <XAxis dataKey="name" />
                        <YAxis allowDecimals={false} />
                        <Tooltip />
                        <Bar dataKey="value" fill="#4285F4" />
                    </BarChart>
                    </ResponsiveContainer>
                </div>
                </div>

                <div className="right-panel">
                <div className="stat-card purple">
                    <h1>{products.length}</h1>
                    <p>Total Products</p>
                </div>
                <div className="stat-card yellow">
                    <h1>{users.length}</h1>
                    <p>Active Users</p>
                </div>
                </div>
            </div>
            </div>
    </div>
  );
};

export default Analytics;