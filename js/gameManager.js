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

    bgm;

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

        this.bgm = this.object.addComponent('audio-source', {audioFile: 'sfx/BGM.wav'});
    }

    update(dt) {
        /* Called every frame. */

        if(this.isPlay === true){

            this.bgm.play();
        }
        if(this.isPlay === false){

            this.bgm.stop();
        }
    }



    isKill(){

        this.score += 500;
        //this.textBox.text = this.score;
        return;
    }
}
