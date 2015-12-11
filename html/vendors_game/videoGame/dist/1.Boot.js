var regaloNavidad = regaloNavidad || {};
regaloNavidad.Boot = function() {};
//Congirudo y cargo los Assets para el Preloader
regaloNavidad.Boot.prototype = {
    preload: function() {
        //Assets que se usaran en la Carga
        this.load.spritesheet('preloadbar', 'assets/images/preloader-bar.png',336,30,11);
        this.load.spritesheet('player', 'assets/images/player_run.png',130,130,8);
    },
    create: function() {
        //Backgroundcolor para el Loader
        this.game.stage.backgroundColor = '#000';
        //Opciones de Escalado para Phaser
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setMinMax(0, 0, 960, 640);
        //Centrar el Juego
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.refresh();
        //Configuro la escala del juego automaticamente a la pantalla
        this.game.scale.updateLayout(true);
        //Sistema se Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.stateTransition = this.game.plugins.add(Phaser.Plugin.StateTransition);
        this.game.stateTransition.configure({
            duration: Phaser.Timer.SECOND * 0.8,
            ease: Phaser.Easing.Exponential.InOut,
            properties: {
                alpha: 0,
                scale: {
                    x: 1.4,
                    y: 1.4
                }
            }
        });
        this.state.start('Ranking');
    }
};
