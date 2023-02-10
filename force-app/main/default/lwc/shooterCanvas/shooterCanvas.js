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
        this.isCollision = false;
        this.isEnemyHit = false;
        this.isHeroHit = false;
        this.heroShootDelay = 300;
        this.enemyShootDelay = 500;
        this.enemies2create = 1;
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

    removeMissile(missiles, index) {
        if (this.getIntFromPx(missiles[index].style.top) < 0
            || this.getIntFromPx(missiles[index].style.top) > this.height) {
            missiles[index].remove();
            missiles.splice(index, 1);
            return true;
        }
        return false;
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
                    for (let i = 0; i < Math.floor(Math.random() * 3); i++) {
                        const selectEnemy = Math.floor(Math.random() * this.allenemies.length);
                        const randStart = Math.floor(Math.random() * (this.width - this.maxBound));
                        this.enemies.push(this.createEnemy(randStart, this.allenemies[selectEnemy].name));
                    }
                    this.enemies2create++;
                }
            }

            for (let enemyObject of this.enemies) {
                const enemyTop = this.getIntFromPx(enemyObject.style.top)
                let enemyLeft = this.getIntFromPx(enemyObject.style.left)
                const enemyWidth = this.getIntFromPx(enemyObject.style.width)
                const enemyHeight = this.getIntFromPx(enemyObject.style.height)
                const enemyDirection = parseInt(enemyObject.dataset.moving)

                if ((enemyLeft + parseInt(enemyWidth / 2)) <= 0) {
                    enemyObject.dataset.moving = 1;
                }
                else if (enemyLeft >= this.width - (this.maxBound + parseInt(enemyWidth / 2))) {
                    enemyObject.dataset.moving = 0;
                }

                // if (enemyDirection === 1) {
                //     // Move right
                //     enemyObject.style.left = `${enemyLeft + this.eDx}px`
                // } else {
                //     // Move left
                //     enemyObject.style.left = `${enemyLeft - this.eDx}px`
                // }

                // // Update enemy left
                // enemyLeft = this.getIntFromPx(enemyObject.style.left)

                if (this.px >= (enemyLeft - parseInt(enemyWidth / 2)) && this.px <= (enemyLeft + parseInt(enemyWidth / 2))) {
                    if (!this.enemyCanShoot)
                        this.launchEnemyMissile(enemyLeft)
                }

                for (let indexOne in (this.heroeMissiles.length > 0 ? this.heroeMissiles : this.enemyMissiles)) {
                    const tempMissile = (this.heroeMissiles.length > 0 ? this.heroeMissiles : this.enemyMissiles)
                    if (this.removeMissile(tempMissile, indexOne)) continue;
                    this.isEnemyHit = false;

                    if (this.heroeMissiles.length > 0) {
                        const targetHeroMissile = this.heroeMissiles[indexOne];
                        const heroMissileTop = this.getIntFromPx(targetHeroMissile.style.top)
                        const heroMissileLeft = this.getIntFromPx(targetHeroMissile.style.left)
                        const heroMissileWidth = this.getIntFromPx(targetHeroMissile.style.width)

                        if ((heroMissileLeft >= enemyLeft && heroMissileLeft <= (enemyLeft + enemyWidth)
                            && (heroMissileTop < (enemyTop + enemyHeight)))) {
                            this.isEnemyHit = true;
                        }
                        else if (((heroMissileLeft + heroMissileWidth) >= enemyLeft && (heroMissileLeft + heroMissileWidth) <= (enemyLeft + enemyWidth)
                            && (heroMissileTop < (enemyTop + enemyHeight)))) {
                            this.isEnemyHit = true;
                        }

                        if (this.isEnemyHit) {
                            this.heroeMissiles.splice(indexOne, 1)
                            targetHeroMissile.style.backgroundImage = `url(${shoot}/explosion.gif)`
                            this.missileCollisionSoundEffect();

                            setTimeout(() => {
                                targetHeroMissile.remove();
                                // If the enemy gets hit, they die and a new one gets created!
                                this.enemies[0].remove();
                                this.enemies.splice(0, 1);
                            }, 1000)
                            // continue;
                        }
                    }

                    for (let indexTwo in (this.heroeMissiles.length > 0 ? this.enemyMissiles : this.heroeMissiles)) {
                        const tempMissile = (this.heroeMissiles.length > 0 ? this.enemyMissiles : this.heroeMissiles)
                        if (this.removeMissile(tempMissile, indexTwo)) continue;
                        this.isCollision = false;

                        const mTop = this.getIntFromPx(this.heroeMissiles[indexOne].style.top)
                        const mLeft = this.getIntFromPx(this.heroeMissiles[indexOne].style.left)
                        const mWidth = this.getIntFromPx(this.heroeMissiles[indexOne].style.width)
                        const mHeight = this.getIntFromPx(this.heroeMissiles[indexOne].style.height)

                        const enemyMissileTop = this.getIntFromPx(this.enemyMissiles[indexTwo].style.top)
                        const enemyMissileLeft = this.getIntFromPx(this.enemyMissiles[indexTwo].style.left)
                        const enemyMissileWidth = this.getIntFromPx(this.enemyMissiles[indexTwo].style.width)
                        const enemyMissileHeight = this.getIntFromPx(this.enemyMissiles[indexTwo].style.height)

                        // Coliision Detection Mechanism
                        if ((enemyMissileLeft >= mLeft && enemyMissileLeft <= (mLeft + mWidth))
                            &&
                            ((enemyMissileTop + enemyMissileHeight > mTop) && (enemyMissileTop < mTop + mHeight))) {
                            this.isCollision = true;
                        }
                        else if (((enemyMissileLeft + enemyMissileWidth) >= mLeft && (enemyMissileLeft + enemyMissileWidth) <= (mLeft + mWidth))
                            &&
                            ((enemyMissileTop + enemyMissileHeight > mTop) && (enemyMissileTop < mTop + mHeight))) {
                            this.isCollision = true;
                        }

                        if (this.isCollision) {
                            const hero = this.heroeMissiles[indexOne];
                            const enemy = this.enemyMissiles[indexTwo];

                            hero.style.backgroundImage = `url(${shoot}/explosion.gif)`;
                            enemy.style.backgroundImage = `url(${shoot}/explosion.gif)`;

                            this.missileCollisionSoundEffect();

                            this.heroeMissiles.splice(indexOne, 1);
                            this.enemyMissiles.splice(indexTwo, 1);

                            setTimeout(() => {
                                hero.remove();
                                enemy.remove();
                            }, 1000)
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

                    // // Bounds checking 
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
        el.style.width = '10px'
        el.style.height = '30px'
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
        el.dataset["moving"] = Math.floor(Math.random() * 2)

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
        const missileLeft = this.px + ((parseInt(this.playerwidth / 1.4) - 10) | 0);

        // Store a missile in a list
        this.heroeMissiles.push(this.createMissile(missileTop, missileLeft, false))

        // Launch the missile
        mObject.heroeMissileLaunched(this.heroeMissiles[this.heroeMissiles.length - 1]);

        this.missileSoundEffect()

        this.heroeCanShoot = setTimeout(() => {
            this.heroeCanShoot = null;
        }, this.heroShootDelay)
    }

    launchEnemyMissile(enemyLeft) {
        const mObject = new Missile();
        const missileTop = 55;
        const missileLeft = enemyLeft + 22;

        // Store a missile in a list
        this.enemyMissiles.push(this.createMissile(missileTop, missileLeft, true))

        // Launch the missile
        mObject.enemyMissileLaunched(this.enemyMissiles[this.enemyMissiles.length - 1], this.height);

        this.missileSoundEffect()

        this.enemyCanShoot = setTimeout(() => {
            this.enemyCanShoot = null;
        }, this.enemyShootDelay)
    }

    @api
    invokeMissile() {
        if (!this.heroeCanShoot)
            this.launchHeroMissile();
    }
}