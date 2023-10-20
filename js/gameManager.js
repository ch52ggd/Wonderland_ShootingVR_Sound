import {Component, Property} from '@wonderlandengine/api';

/**
 * gameManager
 */
export class GameManager extends Component {
    static TypeName = 'gameManager';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0)
    };

    score;

    isPlay;

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
        
        this.score = 0;

        this.isPlay = false;
    }

    update(dt) {
        /* Called every frame. */
    }



    isKill(){

        this.score += 500;
        //this.textBox.text = this.score;
        return;
    }
}
