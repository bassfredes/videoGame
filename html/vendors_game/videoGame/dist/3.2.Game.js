var regaloNavidad = regaloNavidad || {};
//Seteo algunas variables generales
var stadoSiguiente;
var vidas = 5;
var puntaje = 0;
var tiempo = 0;
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

regaloNavidad.Game = function() {};
regaloNavidad.Game.prototype = {
    preload: function() {
        this.game.time.advancedTiming = true;
    },
    create: function() {
        stadoSiguiente = this.state;
        //Configuro el mundo y sus limites
        this.game.world.setBounds(0, 0, 8000, this.game.height);

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

        //Genero elementos - Builds
        this.generateBuilds();

        this.generateObjects();

        //Creo al Personaje
        this.player = this.game.add.sprite(100, 400, 'player');
        this.player.animations.add('run');

        //Genero HUD
        HUDGame = this.game.add.group();
        this.hud_top = this.game.add.sprite(0, 0, 'hud_top');
        HUDGame.add(this.hud_top);
        this.hud_mitocondria = this.game.add.sprite(this.game.width - 45, this.game.height - 35, 'hud_mitocondria');
        this.hud_mitocondria.alpha = 0.6
        HUDGame.add(this.hud_mitocondria);
        this.hud_enemigos = this.game.add.sprite(0, 400, 'hud_enemigos');
        this.hud_enemigos.animations.add('running');
        this.hud_enemigos.animations.play('running', 15, true);
        HUDGame.add(this.hud_enemigos);
        this.hud_Life01 = this.game.add.sprite(10, this.game.height-70, 'life_001');
        this.hud_Life01.frame = 3;
        HUDGame.add(this.hud_Life01);
        //Opti Para Mobile
        HUDGame.body = null;
        HUDGame.fixedToCamera = true;

        //Creo al piso Invisible para detectar colisiones
        this.ground = this.game.add.sprite(0, 585);
        this.ground.scale.x = this.game.world.width;

        //Activo physics en el Player, Ground y Enemy
        this.game.physics.enable([this.player, this.ground, this.objects], Phaser.Physics.ARCADE);

        //Player gravity
        this.player.body.gravity.y = 1800;
        this.player.body.setSize(this.player.width - 30, this.player.height);

        //Hago inmovible el Ground y que no le afecte la Gravedad
        this.ground.body.immovable = true;
        this.ground.body.allowGravity = false;

        //Hago que la camara siga al Player - Desactivado ya que utilizo otra forma - no la nativa a Phaser (Ver si en algun futuro se puede utilizar con offset - Mejor rendimiento de esta forma)
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
    },
    update: function() {
        //Detecto colision con el piso
        this.game.physics.arcade.collide(this.player, this.ground, this.playerOnGround, null, this);
        if (!inmuneActive) {
            this.game.physics.arcade.collide(this.player, this.objects, this.playerHit, null, this);
        }
        //Detecto colision con los objetos
        if (this.player.alive && !this.stopped) {
            //Se calculan los limites del World
            //Si se alcanzan, queremos destruir todo y regenerar de esta forma el World parece Random
            if (!this.wrapping && this.player.x < this.game.width) {
                //Queremos destruir y regenerar solo una vez por limite, de esta forma limitamos los errores
                this.wrapping = true;
                //No se utiliza pero sirve para debuggear las veces que se alcanza el limite.
                this.wraps++;
                this.builds.destroy();
                this.generateBuilds();
                //this.objects.destroy();
                this.generateObjects();
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
            //Detectamos cuando el player sobrepase los limites permitidos (esto se hace calculando la posicion del usuario y si sobrepasa esa posicion)
            this.game.world.wrap(this.player, -(this.game.width / 2) - 190, false, true, false);
            //Asigno que la camara siga al personaje con un offset
            this.game.camera.x = this.player.x - 320;

        }
    },
    actualizarEstados: function(datoToActualizar) {
        switch(datoToActualizar){
            case 'vida':
                if(vidas > 1){
                    vidas--;
                }
                else {
                    this.player.alive = false;
                    this.stopped = true;
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
        }
    },
    generateObjects: function() {
        //Genero objetos
        this.objects = this.game.add.group();
        //Activo las physics en ellos
        this.objects.enableBody = true;
        var enemy;
        var numberOfEnemy;
        var numEnemy = this.game.rnd.integerInRange(5, 10);
        for (var i = 0; i < numEnemy; i++) {
            //Se agrega el Sprite dentro del area permitida del World
            //de esta forma no desapareceran si se alcanza el limite y vuelve al comienzo /o Apareceran de la nada
            numberOfEnemy = this.game.rnd.integerInRange(1, 7);
            switch(numberOfEnemy){
                case 1:
                    this.tryNotOverlap(485, numberOfEnemy, numEnemy);
                break;
                case 2:
                    this.tryNotOverlap(540, numberOfEnemy, numEnemy);
                break;
                case 3:
                    this.tryNotOverlap(500, numberOfEnemy, numEnemy);
                break;
                case 4:
                    this.tryNotOverlap(493, numberOfEnemy, numEnemy);
                break;
                case 5:
                    this.tryNotOverlap(450, numberOfEnemy, numEnemy);
                break;
                case 6:
                    this.tryNotOverlap(470, numberOfEnemy, numEnemy);
                break;
                case 7:
                    this.tryNotOverlap(465, numberOfEnemy, numEnemy);
                break;
            }
        }
    },
    tryNotOverlap: function(posY, enemyNumber, numObjectosTotales) {
        var x = this.game.rnd.integerInRange(this.game.width + 300, this.game.world.width - this.game.width - 900);
        enemy = this.objects.create(x, posY, 'obj_0'+enemyNumber);
        var len = this.objects.children.length;
        if(numObjectosTotales == len){
            var posiblesErrores = 0;
            for (var i = 0; i < len; i++) {
                posiblesErrores = 0;
                for(var todosLosObjetos = 0; todosLosObjetos < len; todosLosObjetos++){
                    if(todosLosObjetos != i){
                        while(this.game.physics.arcade.overlap(this.objects.children[i],this.objects.children[todosLosObjetos])) {
                            if(posiblesErrores > 3){
                                break;
                                this.objects.children[i].destroy();
                            }
                            else {
                                x = this.game.rnd.integerInRange(this.game.width + 300, this.game.world.width - this.game.width - 900);
                                posiblesErrores++;
                                this.objects.children[i].body.x = x;
                            }
                        }
                    }
                }
            }
        }
        //enemy.body.x = x;
        //Enemy immovable
        enemy.body.immovable = true;
        enemy.body.allowGravity = false;
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
            var x = this.game.rnd.integerInRange(this.game.width + 300, this.game.world.width - this.game.width - 900);
            builds = this.builds.create(x, 0, 'build_0' + numberOfBuild);
        }
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
        this.game.world.bringToTop(this.player);
        this.game.world.bringToTop(HUDGame);
    },
    updateInmune: function() {
        timerInmune++;
    },
    updateTime: function() {
        tiempo++;
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
    playerHit: function() {
        if (playerAfectable && this.player.body.touching.right) {
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
        this.game.debug.inputInfo(32, 38);
        this.game.debug.text(this.game.time.fps || '--', 890, 50, "#FFF", "40px Courier");
        //this.game.debug.text('jump:' + saltando, 32, 20);
        //this.game.debug.body(this.player);
        //this.game.debug.spriteBounds(this.objects);
    }
};
