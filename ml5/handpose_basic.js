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

    fingerTip = new Sprite();
    fingerTip.diameter = 60;
    fingerTip.collider = 'kinematic';
    fingerTip.color = 'rgba(2, 141, 255, 0.56)'
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

        fingerTip.x = keypoin
    }
}

function gotHands(results) {
    hands = results
}