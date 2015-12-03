var regaloNavidad = regaloNavidad || {};
regaloNavidad.game = new Phaser.Game(960, 640, Phaser.CANVAS, 'main');
regaloNavidad.game.state.add('Boot', regaloNavidad.Boot);
regaloNavidad.game.state.add('Preload', regaloNavidad.Preload);
regaloNavidad.game.state.add('PreGame', regaloNavidad.PreGame);
regaloNavidad.game.state.add('Game', regaloNavidad.Game);
regaloNavidad.game.state.add('PostGame_winner', regaloNavidad.PostGame);
regaloNavidad.game.state.add('PostGame_loser', regaloNavidad.PostGame);
regaloNavidad.game.state.start('Boot');
