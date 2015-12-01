var regaloNavidad = regaloNavidad || {};
regaloNavidad.Preload = function() {};
regaloNavidad.Preload.prototype = {
    preload: function() {
        //Muestro el Loader
        this.preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        this.preloadBar.anchor.setTo(0.5);
        this.preloadBar.scale.setTo(3);
        this.load.setPreloadSprite(this.preloadBar);
        //Cargo los /public/assets
        this.load.image('backgroundBase', '/public/assets/images/backgroundGame0.jpg');
        this.load.image('backgroundTiles', '/public/assets/images/backgroundGame.png');
        this.load.image('hud_top', '/public/assets/images/hud_top.png');
        this.load.image('hud_mitocondria', '/public/assets/images/hud_mitocondria.png');
        this.load.image('build_01', '/public/assets/images/build_01.png');
        this.load.image('build_02', '/public/assets/images/build_02.png');
        this.load.image('build_03', '/public/assets/images/build_03.png');
        this.load.image('build_04', '/public/assets/images/build_04.png');
        this.load.image('build_05', '/public/assets/images/build_05.png');
        this.load.image('build_06', '/public/assets/images/build_06.png');
        this.load.image('build_07', '/public/assets/images/build_07.png');
        this.load.image('obj_01', '/public/assets/images/obj_01.png');
        this.load.image('obj_02', '/public/assets/images/obj_02.png');
        this.load.image('obj_03', '/public/assets/images/obj_03.png');
        this.load.image('obj_04', '/public/assets/images/obj_04.png');
        this.load.image('obj_05', '/public/assets/images/obj_05.png');
        this.load.image('obj_06', '/public/assets/images/obj_06.png');
        this.load.image('obj_07', '/public/assets/images/obj_07.png');
        this.load.spritesheet('life_001', '/public/assets/images/life_001.png',290,70,4);
        this.load.spritesheet('life_002', '/public/assets/images/life_002.png',290,70,2);
        this.load.spritesheet('hud_enemigos', '/public/assets/images/hud_enemigos.png',240,200,6);
        this.load.spritesheet('player', '/public/assets/images/player_run.png',130,130,8);
        this.load.spritesheet('player_jump', '/public/assets/images/player_jump.png',130,130,7);
        this.load.spritesheet('player_dmg', '/public/assets/images/player_dmg.png',130,130,6);
    },
    create: function() {
        this.state.start('PreGame');
    }
};
