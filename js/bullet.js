import {Component, Property, CollisionEventType} from '@wonderlandengine/api';

/**
 * bullet
 */
export class Bullet extends Component {
    static TypeName = 'bullet';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0),

        player: Property.object()
    };

    speed = 0.1;

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

        this.object.name = "bullet";

        this.initCollision();
    }

    update(dt) {
        /* Called every frame. */

        this.bulletPos = this.object.getPositionWorld();

        this.object.setPositionWorld([this.bulletPos[0], this.bulletPos[1] + this.speed, this.bulletPos[2]]);

        if(this.bulletPos[1] > 6.5){

            this.gameManager.isKill();
            this.object.destroy();
        } 
    }



    //Collision check
    initCollision(){

        this.rigidBody = this.object.getComponent('physx');

        this.rigidBody.onCollision(

            function(type, other){

                if(type === CollisionEventType.Touch){

                    var otherObj = other.object.name;

                    if(otherObj.includes("enemy")){

                        this.playerController.explosionSound.play();
                        setTimeout(() => {this.object.destroy();}, 50);
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
