import {Component, Property} from '@wonderlandengine/api';

import {GameManager} from './gameManager.js';
import {PlayerController} from './playerController.js';

/**
 * textManager
 */
export class TextManager extends Component {
    static TypeName = 'textManager';
    /* Properties that are configurable in the editor */
    static Properties = {
        //param: Property.float(1.0),

        gameManager: Property.object(), 

        playerController: Property.object(),

        titleText: Property.object(),
        scoreText: Property.object(),
        startText: Property.object(),
        resultText: Property.object()
    };

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

        this.gameManager = this.gameManager.getComponent(GameManager);

        this.playerController = this.playerController.getComponent(PlayerController);

        this.titleText = this.titleText.getComponent('text');
        this.scoreText = this.scoreText.getComponent('text');
        this.startText = this.startText.getComponent('text');
        this.resultText = this.resultText.getComponent('text');
        
        
        this.titleText.text = "Shooting Game";

        this.scoreText.text = "Shooting Game";

        this.startText.text = "Game Start";

        this.resultText.text = " ";
    }

    update(dt) {
        /* Called every frame. */

        this.isChangeText();
    }

    isChangeText(){

        if(this.gameManager.isPlay === true){

            this.titleText.text = "Shooting Game";
            this.startText.text = "Start Game";
            this.resultText.text = " ";

            this.newScore = this.gameManager.score;
            this.scoreText.text = this.newScore;
        }

        if(this.gameManager.isPlay === false){

            if(this.playerController.isDie === true){

                this.titleText.text = "Game Over";
                this.startText.text = "Restart Game";
                this.resultText.text = "You got " + this.newScore + " score";

                this.scoreText.text = " ";
            }
        }
    }
}
