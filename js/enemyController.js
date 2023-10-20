import {Component, Property, CollisionComponent} from '@wonderlandengine/api';

/**
 * enemyController
 */
export class EnemyController extends Component {
    static TypeName = 'enemyController';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0)
    };

    speed;

    check;
    
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

        this.speed = 0.03;
        this.enemyPos = [0.0, 4.0, -3.0];

        this.collisionComponent = this.object.getComponent(CollisionComponent);

        this.check = false;
    }

    update(dt) {
        /* Called every frame. */
        
        //this.isMove();
        //this.isCollision();

    }

    isMove(){

        this.enemyPos[1] -= this.speed; //Down
        this.object.setPositionLocal(this.enemyPos); //Enemy position setting

        this.enemyCurrPos = this.object.getPositionLocal(); //Get enemy's current position
        
        if(this.enemyCurrPos[1] < 0){

            //console.log("Down");
            this.enemyPos[1] = 4.0; //Reset enemy's y.position
        }
    }

    isCollision(){

        this.overlaps = this.collisionComponent.queryOverlaps();
        for(var otherCollider of this.overlaps){
            var otherObject = otherCollider.object;

            console.log("???");
        }
    }
}
