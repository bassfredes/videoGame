var regaloNavidad = regaloNavidad || {};
//Seteo algunas variables generales
var stadoSiguiente;
var vidas = 5;
var estrellas = 0;
var estrellasSeguidas = 0;
var vidasRelEstrellas = 0;
var puntaje = 0;
var puntajeText = "";
var puntajeMitoCoin = 0;
var puntajeMitoCoinText = "";
var tiempo = 0;
var tiempoEstrella = 0;
var saltando = false;
//Debo Setear 3 tipos de able para saltar debido a los distintos Inputs existentes /Swipe-Touch-Keyboard
var ableToSaltar1 = true;
var ableToSaltar2 = true;
var onGround = false;
var touchEventDown = false;
var touchEventUp = true;
var HUDGame;
var playerAfectable = true;
var inmuneActive = false;
var timerInmune = 0;
var corriendoSobreObjeto = false;
var anchoActivoWorld;
var posiblesPosMatriz = {};
var numberOfObject;
var posPlayerX = 0;
var muestroInstrucciones = false;
var gamePaused = false;
var instruccionesSprite;
var thisGame;
var generatedStars = 0;
var bonusPts = 1;

regaloNavidad.Game = function() {};
regaloNavidad.Game.prototype = {
    preload: function() {
        this.game.time.advancedTiming = true;
    },
    create: function() {
        stadoSiguiente = this.state;
        thisGame = this.game;
        this.wraps = 0;
        //Configuro el mundo y sus limites
        this.game.world.setBounds(0, 0, 8000, this.game.height);


        //Guardo Ancho Activo del Mapa
        anchoActivoWorld = this.game.world.width - this.game.width - 900;

        //Sigo con los eficios de Fondo
        this.baseBackground = this.game.add.sprite(0, 0, 'backgroundBase');
        //Opti Para Mobile
        this.baseBackground.body = null;
        this.baseBackground.fixedToCamera = true;

        //Creo Background del fondo
        this.bgWorld = this.game.add.tileSprite(0, 0, 4096, 640, 'backgroundTiles');
        this.bgWorld2 = this.game.add.tileSprite(4096, 0, 4096, 640, 'backgroundTiles');
        //Opti Para Mobile
        this.bgWorld.body = null;
        this.bgWorld2.body = null;

        //Configuro los inputs
        this.game.input.mouse.enabled = true;
        this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        //Or tapping el Game
        this.game.input.touch.touchStartCallback = this.onTouchDown;
        this.game.input.touch.touchEndCallback = this.onTouchUp;

        //Genero elementos - Builds - Estrellas y mitoCoin
        this.generateBuilds();

        this.generateObjects();

        this.generateEstrellaCoin();

        //Creo Instrucciones
        this.instrucciones = this.game.add.sprite(this.game.width/2, this.game.height/2, 'instrucciones');
        instruccionesSprite = this.instrucciones;
        this.instrucciones.anchor.setTo(0.5);
        this.instrucciones.alpha = 0;
        this.instrucciones.fixedToCamera = true;

        //Creo al Personaje
        this.player = this.game.add.sprite(300, 400, 'player');
        this.player.animations.add('run');

        //Genero HUD
        HUDGame = this.game.add.group();
        this.hud_top = this.game.add.sprite(0, 0, 'hud_top');
        HUDGame.add(this.hud_top);
        this.hud_mitocondria = this.game.add.sprite(this.game.width - 45, this.game.height - 35, 'hud_mitocondria');
        this.hud_mitocondria.alpha = 0.6
        HUDGame.add(this.hud_mitocondria);
        this.hudMitoCoin = this.game.add.sprite(25, 115, 'hud_mitoCoin');
        HUDGame.add(this.hudMitoCoin);
        this.hud_enemigos = this.game.add.sprite(0, 400, 'hud_enemigos');
        this.hud_enemigos.animations.add('running');
        this.hud_enemigos.animations.play('running', 15, true);
        HUDGame.add(this.hud_enemigos);
        this.hud_backgroundTrama = this.game.add.sprite(this.game.width - 240, 50, 'hud_backgroundTrama');
        this.hud_backgroundTrama.scale.x = 0.8;
        HUDGame.add(this.hud_backgroundTrama);
        this.hud_star = this.game.add.sprite(25, 50, 'hud_star');
        this.hud_star.frame = 0;
        HUDGame.add(this.hud_star);
        this.hud_Life01 = this.game.add.sprite(10, this.game.height-70, 'life_001');
        this.hud_Life01.frame = 3;
        HUDGame.add(this.hud_Life01);
        //Opti Para Mobile
        HUDGame.body = null;
        HUDGame.fixedToCamera = true;

        puntajeMitoCoinText = this.game.add.text(70, 115, '', { fill: '#FAD417'});
        puntajeMitoCoinText.font = "Lobster";
        puntajeMitoCoinText.fontSize = 28;
        puntajeMitoCoinText.setText(" = " + 0);
        HUDGame.add(puntajeMitoCoinText);


        puntajeText = this.game.add.text(this.game.width - 230, 55, '', { fill: '#FAD417'});
        puntajeText.font = "Lobster";
        puntajeText.fontSize = 28;
        puntajeText.setText("Puntaje = " + 0);
        HUDGame.add(puntajeText);

        //Creo al piso Invisible para detectar colisiones
        this.ground = this.game.add.sprite(0, 585);
        this.ground.scale.x = this.game.world.width;

        //Activo physics en el Player, Ground y Enemy
        this.game.physics.enable([this.player, this.ground, this.objects, this.estrellaCoin], Phaser.Physics.ARCADE);

        //Player gravity
        this.player.body.gravity.y = 1800;
        this.player.body.setSize(this.player.width - 60, this.player.height);

        //Hago inmovible el Ground y que no le afecte la Gravedad
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        //Hago que la camara siga al Player - Desactivado ya que utilizo otra forma - no la nativa de Phaser (Ver si en algun futuro se puede utilizar con offset - Mejor rendimiento de esta forma)
        //this.game.camera.follow(this.player);

        //Reproduzco la animacion de Correr ( 'key', frameRate, loop )
        this.player.animations.play('run', 15, true);

        //Le doy orden al espacio
        this.ordenWorld();

        //Agrego los inputs para que detecten varias entradas de pointer
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();
        this.game.input.addPointer();

        this.game.time.events.loop(Phaser.Timer.SECOND, this.updateTime, this);
        this.game.time.events.loop(Phaser.Timer.SECOND*0.4, this.updateInmune, this);

        muestroInstrucciones = true;
        this.game.input.onDown.add(this.quitarInstrucciones, self);
    },
    update: function() {
        if(timerInmune > 0 && muestroInstrucciones){
            this.mostrarInstrucciones();
        }
        if (this.player.alive && !gamePaused) {
            posPlayerX = this.player.x;
            //Detecto colision con el piso
            this.game.physics.arcade.collide(this.player, this.ground, this.playerOnGround, null, this);
            //Detecto colision por parte de estrella
            this.game.physics.arcade.collide(this.estrellaCoin, this.ground, null, null, this);
            this.game.physics.arcade.collide(this.estrellaCoin, this.objects, null, null, this);
            this.game.physics.arcade.collide(this.player, this.estrellaCoin, this.playerHitsEstrellaCoin, null, this);
            //Detecto colision con los objetos
            if (!inmuneActive) {
                this.game.physics.arcade.collide(this.player, this.objects, this.playerHit, null, this);
            }
            //Se calculan los limites del World
            //Si se alcanzan, queremos destruir todo y regenerar de esta forma el World parece Random
            if (!this.wrapping && this.player.x < this.game.width) {
                //Queremos destruir y regenerar solo una vez por limite, de esta forma limitamos los errores
                this.wrapping = true;
                //No se utiliza pero sirve para debuggear las veces que se alcanza el limite.
                this.wraps++;
                this.builds.destroy();
                this.generateBuilds();
                this.objects.destroy();
                this.generateObjects();
                this.estrellaCoin.destroy();
                this.generateEstrellaCoin();
                //Le doy orden al espacio
                this.ordenWorld();
            } else if (this.player.x >= this.game.width) {
                this.wrapping = false;
            }
            if (this.spaceBar.isDown && ableToSaltar1) {
                this.playerJump();
            }
            if (touchEventDown && ableToSaltar2) {
                this.playerJump();
            }
            if (this.spaceBar.isUp && !onGround && !this.player.body.touching.down) {
                ableToSaltar1 = false;
            }
            if (touchEventUp && !onGround && !this.player.body.touching.down) {
                ableToSaltar2 = false;
            }
            if (inmuneActive) {
                this.player.body.velocity.x = 300;
                playerAfectable = false;
                if (timerInmune > 1) {
                    playerAfectable = true;
                    inmuneActive = false;
                    this.player.loadTexture('player', 0);
                    this.player.animations.add('run');
                    this.player.animations.play('run', 15, true);
                }
            }
            else {
                this.player.body.velocity.x = 500;
            }
            if(tiempoEstrella > 50){
                this.generateEstrellaCoin();
                tiempoEstrella = 0;
            }
            //Detectamos cuando el player sobrepase los limites permitidos (esto se hace calculando la posicion del usuario y si sobrepasa esa posicion)
            this.game.world.wrap(this.player, -(this.game.width / 2) - 190, false, true, false);
            //Asigno que la camara siga al personaje con un offset
            this.game.camera.x = this.player.x - 320;
        }
    },
    mostrarInstrucciones: function() {
        if(muestroInstrucciones){
            //Muestro las instrucciones
            var mostrarInstruccionesActivo = regaloNavidad.game.add.tween(instruccionesSprite).to({alpha: 1},100, "Linear", true);
            mostrarInstruccionesActivo.start();
            muestroInstrucciones = false;
            mostrarInstruccionesActivo.onComplete.add(this.pauseGame, this);
        }
    },
    pauseGame: function() {
        gamePaused = true;
        this.game.paused = true;
    },
    quitarInstrucciones: function() {
        if(!muestroInstrucciones && gamePaused){
            gamePaused = false;
            thisGame.paused = false;
            if(!muestroInstrucciones){
                var mostrarInstruccionesActivo = regaloNavidad.game.add.tween(instruccionesSprite).to({alpha: 0},300, "Linear", true);
            }
        }
    },
    actualizarEstados: function(datoToActualizar) {
        switch(datoToActualizar){
            case 'vida':
                if(vidas > 1){
                    vidas--;
                    //bonusPts = 1;
                }
                else {
                    this.player.alive = false;
                    gamePaused = true;
                    this.game.paused = true;
                    this.game.stateTransition.to('PostGame_loser');
                }
                if(vidas>1){
                    this.hud_Life01.frame = vidas-2
                }
                else {
                    this.hud_Life01.loadTexture('life_002', 0);
                    this.hud_Life01.animations.add('limitLife');
                    this.hud_Life01.animations.play('limitLife', 15, true);
                }
                this.game.add.tween(this.hud_enemigos).to( { x: '+50' }, 2000, Phaser.Easing.Linear.None, true);
            break;
            case 'puntajeMitoCoin':
                puntajeMitoCoin++;
                puntaje += 1000;
                if(puntajeMitoCoin < 10){
                    puntajeMitoCoin = "0"+puntajeMitoCoin;
                }
                puntajeMitoCoinText.setText(" = " + puntajeMitoCoin);
            break;
            case 'puntajeEstrellaCoin':
                estrellas++;
                puntaje += 10000*bonusPts;
                if(estrellas>4){
                    this.game.stateTransition.to('PostGame_winner');
                }
                else {
                    this.hud_star.frame = estrellas;
                }
                bonusPts*2;
            break;
        }
        puntajeText.setText("Puntaje = " + puntaje);
    },
    generateObjects: function(reason) {
        this.posiblesPosiciones = anchoActivoWorld/200;
        this.posiblesPosiciones = Math.floor(this.posiblesPosiciones);
        this.posiblesPosicionesReduced = Math.floor(this.posiblesPosiciones)-4;
        this.anchoPosiciones = anchoActivoWorld/this.posiblesPosiciones;
        //Genero objetos
        this.objects = this.game.add.group();
        //Activo las physics en ellos
        this.objects.enableBody = true;
        for (o = 0; o <= this.posiblesPosiciones; o++){
            posiblesPosMatriz[o] = { espacioID:o, estado: false, objectNumber: 0};
        }
        var numRandomObj = this.game.rnd.integerInRange(5, 10);
        //Se agrega el Sprite dentro del area permitida del World
        //de esta forma no desapareceran si se alcanza el limite y vuelve al comienzo no Apareceran de la nada
        for (var i = 0; i < numRandomObj; i++) {
            numberOfObject = this.game.rnd.integerInRange(1, 7);
            switch(numberOfObject){
                case 1:
                    this.tryNotOverlap(485, numberOfObject, numRandomObj, "obj_0");
                break;
                case 2:
                    this.tryNotOverlap(540, numberOfObject, numRandomObj, "obj_0");
                break;
                case 3:
                    this.tryNotOverlap(500, numberOfObject, numRandomObj, "obj_0");
                break;
                case 4:
                    this.tryNotOverlap(493, numberOfObject, numRandomObj, "obj_0");
                break;
                case 5:
                    this.tryNotOverlap(450, numberOfObject, numRandomObj, "obj_0");
                break;
                case 6:
                    this.tryNotOverlap(470, numberOfObject, numRandomObj, "obj_0");
                break;
                case 7:
                    this.tryNotOverlap(465, numberOfObject, numRandomObj, "obj_0");
                break;
            }
        }
    },
    tryNotOverlap: function(posY, objectNumber, numObjectosTotales, preObject) {
        var x = this.game.rnd.integerInRange(this.game.width + 300, anchoActivoWorld);
        this.posXMatriz = this.game.rnd.integerInRange(1, this.posiblesPosicionesReduced);
        var maxIntentos = 0;
        posiblesPosMatriz[this.posXMatriz]["objectNumber"] = objectNumber;
        if(preObject == "obj_0"){
            while(posiblesPosMatriz[this.posXMatriz]["estado"] == true && maxIntentos < 4 || posiblesPosMatriz[this.posXMatriz-1]["objectNumber"] == 5 && maxIntentos < 4){
                this.posXMatriz = this.game.rnd.integerInRange(1, this.posiblesPosicionesReduced);
                maxIntentos++;
            }
        }
        else {
            while(posiblesPosMatriz[this.posXMatriz]["estado"] == true && maxIntentos < 4){
                this.posXMatriz = this.game.rnd.integerInRange(1, this.posiblesPosicionesReduced);
                maxIntentos++;
            }
        }
        posiblesPosMatriz[this.posXMatriz]["estado"] = true;
        if(objectNumber == 5){
            posiblesPosMatriz[this.posXMatriz+1]["estado"] = true;
        }
        if(maxIntentos < 4){
            object = this.objects.create(this.posXMatriz*this.anchoPosiciones+this.game.width + 300, posY, preObject+objectNumber);
            object.body.immovable = true;
            object.body.allowGravity = false;
        }
    },
    generateBuilds: function() {
        this.builds = this.game.add.group();
        //Desactivo las physics en ellos
        this.builds.body = null;
        //Genero un numero random para ver que Build se genera
        var numberOfBuild = this.game.rnd.integerInRange(1, 7);
        var numBuilds = 1;
        var builds;
        for (var i = 1; i <= numBuilds; i++) {
            var x = this.game.rnd.integerInRange(this.game.width + 300, anchoActivoWorld);
            builds = this.builds.create(x, 0, 'build_0' + numberOfBuild);
        }
    },
    generateEstrellaCoin: function() {
        this.estrellaCoin = this.game.add.group();
        //Activo las physics en ellos
        this.estrellaCoin.enableBody = true;
        if (posPlayerX < 6000 && generatedStars > 2) {
            var x = posPlayerX+800;
            var randomY = this.game.rnd.integerInRange(100, 400);
            estrella = this.estrellaCoin.create(x, randomY, 'starCoin');
            estrella.animations.add('girando');
            estrella.animations.play('girando', 8, true);
            estrella.body.bounce.y = 0.8;
            estrella.body.gravity.y = 600;
        }
        generatedStars++;
    },
    onTouchDown: function(event) {
        touchEventDown = true;
        touchEventUp = false;
    },
    onTouchUp: function(event) {
        touchEventDown = false;
        touchEventUp = true;
    },
    playerJump: function() {
        //Le resto la posicion al personaje y asigno animacion (Transicion de si no se encontraba saltando) - y reasigno variables pertinentes
        if(!inmuneActive){
            if(this.player.body.y > 400) {
                this.player.body.velocity.y = -400;
            }
            else if(this.player.body.y < 330 && !corriendoSobreObjeto) {
                this.player.body.velocity.y = -400;
                ableToSaltar1 = false;
                ableToSaltar2 = false;
            }
            else if(this.player.body.y < 330 && corriendoSobreObjeto){
                this.player.body.velocity.y = -500;
                ableToSaltar1 = false;
                ableToSaltar2 = false;
            }
            else {
                this.player.body.velocity.y = -450;
            }
            if (!saltando) {
                this.player.loadTexture('player_jump', 0);
                this.player.animations.add('jump');
                this.player.animations.play('jump', 15, false);
            }
            saltando = true;
            onGround = false;
            corriendoSobreObjeto = false;
        }
    },
    ordenWorld: function() {
        this.game.world.bringToTop(this.baseBackground);
        this.game.world.bringToTop(this.bgWorld);
        this.game.world.bringToTop(this.bgWorld2);
        this.game.world.bringToTop(this.ground);
        this.game.world.bringToTop(this.builds);
        this.game.world.bringToTop(this.objects);
        this.game.world.bringToTop(this.estrellaCoin);
        this.game.world.bringToTop(this.player);
        this.game.world.bringToTop(HUDGame);
        this.game.world.bringToTop(this.instrucciones);
    },
    updateInmune: function() {
        timerInmune++;
    },
    updateTime: function() {
        tiempo++;
        tiempoEstrella++;
    },
    playerOnGround: function() {
        //Asigno animacion al personaje para hacer la transicion -> Le digo que si no se encontraba en el piso cambie la animacion a correr nuevamente
        if (!onGround && !inmuneActive) {
            onGround = true;
            this.player.loadTexture('player', 0);
            this.player.animations.add('run');
            this.player.animations.play('run', 15, true);
        }
        //Reasigno variables para el caso que este en el piso
        ableToSaltar1 = true;
        ableToSaltar2 = true;
        saltando = false;
        corriendoSobreObjeto = false;
    },
    playerHitsEstrellaCoin: function() {
        this.estrellaCoin.destroy();
        this.actualizarEstados("puntajeEstrellaCoin");
    },
    playerHit: function() {
        if (playerAfectable && this.player.body.touching.right && !corriendoSobreObjeto) {
            inmuneActive = true;
            timerInmune = 0;
            // Inicia Danio
            this.damageToPlayer();
        }
        if (!onGround && this.player.body.touching.down && !corriendoSobreObjeto) {
            corriendoSobreObjeto = true;
            ableToSaltar1 = true;
            ableToSaltar2 = true;
            onGround = false;
            saltando = false;
            this.player.loadTexture('player', 0);
            this.player.animations.add('run');
            this.player.animations.play('run', 15, true);
        }
    },
    damageToPlayer: function() {
        this.player.loadTexture('player_dmg', 0);
        this.player.animations.add('dmg');
        this.player.animations.play('dmg', 15, true);
        this.actualizarEstados("vida");
    },
    render: function() {
        //this.game.debug.inputInfo(32, 38);
        //this.game.debug.text(this.game.time.fps || '--', 890, 50, "#FFF", "40px Courier");
        //this.game.debug.text('jump:' + saltando, 32, 20);
        //this.game.debug.body(this.player);
        //this.game.debug.spriteBounds(this.player);
        //this.game.debug.spriteBounds(this.objects);
    }
};
