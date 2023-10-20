import {Component, Property, CollisionEventType} from '@wonderlandengine/api';

/**
 * enemyControllerPhysX
 */
export class EnemyControllerPhysX extends Component {
    static TypeName = 'enemyControllerPhysX';
    /* Properties that are configurable in the editor */
    static Properties = {
    };

    speed = 0.075;

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

        this.object.name = "enemy";

        this.initCollision();
    }

    update(dt) {
        /* Called every frame. */

        this.enemyPos = this.object.getPositionWorld();

        this.object.setPositionWorld([this.enemyPos[0], this.enemyPos[1] - this.speed, this.enemyPos[2]]);

        if(this.enemyPos[1] < -2){

            this.object.destroy();
        }
    }



    initCollision(){
        
        this.rigidBody = this.object.getComponent('physx');

        this.rigidBody.onCollision(

            function(type, other){

                if(type === CollisionEventType.Touch){

                    var otherObj = other.object.name;

                    if(otherObj.includes("player")){
                        
                        setTimeout(() => {this.object.destroy();}, 500);
                    }

                    if(otherObj.includes("bullet")){

                        this.gameManager.isKill();
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
