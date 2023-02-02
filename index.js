let api_key = "AIzaSyC2Nd9ZQvXKpmd5BwyAmidoJt-HA59swKM";
let video_http = "https://www.googleapis.com/youtube/v3/videos?";
let channel_http = "https://www.googleapis.com/youtube/v3/channels?";
const videoCardContainer = document.querySelector('.video-container');
const searchInput = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-btn');
const search2btn = document.querySelector(".searchbutton");
const input = document.querySelector(".expandright");
let searchLink = "https://www.youtube.com/results?search_query=";
searchBtn.addEventListener('click', () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
})
search2btn.addEventListener('click', () => {
    if(input.value.length){
        location.href = searchLink + input.value;
    }
})

fetch(video_http + new URLSearchParams({
    key: 'AIzaSyC2Nd9ZQvXKpmd5BwyAmidoJt-HA59swKM',
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
}))
.then(res => res.json())
.then(data => {
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));


// get channel function 
const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: 'AIzaSyC2Nd9ZQvXKpmd5BwyAmidoJt-HA59swKM',
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}