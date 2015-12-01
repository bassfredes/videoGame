var regaloNavidad = regaloNavidad || {};
regaloNavidad.Boot = function() {};
//Congirudo y cargo los Assets para el Preloader
regaloNavidad.Boot.prototype = {
    preload: function() {
        //Assets que se usaran en la Carga
        this.load.image('preloadbar', '/assets/images/preloader-bar.png');
    },
    create: function() {
        //Backgroundcolor para el Loader
        this.game.stage.backgroundColor = '#fff';
        //Opciones de Escalado para Phaser
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //Centrar el Juego
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        //Configuro la escala del juego automaticamente a la pantalla
        this.scale.updateLayout(true);
        //Sistema se Physics
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.state.start('Preload');
    }
};
