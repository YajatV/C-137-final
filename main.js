//https://mahdihat791.github.io/projectSolutionC135-C137/
video="";
status="";
objects=[];

function preload(){
    video=createVideo("video.mp4");
}

function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video.hide();
}


function start(){
    objectDetector=ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects ";
}

function stop_video(){
    video.stop();
  }
  
  function pause_video()
{
     video.pause();	
}

  function slider_value(){
    slider = document.getElementById("slider").value;
    //use speed() function of p5.js and pass "slider" variable to it ,so that speed changes as per slider value
    video.speed(slider);
  }

function modelloaded(){
    console.log("model loaded!");
    status=true;
    video.loop();
    video.volume(0);
    video.speed(1);
}

function gotresults(error,results){
  if(error){
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw(){
    image(video,0,0,480,380);
    if(status != ""){
      objectDetector.detect(video, gotresults);
      for(i=0;i<objects.length; i++){
      document.getElementById("status").innerHTML="Status : Objects Detected ";
      document.getElementById("number_of_objects").innerHTML="Number Of Object Detected Are :"+objects.length;
      fill("#fff000");
      percent = floor(objects[i].confidence * 100);
      text(objects[i].label+"  "+percent+"%",objects[i].x + 15, objects[i].y + 15);
      noFill();
      stroke("fff000");
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      }
    }
}



