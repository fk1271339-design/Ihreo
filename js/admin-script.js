// ADMIN PANEL - Working Version
document.addEventListener('DOMContentLoaded', function () {
    console.log('Admin panel loaded');

    // Setup photo upload
    const photoInput = document.getElementById('photoInput');
    const photoUploadArea = document.getElementById('photoUploadArea');
    const uploadPhotoBtn = document.getElementById('uploadPhotoBtn');

    if (photoUploadArea) {
        photoUploadArea.onclick = function () {
            photoInput.click();
        };
    }

    if (uploadPhotoBtn) {
        uploadPhotoBtn.onclick = function () {
            photoInput.click();
        };
    }

    if (photoInput) {
        photoInput.onchange = function (e) {
            const files = e.target.files;
            if (files && files.length > 0) {
                uploadPhotos(files);
            }
        };
    }

    // Setup video upload
    const videoInput = document.getElementById('videoInput');
    const videoUploadArea = document.getElementById('videoUploadArea');
    const uploadVideoBtn = document.getElementById('uploadVideoBtn');

    if (videoUploadArea) {
        videoUploadArea.onclick = function () {
            videoInput.click();
        };
    }

    if (uploadVideoBtn) {
        uploadVideoBtn.onclick = function () {
            videoInput.click();
        };
    }

    if (videoInput) {
        videoInput.onchange = function (e) {
            const files = e.target.files;
            if (files && files.length > 0) {
                uploadVideos(files);
            }
        };
    }

    loadGalleryItems();
    loadContactMessages();
    setupTabs();
});

// Upload Photos Function
function uploadPhotos(files) {
    console.log('Uploading', files.length, 'photo(s)');

    const photos = JSON.parse(localStorage.getItem('galleryPhotos') || '[]');
    let uploaded = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function (e) {
            photos.push({
                data: e.target.result,
                name: file.name,
                description: '',
                uploadedAt: new Date().toLocaleString()
            });

            localStorage.setItem('galleryPhotos', JSON.stringify(photos));
            uploaded++;

            if (uploaded === files.length) {
                alert('✅ ' + files.length + ' photo(s) uploaded successfully!');
                loadGalleryItems();
                document.getElementById('photoInput').value = '';
            }
        };

        reader.readAsDataURL(file);
    }
}

// Upload Videos Function
function uploadVideos(files) {
    console.log('Uploading', files.length, 'video(s)');

    const videos = JSON.parse(localStorage.getItem('galleryVideos') || '[]');
    let uploaded = 0;

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();

        reader.onload = function (e) {
            videos.push({
                data: e.target.result,
                name: file.name,
                description: '',
                uploadedAt: new Date().toLocaleString()
            });

            localStorage.setItem('galleryVideos', JSON.stringify(videos));
            uploaded++;

            if (uploaded === files.length) {
                alert('✅ ' + files.length + ' video(s) uploaded successfully!');
                loadGalleryItems();
                document.getElementById('videoInput').value = '';
            }
        };

        reader.readAsDataURL(file);
    }
}

// Load Gallery Items
function loadGalleryItems() {
    const photos = JSON.parse(localStorage.getItem('galleryPhotos') || '[]');
    const videos = JSON.parse(localStorage.getItem('galleryVideos') || '[]');

    displayPhotos(photos);
    displayVideos(videos);
    updateStats();
}

// Display Photos
function displayPhotos(photos) {
    const photosPreview = document.getElementById('photosPreview');
    if (!photosPreview) return;

    if (photos.length === 0) {
        photosPreview.innerHTML = '<p style="text-align:center; color:#666; padding:3rem;">No photos uploaded yet</p>';
        return;
    }

    let html = '';
    for (let i = 0; i < photos.length; i++) {
        html += '<div class="preview-item" style="position:relative;">';
        html += '<img src="' + photos[i].data + '" style="width:100%; height:200px; object-fit:cover; border-radius:10px;">';
        html += '<button onclick="deletePhoto(' + i + ')" style="position:absolute; top:10px; right:10px; background:#ef4444; color:white; border:none; padding:0.5rem; border-radius:5px; cursor:pointer;">🗑️</button>';
        html += '</div>';
    }
    photosPreview.innerHTML = html;
}

