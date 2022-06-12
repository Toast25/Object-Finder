status="";
objects=[];
function setup(){
    canvas= createCanvas(750,600);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function start(){
    model1= ml5.objectDetector("cocossd", modelloaded);
    document.getElementById("status").innerHTML= "The status: Detecting Objects";
}
function modelloaded(){
    console.log("The Model Has Been Loaded");
    status=true;
}
function draw() {
    image(video, 0,0, 750, 600);
    if (status!="") {
        for (i = 0; i < objects.length; i++) {
            model1.detect(video, gotresults);
            document.getElementById("status").innerHTML="The Objects are Detected";
                document.getElementById("objects_are_detecting").innerHTML="The number of objects detected are " +objects.length;
                percent = floor(objects[i].confidence*100);
                fill("crimson");
                stroke("white");
                noFill();
                text(objects[i].label+" "+percent+ "%", objects[i].x+15, objects[i].y+15);
                rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            }
    }
    }
function gotresults(error,results) {
    if (error) {
        console.log(error);
    }
console.log(results);
objects=results;
    }