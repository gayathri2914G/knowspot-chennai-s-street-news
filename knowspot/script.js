document.addEventListener('DOMContentLoaded', function() {
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const postLink = document.getElementById('post-link');
    const mobilePostLink = document.getElementById('mobile-post-link');
    const homeLink = document.getElementById('home-link');
    const mobileHomeLink = document.getElementById('mobile-home-link');
    const alertsLink = document.getElementById('alerts-link');
    const mobileAlertsLink = document.getElementById('mobile-alerts-link');
    const goodnewsLink = document.getElementById('goodnews-link');
    const mobileGoodnewsLink = document.getElementById('mobile-goodnews-link');
    const postFormSection = document.getElementById('post-form-section');
    const postsSection = document.getElementById('posts-section');
    const cancelPostBtn = document.getElementById('cancel-post');
    const postForm = document.getElementById('post-form');
    const postImageInput = document.getElementById('post-image');
    const imagePreview = document.getElementById('image-preview');
    const postsContainer = document.getElementById('posts-container');
    const loadMoreBtn = document.getElementById('load-more');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const areaSearchInput = document.getElementById('area-search');
    const sortBySelect = document.getElementById('sort-by');
    const notificationContainer = document.getElementById('notification-container');

    // Sample data --------on the page default 
    let posts = [
        {
            id: 1,
            type: 'alert',
            title: 'No Water Supply',
            location: 'KK Nagar, 4th Cross Street',
            date: '2023-05-08T06:30',
            details: 'Water supply has been cut since morning. No tankers arrived yet.',
            image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            upvotes: 8,
            verified: true,
            reviews: [
                { id: 1, author: 'Ramesh', text: 'Still no water as of 5 PM', date: '2023-05-08T17:00' },
                { id: 2, author: 'Priya', text: 'Tankers arrived at 7 PM', date: '2023-05-08T19:00' }
            ]
        },
        {
            id: 2,
            type: 'goodnews',
            title: 'Australia Café Opened!',
            location: '3rd Street, Anna Nagar',
            date: '2023-05-08T17:00',
            details: 'Grand opening of Australia Café – offering free iced coffee today only!',
            image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            upvotes: 15,
            verified: true,
            reviews: [
                { id: 1, author: 'Arun', text: 'Great coffee and ambiance!', date: '2023-05-08T18:30' },
                { id: 2, author: 'Meena', text: 'Free coffee was amazing!', date: '2023-05-08T19:45' }
            ]
        },
        {
            id: 3,
            type: 'alert',
            title: 'Power Cut in 5th Street',
            location: 'T Nagar, 5th Street',
            date: '2023-05-09T10:00',
            details: 'Power has been out since 9 AM. EB says it will be restored by 6 PM.',
            image: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            upvotes: 5,
            verified: false,
            reviews: [
                { id: 1, author: 'Suresh', text: 'Power came back at 5:30 PM', date: '2023-05-09T17:30' }
            ]
        },
        {
            id: 4,
            type: 'goodnews',
            title: 'Free Eye Camp',
            location: 'Near Velachery Temple',
            date: '2023-05-10T09:00',
            details: 'Free eye checkup and glasses for seniors today from 9 AM to 5 PM.',
            image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            upvotes: 12,
            verified: true,
            reviews: [
                { id: 1, author: 'Geetha', text: 'Very helpful doctors', date: '2023-05-10T11:00' },
                { id: 2, author: 'Mohan', text: 'Got free reading glasses', date: '2023-05-10T14:30' }
            ]
        }
    ];

    // sort settings--------------
    let currentFilter = 'all';
    let currentSort = 'recent';
    let currentArea = '';
    let displayedPosts = 4;

    // Mobile Menu -------------------
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });

    // Navigation Links----------------
    function showPostForm() {
        postFormSection.style.display = 'block';
        postsSection.style.display = 'none';
        mobileMenu.classList.remove('active');
    }

    function showPosts() {
        postFormSection.style.display = 'none';
        postsSection.style.display = 'block';
        mobileMenu.classList.remove('active');
    }

    postLink.addEventListener('click', function(e) {
        e.preventDefault();
        showPostForm();
    });

    mobilePostLink.addEventListener('click', function(e) {
        e.preventDefault();
        showPostForm();
    });

    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        showPosts();
    });

    mobileHomeLink.addEventListener('click', function(e) {
        e.preventDefault();
        showPosts();
    });

    alertsLink.addEventListener('click', function(e) {
        e.preventDefault();
        currentFilter = 'alert';
        updateFilterButtons();
        renderPosts();
        showPosts();
    });

    mobileAlertsLink.addEventListener('click', function(e) {
        e.preventDefault();
        currentFilter = 'alert';
        updateFilterButtons();
        renderPosts();
        showPosts();
    });

    goodnewsLink.addEventListener('click', function(e) {
        e.preventDefault();
        currentFilter = 'goodnews';
        updateFilterButtons();
        renderPosts();
        showPosts();
    });

    mobileGoodnewsLink.addEventListener('click', function(e) {
        e.preventDefault();
        currentFilter = 'goodnews';
        updateFilterButtons();
        renderPosts();
        showPosts();
    });

    // Cancel Post--------------
    cancelPostBtn.addEventListener('click', function() {
        postForm.reset();
        imagePreview.style.display = 'none';
        imagePreview.innerHTML = '';
        showPosts();
    });

    // Image Preview----------------
    postImageInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                imagePreview.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
                imagePreview.style.display = 'block';
            };
            
            reader.readAsDataURL(file);
        } else {
            imagePreview.style.display = 'none';
            imagePreview.innerHTML = '';
        }
    });

    // Form Submission----------------
    postForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('post-type').value;
        const title = document.getElementById('post-title').value;
        const location = document.getElementById('post-location').value;
        const date = document.getElementById('post-date').value;
        const details = document.getElementById('post-details').value;
        
        let imageUrl = '';
        if (postImageInput.files.length > 0) {
         
            imageUrl = type === 'alert' ? 
                'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80' :
                'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80';
        }
        
        const newPost = {
            id: posts.length + 1,
            type: type,
            title: title,
            location: location,
            date: date,
            details: details,
            image: imageUrl,
            upvotes: 0,
            verified: false,
            reviews: []
        };
        
        posts.unshift(newPost); // Add new post to beginning of array
        postForm.reset();
        imagePreview.style.display = 'none';
        imagePreview.innerHTML = '';
        
        // Show notification------------------
        showNotification(
            type === 'alert' ? 'New Alert Posted' : 'Good News Shared',
            type === 'alert' ? 'alert' : 'goodnews',
            title,
            imageUrl
        );

        renderPosts();
        showPosts();
    });

    // Filter Buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            currentFilter = this.dataset.filter;
            updateFilterButtons();
            renderPosts();
        });
    });

    function updateFilterButtons() {
        filterButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.filter === currentFilter) {
                button.classList.add('active');
            }
        });
    }

    // Area Search-----------
    areaSearchInput.addEventListener('input', function() {
        currentArea = this.value.toLowerCase();
        renderPosts();
    });

    // Sort Select----------
    sortBySelect.addEventListener('change', function() {
        currentSort = this.value;
        renderPosts();
    });

    // Load More Button------------
    loadMoreBtn.addEventListener('click', function() {
        displayedPosts += 4;
        renderPosts();
    });

   
    function renderPosts() {
        // Filter posts--------------
        let filteredPosts = posts.filter(post => {
            const matchesFilter = currentFilter === 'all' || post.type === currentFilter;
            const matchesArea = !currentArea || post.location.toLowerCase().includes(currentArea);
            return matchesFilter && matchesArea;
        });

        // Sort posts--------------
        filteredPosts = sortPosts(filteredPosts, currentSort);

        // Limit displayed posts------
        const postsToDisplay = filteredPosts.slice(0, displayedPosts);

        // Clear container-----------
        postsContainer.innerHTML = '';

        // Add posts to container-----------
        if (postsToDisplay.length === 0) {
            postsContainer.innerHTML = '<p class="no-posts">No posts found matching your criteria.</p>';
        } else {
            postsToDisplay.forEach(post => {
                const postElement = createPostElement(post);
                postsContainer.appendChild(postElement);
            });
        }

        // Show/hide load more button------------
        loadMoreBtn.style.display = filteredPosts.length > displayedPosts ? 'block' : 'none';
    }

    // Sort Posts on filtering-----------
    function sortPosts(posts, sortBy) {
        return [...posts].sort((a, b) => {
            if (sortBy === 'recent') {
                return new Date(b.date) - new Date(a.date);
            } else if (sortBy === 'popular') {
                return b.upvotes - a.upvotes;
            } else if (sortBy === 'verified') {
                return (b.verified === a.verified) ? 0 : b.verified ? -1 : 1;
            }
            return 0;
        });
    }

    // Creatimg Post Element----------
    function createPostElement(post) {
        const postElement = document.createElement('div');
        postElement.className = `post-card ${post.type}`;
        
        const dateObj = new Date(post.date);
        const formattedDate = dateObj.toLocaleString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        // Reviews HTML
        let reviewsHTML = '';
        if (post.reviews && post.reviews.length > 0) {
            reviewsHTML = `
                <div class="reviews-section">
                    <h4>Reviews (${post.reviews.length})</h4>
                    <div class="review-list">
                        ${post.reviews.map(review => `
                            <div class="review-item">
                                <div class="review-author">${review.author}</div>
                                <div class="review-text">${review.text}</div>
                                <div class="review-date">${new Date(review.date).toLocaleString()}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        postElement.innerHTML = `
            <div class="post-card-header">
                <span class="post-type ${post.type}">${post.type === 'alert' ? 'Alert' : 'Good News'}</span>
                <h3 class="post-title">${post.title}</h3>
                <p class="post-location"><i class="fas fa-map-marker-alt"></i> ${post.location}</p>
                <p class="post-date"><i class="far fa-clock"></i> ${formattedDate}</p>
            </div>
            <div class="post-card-body">
                ${post.image ? `
                    <div class="post-image-container">
                        <img src="${post.image}" alt="${post.title}">
                    </div>
                ` : ''}
                <p class="post-details">${post.details}</p>
                ${post.verified ? `
                    <div class="verified-badge">
                        <i class="fas fa-check-circle"></i> Verified by locals
                    </div>
                ` : ''}
                ${reviewsHTML}
                <div class="review-form">
                    <textarea class="review-input" placeholder="Add your review..."></textarea>
                    <button class="review-submit"><i class="fas fa-paper-plane"></i></button>
                </div>
            </div>
            <div class="post-card-footer">
                <div class="post-actions">
                    <div class="post-action upvote-btn" data-post-id="${post.id}">
                        <i class="fas fa-thumbs-up"></i> <span>${post.upvotes}</span>
                    </div>
                    <div class="post-action comment-btn" data-post-id="${post.id}">
                        <i class="far fa-comment"></i> <span>${post.reviews.length}</span>
                    </div>
                </div>
                <button class="delete-btn" data-post-id="${post.id}">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        `;

        // Add event listeners to buttons--------------
        const upvoteBtn = postElement.querySelector('.upvote-btn');
        upvoteBtn.addEventListener('click', function() {
            const postId = parseInt(this.dataset.postId);
            const post = posts.find(p => p.id === postId);
            post.upvotes++;
            this.querySelector('span').textContent = post.upvotes;
            
            // Verify if upvotes reach 5-----------
            if (post.upvotes >= 5 && !post.verified) {
                post.verified = true;
                renderPosts();
            }
        });

        const reviewSubmitBtn = postElement.querySelector('.review-submit');
        const reviewInput = postElement.querySelector('.review-input');
        reviewSubmitBtn.addEventListener('click', function() {
            const reviewText = reviewInput.value.trim();
            if (reviewText) {
                const postId = parseInt(postElement.querySelector('.upvote-btn').dataset.postId);
                const post = posts.find(p => p.id === postId);
                
                const newReview = {
                    id: post.reviews.length + 1,
                    author: 'You', // In a real app, this would be the logged in user
                    text: reviewText,
                    date: new Date().toISOString()
                };
                
                post.reviews.push(newReview);
                reviewInput.value = '';
                renderPosts();
            }
        });

        const deleteBtn = postElement.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this post?')) {
                const postId = parseInt(this.dataset.postId);
                posts = posts.filter(p => p.id !== postId);
                renderPosts();
            }
        });

        return postElement;
    }

    // Show Notification
    function showNotification(title, type, message, imageUrl) {
        const notification = document.createElement('div');
        notification.className = `notification ${type} show`;
        
        notification.innerHTML = `
            <div class="notification-icon">
                ${type === 'alert' ? '<i class="fas fa-exclamation-circle"></i>' : '<i class="fas fa-check-circle"></i>'}
            </div>
            <div class="notification-content">
                <h4 class="notification-title">${title}</h4>
                <p class="notification-message">${message}</p>
                ${imageUrl ? `<img src="${imageUrl}" class="notification-image" alt="Notification Image">` : ''}
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        notificationContainer.appendChild(notification);
        
        // Close button----------
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', function() {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-remove after 5 seconds----------
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
    }

    // Initial render---------
    renderPosts();

    //  notification after 3 seconds-----------
    setTimeout(() => {
        showNotification(
            'New Alert Nearby',
            'alert',
            'Water logging reported in Velachery main road',
            'https://images.unsplash.com/photo-1591488320449-011701bb6704?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
        );
    }, 3000);
});
// Auth DOM Elements-------------------------------
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const loginBtn = document.querySelector('.login-btn');
const signupBtn = document.querySelector('.signup-btn');
const closeModalBtns = document.querySelectorAll('.close-modal');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const userProfile = document.createElement('div');
userProfile.className = 'user-profile';
userProfile.innerHTML = `
    <div class="user-avatar">U</div>
    <span class="user-name">User</span>
    <div class="user-dropdown">
        <a href="#" id="logout-btn">Logout</a>
    </div>
`;
const logoutBtn = userProfile.querySelector('#logout-btn');


let currentUser = null;

// Auth Event Listeners---------------------
loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'block';
});

signupBtn.addEventListener('click', function(e) {
    e.preventDefault();
    signupModal.style.display = 'block';
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        loginModal.style.display = 'none';
        signupModal.style.display = 'none';
    });
});

showSignupLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginModal.style.display = 'none';
    signupModal.style.display = 'block';
});

showLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    signupModal.style.display = 'none';
    loginModal.style.display = 'block';
});

window.addEventListener('click', function(e) {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === signupModal) {
        signupModal.style.display = 'none';
    }
});

// Login Form Submission-----------
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    

    currentUser = {
        name: email.split('@')[0],
        email: email
    };
    
    updateAuthUI();
    loginModal.style.display = 'none';
    loginForm.reset();
    showNotification('Login Successful', 'goodnews', `Welcome back, ${currentUser.name}!`);
});

// Signup Form Submissiion-----------
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
   
    currentUser = {
        name: name,
        email: email
    };
    
    updateAuthUI();
    signupModal.style.display = 'none';
    signupForm.reset();
    showNotification('Account Created', 'goodnews', `Welcome to KnowSpot, ${name}!`);
});

// Logout Functiona-------------
logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    currentUser = null;
    updateAuthUI();
    showNotification('Logged Out', 'alert', 'You have been logged out.');
});

// Update UI based on auth state------
function updateAuthUI() {
    const userActions = document.querySelector('.user-actions');
    
    if (currentUser) {
        // User is logged in--------
        userProfile.querySelector('.user-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
        userProfile.querySelector('.user-name').textContent = currentUser.name;
        userActions.parentNode.replaceChild(userProfile, userActions);
        
        // Enable post form access
        postLink.style.display = 'block';
        mobilePostLink.style.display = 'block';
    } else {
        // User is logged out--------
        if (document.querySelector('.user-profile')) {
            userProfile.parentNode.replaceChild(userActions, userProfile);
        }
        
        // Disable post form access-----
        postLink.style.display = 'none';
        mobilePostLink.style.display = 'none';
        if (postFormSection.style.display === 'block') {
            showPosts();
        }
    }
}

// Initialize auth UI -----
updateAuthUI();