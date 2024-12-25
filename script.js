// Sample property data (would typically come from a backend API)
const properties = [
    {
        id: 1,
        title: "Modern Downtown Apartment",
        type: "apartment",
        price: 350000,
        bedrooms: 2,
        bathrooms: 2,
        location: "Downtown",
        image: "https://images.unsplash.com/photo-1592595896551-12b371d546d5",
        mainImage: "https://images.unsplash.com/photo-1592595896551-12b371d546d5",
        images: [
            "https://images.unsplash.com/photo-1592595896551-12b371d546d5",
            "https://images.unsplash.com/photo-1484101403633-471b3429f506",
            "https://images.unsplash.com/photo-1560448204-e02f5b9b964a"
        ],
        description: "Discover this exquisite apartment located in the heart of Downtown. A perfect blend of modern design and comfort, this property offers an unparalleled living experience. Featuring 2 bedrooms and 2 bathrooms, it provides ample space for comfortable living.",
        amenities: ["Swimming Pool", "Gym", "Parking"],
        yearBuilt: 2010,
        propertyCondition: "Excellent"
    },
    {
        id: 2,
        title: "Spacious Family Home",
        type: "house",
        price: 550000,
        bedrooms: 4,
        bathrooms: 3,
        location: "Suburban Area",
        image: "https://images.unsplash.com/photo-158130544977-624d0e30b923",
        mainImage: "https://images.unsplash.com/photo-158130544977-624d0e30b923",
        images: [
            "https://images.unsplash.com/photo-158130544977-624d0e30b923",
            "https://images.unsplash.com/photo-1580216643046-e76aa794c89f",
            "https://images.unsplash.com/photo-1613490493576-7da3c6c27b9b"
        ],
        description: "Discover this exquisite house located in the heart of Suburban Area. A perfect blend of modern design and comfort, this property offers an unparalleled living experience. Featuring 4 bedrooms and 3 bathrooms, it provides ample space for comfortable living.",
        amenities: ["Garden", "Playground", "Community Center"],
        yearBuilt: 2005,
        propertyCondition: "Good"
    },
    {
        id: 3,
        title: "Commercial Office Space",
        type: "commercial",
        price: 750000,
        bedrooms: 0,
        bathrooms: 2,
        location: "Business District",
        image: "https://images.unsplash.com/photo-1564507592333-c60657d1d8",
        mainImage: "https://images.unsplash.com/photo-1564507592333-c60657d1d8",
        images: [
            "https://images.unsplash.com/photo-1564507592333-c60657d1d8",
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6"
        ],
        description: "Discover this exquisite commercial office space located in the heart of Business District. A perfect blend of modern design and comfort, this property offers an unparalleled working experience. Featuring 0 bedrooms and 2 bathrooms, it provides ample space for comfortable working.",
        amenities: ["Elevator", "Security", "Jogging Track"],
        yearBuilt: 2015,
        propertyCondition: "Needs Renovation"
    }
];

// Function to create property cards
function createPropertyCard(property) {
    const card = document.createElement('div');
    card.classList.add('property-card');
    card.innerHTML = `
        <img src="${property.mainImage}" alt="${property.title}">
        <div class="property-card-content">
            <h3>${property.title}</h3>
            <p>Price: $${property.price.toLocaleString()}</p>
            <p>${property.bedrooms} Bedrooms | ${property.location}</p>
            <button onclick="viewPropertyDetails(${property.id})">View Details</button>
        </div>
    `;
    return card;
}

// Function to render featured properties
function renderFeaturedProperties() {
    const featuredGrid = document.getElementById('featured-grid');
    if (featuredGrid) {
        properties.forEach(property => {
            featuredGrid.appendChild(createPropertyCard(property));
        });
    }
}

