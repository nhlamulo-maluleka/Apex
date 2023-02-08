import { api, LightningElement, wire } from 'lwc';
import shoot from "@salesforce/resourceUrl/shooter"
import audio from "@salesforce/resourceUrl/audio"
import enemy from "@salesforce/resourceUrl/enemy"
import getEnemies from '@salesforce/apex/EagleShooter.getEnemies';

class Missile {
    constructor() {
        this.dy = 10;
    }

    heroeMissileLaunched(mobject) {
        const misObject = mobject;
        this.missileTimer = setInterval(() => {
            const prevTop = parseInt((misObject.style.top).replace("px", ""))
            misObject.style.top = `${prevTop - this.dy}px`

            if (prevTop < 0) {
                misObject.remove();
                clearInterval(this.missileTimer);
            }
        }, 50)
    }

    enemyMissileLaunched(mobject, height) {
        const misObject = mobject;
        this.missileTimer = setInterval(() => {
            const prevTop = parseInt((misObject.style.top).replace("px", ""))
            misObject.style.top = `${prevTop + this.dy}px`

            if (prevTop >= height) {
                misObject.remove();
                clearInterval(this.missileTimer);
            }
        }, 50)
    }
}

export default class ShooterCanvas extends LightningElement {
    @api width;
    @api height;
    @api px;
    @api py;
    @api playerheight;
    @api playerwidth;

    // Missiles shot!!
    constructor() {
        super();
        this.enemyMissiles = [];
        this.heroeMissiles = [];
        this.enemies = [];
        this.count = 0;
        this.enemyId = 0;
        this.eDx = 20;
        this.moveLeft = null;
        this.defaultMoveLeft = false;
        this.enemyRadius = 60;
        this.defaultChange = 10;
        this.minBound = 10;
        this.maxBound = 40;
        this.allenemies = [];
        this.enemyCanShoot = null;
        this.heroeCanShoot = null;
        this.shootDelay = 500
    }

    @wire(getEnemies)
    loadAllEnemies() {
        getEnemies()
            .then(async (response) => {
                this.allenemies = await response;
            }).catch(err => {
                alert(`Error: ${err}`)
            })
    }

    getIntFromPx(value) {
        return parseInt(value.replace("px", ''));
    }

    renderedCallback() {
        this.canvas = this.template.querySelector('[data-id="canvas"]');
        this.canvas.style.width = `${this.width}px`
        this.canvas.style.height = `${this.height}px`
        this.canvas.style.backgroundImage = `url(${shoot}/space.gif)`

        setInterval(async () => {
            if (this.allenemies.length > 0) {
                // Create an enemy instance
                if (this.enemies.length <= 0) {
                    const selectEnemy = Math.floor(Math.random() * this.allenemies.length);
                    const randStart = Math.floor(Math.random() * (this.width - this.maxBound));
                    this.enemies.push(this.createEnemy(randStart, this.allenemies[selectEnemy].name));
                }
            }

            for (let enemyObject of this.enemies) {
                const enemyTop = this.getIntFromPx(enemyObject.style.top)
                const enemyLeft = this.getIntFromPx(enemyObject.style.left)
                const enemyWidth = this.getIntFromPx(enemyObject.style.width)

                if (this.px >= enemyLeft && this.px <= (enemyLeft + enemyWidth)) {
                    if (!this.enemyCanShoot)
                        this.launchEnemyMissile(enemyLeft)
                }

                for (let indexOne in (this.heroeMissiles.length > 0 ? this.heroeMissiles : this.enemyMissiles)) {
                    for (let indexTwo in (this.heroeMissiles.length > 0 ? this.enemyMissiles : this.heroeMissiles)) {
                        // Remove unnecessary heroe missile
                        if (this.getIntFromPx(this.heroeMissiles[0].style.top) < 0) {
                            this.heroeMissiles.splice(0, 1);
                        }

                        // Remove unnecessary enemy missile
                        if (this.getIntFromPx(this.enemyMissiles[0].style.top) > this.height) {
                            this.enemyMissiles.splice(0, 1);
                        }

                        const mTop = this.getIntFromPx(this.heroeMissiles[indexOne].style.top)
                        const mLeft = this.getIntFromPx(this.heroeMissiles[indexOne].style.left)
                        const mWidth = this.getIntFromPx(this.heroeMissiles[indexOne].style.width)
                        const mHeight = this.getIntFromPx(this.heroeMissiles[indexOne].style.height)

                        const enenyMissileTop = this.getIntFromPx(this.enemyMissiles[indexTwo].style.top)
                        const enenyMissileLeft = this.getIntFromPx(this.enemyMissiles[indexTwo].style.left)
                        const enenyMissileWidth = this.getIntFromPx(this.enemyMissiles[indexTwo].style.width)
                        const enenyMissileHeight = this.getIntFromPx(this.enemyMissiles[indexTwo].style.height)

                        if (((mLeft >= enenyMissileLeft || enenyMissileLeft >= mLeft)
                            && (mLeft + mWidth <= enenyMissileLeft + enenyMissileWidth
                                || enenyMissileLeft + enenyMissileWidth <= mLeft + mWidth))
                            && (mTop < enenyMissileTop)) {
                            this.heroeMissiles[indexOne].remove();
                            this.enemyMissiles[indexTwo].remove();
                            this.heroeMissiles.splice(indexOne, 1);
                            this.enemyMissiles.splice(indexTwo, 1);
                            this.missileCollisionSoundEffect();
                        }

                        if (mTop < (enemyTop + ((this.height / 2) | 0))) {
                            if (mLeft < enemyLeft && mLeft > (enemyLeft - this.enemyRadius)) {
                                if ((enemyLeft + 2 * this.eDx) < this.width - 40)
                                    this.moveLeft = false;
                                else
                                    this.moveLeft = true;
                            } else if (mLeft > enemyLeft && mLeft < (enemyLeft + this.enemyRadius)) {
                                if ((enemyLeft - 2 * this.eDx) > 0)
                                    this.moveLeft = true;
                                else
                                    this.moveLeft = false;
                            } else {
                                if ((enemyLeft - this.eDx) <= 10)
                                    this.moveLeft = false;
                                else if ((enemyLeft + this.eDx) >= (this.width - 40))
                                    this.moveLeft = true;
                                else
                                    this.moveLeft = null;
                            }

                            if (this.moveLeft != null) {
                                if (this.moveLeft)
                                    enemyObject.style.left = `${enemyLeft - this.eDx}px`
                                else
                                    enemyObject.style.left = `${enemyLeft + this.eDx}px`
                            }
                        }
                    }

                    // Bounds checking 
                    if (enemyLeft <= 10) enemyObject.style.left = `10px`;
                    if (enemyLeft >= this.width - this.maxBound) enemyObject.style.left = `${this.width - this.maxBound}px`
                }
                // Missile for-end
            }
            // Enemy for-end

        }, 1000);
    }

