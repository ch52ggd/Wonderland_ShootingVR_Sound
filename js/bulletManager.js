import {Component, PhysXComponent, Shape, Property} from '@wonderlandengine/api';

import {PlayerController} from './playerController.js';
import {GameManager} from './gameManager.js';
import {Bullet} from './bullet.js';

/**
 * bulletManager
 */
export class BulletManager extends Component {
    static TypeName = 'bulletManager';
    /* Properties that are configurable in the editor */
    static Properties = {
        param: Property.float(1.0),

        playerController: Property.object(),
        gameManager: Property.object(),
        bullet: Property.object(),

        bulletMesh: Property.mesh(),
        bulletMaterial: Property.material()
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

        this.playerController = this.playerController.getComponent(PlayerController);
        this.gameManager = this.gameManager.getComponent(GameManager);
        this.bullet = this.bullet.getComponent(Bullet);

    }

    update(dt) {
        /* Called every frame. */
    }

    spawnBullet(){

        this.newBulletPos = this.playerController.playerCurrPos

        var obj = this.engine.scene.addObject(null);

        obj.addComponent('mesh', {
            mesh: this.bulletMesh,
            material: this.bulletMaterial
        });

        obj.scaleLocal([[0.025], [0.1], [0.1]]);

        obj.setPositionWorld([this.newBulletPos[0], this.newBulletPos[1], this.newBulletPos[2]]);

        obj.addComponent(PhysXComponent, {
            shape: Shape.Box,
            extents: [[0.025], [0.1], [0.1]],
            // groupsMask: (1 << 4) | (1 << 5) | (1 << 6) | (1 << 3),
            // blocksMask: (1 << 4) | (1 << 5) | (1 << 6) | (1 << 3),

            allowSimulation: true,
            trigger: false,
            allowQuery: true,
            simulate: true,
            static: false,
            gravity: false,
            kinematic: true
        });

        obj.addComponent(Bullet);
        obj.getComponent(Bullet).gameManager = this.gameManager;
        obj.getComponent(Bullet).playerController = this.playerController;
    }
}
