// GALLERY PAGE - Load photos from localStorage
document.addEventListener('DOMContentLoaded', function () {
    console.log('Gallery page loaded');
    loadGalleryItems();
    setupFilters();
});

// Load Gallery Items
function loadGalleryItems(filter) {
    if (!filter) filter = 'all';

    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid) return;

    const photos = JSON.parse(localStorage.getItem('galleryPhotos') || '[]');
    const videos = JSON.parse(localStorage.getItem('galleryVideos') || '[]');

    console.log('Loaded', photos.length, 'photos and', videos.length, 'videos');

    galleryGrid.innerHTML = '';

    if (photos.length === 0 && videos.length === 0) {
        galleryGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:4rem; color:#666;"><div style="font-size:5rem;">📸</div><h3 style="color:#1e3c72;">No items in gallery yet</h3><p>Admin can upload photos and videos from the admin panel</p></div>';
        return;
    }

    // Display photos
    if (filter === 'all' || filter === 'photos') {
        for (let i = 0; i < photos.length; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = '<div class="gallery-item-wrapper"><img src="' + photos[i].data + '" alt="Photo" class="gallery-image"><div class="gallery-overlay"><div class="gallery-info"><h3>' + (photos[i].description || 'Photo ' + (i + 1)) + '</h3><p>' + (photos[i].uploadedAt || '') + '</p></div></div></div>';
            galleryGrid.appendChild(item);
        }
    }

    // Display videos
    if (filter === 'all' || filter === 'videos') {
        for (let i = 0; i < videos.length; i++) {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.innerHTML = '<div class="gallery-item-wrapper"><video src="' + videos[i].data + '" class="gallery-video" preload="metadata"></video><div class="gallery-overlay"><div class="gallery-info"><div class="play-icon">▶️</div><h3>' + (videos[i].description || 'Video ' + (i + 1)) + '</h3><p>' + (videos[i].uploadedAt || '') + '</p></div></div></div>';
            galleryGrid.appendChild(item);
        }
    }

    if (galleryGrid.children.length === 0) {
        galleryGrid.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:3rem; color:#666;"><p>No ' + filter + ' found</p></div>';
    }
}

// Setup Filters
function setupFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');

    filterBtns.forEach(function (btn) {
        btn.onclick = function () {
            filterBtns.forEach(function (b) {
                b.classList.remove('active');
            });
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');
            loadGalleryItems(filter);
        };
    });
}
