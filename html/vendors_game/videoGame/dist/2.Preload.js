var regaloNavidad = regaloNavidad || {};
var loadingText;
var preloadBar;
var stadoSiguiente;
var gameVar;
var anchoPantalla = $(window).width();
var phaserRankingJSON;
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
        this.load.image('btnConectarse', 'assets/images/btnConectarse.png');
        this.load.image('btnSalir', 'assets/images/btnSalir.png');
        this.load.image('backgroundConnection', 'assets/images/backgroundConnection.jpg');
        this.load.image('btnVolverAJugar', 'assets/images/btnVolverAJugar.png');
        this.load.image('backgroundBase', 'assets/images/backgroundGame0.jpg');
        this.load.image('backgroundTiles', 'assets/images/backgroundGame.png');
        this.load.image('hud_top', 'assets/images/hud_top.png');
        this.load.image('hud_mitocondria', 'assets/images/hud_mitocondria.png');
        this.load.image('hud_mitoCoin', 'assets/images/moneda_paracontador.png');
        this.load.image('hud_backgroundTrama', 'assets/images/backgroundTrama.png');
        this.load.image('fondo_ranking', 'assets/images/fondo_ranking.jpg');
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
        this.load.spritesheet('hud_star', 'assets/images/hudStar.png',275,48,6);
        this.load.spritesheet('mitoCoin', 'assets/images/mitoCoin.png',40,40,7);
        this.load.spritesheet('starCoin', 'assets/images/starCoin.png',80,80,6);
        this.load.spritesheet('player_jump', 'assets/images/player_jump.png',130,130,7);
        this.load.spritesheet('player_dmg', 'assets/images/player_dmg.png',130,130,6);

        this.game.load.json('rankingData', 'get_ranking');

        this.load.image('backgroundLoser', 'assets/images/backgroundLoser.jpg');
        this.load.image('backgroundWinner', 'assets/images/backgroundWinner.jpg');

        this.game.load.audio('backgroundMusic', ['assets/audio/backgroundMusic.ogg', 'assets/audio/backgroundMusic.mp3']);
        this.game.load.audio('mitoCoinGrab', ['assets/audio/monedas_01.ogg', 'assets/audio/monedas_01.wav', 'assets/audio/monedas_01.mp3']);
        this.game.load.audio('starCoinGrab', ['assets/audio/estrella_01.ogg', 'assets/audio/estrella_01.wav', 'assets/audio/estrella_01.mp3']);

        if(anchoPantalla <= 768){
            this.load.image('instrucciones', 'assets/images/instruccionesMobile.png');
        }
        else {
            this.load.image('instrucciones', 'assets/images/instruccionesDesktop.png');
        }

        this.game.load.start();
    },
    loadStart: function() {
        //console.log("Loading ...");
    },
    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        loadingText.setText("Cargando... " + progress + "%");
        preloadBar.animations.frame = Math.round(progress/10);
    },
    loadComplete: function() {
        //console.log("completo");
        gameVar.stateTransition.to('PostGame_winner');
    }
};
