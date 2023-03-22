const videos = [...document.getElementsByClassName('video')];

const play = (e) => {
    const video = e.target;
    video.playbackRate = 1.5;
    video.play();
}

const pause = (e) => {
    const video = e.target;
    video.pause();
}

videos.forEach(vid => {
    vid.addEventListener("mouseover", play);

    vid.addEventListener("mouseout", pause);
});
