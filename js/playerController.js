import {Component, Property, CollisionEventType} from '@wonderlandengine/api';

import {BulletManager} from './bulletManager.js';
import {GameManager} from './gameManager.js';

import {VRController} from './VRController.js';

//import {AudioSource} from '@wonderlandengine/components';

/**
 * playerController
 */
export class PlayerController extends Component {
    static TypeName = 'playerController';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0),

        bulletManager: Property.object(),
        gameManager: Property.object(),
        vrController: Property.object()
    };

    speed;

    moveLeft = false;
    moveRight = false;
    moveUp = false;
    moveDown = false;
    spaceBar = false;

    time = 0;
    spawnInterval = 0.2;

    isDie = false;

    shootSound;
    overSound;
    explosionSound;

    static onRegister(engine) {
        /* Triggered when this component class is registered.
         * You can for instance register extra component types here
         * that your component may create. */
    }

    init() {
        //console.log('init() with param', this.param);

    }

    start() {
        //console.log('start() with param', this.param);

        this.bulletManager = this.bulletManager.getComponent(BulletManager);

        this.gameManager = this.gameManager.getComponent(GameManager);

        this.vrController = this.vrController.getComponent(VRController);

        this.speed = 0.05;
        this.playerPos = [0, 0, -4];

        this.direction = 1;

        window.addEventListener('keydown', this.press.bind(this));
        window.addEventListener('keyup', this.release.bind(this));

        this.initCollision();

        this.shootSound = this.object.addComponent('audio-source', {audioFile: 'sfx/Shoot.wav'});
        this.overSound = this.object.addComponent('audio-source', {audioFile: 'sfx/GameOver.wav'});
        this.explosionSound = this.object.addComponent('audio-source', {audioFile: 'sfx/Explosion.wav'});
    }

    update(dt) {
        /* Called every frame. */

        this.time += dt;

        if(this.gameManager.isPlay === true){

            this.isMove();

            //Bullet shooting interval control
            if(this.spaceBar === true){

                if(this.time >= this.spawnInterval){

                    this.bulletManager.spawnBullet();
                    this.shootSound.play();
                    this.time = 0;
                }
            }

            if(this.vrController.selectPressed === true){

                if(this.time >= this.spawnInterval){

                    this.bulletManager.spawnBullet();
                    this.shootSound.play();
                    this.time = 0;
                }
            }
        }
    }

    press(moving){

        if(moving.key === 'w' || moving.key === "ArrowUp") this.moveUp = true; //up
        if(moving.key === 's' || moving.key === "ArrowDown") this.moveDown = true; //Down
        if(moving.key === 'a' || moving.key === "ArrowLeft") this.moveLeft = true; //Left
        if(moving.key === 'd' || moving.key === "ArrowRight") this.moveRight = true; //Right

        if(moving.code === "Space") this.spaceBar = true;
    }

    release(moving){

        if(moving.key === 'w' || moving.key === "ArrowUp") this.moveUp = false; //up
        if(moving.key === 's' || moving.key === "ArrowDown") this.moveDown = false; //Down
        if(moving.key === 'a' || moving.key === "ArrowLeft") this.moveLeft = false; //Left
        if(moving.key === 'd' || moving.key === "ArrowRight") this.moveRight = false; //Right

        if(moving.code === "Space") this.spaceBar = false;
    }



    isMove(){

        this.playerCurrPos = this.object.getPositionWorld();

        //Up
        if(this.moveUp === true || this.vrController.moveUp === true){

            if(this.playerCurrPos[1] < 4) this.playerPos[1] += this.speed;
        }

        //Down
        if(this.moveDown === true || this.vrController.moveDown === true){

            if(this.playerCurrPos[1] > -1) this.playerPos[1] -= this.speed;
        }

        //Left
        if(this.moveLeft === true || this.vrController.moveLeft === true){
            
            if(this.playerCurrPos[0] > -2.25) this.playerPos[0] -= this.speed;
        }

        //Right
        if(this.moveRight === true || this.vrController.moveRight === true){

            if(this.playerCurrPos[0] < 2.25) this.playerPos[0] += this.speed;
        }

        this.object.setPositionLocal(this.playerPos);
    }



    isReset(){

        this.playerPos = [0, 0, -4];
        this.playerCurrPos = [0, 0, -4];

        this.gameManager.score = 0;
    }



    //Check Collision
    initCollision(){
        
        this.rigidBody = this.object.getComponent('physx');
        //console.log("RigidBody", this.rigidBody);

        this.rigidBody.onCollision(

            function(type, other){

                var otherObj = other.object.name;

                if(type === CollisionEventType.Touch){

                    if(otherObj.includes("enemy")){
                        
                        //setTimeout(() => {this.object.destroy();}, 500);
                        this.gameManager.isPlay = false;

                        this.gameManager.score = 0;

                        this.isDie = true;

                        this.overSound.play();
                    }

                    return;
                }
                else{

                    return;
                }
            }.bind(this)
        )
    }
}
