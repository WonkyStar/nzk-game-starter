import { Scene } from 'phaser';

class GameScene extends Scene {
	avatar: Phaser.GameObjects.Image
	dx = 1
	dy = 1
	reactContext: any

	constructor(props) {
		super(props);
		this.reactContext = props.extend
	}
	
	// Preload assets
	preload () {
		this.load.image('avatar', this.reactContext.user.avatar.url)
	}
	
	// Game init
	create() {
		this.avatar = this.add.image(this.game.renderer.width / 2, this.game.renderer.height / 2, 'avatar')
		this.avatar.setDisplaySize(250, this.avatar.height / this.avatar.width * 250)
		this.add.text(this.game.renderer.width / 2, 40, this.reactContext.user.username, { color: '#000', fontSize: 34 }).setOrigin(0.5)
	}

	// Game loop
	update(time: number, delta:number) {
		this.avatar.x += this.dx * 10
		this.avatar.y += this.dy * 10
		if (this.avatar.x > this.game.renderer.width - this.avatar.displayWidth / 2 || this.avatar.x < this.avatar.displayWidth / 2) {
			this.dx = -this.dx
		}
		if (this.avatar.y > this.game.renderer.height - this.avatar.displayHeight / 2 || this.avatar.y < this.avatar.displayHeight / 2) {
			this.dy = -this.dy
		}
	}
	
}

export default GameScene;