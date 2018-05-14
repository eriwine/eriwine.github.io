var renderer;
var stage;

const STAGE_WIDTH = 1280;
const STAGE_HEIGHT = 720;
const bgScrollSpeed = 0.5;
var time = 0.0;

const log = console.log;
const app = new PIXI.Application(STAGE_WIDTH,STAGE_HEIGHT, {backgroundColor: 0x003f5c});
var renderer = app.renderer;

renderer.view.style.position = 'absolute';
renderer.view.style.left = '50%';
renderer.view.style.top = '50%';
renderer.view.style.transform = 'translate3d( -50%, -50%, 0 )';

document.body.appendChild(renderer.view);

var w,h;
w = window.innerWidth;
h = window.innerHeight;
renderer.view.style.width = w + "px";
renderer.view.style.height = h + "px";
renderer.resize(w, h);

var container = new PIXI.Container();
app.stage.addChild(container);

let bgTexture = PIXI.Texture.fromImage("BackgroundTexture.png");
var background = new PIXI.extras.TilingSprite(bgTexture,w,h);
container.addChild(background);

var titleStyle = new PIXI.TextStyle({
    fontFamily: 'Josefin Sans',
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
    fontFamily: 'Josefin Sans',
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

var richText = new PIXI.Text('Hello, welcome to my portfolio', titleStyle);
richText.x = w / 2;
richText.y = h / 5;
richText.anchor.set(0.5);
container.addChild(richText);

TweenMax.fromTo(richText,1.0,{y: 0}, {y: h / 5, ease:Quad.easeOut});
TweenMax.fromTo(richText,1.0,{alpha: 0},{alpha: 1});

var title2 = new PIXI.Text('Click Shaved Mario to continue', titleStyle2);
title2.x = w / 2;
title2.y = -48;// h / 5 + 96;
title2.anchor.set(0.5);
container.addChild(title2);

TweenMax.fromTo(title2,0.8,{y: h / 5 + 300}, {y: h / 5 + 112, ease:Back.easeOut, delay:1.25});
TweenMax.fromTo(title2,0.8,{alpha: 0},{alpha: 1, delay:1.25});

var mario = PIXI.Sprite.fromImage("ShavedMario.png");
mario.anchor.set(0.5,1.0);
mario.x = w/2;
mario.y = h + 1000;
mario.interactive = true;
mario.buttonMode = true;
container.addChild(mario);

var button = PIXI.Sprite.fromImage("CrispyEric.png");
button.interactive = true;
button.buttonMode = true;
button.anchor.set(0.5);
button.x = w/10;
button.y = h/2;
button.dragOffsetX = 0;
button.dragOffsetY = 0; 
//container.addChild(button);

const onDragStart = event => {
  button.data = event.data;
  button.dragging = true;
  let pointerPos = event.data.getLocalPosition(button.parent);
  button.dragOffsetX =  button.x - pointerPos.x;
  button.dragOffsetY =  button.y - pointerPos.y;
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
        button.x = Math.max(0, Math.min(w, button.x));
        button.y = Math.max(0, Math.min(h, button.y));
    }
};

const onPointerOver = event => {
    button.tint = 0xddddee;
};

const onPointerOut = event => {
    button.tint = 0xffffff;
};

const onMarioHover = event => {
    TweenMax.fromTo(mario, 0.5,{rotation: 0}, {rotation: Math.PI * 0.05, repeat:-1, yoyo:true});
;}

const onMarioPointerOut = event => {
    TweenMax.to(mario, 0.5, {rotation: 0 });
};

button.on('pointerdown', onDragStart)
.on('pointerup',onDragEnd)
.on('pointerupoutside',onDragEnd)
.on('pointermove',onDragMove)
.on('pointerover',onPointerOver)
.on('pointerout',onPointerOut)

mario.on('pointerover', onMarioHover)
.on('pointerout',onMarioPointerOut)

TweenMax.fromTo(mario,0.8,{y: h + 1000}, {ease: Back.easeOut.config(2.0), y: h + 300, delay: 1.0});
TweenMax.to(mario,0.5,{y: h + 270, repeat:-1, yoyo: true, delay: 1.8});

app.ticker.add((delta)=>{
    background.tilePosition.x -= bgScrollSpeed * delta;
    background.tilePosition.y -= bgScrollSpeed * delta;
    time+=0.1;

   // mario.y+=Math.sin(time) * 4.0;

    if (button.dragging != true)
    {
        //button.rotation = 0;
        button.rotation += 0.03 * delta;
    }
    else
    {
        button.scale.set(1.1 + Math.random()*0.1, 1.1+ Math.random()*0.1);
        //button.rotation += 0.1 * delta;
        
    }
});