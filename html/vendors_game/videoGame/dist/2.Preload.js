var regaloNavidad = regaloNavidad || {};
var loadingText;
var preloadBar;
var stadoSiguiente;
var gameVar;
//  The Google WebFont Loader will look for this object, so create it before loading the script.
WebFontConfig = {
    //  'active' means all requested fonts have finished loading
    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
        families: ['Lobster']
    }
};
regaloNavidad.Preload = function() {};
regaloNavidad.Preload.prototype = {
    preload: function() {
        //  Load the Google WebFont Loader script
        this.game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');
        //Muestro el Loader
        preloadBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'preloadbar');
        preloadBar.animations.add('loadingBar');
        this.runningPlayer = this.add.sprite(this.game.world.centerX+10, this.game.world.centerY-90, 'player');
        this.runningPlayer.animations.add('run');
        this.runningPlayer.animations.play('run', 15, true);
        preloadBar.anchor.setTo(0.5);
        this.runningPlayer.anchor.setTo(0.5);
        stadoSiguiente = this.state;
        gameVar = this.game;
    },
    create: function() {
        //	You can listen for each of these events from Phaser.Loader
        this.game.load.onLoadStart.add(this.loadStart);
        this.game.load.onFileComplete.add(this.fileComplete);
        this.game.load.onLoadComplete.add(this.loadComplete);
        loadingText = this.game.add.text(this.game.world.centerX, this.game.world.centerY+50, '', { fill: '#ffffff'});
        loadingText.anchor.setTo(0.5);
        loadingText.font = "Lobster";
        loadingText.fontSize = 28;
        this.startLoad();
    },
    startLoad: function() {
        //Cargo los assets
        this.load.image('backgroundComenzar', 'assets/images/backgroundComenzar.jpg');
        this.load.image('btnCompartir', 'assets/images/btnCompartir.png');
        this.load.image('btnRanking', 'assets/images/btnRanking.png');
        this.load.image('btnComenzar', 'assets/images/btnComenzar.png');
        this.load.image('btnVolverAJugar', 'assets/images/btnVolverAJugar.png');
        this.load.image('backgroundBase', 'assets/images/backgroundGame0.jpg');
        this.load.image('backgroundTiles', 'assets/images/backgroundGame.png');
        this.load.image('hud_top', 'assets/images/hud_top.png');
        this.load.image('hud_mitocondria', 'assets/images/hud_mitocondria.png');
        this.load.image('build_01', 'assets/images/build_01.png');
        this.load.image('build_02', 'assets/images/build_02.png');
        this.load.image('build_03', 'assets/images/build_03.png');
        this.load.image('build_04', 'assets/images/build_04.png');
        this.load.image('build_05', 'assets/images/build_05.png');
        this.load.image('build_06', 'assets/images/build_06.png');
        this.load.image('build_07', 'assets/images/build_07.png');
        this.load.image('obj_01', 'assets/images/obj_01.png');
        this.load.image('obj_02', 'assets/images/obj_02.png');
        this.load.image('obj_03', 'assets/images/obj_03.png');
        this.load.image('obj_04', 'assets/images/obj_04.png');
        this.load.image('obj_05', 'assets/images/obj_05.png');
        this.load.image('obj_06', 'assets/images/obj_06.png');
        this.load.image('obj_07', 'assets/images/obj_07.png');
        this.load.spritesheet('life_001', 'assets/images/life_001.png',290,70,4);
        this.load.spritesheet('life_002', 'assets/images/life_002.png',290,70,2);
        this.load.spritesheet('hud_enemigos', 'assets/images/hud_enemigos.png',240,200,6);
        this.load.spritesheet('player_jump', 'assets/images/player_jump.png',130,130,7);
        this.load.spritesheet('player_dmg', 'assets/images/player_dmg.png',130,130,6);

        this.load.image('backgroundLoser', 'assets/images/backgroundLoser.jpg');

        this.game.load.start();
    },
    loadStart: function() {
        console.log("Loading ...");
    },
    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        loadingText.setText("Cargando... " + progress + "%");
        preloadBar.animations.frame = Math.round(progress/10);
    },
    loadComplete: function() {
        console.log("completo");
        gameVar.stateTransition.to('PreGame');
    }
};