    createMissile(mTop, mLeft, isEnemy) {
        const el = document.createElement("div")
        el.style.position = 'absolute'
        el.style.width = '20px'
        el.style.height = '40px'
        el.style.backgroundImage = `url(${shoot}/missile.png)`
        el.style.backgroundSize = 'cover'
        el.style.backgroundRepeat = 'no-repeat'
        el.style.backgroundPosition = 'center'
        el.style.top = `${mTop}px`
        el.style.left = `${mLeft}px`
        el.style.zIndex = '999'
        el.style.transition = 'all .2s'
        el.style.borderRadius = "50%"
        el.style.transform = `rotate(${isEnemy ? 180 : 0}deg)`

        const id = `missile${this.count}`;
        el.dataset["missile"] = id

        // Add the missile to the canvas
        this.canvas.appendChild(el);

        // Increment the missile count!!!
        this.count += 1;

        // Add the reference to the list
        return this.template.querySelector(`[data-missile="${id}"]`)
    }

    createEnemy(enemyStartPosition, enemyPreview) {
        const el = document.createElement("div")
        el.style.position = 'absolute'
        el.style.width = '50px'
        el.style.height = '50px'
        el.style.backgroundImage = `url(${enemy}/${enemyPreview})`
        el.style.backgroundSize = 'cover'
        el.style.backgroundRepeat = 'no-repeat'
        el.style.backgroundPosition = 'center'
        el.style.top = `10px`
        el.style.left = `${enemyStartPosition}px`
        el.style.zIndex = '999'
        el.style.transition = 'all .5s'
        el.style.borderRadius = "50%"

        const id = `enemy${this.enemyId}`;
        el.dataset["enemy"] = id

        // Add the missile to the canvas
        this.canvas.appendChild(el);

        // Increment the missile count!!!
        this.enemyId += 1;

        // Add the reference to the list
        return this.template.querySelector(`[data-enemy="${id}"]`)
    }

    async missileSoundEffect() {
        const missile = new Audio(`${audio}/attack.mp3`);
        missile.volume = 1;
        await missile.play();
    }
    
    async missileCollisionSoundEffect() {
        const explotion = new Audio(`${audio}/explotion.mp3`);
        explotion.volume = 1;
        await explotion.play();
    }

    launchHeroMissile() {
        const mObject = new Missile();
        const missileTop = this.height - (this.playerheight + 40)
        const missileLeft = this.px + ((parseInt(this.playerwidth / 2) - 10) | 0);

        // Store a missile in a list
        this.heroeMissiles.push(this.createMissile(missileTop, missileLeft, false))

        // Launch the missile
        mObject.heroeMissileLaunched(this.heroeMissiles[this.heroeMissiles.length - 1]);

        this.missileSoundEffect()

        this.heroeCanShoot = setTimeout(() => {
            this.heroeCanShoot = null;
        }, this.shootDelay)
    }

    launchEnemyMissile(enemyLeft) {
        const mObject = new Missile();
        const missileTop = 55;
        const missileLeft = enemyLeft + 15;

        // Store a missile in a list
        this.enemyMissiles.push(this.createMissile(missileTop, missileLeft, true))

        // Launch the missile
        mObject.enemyMissileLaunched(this.enemyMissiles[this.enemyMissiles.length - 1], this.height);

        this.missileSoundEffect()

        this.enemyCanShoot = setTimeout(() => {
            this.enemyCanShoot = null;
        }, this.shootDelay)
    }

    @api
    invokeMissile() {
        if (!this.heroeCanShoot)
            this.launchHeroMissile();
    }
}