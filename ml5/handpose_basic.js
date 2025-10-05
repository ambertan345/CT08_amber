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
    handPose = ml5.handPose(options);
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

function gotHands(results) {
    hands = results
}

function draw() {
    image(video, 0, 0, videoW, videoH)

    for (let i = 0 ; i < handslength; i++) {
        let hand = hands[i]; //left or right

        for (let j = 0 ; j < hand.keypoints.length; j++)
    }
}