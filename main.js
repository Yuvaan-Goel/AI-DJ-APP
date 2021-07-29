song = "";
scoreLeftWrist = 0;
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;

function preload()
{
    song = loadSound("music.mp3");
}

function play()
{
   song.play();
   song.setVolume(1);
   song.rate(1);
}

function stop()
{
    song.stop();
}

function setup()
{
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotResult);
}

function modelLoaded()
{
    console.log("poseNet model loaded");                                 
}

function draw()
{
    image(video, 0, 0, 600, 500);

    fill('red');
    stroke('black');

    if(scoreLeftWrist > 0.2)
    {
        circle(leftwristX, leftwristY, 20);

        leftwristY_number = Number(leftwristY);
        remove_decimals = floor(leftwristY_number);
        volume = remove_decimals/500;
    
        document.getElementById("volume-rate").innerHTML = "Volume = " + volume;
    
        song.setVolume(volume);
    } 
}

function gotResult(results)
{
    if(results.length > 0)
    {
        console.log(results); 
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        leftwristX = results[0].pose.leftWrist.x;
        leftwristY = results[0].pose.leftWrist.y;

        rightwristX = results[0].pose.rightWrist.x;
        rightwristY = results[0].pose.rightWrist.y;

        console.log("LeftWristX = " + leftwristX + " LeftWristY = " + leftwristY);
        console.log("RightWristX = " + rightwristX + " RightWristY = " + rightwristY);
        console.log("Score left wrist = " + scoreLeftWrist);
    }
}