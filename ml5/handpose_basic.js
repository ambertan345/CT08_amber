let handPose;
let videoW = 640;
let videoH = 480;
let video;
let hands = [];
let fingerTip;
let balloon;
let bottomWall, topWall, leftWall, rightWall;

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

    fingerTip = new Sprite();
    fingerTip.diameter = 60;
    fingerTip.collider = 'kinematic';
    fingerTip.color = 'rgba(2, 141, 255, 0.2)'
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

    world.gravity.y = 0;

    balloon = new Sprite();
    balloon.diameter = 60;
    balloon.collider = 'dynamic';
    balloon.color = 'red';
    balloon.x = width / 2;
    balloon.y = 100
    balloon.bounciness = 1;
    balloon.mass = 2;
    balloon.drag = 0.01;

    topWall = new Sprite(width/2, 0, width, 10, 'static')
    bottomWall = new Sprite(width/2, height, width, 10, 'static')
    leftWall = new Sprite(0, height/2, 10, height, 'static')
    rightWall = new Sprite(0, height/2, 10, height, 'static')

    boundaryGroup = new Sprite();
    boundaryGroup.add(topWall);
    boundaryGroup

}

function draw() {
    image(video, 0, 0, videoW, videoH)

    // for (let i = 0 ; i < hands.length; i++) {
    //     let hand = hands[i]; //left or right

    //     for (let j = 0 ; j < hand.keypoints.length; j++) {
    //         let keypoint = hand.keypoints[j];

    //         circle (keypoint.x, keypoint.y, 10);
    //     }
    // }
    if (hands.length > 0) {
        let hand = hands[0]
        let keypoint = hand.keypoints[8]
        // circle(keypoint.x, keypoint.y, 30)

        fingerTip.x = keypoint.x;
        fingerTip.y = keypoint.y;
    }
}

function gotHands(results) {
    hands = results
}