import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io('', {
    transports: ['websocket'],
});
const peerClient = new Peer();

const videoRecorder = document.getElementById("videoRecording");
videoRecorder.muted = true;


navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream => {
    addVideoStream(videoRecorder, stream);

    socket.on('viewer-connected', viewerId => {
        console.log('Viewer connected:', viewerId);
        connectToNewViewer(viewerId, stream);
    });
}).catch(error => {
    console.error('Error accessing media devices:', error);
});




peerClient.on("open", streamerId => {
    socket.emit('join-as-streamer', streamerId);
});

peerClient.on("close", streamerId => {
    socket.emit('disconnect-as-streamer', streamerId);
});

socket.on("disconnect", () => {
    socket.emit('disconnect-as-streamer', streamerId);
})



function addVideoStream(video, stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
}

function connectToNewViewer(viewerId, stream){
    console.log('Calling viewer:', viewerId);
    peerClient.call(viewerId, stream);
}