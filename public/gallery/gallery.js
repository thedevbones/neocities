var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightbox-img');
var lightboxVideo = document.getElementById('lightbox-video');
var lightboxCaption = document.getElementById('lightbox-caption');

function openImageLightbox(src, caption) {
  lightboxImg.src = src;
  lightboxImg.style.display = 'block';
  lightboxVideo.style.display = 'none';
  lightboxVideo.src = '';
  lightboxCaption.textContent = caption || '';
  lightboxCaption.style.display = caption ? 'block' : 'none';
  lightbox.classList.add('active');
}

function openVideoLightbox(videoId, caption) {
  lightboxVideo.src = 'https://www.youtube.com/embed/' + videoId + '?autoplay=1';
  lightboxVideo.style.display = 'block';
  lightboxImg.style.display = 'none';
  lightboxImg.src = '';
  lightboxCaption.textContent = caption || '';
  lightboxCaption.style.display = caption ? 'block' : 'none';
  lightbox.classList.add('active');
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightboxVideo.src = '';
  lightboxImg.src = '';
}

lightbox.addEventListener('click', function(e) {
  if (e.target === lightbox || e.target === lightboxImg || e.target === lightboxCaption) {
    closeLightbox();
  }
});

function createImageItem(filename, caption) {
  var item = document.createElement('div');
  item.className = 'gallery-item';

  var src = 'media/' + filename;
  var img = document.createElement('img');
  img.src = src;
  img.alt = caption || filename;
  img.loading = 'lazy';
  item.appendChild(img);

  item.addEventListener('click', function() {
    openImageLightbox(src, caption);
  });

  return item;
}

function createVideoItem(videoId, caption) {
  var item = document.createElement('div');
  item.className = 'gallery-item';

  var img = document.createElement('img');
  img.src = 'https://img.youtube.com/vi/' + videoId + '/hqdefault.jpg';
  img.alt = caption || 'Video';
  img.loading = 'lazy';
  item.appendChild(img);

  var playIcon = document.createElement('div');
  playIcon.className = 'play-icon';
  item.appendChild(playIcon);

  item.addEventListener('click', function() {
    openVideoLightbox(videoId, caption);
  });

  return item;
}

Promise.all([
  fetch('manifest.json').then(function(r) { return r.json(); }),
  fetch('captions.json').then(function(r) { return r.json(); }).catch(function() { return {}; }),
  fetch('videos.json').then(function(r) { return r.json(); }).catch(function() { return []; })
]).then(function(results) {
  var files = results[0];
  var captions = results[1];
  var videos = results[2];
  var gallery = document.getElementById('gallery');

  videos.forEach(function(video) {
    gallery.appendChild(createVideoItem(video.id, video.caption));
  });

  files.forEach(function(filename) {
    gallery.appendChild(createImageItem(filename, captions[filename]));
  });
});