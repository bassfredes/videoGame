var regaloNavidad = regaloNavidad || {};
var stadoSiguiente;
var rankingData;
var personasArray = [];
var rankingText1;
var rankingText2;
var textosArray1 = [];
var textosArray2 = [];
var x = 32;
var y = 80;

regaloNavidad.Ranking = function() {};
regaloNavidad.Ranking.prototype = {
    preload: function() {
        phaserRankingJSON = this.game.cache.getJSON('rankingData');
        //console.log(phaserRankingJSON);

        //$.each(phaserRankingJSON, function(k,v){
            /*this.game.load.image('imagenPersona', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/p50x50/11034055_10206093761125480_8706607296802154047_n.jpg?oh=cb61493501a9f9a272155e6a422285be&oe=5713F1B1&__gda__=1456901688_37f2cc0ea6e79ec8222039d6d66a87ff');*/
        //});
        //this.game.load.image('imagenPersona', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/p50x50/11034055_10206093761125480_8706607296802154047_n.jpg?oh=cb61493501a9f9a272155e6a422285be&oe=5713F1B1&__gda__=1456901688_37f2cc0ea6e79ec8222039d6d66a87ff');

        var loader = new Phaser.Loader(this.game);
        loader.image('imagenPersona', 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/p50x50/11034055_10206093761125480_8706607296802154047_n.jpg?oh=cb61493501a9f9a272155e6a422285be&oe=5713F1B1&__gda__=1456901688_37f2cc0ea6e79ec8222039d6d66a87ff');
        loader.onLoadComplete.addOnce(onLoaded);
        loader.start();
        var onLoaded = function(){
           console.log('everything is loaded and ready to be used')
        }
    },
    create: function() {
        this.backgroundComenzar = this.game.add.sprite(0, 0, 'fondo_ranking');
        this.personaFoto = this.game.add.image(0, 0, 'imagenPersona');
        //phaserRankingJSON = this.game.cache.getJSON('rankingData');

        var styleText = {font:'20px Lobster', fill: '#ffffff', tabs: [ 185]};
        var graphics = this.game.add.graphics(100, 100);
        var cuadroPosicion = {'x':120,'y':195};
        rankingText1 = this.game.add.text(cuadroPosicion.x+150, cuadroPosicion.y+105, '', styleText);
        rankingText1.lineSpacing=20;
        rankingText2 = this.game.add.text(cuadroPosicion.x+430, cuadroPosicion.y+105, '', styleText);
        rankingText2.lineSpacing=20;
        var countJson = 0;
        $.each(phaserRankingJSON, function(k,v){
            var firstName = v.name.split(' ',1);
            if(countJson<5){
                textosArray1.push([firstName,v.puntaje]);
            }else{
                textosArray2.push([firstName,v.puntaje]);
            }
            //this.imagenPersona+k = this.game.add.sprite(0, 0, 'imagenPersona'+k);

            countJson++;
        });

        rankingText1.parseList(textosArray1);
        rankingText2.parseList(textosArray2);
        cuadroPosicion = {'x':120,'y':195};
        for (var i = 1; i <= 10; i++) {
            graphics.lineStyle(2, 0xffffff, 1);
            graphics.drawRect(cuadroPosicion.x, cuadroPosicion.y, 40, 40);
            cuadroPosicion.y=cuadroPosicion.y+52;

            if(i==5){
                cuadroPosicion.x=400;
                cuadroPosicion.y=195;
            }
        }

        this.graphics = graphics;

    },
    update: function() {
    },
    render: function() {
    }
};
