console.log("Welcome to Retro Music Club");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName= document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Firecracker", filePath: "songs/1.mp3", coverPath:"cover/cover1.jpg"},
    {songName: "Hymn for the Weekend", filePath: "songs/3.mp3", coverPath:"cover/cover2.png"},
    {songName: "Tu hi meri shabh", filePath: "songs/2.mp3", coverPath:"cover/cover3.jpg"},
    {songName: "Kesariya", filePath: "songs/4.mp3", coverPath:"cover/cover4.jpg"},
    {songName: "No Love", filePath: "songs/5.mp3", coverPath:"cover/cover5.jpg"},
]

songItems.forEach((element, i)=> {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;   
});


//control of play/pause
masterPlay.addEventListener('click', ()=>{
    

    if(audioElement.paused || audioElement.currentTime <= 0)
    {
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else
    {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})


//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    progress = parseInt((audioElement.currentTime/audioElement.duration) * 100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = audioElement.duration * myProgressBar.value/ 100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        
        songIndex = parseInt(e.target.id);
        if(e.target.classList.contains('fa-play-circle')){
            makeAllPlays();
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = `songs/${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
    }
       else if(e.target.classList.contains('fa-pause-circle'))
        {
            audioElement.pause();
            e.target.classList.remove('fa-pause-circle');
           e.target.classList.add('fa-play-circle');
           gif.style.opacity = 0;
           masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        }
        
    })

})

document.getElementById('next').addEventListener('click', ()=>{
   
    if(songIndex >= 4)
    {
        songIndex = 0;
    }  
     else
     {
        songIndex += 1;
     }

     audioElement.src = `songs/${songIndex + 1}.mp3`;
     masterSongName.innerText = songs[songIndex].songName;
     audioElement.currentTime = 0;
     audioElement.play();
     gif.style.opacity = 1;
     masterPlay.classList.remove('fa-play');
     masterPlay.classList.add('fa-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex <= 0)
    {
        songIndex = 4;
    }  
     else
     {
        songIndex -= 1;
     }
     audioElement.src = `songs/${songIndex +1}.mp3`;
     masterSongName.innerText = songs[songIndex].songName;
     audioElement.currentTime = 0;
     audioElement.play();
     gif.style.opacity = 1;
     masterPlay.classList.remove('fa-play');
     masterPlay.classList.add('fa-pause');
})

