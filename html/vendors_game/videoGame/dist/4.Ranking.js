var regaloNavidad = regaloNavidad || {};
var stadoSiguiente;
var rankingData;
var phaserRankingJSON;
var rankingText;
regaloNavidad.Ranking = function() {};
regaloNavidad.Ranking.prototype = {
    preload: function() {

    },
    create: function() {

        this.backgroundComenzar = this.game.add.sprite(0, 0, 'fondo_ranking');
        phaserRankingJSON = this.game.cache.getJSON('rankingData');
        var styleText = {font:'28px Lobster', fill: '#ffffff'};
        rankingText = this.game.add.text(this.game.world.centerX, this.game.world.centerY+50, '', styleText);
        rankingText.anchor.setTo(0.5);

        var graphics = this.game.add.graphics(100, 100);
        var cuadroPosicion = {'x':120,'y':195};
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

        rankingText.setText(v.name.toString());
        $.each(phaserRankingJSON, function(k,v){

        });


    },
    update: function() {
    },
    render: function() {
    },
};
