const log = console.log;
const app = new PIXI.Application();
document.body.appendChild(app.view);

let text = new PIXI.Text("why won't this work?",{fontFamily : 'Arial', fontSize: 24, fill : 0xff1010, align : 'center'});
app.stage.addChild(text);

const button = PIXI.Sprite.fromImage("Button.png");
button.interactive = true;
button.buttonMode = true;
button.anchor.set(0.5);
button.x = 200;
button.y = 200;
button.dragOffsetX = 0;
button.dragOffsetY = 0; 
app.stage.addChild(button);

const dot = new PIXI.Graphics();
dot.beginFill(0xFF0000);
dot.drawCircle(0,0,20);
dot.x = 100;
dot.y = 100;
app.stage.addChild(dot);

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
};

const onDragMove = event => {
    if (button.dragging === true)
    {
        const newPosition = button.data.getLocalPosition(button.parent);
        //button.position = newPosition;// + button.dragOffset;
        button.x = newPosition.x + button.dragOffsetX;
        button.y = newPosition.y + button.dragOffsetY;
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
    if (button.dragging === true)
    {
        //button.rotation += 0.1 * delta;
    }
});