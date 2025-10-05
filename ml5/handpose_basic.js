let handPose;
let videoW = 640;
let videoH = 480;
let video;
let hands = [];

function preload() {
    let options = {
        flipped : true,
        runtime : 'tfjs',
        modelType : "full",
        detectorModelUrl : undefined,
        landmarkModeUrl : undefined,

    }

    //loading the handpose model
    handPose = ml5.hanpose(options);
}
function setup() {
    createCanvas(videoW, videoH);

    let constraints = {
        video:{
            mandatory: {
                minWidth: videoW,
                minHeight: videoH
            },
            optional: [{minFrameRate: 60}]
        },
        audio: false,
        flipped: true,
    };

    //create webcam
    video = createCapture(constraints);
    video.size(640, 480);
    video.hide();

    handPose.detectStart(video,gotHands);

}
function draw() {
    image(video, 0, 0, videoW, videoH)
}
function gotHands(results) {
    hands = results
}