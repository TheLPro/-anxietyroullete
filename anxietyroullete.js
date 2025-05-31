let currentAudio = null;
let counter = document.getElementById('counter');
let progressBar = document.getElementById('streak');
let speed = document.getElementById('speed');
let cheats = false;

function runRoullete() {

    // Stop current audio if playing
    if (currentAudio && !currentAudio.paused) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    // 1:9 chance to pick a song
    let song;
    if (cheats) {
        song = 'song2.mp3';
    } else {
        song = Math.random() < 0.5 ? 'song1.mp3' : 'song2.mp3';
    }

    
    currentAudio = new Audio(song);
    if (song == 'song1.mp3') {
        currentAudio.volume = 0.2; // Lower volume for song1
        localStorage.setItem('streak', 0)
    } else {
        if (localStorage.getItem('streak') === null) {
            localStorage.setItem('streak', 1);
        } else {
            localStorage.setItem('streak', parseInt(localStorage.getItem('streak')) + 1);
        }
    }

    localStorage.setItem('playedSong', song);

    currentAudio.playbackRate = parseFloat(speed.value);
    currentAudio.play();

    setTimeout(() => {
        counter.innerText = "Streak " + localStorage.getItem('streak') || 0;
        progressBar.value = localStorage.getItem('streak') || 0;
    }, 20000 / currentAudio.playbackRate); // Stop after 10 seconds
}

function ruinTheFun() {
    if (localStorage.getItem('playedSong') === 'song1.mp3') {
        document.body.style.background = 'red';
    } else {
        document.body.style.background = 'green';
    }

    setTimeout(() => {
        window.location.reload();
    }, 5000);

}


    document.getElementById('counter').innerText = "Streak " + localStorage.getItem('streak');
    document.getElementById('streak').value = localStorage.getItem('streak');


    function startStrokeMode() {
        // Disable normal controls
        document.querySelectorAll('button, input').forEach(el => el.disabled = true);
      
        // Create a loop for wild flashing and movement
        let body = document.body;
        let counter = document.getElementById('counter');
        let progressBar = document.getElementById('streak');
        let buttons = document.querySelectorAll('button');
        let speedInput = document.getElementById('speed');
      
        let interval = setInterval(() => {
          // Flash crazy background colors
          body.style.background = `hsl(${Math.random()*360}, 100%, 50%)`;
      
          // Flash text color opposite to background
          counter.style.color = `hsl(${(Math.random()*360+180)%360}, 100%, 75%)`;
      
          // Randomly move and rotate buttons and counter
          buttons.forEach(btn => {
            btn.style.position = 'absolute';
            btn.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
            btn.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
            btn.style.transform = `rotate(${Math.random()*720 - 360}deg) scale(${Math.random()*2 + 0.5})`;
            btn.style.transition = 'none';
            btn.style.filter = `hue-rotate(${Math.random()*360}deg)`;
          });
      
          // Counter jumps and spins
          counter.style.position = 'absolute';
          counter.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
          counter.style.top = `${Math.random() * (window.innerHeight - 50)}px`;
          counter.style.fontSize = `${20 + Math.random() * 50}px`;
          counter.style.transform = `rotate(${Math.random()*360}deg)`;
          counter.style.transition = 'none';
          counter.style.filter = `invert(${Math.random()*100}%)`;
      
          // Progress bar wildly moves and flashes
          progressBar.style.position = 'absolute';
          progressBar.style.left = `${Math.random() * (window.innerWidth - 300)}px`;
          progressBar.style.top = `${Math.random() * (window.innerHeight - 20)}px`;
          progressBar.style.width = `${50 + Math.random()*300}px`;
          progressBar.style.filter = `hue-rotate(${Math.random()*360}deg) saturate(${Math.random()*3})`;
      
          // Speed slider freak out
          speedInput.style.position = 'absolute';
          speedInput.style.left = `${Math.random() * (window.innerWidth - 200)}px`;
          speedInput.style.top = `${Math.random() * (window.innerHeight - 40)}px`;
          speedInput.style.transform = `rotate(${Math.random()*360}deg) scale(${Math.random()*1.5 + 0.5})`;
          speedInput.style.filter = `invert(${Math.random()*100}%)`;
      
          // Shake the entire body randomly
          body.style.transform = `translate(${(Math.random()-0.5)*50}px, ${(Math.random()-0.5)*50}px) rotate(${(Math.random()-0.5)*30}deg) scale(${1 + (Math.random()-0.5)*0.5})`;

          let text = document.createElement('div');
          text.innerText = "You Win!";
          text.style.position = 'absolute';
          text.style.width = '100%';
            text.style.textAlign = 'center';
            text.style.height = '100%';
            text.style.fontSize = '100px';
            text.style.marginTop = '45vh';

            document.body.appendChild(text);
        }, 50);
      
        // Stop the chaos after 10 seconds and reload page
        setTimeout(() => {
          clearInterval(interval);
          location.reload();
          localStorage.removeItem('streak');
        }, 10000);
      }
      
      // Fix your streak check and trigger stroke mode when streak hits 10
      function checkStreak() {
        const streak = parseInt(localStorage.getItem('streak')) || 0;
        counter.innerText = "Streak " + streak;
        progressBar.value = streak;
      
        if (streak >= 10) {
          startStrokeMode();
        }
      }
      
      // Run checkStreak on page load and after roulette run
      window.onload = checkStreak;
      
      // Also update your runRoulette function to call checkStreak after updating streak
      function runRoullete() {
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }
        let song;
        if (cheats) {
            song = 'song2.mp3';
        } else {
            song = Math.random() < 0.5 ? 'song1.mp3' : 'song2.mp3';
        }
      
        currentAudio = new Audio(song);
        if (song == 'song1.mp3') {
            currentAudio.volume = 0.2; // Lower volume for song1
            localStorage.setItem('streak', 0);
        } else {
            if (localStorage.getItem('streak') === null) {
                localStorage.setItem('streak', 1);
            } else {
                localStorage.setItem('streak', parseInt(localStorage.getItem('streak')) + 1);
            }
        }
      
        localStorage.setItem('playedSong', song);
      
        currentAudio.playbackRate = parseFloat(speed.value);
        currentAudio.play();
      
        setTimeout(() => {
            checkStreak();
        }, 20000 / currentAudio.playbackRate);
      }
      
      