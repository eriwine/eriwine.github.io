var renderer;
var stage;

const STAGE_WIDTH = 1280;
const STAGE_HEIGHT = 720;
const bgScrollSpeed = 0.5;

const log = console.log;
const app = new PIXI.Application(STAGE_WIDTH,STAGE_HEIGHT, {backgroundColor: 0x003f5c});
var renderer = app.renderer;

renderer.view.style.position = 'absolute';
renderer.view.style.left = '50%';
renderer.view.style.top = '50%';
renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';

document.body.appendChild(renderer.view);

var container = new PIXI.Container();
app.stage.addChild(container);

let bgTexture = PIXI.Texture.fromImage("BackgroundTexture.png");
var background = new PIXI.extras.TilingSprite(bgTexture,STAGE_WIDTH,STAGE_HEIGHT);
container.addChild(background);

var titleStyle = new PIXI.TextStyle({
    fontFamily: 'Corbel',
    fontSize: 64,
    fontStyle: '',
    fontWeight: 'bold',
    fill: ['#ffffff', '#ffffff'], // gradient
    stroke: '#4a1850',
    strokeThickness: 2,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 2,
    dropShadowAngle: Math.PI / 3,
    dropShadowDistance: 3,
    wordWrap: true,
    wordWrapWidth: STAGE_WIDTH
});

var titleStyle2 = new PIXI.TextStyle({
    fontFamily: 'Corbel',
    fontSize: 48,
    fontStyle: '',
    fontWeight: 'bold',
    fill: ['#66e6e2', '#66e6e2'], // gradient
    stroke: '#4a1850',
    strokeThickness: 1,
    dropShadow: true,
    dropShadowColor: '#000000',
    dropShadowBlur: 2,
    dropShadowAngle: Math.PI / 3,
    dropShadowDistance: 2,
    wordWrap: true,
    wordWrapWidth: STAGE_WIDTH
});

var richText = new PIXI.Text('Hello, welcome to my portfolio.', titleStyle);
richText.x = STAGE_WIDTH / 2;
richText.y = STAGE_HEIGHT / 5;
richText.anchor.set(0.5);
container.addChild(richText);

var title2 = new PIXI.Text('Made entirely in Pixi.JS', titleStyle2);
title2.x = STAGE_WIDTH / 2;
title2.y = STAGE_HEIGHT / 5 + 96;
title2.anchor.set(0.5);
container.addChild(title2);

var button = PIXI.Sprite.fromImage("Button.png");
button.interactive = true;
button.buttonMode = true;
button.anchor.set(0.5);
button.x = STAGE_WIDTH/2;
button.y = STAGE_HEIGHT/2;
button.dragOffsetX = 0;
button.dragOffsetY = 0; 
container.addChild(button);

var buttonShadow = PIXI.Sprite.fromImage("Button.png");
//buttonShadow.anchor.set(button.anchor);
buttonShadow.x = 9;
buttonShadow.y = 9;
//buttonShadow.tint = 0x00000044; 
//button.addChild(buttonShadow);

const onDragStart = event => {
  button.data = event.data;
  button.dragging = true;
  let pointerPos = event.data.getLocalPosition(button.parent);
  button.dragOffsetX =  button.x - pointerPos.x;
  button.dragOffsetY =  button.y - pointerPos.y;
  button.scale.set(1.1 + Math.random()*0.3, 1.1+ Math.random()*0.3);
};

const onDragEnd = event => {
    delete button.data;
    button.dragging = false;
    button.scale.set(1,1);
};

const onDragMove = event => {
    if (button.dragging === true)
    {
        const newPosition = button.data.getLocalPosition(button.parent);
        //button.position = newPosition;// + button.dragOffset;
        button.x = newPosition.x + button.dragOffsetX;
        button.y = newPosition.y + button.dragOffsetY;
        button.x = Math.max(0, Math.min(STAGE_WIDTH, button.x));
        button.y = Math.max(0, Math.min(STAGE_HEIGHT, button.y));
    }
};

const onPointerOver = event => {
    button.tint = 0xddddee;
};

const onPointerOut = event => {
    button.tint = 0xffffff;
};

button.on('pointerdown', onDragStart)
.on('pointerup',onDragEnd)
.on('pointerupoutside',onDragEnd)
.on('pointermove',onDragMove)
.on('pointerover',onPointerOver)
.on('pointerout',onPointerOut)

app.ticker.add((delta)=>{
    background.tilePosition.x -= bgScrollSpeed * delta;
    background.tilePosition.y -= bgScrollSpeed * delta;

    if (button.dragging != true)
    {
        //button.rotation = 0;
        button.rotation += 0.03 * delta;
    }
    else
    {
        //button.rotation += 0.1 * delta;
        
    }
});
