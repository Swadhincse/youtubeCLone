const API_KEY = 'YOUR_YOUTUBE_API_KEY';

async function searchVideos() {
    const searchInput = document.getElementById('searchInput').value;

    // Use YouTube API to search for videos
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?q=${searchInput}&key=${API_KEY}&part=snippet&type=video`);
    const data = await response.json();

    renderVideos(data.items);
}

function renderVideos(videos) {
    const videoList = document.getElementById('video-list');
    videoList.innerHTML = '';

    videos.forEach(video => {
        const videoItem = document.createElement('div');
        videoItem.classList.add('video-item');
        videoItem.dataset.videoId = video.id.videoId;

        const thumbnail = document.createElement('img');
        thumbnail.src = video.snippet.thumbnails.medium.url;
        videoItem.appendChild(thumbnail);

        const title = document.createElement('p');
        title.textContent = video.snippet.title;
        videoItem.appendChild(title);

        videoList.appendChild(videoItem);
    });

    // Attach click event to dynamically added video items
    videoList.addEventListener('click', (event) => {
        if (event.target.classList.contains('video-item')) {
            const videoId = event.target.dataset.videoId;
            window.location.href = `videoDetails.html?videoId=${videoId}`;
        }
    });
}
