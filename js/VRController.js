import {Component, InputComponent, Property} from '@wonderlandengine/api';

import {GameManager} from './gameManager.js';

/**
 * VRController
 */
export class VRController extends Component {
    static TypeName = 'VRController';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0),

        LHand: Property.object(),
        RHand: Property.object(),

        gameManager: Property.object()
    };



    selectPressed = false;



    moveLeft;
    moveRight;
    moveUp;
    moveDown;


    
    static onRegister(engine) {
        /* Triggered when this component class is registered.
         * You can for instance register extra component types here
         * that your component may create. */
    }

    init() {
        //console.log('init() with param', this.param);

        this.inputListener();
    }

    start() {
        //console.log('start() with param', this.param);

        this.gameManager = this.gameManager.getComponent(GameManager);
    }

    update(dt) {
        /* Called every frame. */

        this.inputGamepad(this.LHand);
        this.inputGamepad(this.RHand);

    }



    inputListener(){

        this.engine.onXRSessionStart.add((session, mode) => {

            console.log("XR Session Start");

            this.LHand = this.LHand.getComponent(InputComponent);
            this.RHand = this.RHand.getComponent(InputComponent);

            //console.log("Left hand gamepad", this.LHand.xrInputSource.gamepad);
            
            //select
            this.engine.xr.session.addEventListener("selectstart", this.selectstart.bind(this));
            this.engine.xr.session.addEventListener("selectend", this.selectend.bind(this));
            

            //squeeze
            this.engine.xr.session.addEventListener("squeezestart", this.squeezestart.bind(this));
            this.engine.xr.session.addEventListener("squeezeend", this.squeezeend.bind(this));
        })
    }

    //select
    selectstart(e){

        //console.log("select start event", e);
        this.selectPressed = true;
    }
    selectend(e){

        //console.log("select end event");
        this.selectPressed = false;
    }

    //squeeze
    squeezestart(e){

        //console.log("squeeze start event");
        this.gameManager.isPlay = !this.gameManager.isPlay;
    }
    squeezeend(e){

        //console.log("squeeze end event");
    }


    
    inputGamepad(inputHand){

        if(inputHand && inputHand.xrInputSource){

            this.gamepad = inputHand.xrInputSource.gamepad;

            /*
            //button
            //trigger button
            if(this.gamepad.buttons[0].pressed){

                //console.log("The button is 0");
            }

            //squeeze button
            if(this.gamepad.buttons[1].pressed){

                //console.log("The button is 1");
            }

            //thumbstick
            if(this.gamepad.buttons[3].pressed){

                //console.log("The button is 3");
            }

            //LHand = x | RHand = A
            if(this.gamepad.buttons[4].pressed){

                //console.log("The button is 4");
            }

            //LHand = Y | RHand = B
            if(this.gamepad.buttons[5].pressed){

                //console.log("The button is 5");
            }
            */



            if(this.gamepad && this.gamepad.axes){

                if(inputHand === this.LHand){

                    //Up
                    if(this.gamepad.axes[3] < 0){

                        this.moveUp = true;
                    }
                    else this.moveUp = false;

                    //Down
                    if(this.gamepad.axes[3] > 0){

                        this.moveDown = true;
                    }
                    else this.moveDown = false;

                    //Left
                    if(this.gamepad.axes[2] < 0){

                        this.moveLeft = true;
                    }
                    else this.moveLeft = false;
                    
                    //Right
                    if(this.gamepad.axes[2] > 0){

                        this.moveRight = true;
                    }
                    else this.moveRight = false;
                }
            }
        }
    }
}
