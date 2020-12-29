sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, othersprite) {
    info.changeLifeBy(-1)
    othersprite.destroy(effects.disintegrate, 100)
    music.powerDown.play()
    scene.cameraShake(4, 500)
})

sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, othersprite) {
    info.changeScoreBy(1)
    othersprite.destroy(effects.fire, 100)
    music.baDing.play()
    sprite.destroy()
})

// fires bullets from the spaceship
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    bullet = sprites.createProjectileFromSide(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . 5 . . . . . . . . . . . 
        . . . 4 4 4 . . . . . . . . . . 
        . . 5 4 2 4 5 . . . . . . . . . 
        . . . 4 4 4 . . . . . . . . . . 
        . . . . 5 . . . . . . . . . . . 
        . . . . . . . . . . . 5 . . . . 
        . . . . . . . . . . 4 4 4 . . . 
        . . . . . . . . . 5 4 2 4 5 . . 
        . . . . . . . . . . 4 4 4 . . . 
        . . . . . . . . . . . 5 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, 0, -100)
    bullet.setPosition(spaceship.x, spaceship.y)
    bullet.setKind(SpriteKind.Projectile)
})
let bullet: Sprite = null
let rocks = null

// Sets background to black
scene.setBackgroundColor(15)
// Adds a starfield effects
effects.starField.startScreenEffect()
// This creates my spaceship

let spaceship = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 2 . . . . . . . . 
    . . . . . . 2 2 2 . . . . . . . 
    . . . . . . 2 1 2 . . . . . . . 
    . . . . . 8 2 1 2 8 . . . . . . 
    . . . . 1 8 1 1 1 8 1 . . . . . 
    . . . . 1 8 1 1 1 8 1 . . . . . 
    . . . . 2 8 8 8 8 8 2 . . . . . 
    . . . . . 8 8 8 8 8 . . . . . . 
    . . . . . 4 5 4 5 4 . . . . . . 
    . . . . . . 2 . 2 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)

// Allows sprite to move horizontally
controller.moveSprite(spaceship, 100, 0)
// Don't move my sprite out of the screen
spaceship.setFlag(SpriteFlag.StayInScreen, true)
info.setLife(5)
info.setScore(0)

// Sets the sprite in the bottom center
spaceship.setPosition(80, 110)

game.onUpdateInterval(500, function() {
    rocks = sprites.createProjectileFromSide(img`
        . . . . . . . . . b b b b . . .
        . . . . . . b b b d d d d b . .
        . . . . . . b d d d d d d b . .
        . . . . b b d d d d d b b d . .
        . . . . b d d d d d d b b d b .
        . . . . c d d d d d b b d b c .
        . . . b c c b b b b d d b c c .
        . . b b c c c b d d b c c c c .
        . b b d d d b b b b b b c c c c
        . c d d d d d d b d b c c c b c
        . c b d d d b b d b c c c b b c
        c b c c c c b d d b b b b b c c
        c c b b b d d b c c b b b b c c
        c c c c c c c c c b b b b c c .
        . c c c c b b b b b b b c c . .
        . . . . c c c c c c c c . . . .
    `, Math.randomRange(-20, 20), Math.randomRange(60, 80))
    rocks.setPosition(Math.randomRange(0, 160), 0)
    rocks.setKind(SpriteKind.Enemy)
})
