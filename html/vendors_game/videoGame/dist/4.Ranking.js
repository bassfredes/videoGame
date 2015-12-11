var regaloNavidad = regaloNavidad || {};
var stadoSiguiente;
var rankingData;
var phaserRankingJSON;
regaloNavidad.Ranking = function() {};
regaloNavidad.Ranking.prototype = {
    preload: function() {

    },
    create: function() {
        this.backgroundComenzar = this.game.add.sprite(0, 0, 'backgroundComenzar');
        phaserRankingJSON = this.game.cache.getJSON('rankingData');
        console.log(phaserRankingJSON);
    },
    update: function() {
    },
    render: function() {
    },
};