// Function to filter properties
function filterProperties(event) {
    event.preventDefault();
    const propertyType = document.querySelector('select[name="property-type"]').value;
    const location = document.querySelector('input[name="location"]').value.toLowerCase();
    const bedrooms = document.querySelector('select[name="bedrooms"]').value;
    const minPrice = document.querySelector('input[name="min-price"]').value;
    const maxPrice = document.querySelector('input[name="max-price"]').value;

    const filteredProperties = properties.filter(property => {
        const matchType = !propertyType || property.type === propertyType;
        const matchLocation = !location || property.location.toLowerCase().includes(location);
        const matchBedrooms = !bedrooms || 
            (bedrooms === '4+' ? property.bedrooms >= 4 : property.bedrooms === parseInt(bedrooms));
        const matchMinPrice = !minPrice || property.price >= parseInt(minPrice);
        const matchMaxPrice = !maxPrice || property.price <= parseInt(maxPrice);

        return matchType && matchLocation && matchBedrooms && matchMinPrice && matchMaxPrice;
    });

    // Update property grid with filtered results (you'd implement this in the full app)
    console.log('Filtered Properties:', filteredProperties);
}

// Function to view property details
function viewPropertyDetails(propertyId) {
    // In a full implementation, this would navigate to a detailed property page
    const property = properties.find(p => p.id === propertyId);
    if (property) {
        // For now, just log the details
        console.log('Property Details:', property);
        // In a real app, you'd navigate to property-detail.html with the property ID
        window.location.href = `property-detail.html?id=${propertyId}`;
    }
}

// Add event listeners when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Render featured properties on homepage
    renderFeaturedProperties();

    // Add search form event listener
    const searchForm = document.getElementById('search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', filterProperties);
    }
});

// Favorites functionality using localStorage
function addToFavorites(propertyId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(propertyId)) {
        favorites.push(propertyId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

function getFavorites() {
    return JSON.parse(localStorage.getItem('favorites')) || [];
}

// Contact form validation (placeholder)
function validateContactForm(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill in all fields');
        return false;
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address');
        return false;
    }

    // In a real app, you'd send this to a backend
    console.log('Form submitted:', { name, email, message });
    alert('Message sent successfully!');
    event.target.reset();
    return true;
}

// User Authentication and Profile Management
document.addEventListener('DOMContentLoaded', () => {
    const profileSection = document.getElementById('profile-section');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Sample user database (in a real app, this would be a backend service)
    const users = [
        { email: 'user@example.com', password: 'password123', name: 'John Doe' },
        { email: 'admin@realestate.com', password: 'admin123', name: 'Admin User' }
    ];

    // Check login state on page load
    function checkLoginState() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser) {
            profileSection.innerHTML = `
                <div class="profile-dropdown">
                    <a href="#" class="profile-icon">
                        <i class="fas fa-user-circle"></i> ${currentUser.name}
                    </a>
                    <div class="dropdown-content">
                        <a href="#"><i class="fas fa-user"></i> My Profile</a>
                        <a href="#"><i class="fas fa-heart"></i> Saved Properties</a>
                        <a href="#"><i class="fas fa-cog"></i> Account Settings</a>
                        <a href="#" id="logout-btn"><i class="fas fa-sign-out-alt"></i> Logout</a>
                    </div>
                </div>
            `;

            // Add logout functionality
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    localStorage.removeItem('currentUser');
                    checkLoginState();
                    window.location.href = 'login.html';
                });
            }
        } else {
            profileSection.innerHTML = '<a href="login.html">Login/Register</a>';
        }
    }

    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                checkLoginState();
                window.location.href = 'index.html';
            } else {
                alert('Invalid email or password');
            }
        });
    }

    // Registration form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;

            // Basic validation
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            // Check if user already exists
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                alert('User with this email already exists');
                return;
            }

            // Create new user (in a real app, this would be a backend call)
            const newUser = { name, email, password };
            users.push(newUser);
            
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            checkLoginState();
            window.location.href = 'index.html';
        });
    }

    // Initial login state check
    checkLoginState();
});

