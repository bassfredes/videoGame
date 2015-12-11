var regaloNavidad = regaloNavidad || {};
var stadoSiguiente;
var rankingData;
var phaserRankingJSON;
regaloNavidad.Ranking = function() {};
regaloNavidad.Ranking.prototype = {
    preload: function() {
        this.game.load.json('rankingData', '/get_ranking');
    },
    create: function() {    
        phaserRankingJSON = this.game.cache.getJSON('rankingData');
        stadoSiguiente = this.state;
    },
    update: function() {
    },
    render: function() {
    },
};
