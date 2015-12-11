var regaloNavidad = regaloNavidad || {};
regaloNavidad.game = new Phaser.Game(960, 640, Phaser.CANVAS, 'main');
regaloNavidad.game.state.add('Boot', regaloNavidad.Boot);
regaloNavidad.game.state.add('Preload', regaloNavidad.Preload);
regaloNavidad.game.state.add('Connection', regaloNavidad.Connection);
regaloNavidad.game.state.add('PreGame', regaloNavidad.PreGame);
regaloNavidad.game.state.add('Game', regaloNavidad.Game);
regaloNavidad.game.state.add('PostGame_winner', regaloNavidad.PostGame_winner);
regaloNavidad.game.state.add('PostGame_loser', regaloNavidad.PostGame_loser);
regaloNavidad.game.state.start('Boot');
$(document).ready(function() {
    console.log("pepe1");
    function FancyBoxClosed() {
        regaloNavidad.game.paused = false;
        regaloNavidad.game.stopped = false;
    }
    $(".lightbox").fancybox({
        maxWidth: 677,
        maxHeight: 407,
        fitToView: false,
        padding: 0,
        margin: 0,
        width: '95%',
        height: '95%',
        autoSize: false,
        closeClick: false,
        afterClose: function () { console.log("pepe"); }
    });
    $(".fancybox-close").click(function(){
        FancyBoxClosed();
    });
    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            FancyBoxClosed();
        }
    });
});