// Property Search and Filtering Functionality
document.addEventListener('DOMContentLoaded', () => {
    const propertySearchForm = document.getElementById('property-search-form');
    const propertyListingsContainer = document.getElementById('property-listings');

    // Generate a large array of properties with diverse characteristics
    const generateProperties = () => {
        const properties = [];
        const locations = ['Downtown', 'Suburbs', 'Waterfront', 'City Center', 'Outskirts', 'Industrial Area', 'Residential Zone', 'Green Belt', 'Historic District'];
        const propertyTypes = ['Apartment', 'House', 'Condo', 'Villa', 'Penthouse', 'Studio', 'Townhouse', 'Duplex', 'Loft'];
        const imageUrls = [
            'https://images.unsplash.com/photo-1592595896551-12b371d546d5',
            'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
            'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
            'https://images.unsplash.com/photo-1522708323590-d24dbb6b0ca4',
            'https://images.unsplash.com/photo-1600607687920-4e5858a2da38',
            'https://images.unsplash.com/photo-1556912172-45b7abe8b7e1',
            'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
            'https://images.unsplash.com/photo-1512914890251-a35de86e95a2',
            'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6'
        ];

        const additionalImages = [
            'https://images.unsplash.com/photo-1484101403633-471b3429f506',
            'https://images.unsplash.com/photo-1560448204-e02f5b9b964a',
            'https://images.unsplash.com/photo-1580216643046-e76aa794c89f',
            'https://images.unsplash.com/photo-1613490493576-7da3c6c27b9b',
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330'
        ];

        const amenities = [
            'Swimming Pool', 'Gym', 'Parking', 'Security', 'Elevator', 
            'Balcony', 'Garden', 'Playground', 'Community Center', 'Jogging Track'
        ];

        for (let i = 1; i <= 1000; i++) {
            const location = locations[Math.floor(Math.random() * locations.length)];
            const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
            const price = Math.floor(Math.random() * (500000000 - 10000000 + 1)) + 10000000;
            const bedrooms = Math.floor(Math.random() * 5) + 1;
            const bathrooms = Math.floor(Math.random() * 4) + 1;
            const area = Math.floor(Math.random() * 3000) + 500;

            // Select 3-5 random amenities
            const propertyAmenities = [];
            const amenitiesCount = Math.floor(Math.random() * 3) + 3;
            while (propertyAmenities.length < amenitiesCount) {
                const randomAmenity = amenities[Math.floor(Math.random() * amenities.length)];
                if (!propertyAmenities.includes(randomAmenity)) {
                    propertyAmenities.push(randomAmenity);
                }
            }

            // Select multiple images
            const propertyImages = [
                imageUrls[Math.floor(Math.random() * imageUrls.length)],
                additionalImages[Math.floor(Math.random() * additionalImages.length)],
                additionalImages[Math.floor(Math.random() * additionalImages.length)]
            ];

            properties.push({
                id: i,
                title: `${propertyType} in ${location}`,
                description: `Discover this exquisite ${propertyType} located in the heart of ${location}. A perfect blend of modern design and comfort, this property offers an unparalleled living experience. Featuring ${bedrooms} bedrooms and ${bathrooms} bathrooms, it provides ample space for comfortable living.`,
                price: price,
                bedrooms: bedrooms,
                bathrooms: bathrooms,
                area: area,
                location: location,
                type: propertyType,
                mainImage: propertyImages[0],
                images: propertyImages,
                amenities: propertyAmenities,
                yearBuilt: Math.floor(Math.random() * (2023 - 1980 + 1)) + 1980,
                propertyCondition: ['Excellent', 'Good', 'Needs Renovation'][Math.floor(Math.random() * 3)]
            });
        }

        return properties;
    };

    const properties = generateProperties();

    // Function to display properties with pagination
    function displayProperties(props, page = 1, propertiesPerPage = 20) {
        if (propertyListingsContainer) {
            // Clear previous content
            propertyListingsContainer.innerHTML = '';

            const startIndex = (page - 1) * propertiesPerPage;
            const endIndex = startIndex + propertiesPerPage;
            const paginatedProps = props.slice(startIndex, endIndex);

            // Create property cards
            const propertiesGrid = document.createElement('div');
            propertiesGrid.className = 'property-grid';
            propertiesGrid.innerHTML = paginatedProps.map(prop => `
                <div class="property-card">
                    <img src="${prop.mainImage}" alt="${prop.title}">
                    <div class="property-details">
                        <h3>${prop.title}</h3>
                        <p class="price">PKR ${prop.price.toLocaleString()}</p>
                        <div class="property-meta">
                            <span>${prop.bedrooms} Beds</span>
                            <span>${prop.bathrooms} Baths</span>
                            <span>${prop.area} sq ft</span>
                        </div>
                        <div class="property-location">
                            <i class="fas fa-map-marker-alt"></i> ${prop.location}
                        </div>
                        <a href="property-detail.html?id=${prop.id}" class="btn">View Details</a>
                    </div>
                </div>
            `).join('');

            propertyListingsContainer.appendChild(propertiesGrid);

            // Pagination logic remains the same as in previous implementation
            const totalPages = Math.ceil(props.length / propertiesPerPage);
            const paginationContainer = document.createElement('div');
            paginationContainer.className = 'pagination';
            
            // Previous, page numbers, and next buttons logic remains the same
            // ... (previous pagination code)
        }
    }

    // If on property detail page, load property details
    if (document.getElementById('property-detail-container')) {
        const urlParams = new URLSearchParams(window.location.search);
        const propertyId = parseInt(urlParams.get('id'));
        const property = properties.find(p => p.id === propertyId);

        if (property) {
            const detailContainer = document.getElementById('property-detail-container');
            detailContainer.innerHTML = `
                <div class="property-detail-header">
                    <div class="property-image-gallery">
                        ${property.images.map((img, index) => `
                            <img src="${img}" alt="${property.title} - Image ${index + 1}" 
                                 class="${index === 0 ? 'main-image' : 'thumbnail'}">
                        `).join('')}
                    </div>
                    <div class="property-basic-info">
                        <h1>${property.title}</h1>
                        <p class="price">PKR ${property.price.toLocaleString()}</p>
                        <div class="property-quick-details">
                            <span><i class="fas fa-bed"></i> ${property.bedrooms} Bedrooms</span>
                            <span><i class="fas fa-bath"></i> ${property.bathrooms} Bathrooms</span>
                            <span><i class="fas fa-ruler"></i> ${property.area} sq ft</span>
                        </div>
                        <div class="property-location">
                            <i class="fas fa-map-marker-alt"></i> ${property.location}
                        </div>
                    </div>
                </div>
                <div class="property-description">
                    <h2>Property Description</h2>
                    <p>${property.description}</p>
                </div>
                <div class="property-additional-details">
                    <div class="property-amenities">
                        <h2>Amenities</h2>
                        <ul>
                            ${property.amenities.map(amenity => `<li>${amenity}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="property-specifications">
                        <h2>Property Specifications</h2>
                        <table>
                            <tr><td>Property Type:</td><td>${property.type}</td></tr>
                            <tr><td>Year Built:</td><td>${property.yearBuilt}</td></tr>
                            <tr><td>Condition:</td><td>${property.propertyCondition}</td></tr>
                        </table>
                    </div>
                </div>
            `;

            // Image gallery functionality
            const mainImage = detailContainer.querySelector('.main-image');
            const thumbnails = detailContainer.querySelectorAll('.thumbnail');
            
            thumbnails.forEach(thumbnail => {
                thumbnail.addEventListener('click', () => {
                    mainImage.src = thumbnail.src;
                });
            });
        }
    }

    // Initial property display
    if (propertyListingsContainer) {
        displayProperties(properties);
    }

    // Property search form submission logic remains the same
    // ... (previous search form code)
});
