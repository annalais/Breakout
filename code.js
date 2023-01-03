var p5Inst = new p5(null, 'sketch');

window.preload = function () {
  initMobileControls(p5Inst);

  p5Inst._predefinedSpriteAnimations = {};
  p5Inst._pauseSpriteAnimationsByDefault = false;
  var animationListJSON = {"orderedKeys":["53514168-6198-43f7-90bb-2e9be7f614ca","acf52aea-1d10-4610-baa5-61ec42e8566d"],"propsByKey":{"53514168-6198-43f7-90bb-2e9be7f614ca":{"name":"basketball_1","sourceUrl":"assets/api/v1/animation-library/gamelab/lJ_EH4DV2ueKL_rNgl9vTVZREP_YfLJf/category_sports/basketball.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"lJ_EH4DV2ueKL_rNgl9vTVZREP_YfLJf","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/lJ_EH4DV2ueKL_rNgl9vTVZREP_YfLJf/category_sports/basketball.png"},"acf52aea-1d10-4610-baa5-61ec42e8566d":{"name":"soccer_ball","sourceUrl":"assets/api/v1/animation-library/gamelab/pwucKp9Jx5Ksr1oGABFcKnFJjewfORMI/category_sports/soccer_blue.png","frameSize":{"x":393,"y":394},"frameCount":1,"looping":true,"frameDelay":2,"version":"pwucKp9Jx5Ksr1oGABFcKnFJjewfORMI","categories":["sports"],"loadedFromSource":true,"saved":true,"sourceSize":{"x":393,"y":394},"rootRelativePath":"assets/api/v1/animation-library/gamelab/pwucKp9Jx5Ksr1oGABFcKnFJjewfORMI/category_sports/soccer_blue.png"}}};
  var orderedKeys = animationListJSON.orderedKeys;
  var allAnimationsSingleFrame = false;
  orderedKeys.forEach(function (key) {
    var props = animationListJSON.propsByKey[key];
    var frameCount = allAnimationsSingleFrame ? 1 : props.frameCount;
    var image = loadImage(props.rootRelativePath, function () {
      var spriteSheet = loadSpriteSheet(
          image,
          props.frameSize.x,
          props.frameSize.y,
          frameCount
      );
      p5Inst._predefinedSpriteAnimations[props.name] = loadAnimation(spriteSheet);
      p5Inst._predefinedSpriteAnimations[props.name].looping = props.looping;
      p5Inst._predefinedSpriteAnimations[props.name].frameDelay = props.frameDelay;
    });
  });

  function wrappedExportedCode(stage) {
    if (stage === 'preload') {
      if (setup !== window.setup) {
        window.setup = setup;
      } else {
        return;
      }
    }
// -----

var estado_jogo = "lançar";
var placar = 0;
var vidas = 3;

var tijolos = createGroup();

var raquete = createSprite(200,390,100,10);
raquete.shapeColor = "blue";

var bola = createSprite(200,200,20,20);
bola.setAnimation("soccer_ball");
bola.scale = 0.05;

function criarFileira(y, cor) {
  for (var i = 0; i < 6; i++) {
    var tijolo = createSprite(65+54*i, y, 50, 20);
    tijolo.shapeColor = cor;
    tijolos.add(tijolo);
  }
}

criarFileira(60, "red");
criarFileira(84, "orange");
criarFileira(108, "yellow");
criarFileira(132, "green");


createEdgeSprites();


function draw() {
  background("black");
  textSize(18);
  
  text("Placar: "+placar, 35, 30);
  text("Vidas: "+vidas, 295, 30);
  
  if (estado_jogo == "lançar") {
    text("Clique na tela para começar", 80, 240);
    bola.x = 200;
    bola.y = 200;
  }
  if (estado_jogo == "Fim") {
    text("Fim de jogo", 80, 240);
    bola.destroy();
  }
   if (bola.isTouching(bottomEdge)) {
    perderVida();
   }
  raquete.x = mouseX;
  
  if (raquete.x > 350) {
    raquete.x = 350;
  }
  
  if (raquete.x < 50) {
    raquete.x = 50;
  }
  
  bola.bounceOff(rightEdge);
  bola.bounceOff(leftEdge);
  bola.bounceOff(topEdge);
  bola.bounceOff(raquete);
  bola.bounceOff(tijolos, quebrarTijolo);
  
  drawSprites();
}

function quebrarTijolo(bola, tijolo) {
  tijolo.destroy();
  placar = placar + 5;
}
function perderVida() {
  vidas -= 1;
  
  if(vidas>0) {
    estado_jogo = "lançar";
  } else {
    estado_jogo = "fim";
  }
}

function mousePressed() {
  if (estado_jogo == "lançar") {
    bola.velocityX = 8;
    bola.velocityY = 6;
    estado_jogo = "jogar";
  }
}

// -----
    try { window.draw = draw; } catch (e) {}
    switch (stage) {
      case 'preload':
        if (preload !== window.preload) { preload(); }
        break;
      case 'setup':
        if (setup !== window.setup) { setup(); }
        break;
    }
  }
  window.wrappedExportedCode = wrappedExportedCode;
  wrappedExportedCode('preload');
};

window.setup = function () {
  window.wrappedExportedCode('setup');
};
