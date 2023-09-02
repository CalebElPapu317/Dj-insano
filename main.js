song = "";
songs = "";

function preload()
{
    song = loadSound("Maxwell the Cat Theme. (320 kbps).mp3");
    song2 = loadSound("Tears For Fears - Everybody Wants To Rule The World (Lyrics).mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
leftWristX = 0;

rightWristY = 0;
leftWristY = 0;

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses); 
}

function modelLoaded(){
    console.logI('PoseNet Is Initialized');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist = " + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("lefttWristX = " + leftWristX + "lefttWristY = " + leftWristY);

    }
}

function draw(){
    image(video, 0, 0, 600, 500);

    var combo=document.getElementById("option_names")

    var seleccion=combo.options[combo.selectedIndex].text;
    if(seleccion=="Maxwell"){
        songs= song;
    }

    else if(seleccion=="Tear for Fears"){
        songs= song2;
    }
    
    if(scoreRightWrist > 0.2)
    {
        if(rightWristY > 0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";
            songs.rate(0.5);
        }

        else if(rightWristY > 100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed =1x";
            songs.rate(1);
        }

        else if(rightWristY > 200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed =1.5x";
            songs.rate(1.5);
        }

        else if(rightWristY > 300 && rightWristy <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed =2x";
            songs.rate(2);
        }

        else if(rightWristY > 400)
        {
            document.getElementById("speed").innerHTML = "Speed =2.5x";
            songs.rate(2.5);
            
        }
    }

    if(scoreLeftWrist > 0.2)
    {
        InNumberLeftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberLeftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "Volume = " + volume;
        songs.setVolume(volume)
    }

}

function play()
{
    songs.play();
    songs.setVolume(1);
    songs.rate(1);
}

       