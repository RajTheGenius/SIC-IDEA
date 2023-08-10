video = "";
status = "";
objects = [];
function preload() {
    video = createVideo("video.mp4");
    video.hide();
}


function setup(){
    canvas = createCanvas(600, 400);
    canvas.position(450, 350);
}

function draw() {
	image(video, 0, 0, 600, 400);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "objects Detected";
            document.getElementById("number").innerHTML = "No. of objects detected = " + objects.length;

            fill("red");
            percentage = floor(objects[i].confidence * 100);
            text( objects[i].label + " " + percentage + "%", objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
        console.log(results);
        objects = results;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Object detected";
}

function modelLoaded() {
    console.log("model loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}