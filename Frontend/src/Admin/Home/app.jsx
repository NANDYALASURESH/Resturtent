import React, { useState } from 'react';
import {
  ChefHat,
  MapPin,
  User,
  Plus,
  Trash2,
  ClipboardList,
  CheckCircle,
  Clock,
  ShoppingCart,
  Edit3,
  Eye,
  Filter,
  Search,
  Bell,
  TrendingUp,
  DollarSign,
  Users
} from 'lucide-react';
import './app.css';

const AdminHomePage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    type: '',
    image: ''
  });

  const [items, setItems] = useState([
    { id: 1, name: 'Paneer Tikka', description: 'Grilled cottage cheese with spices', price: '250', category: 'veg-starter', type: 'veg', image: '🧀' },
    { id: 2, name: 'Chicken Tikka', description: 'Grilled chicken with aromatic spices', price: '300', category: 'nonveg-starter', type: 'nonveg', image: '🍗' }
  ]);

  const [orders, setOrders] = useState([
    { id: 1, customer: 'Rajesh Kumar', item: 'Paneer Tikka', quantity: 2, total: 500, status: 'New', time: '2 mins ago', phone: '+91 9876543210' },
    { id: 2, customer: 'Priya Sharma', item: 'Chicken Tikka', quantity: 1, total: 300, status: 'Preparing', time: '5 mins ago', phone: '+91 9876543211' },
    { id: 3, customer: 'Amit Singh', item: 'Paneer Tikka', quantity: 3, total: 750, status: 'Delivered', time: '15 mins ago', phone: '+91 9876543212' },
  ]);

  const handleLogout = () => {
    // Cookies.remove('jwt_token');
    // navigate('/', { replace: true });
    alert('Logout functionality would be implemented here');
  };

  const handleAddItem = () => {
    if (newItem.name && newItem.price) {
      setItems(prev => [...prev, { 
        ...newItem, 
        id: Date.now(),
        image: newItem.image || '🍽️'
      }]);
      setNewItem({ name: '', description: '', price: '', category: '', type: '', image: '' });
    }
  };

  const handleDeleteItem = (id) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const updateOrderStatus = (id, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.item.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const stats = {
    totalItems: items.length,
    pendingOrders: orders.filter(o => o.status === 'New').length,
    deliveredOrders: orders.filter(o => o.status === 'Delivered').length,
    totalRevenue: orders.filter(o => o.status === 'Delivered').reduce((sum, order) => sum + order.total, 0)
  };

  return (
    <div className="admin-container">
      {/* Enhanced Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-inner">
            <div className="navbar-left">
              <div className="logo-container">
                <div className="logo-icon">
                  <ChefHat className="h-6 w-6 text-white" />
                </div>
                <span className="logo-text">QuickBite Admin</span>
              </div>
              
              <div className="location-badge">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="location-text">Managing: Adoni, AP</span>
              </div>
            </div>

            <div className="navbar-right">
              <button className="notification-btn">
                <Bell className="h-5 w-5" />
                <span className="notification-badge">
                  {stats.pendingOrders}
                </span>
              </button>
              
              <div className="user-menu">
                <button 
                  className="user-menu-btn"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <User className="h-5 w-5 text-gray-600" />
                  <span className="user-menu-text">Admin</span>
                </button>
                
                {isOpen && (
                  <div className="dropdown-menu">
                    <div className="dropdown-header">
                      <p className="dropdown-header-name">Hello, Admin!</p>
                      <p className="dropdown-header-email">admin@quickbite.com</p>
                    </div>
                    <button className="dropdown-item">
                      Dashboard
                    </button>
                    <button className="dropdown-item">
                      Settings
                    </button>
                    <button 
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* Tab Navigation */}
        <div className="tab-container">
          <div className="tab-border">
            <nav className="tab-nav">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
                { id: 'menu', label: 'Menu Management', icon: ChefHat },
                { id: 'orders', label: 'Orders', icon: ClipboardList }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'active' : 'inactive'}`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-inner">
                  <div className="stat-card-content">
                    <p className="stat-card-label">Total Items</p>
                    <p className="stat-card-value">{stats.totalItems}</p>
                  </div>
                  <div className="stat-card-icon green">
                    <ShoppingCart className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-inner">
                  <div className="stat-card-content">
                    <p className="stat-card-label">Pending Orders</p>
                    <p className="stat-card-value">{stats.pendingOrders}</p>
                  </div>
                  <div className="stat-card-icon yellow">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-inner">
                  <div className="stat-card-content">
                    <p className="stat-card-label">Delivered</p>
                    <p className="stat-card-value">{stats.deliveredOrders}</p>
                  </div>
                  <div className="stat-card-icon green">
                    <CheckCircle className="h-6 w-6" />
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-inner">
                  <div className="stat-card-content">
                    <p className="stat-card-label">Revenue</p>
                    <p className="stat-card-value">₹{stats.totalRevenue}</p>
                  </div>
                  <div className="stat-card-icon blue">
                    <DollarSign className="h-6 w-6" />
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Orders Preview */}
            <div className="card">
              <h3 className="card-title">Recent Orders</h3>
              <div className="recent-orders-container">
                {orders.slice(0, 3).map(order => (
                  <div key={order.id} className="recent-order-item">
                    <div className="recent-order-left">
                      <div className="recent-order-icon">
                        <ClipboardList className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="recent-order-customer">{order.customer}</p>
                        <p className="recent-order-details">{order.item} × {order.quantity}</p>
                      </div>
                    </div>
                    <div className="recent-order-right">
                      <p className="recent-order-total">₹{order.total}</p>
                      <span className={`badge status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Menu Management Tab */}
        {activeTab === 'menu' && (
          <div className="space-y-8">
            {/* Add New Item Form */}
            <div className="card">
              <h3 className="card-title">Add New Food Item</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Item Name</label>
                  <input
                    type="text"
                    placeholder="Enter item name"
                    value={newItem.name}
                    onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <input
                    type="text"
                    placeholder="Enter description"
                    value={newItem.description}
                    onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Price (₹)</label>
                  <input
                    type="number"
                    placeholder="Enter price"
                    value={newItem.price}
                    onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. veg-starter"
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Type</label>
                  <select
                    value={newItem.type}
                    onChange={(e) => setNewItem({ ...newItem, type: e.target.value })}
                    className="form-select"
                  >
                    <option value="">Select type</option>
                    <option value="veg">Vegetarian</option>
                    <option value="nonveg">Non-Vegetarian</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label className="form-label">Emoji</label>
                  <input
                    type="text"
                    placeholder="🍽️"
                    value={newItem.image}
                    onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  onClick={handleAddItem}
                  className="btn-primary"
                >
                  <Plus className="h-4 w-4" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>

            {/* Items List */}
            <div className="card">
              <h3 className="card-title">Menu Items</h3>
              
              <div className="items-grid">
                {items.map(item => (
                  <div key={item.id} className="item-card">
                    <div className="item-card-header">
                      <div className="item-card-emoji">{item.image}</div>
                      <div className="item-card-actions">
                        <button className="btn-icon">
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          className="btn-icon delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    
                    <h4 className="item-card-title">{item.name}</h4>
                    <p className="item-card-description">{item.description}</p>
                    
                    <div className="item-card-footer">
                      <div className="item-card-price-container">
                        <span className="item-card-price">₹{item.price}</span>
                        <span className={`badge ${item.type}`}>
                          {item.type === 'veg' ? 'Veg' : 'Non-Veg'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-8">
            {/* Search and Filter */}
            <div className="card">
              <div className="search-filter-container">
                <div className="search-container">
                  <Search className="search-icon h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                </div>
                
                <div className="filter-container">
                  <Filter className="filter-icon h-4 w-4" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Orders</option>
                    <option value="new">New</option>
                    <option value="preparing">Preparing</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="orders-container">
              {filteredOrders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-card-inner">
                    <div className="order-card-left">
                      <div className="order-card-icon">
                        <ClipboardList className="h-5 w-5" />
                      </div>
                      
                      <div className="order-card-info">
                        <h4 className="order-card-customer">{order.customer}</h4>
                        <p className="order-card-phone">{order.phone}</p>
                        <p className="order-card-details">
                          {order.item} × {order.quantity} - <span style={{fontWeight: '500'}}>₹{order.total}</span>
                        </p>
                        <p className="order-card-time">{order.time}</p>
                      </div>
                    </div>
                    
                    <div className="order-card-right">
                      <span className={`badge status ${order.status.toLowerCase()}`}>
                        {order.status}
                      </span>
                      
                      <div className="order-card-actions">
                        {order.status === 'New' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Preparing')}
                            className="btn-blue"
                          >
                            Start Preparing
                          </button>
                        )}
                        
                        {order.status === 'Preparing' && (
                          <button
                            onClick={() => updateOrderStatus(order.id, 'Delivered')}
                            className="btn-success"
                          >
                            <CheckCircle className="h-4 w-4" />
                            <span>Mark Delivered</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminHomePage;