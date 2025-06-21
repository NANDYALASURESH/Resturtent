import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useNavigate,Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  Search, 
  MapPin, 
  Star, 
  Plus, 
  Minus,
  ChefHat,
  Clock,
  Truck,
  ChevronLeft,
  ChevronRight,
  Filter,
  Heart
} from 'lucide-react';
import '../Home/app.css';

const HomePage = () => {
  const [cartCount, setCartCount] = useState(0);
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [cart, setCart] = useState({});
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState(new Set());
  const [isOpen, setIsOpen] = useState(false);

  // Carousel data
  const carouselData = [
    {
      id: 1,
      title: "Super Fast Delivery",
      subtitle: "Get your food in 30 minutes or less",
      image: "🚚",
      bgClass: "bg-gradient-orange"
    },
    {
      id: 2,
      title: "Fresh & Hot Food",
      subtitle: "Quality ingredients, amazing taste",
      image: "🍕",
      bgClass: "bg-gradient-green"
    },
    {
      id: 3,
      title: "Best Deals & Offers",
      subtitle: "Save more on every order",
      image: "💰",
      bgClass: "bg-gradient-purple"
    }
  ];

  // Food items data
  const foodItems = [
    // Veg Starters
    {
      id: 1,
      name: "Paneer Tikka",
      description: "Grilled cottage cheese with spices",
      price: 299,
      category: "veg-starter",
      type: "veg",
      rating: 4.5,
      image: "🧀",
      prepTime: "15 min",
      popular: true
    },
    {
      id: 2,
      name: "Veg Spring Rolls",
      description: "Crispy rolls with fresh vegetables",
      price: 199,
      category: "veg-starter",
      type: "veg",
      rating: 4.2,
      image: "🥗",
      prepTime: "12 min"
    },
    {
      id: 3,
      name: "Mushroom 65",
      description: "Spicy fried mushroom bites",
      price: 249,
      category: "veg-starter",
      type: "veg",
      rating: 4.3,
      image: "🍄",
      prepTime: "18 min"
    },
    {
      id: 4,
      name: "Aloo Tikki Chat",
      description: "Potato patties with tangy chutneys",
      price: 149,
      category: "veg-starter",
      type: "veg",
      rating: 4.1,
      image: "🥔",
      prepTime: "10 min"
    },
    
    // Non-Veg Starters
    {
      id: 5,
      name: "Chicken Tikka",
      description: "Tender chicken pieces in aromatic spices",
      price: 399,
      category: "nonveg-starter",
      type: "nonveg",
      rating: 4.7,
      image: "🍗",
      prepTime: "20 min",
      popular: true
    },
    {
      id: 6,
      name: "Fish Fingers",
      description: "Crispy fried fish strips",
      price: 349,
      category: "nonveg-starter",
      type: "nonveg",
      rating: 4.4,
      image: "🐟",
      prepTime: "15 min"
    },
    {
      id: 7,
      name: "Mutton Seekh Kebab",
      description: "Spiced minced mutton on skewers",
      price: 449,
      category: "nonveg-starter",
      type: "nonveg",
      rating: 4.6,
      image: "🥩",
      prepTime: "25 min"
    },
    {
      id: 8,
      name: "Prawns Koliwada",
      description: "Crispy fried prawns with spices",
      price: 499,
      category: "nonveg-starter",
      type: "nonveg",
      rating: 4.5,
      image: "🦐",
      prepTime: "18 min"
    },

    // Main Course Items
    {
      id: 9,
      name: "Butter Chicken",
      description: "Creamy tomato-based chicken curry",
      price: 599,
      category: "nonveg-main",
      type: "nonveg",
      rating: 4.8,
      image: "🍛",
      prepTime: "30 min",
      popular: true
    },
    {
      id: 10,
      name: "Dal Makhani",
      description: "Rich and creamy black lentil curry",
      price: 299,
      category: "veg-main",
      type: "veg",
      rating: 4.6,
      image: "🍲",
      prepTime: "25 min"
    },
    {
      id: 11,
      name: "Biryani Special",
      description: "Aromatic basmati rice with spices",
      price: 499,
      category: "nonveg-main",
      type: "nonveg",
      rating: 4.7,
      image: "🍚",
      prepTime: "35 min",
      popular: true
    },
    {
      id: 12,
      name: "Paneer Butter Masala",
      description: "Cottage cheese in rich tomato gravy",
      price: 399,
      category: "veg-main",
      type: "veg",
      rating: 4.4,
      image: "🧀",
      prepTime: "20 min"
    }
  ];

  // Carousel auto-slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [carouselData.length]);

  // Filter items based on active category
  const filteredItems = activeCategory === 'all' 
    ? foodItems 
    : foodItems.filter(item => item.category === activeCategory || item.type === activeCategory);

  // Add to cart function
  const addToCart = (itemId) => {
    setCart(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    setCartCount(prev => prev + 1);
  };

  // Remove from cart function
  const removeFromCart = (itemId) => {
    if (cart[itemId] > 0) {
      setCart(prev => ({
        ...prev,
        [itemId]: prev[itemId] - 1
      }));
      setCartCount(prev => prev - 1);
    }
  };

  // Toggle favorite
  const toggleFavorite = (itemId) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId);
      } else {
        newFavorites.add(itemId);
      }
      return newFavorites;
    });
  };

  const onLogout = ()=>{
    Cookies.remove('jwt_token');
    navigate('/', { replace: true });

  }
  // Category buttons
  const categories = [
    { id: 'all', name: 'All Items', icon: '🍽️' },
    { id: 'veg', name: 'Vegetarian', icon: '🥗' },
    { id: 'nonveg', name: 'Non-Veg', icon: '🍖' },
    { id: 'veg-starter', name: 'Veg Starters', icon: '🥙' },
    { id: 'nonveg-starter', name: 'Non-Veg Starters', icon: '🍗' }
  ];

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container">
          <div className="navbar-content">
            {/* Logo */}
            <div>
            <div className="logo">
              <div className="logo-icon">
                <ChefHat size={24} />
              </div>
              <span className="logo-text">QuickBite</span>
            </div>

            {/* Location */}
            <div className="location">
              <MapPin size={16} />
              <span>Deliver to: Adoni, Andhra Pradesh</span>
            </div>
</div>
            {/* Search Bar */}
            <div className="search-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" size={16} />
                <input
                  type="text"
                  placeholder="Search for food, restaurants..."
                  className="search-input"
                />
              </div>
            </div>

            {/* Right side icons */}
            <div className="nav-actions">
              {/* Cart */}
              <button className="nav-button">
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="cart-badge">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Profile */}
              <div className="user-popup-container">
      <button className="nav-button" onClick={() => setIsOpen(!isOpen)}>
        <User size={24} />
      </button>

      {isOpen && (
        <div className="user-popup">
          <p>Hello, User!</p>
          <Link to="/profile">
          <button className="popup-button">Profile</button>
          </Link>
          <button className="popup-button" onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Search */}
      <div className="mobile-search">
        <div className="search-input-wrapper">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Search for food..."
            className="search-input"
          />
        </div>
      </div>

      {/* Carousel */}
      <div className='cur-3'>
      <div className="carousel">
        {carouselData.map((slide, index) => (
          <div
            key={slide.id}
            className={`carousel-slide ${slide.bgClass}`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`
            }}
          >
            <div className="carousel-content">
              <div className="carousel-emoji">{slide.image}</div>
              <h2 className="carousel-title">{slide.title}</h2>
              <p className="carousel-subtitle">{slide.subtitle}</p>
            </div>
          </div>
        ))}
        
        {/* Carousel Navigation */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length)}
          className="carousel-nav prev"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % carouselData.length)}
          className="carousel-nav next"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Indicators */}
        <div className="carousel-indicators">
          {carouselData.map((_, index) => (
            <button
  key={index}

  onClick={() => setCurrentSlide(index)}
  className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
/>

          ))}
        </div>
      </div>
      </div>
      {/* Main Content */}
      <div className="container">
        <div className="main-content">
          
          {/* Quick Stats */}


          {/* Category Filters */}
          <div>
            <div className="menu-header">
              <h2 className="menu-title">Our Menu</h2>
              <button className="filter-button">
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>
            
            <div className="category-filters">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Food Items Grid */}
          <div className="food-grid">
            {filteredItems.map((item) => (
              <div key={item.id} className="food-card">
                <div className="food-card-content">
                  {/* Item Header */}
                  <div className="food-card-header">
                    <div className="food-emoji">{item.image}</div>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className={`favorite-button ${favorites.has(item.id) ? 'active' : ''}`}
                    >
                      <Heart size={16} fill={favorites.has(item.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  
                  {/* Veg/Non-veg indicator */}
                  <div className="food-indicators">
                    <div className={`veg-indicator ${item.type}`}></div>
                    {item.popular && (
                      <span className="popular-badge">
                        Popular
                      </span>
                    )}
                  </div>

                  <h3 className="food-name">{item.name}</h3>
                  <p className="food-description">{item.description}</p>
                  
                  {/* Rating and time */}
                  <div className="food-meta">
                    <div className="rating">
                      <Star className="rating-star" size={12} />
                      <span>{item.rating}</span>
                    </div>
                    <div className="prep-time">
                      <Clock size={12} />
                      <span>{item.prepTime}</span>
                    </div>
                  </div>

                  {/* Price and Add to Cart */}
                  <div className="food-footer">
                    <span className="food-price">₹{item.price}</span>
                    
                    {cart[item.id] > 0 ? (
                      <div className="cart-controls">
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="cart-button minus"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="cart-count">{cart[item.id]}</span>
                        <button
                          onClick={() => addToCart(item.id)}
                          className="cart-button plus"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => addToCart(item.id)}
                        className="add-button"
                      >
                        <Plus size={12} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          <div className="load-more-section">
            <button className="load-more-button">
              Load More Items
            </button>
          </div>
        </div>
      </div>

      {/* Floating Cart Button (Mobile) */}
      {cartCount > 0 && (
        <div className="floating-cart">
          <button className="floating-cart-button">
            <div className="floating-cart-content">
              <ShoppingCart size={24} />
              <span className="floating-cart-count">{cartCount}</span>
            </div>
          </button>
        </div>
      )}
      
          {/* Quick Stats */}
          <div className="stats-grid">
            <div className="stat-card">
              <Truck className="stat-icon orange" />
              <p className="stat-text">Free Delivery</p>
              <p className="stat-value">Above ₹299</p>
            </div>
            <div className="stat-card">
              <Clock className="stat-icon green" />
              <p className="stat-text">Fast Delivery</p>
              <p className="stat-value">30 Minutes</p>
            </div>
            <div className="stat-card">
              <Star className="stat-icon yellow" />
              <p className="stat-text">Quality</p>
              <p className="stat-value">Top Rated</p>
            </div>
          </div>
    </div>
  );
};

export default HomePage;