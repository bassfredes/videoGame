var regaloNavidad = regaloNavidad || {};
regaloNavidad.game = new Phaser.Game(960, 640, Phaser.CANVAS, '');
regaloNavidad.game.state.add('Boot', regaloNavidad.Boot);
regaloNavidad.game.state.add('Preload', regaloNavidad.Preload);
regaloNavidad.game.state.add('Game', regaloNavidad.Game);
regaloNavidad.game.state.start('Boot');