// Display Videos
function displayVideos(videos) {
    const videosPreview = document.getElementById('videosPreview');
    if (!videosPreview) return;

    if (videos.length === 0) {
        videosPreview.innerHTML = '<p style="text-align:center; color:#666; padding:3rem;">No videos uploaded yet</p>';
        return;
    }

    let html = '';
    for (let i = 0; i < videos.length; i++) {
        html += '<div class="preview-item" style="position:relative;">';
        html += '<video src="' + videos[i].data + '" controls style="width:100%; height:200px; border-radius:10px; background:#000;"></video>';
        html += '<button onclick="deleteVideo(' + i + ')" style="position:absolute; top:10px; right:10px; background:#ef4444; color:white; border:none; padding:0.5rem; border-radius:5px; cursor:pointer;">🗑️</button>';
        html += '</div>';
    }
    videosPreview.innerHTML = html;
}

// Delete Photo
function deletePhoto(index) {
    if (confirm('Delete this photo?')) {
        const photos = JSON.parse(localStorage.getItem('galleryPhotos') || '[]');
        photos.splice(index, 1);
        localStorage.setItem('galleryPhotos', JSON.stringify(photos));
        loadGalleryItems();
    }
}

// Delete Video
function deleteVideo(index) {
    if (confirm('Delete this video?')) {
        const videos = JSON.parse(localStorage.getItem('galleryVideos') || '[]');
        videos.splice(index, 1);
        localStorage.setItem('galleryVideos', JSON.stringify(videos));
        loadGalleryItems();
    }
}

// Update Stats
function updateStats() {
    const photos = JSON.parse(localStorage.getItem('galleryPhotos') || '[]');
    const videos = JSON.parse(localStorage.getItem('galleryVideos') || '[]');
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

    const photoCount = document.getElementById('photoCount');
    const videoCount = document.getElementById('videoCount');
    const totalCount = document.getElementById('totalCount');

    if (photoCount) photoCount.textContent = photos.length;
    if (videoCount) videoCount.textContent = videos.length;
    if (totalCount) totalCount.textContent = photos.length + videos.length + messages.length;
}

// Setup Tabs
function setupTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(function (btn) {
        btn.onclick = function () {
            const tab = btn.getAttribute('data-tab');

            tabBtns.forEach(function (b) {
                b.classList.remove('active');
            });
            tabContents.forEach(function (c) {
                c.classList.remove('active');
            });

            btn.classList.add('active');
            const targetContent = document.getElementById(tab + 'Tab');
            if (targetContent) {
                targetContent.classList.add('active');
            }

            if (tab === 'messages') {
                loadContactMessages();
            }
        };
    });
}

// Load Contact Messages
function loadContactMessages() {
    const messagesList = document.getElementById('messagesList');
    if (!messagesList) return;

    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');

    if (messages.length === 0) {
        messagesList.innerHTML = '<div style="text-align:center; padding:3rem; color:#666;"><div style="font-size:4rem;">📭</div><p>No messages yet</p></div>';
        return;
    }

    let html = '';
    for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        html += '<div class="message-card" style="background:white; padding:1.5rem; border-radius:10px; margin-bottom:1rem; border-left:4px solid #2a5298; box-shadow:0 2px 10px rgba(0,0,0,0.1);">';
        html += '<h3 style="margin:0; color:#1e3c72;">' + msg.name + '</h3>';
        html += '<p style="margin:0.5rem 0; color:#666;">' + msg.email + '</p>';
        html += '<p style="margin:0.5rem 0;"><strong>Subject:</strong> ' + msg.subject + '</p>';
        html += '<p style="margin:0.5rem 0;"><strong>Message:</strong> ' + msg.message + '</p>';
        html += '<button onclick="deleteMessage(' + msg.id + ')" style="margin-top:1rem; padding:0.5rem 1rem; background:#ef4444; color:white; border:none; border-radius:5px; cursor:pointer;">Delete</button>';
        html += '</div>';
    }
    messagesList.innerHTML = html;
}

// Delete Message
function deleteMessage(id) {
    if (confirm('Delete this message?')) {
        let messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messages = messages.filter(function (msg) {
            return msg.id !== id;
        });
        localStorage.setItem('contactMessages', JSON.stringify(messages));
        loadContactMessages();
        updateStats();
    }
}
