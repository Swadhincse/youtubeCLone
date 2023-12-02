const API_KEY = 'YOUR_YOUTUBE_API_KEY';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const videoId = urlParams.get('videoId');

    fetchVideoDetails(videoId);
});

async function fetchVideoDetails(videoId) {
    // Use YouTube API to fetch video details
    const videoResponse = await fetch(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${API_KEY}&part=snippet`);
    const videoData = await videoResponse.json();

    // Render video details
    renderVideoDetails(videoData.items[0]);
}

function renderVideoDetails(video) {
    const videoDetailsContainer = document.getElementById('video-details');
    videoDetailsContainer.innerHTML = '';

    const title = document.createElement('h2');
    title.textContent = video.snippet.title;
    videoDetailsContainer.appendChild(title);

    const description = document.createElement('p');
    description.textContent = video.snippet.description;
    videoDetailsContainer.appendChild(description);

    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.id}`;
    iframe.width = 560;
    iframe.height = 315;
    iframe.allowFullscreen = true;
    videoDetailsContainer.appendChild(iframe);
}
