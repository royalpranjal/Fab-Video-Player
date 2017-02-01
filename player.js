/*
	Checking by adding an event listener for loading of the window
*/
window.addEventListener('load', function() {
	// alert('linked!');
	video = document.getElementById('video');

	pbarContainer = document.getElementById('pbar-container');
	pbar = document.getElementById('pbar');

	playButton = document.getElementById('play-button');  
	
	soundButton = document.getElementById('sound-button');
	sbarContainer = document.getElementById('sbar-container');
	sbar = document.getElementById('sbar');

	fullscreenButton = document.getElementById('fullscreen-button');

	screenDiv = document.getElementById('screen');
	screenButton = document.getElementById('screen-button');

	timeField = document.getElementById('time-field');

	video.load();
	video.addEventListener('canplay', function(){
		
		playButton.addEventListener('click', playOrPause, false);
		pbarContainer.addEventListener('click', skip, false);
		updatePlayer();
		soundButton.addEventListener('click', muteOrUnmute, false);
		sbarContainer.addEventListener('click', changeVolume, false);		
		fullscreenButton.addEventListener('click', fullScreen, false);		
		screenButton.addEventListener('click', playOrPause, false);
	}, false);
	

}, false);

function playOrPause() {
	if(video.paused) {
		screenDiv.style.display = 'none';
		video.play();
		playButton.src = 'images/pause.png';
		// Updating the progress bar every 30 seconds
		update = setInterval(updatePlayer, 30);
	}
	else {
		screenDiv.style.display = 'block';
		video.pause();
		playButton.src = 'images/play.png';
		// stopping the progress to be updated when the video is paused
		window.clearInterval(update);
	}
}

function updatePlayer() {
	var precentage = (video.currentTime/video.duration)*100;
	pbar.style.width = precentage + '%';
	timeField.innerHTML = getFormattedTime();

	// stoping the update when video has ended
	if(video.ended){
		window.clearInterval(update);
		playButton.src = 'images/replay.png'
		screenDiv.style.display = 'block';
		screenButton.src = 'images/replay.png';
	}
	else if(video.paused){
		playButton.src = 'images/play.png';
		screenButton.src = 'images/play.png';
	}
}

// ev is for passing the event
function skip(ev) {
	var mouseX = ev.pageX - pbarContainer.offsetLeft;
	// getting the width of the progress bar
	var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.currentTime = (mouseX/width)*video.duration;

	// update the player when video is paused
	updatePlayer();
	// alert(width);
}

function getFormattedTime(){
	// rounding off seconds to nearest integer
	var seconds = Math.round(video.currentTime);
	// calculating minutes by taking floor 
	var minutes = Math.floor(seconds/60);

	if(minutes > 0){
		seconds = seconds - minutes*60;
	}

	if(seconds.toString().length === 1){
		seconds = '0' + seconds;
	}

	var totalSeconds = Math.round(video.duration);
	var totalMinutes = Math.floor(totalSeconds/60);

	if(totalMinutes > 0){
		totalSeconds = totalSeconds - totalMinutes*60;
	}

	if(totalSeconds.toString().length === 1){
		totalSeconds = '0' + totalSeconds;
	}

	return minutes + ':' + seconds + ' / ' + totalMinutes + ':' + totalSeconds;
}

function muteOrUnmute(){
	if(video.muted){
		video.muted = false;
		soundButton.src = 'images/sound.png';
		sbar.style.display = 'block';
	}
	else{
		video.muted = true;
		soundButton.src = 'images/mute.png';
		sbar.style.display = 'none';
	}
}

function changeVolume(ev){
	var mouseX = ev.pageX - sbarContainer.offsetLeft;
	var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.volume = (mouseX/width);
	sbar.style.width = (mouseX/width)*100 + '%';

	// we should be able to change the volume when the video is muted
	video.muted = false;
	soundButton.src = 'images/sound.png';
	sbar.style.display = 'block';
}

function fullScreen(){
	if(video.requestFullScreen){
		video.requestFullScreen();
	}
	else if(video.webkitRequestFullScreen){
		video.webkitRequestFullScreen();
	}
	else if(video.msRequestFullScreen){
		video.msRequestFullScreen();
	}
	else if(video.mozRequestFullScreen){
		video.mozRequestFullScreen();
	}
}