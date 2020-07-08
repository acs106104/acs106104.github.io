// Aliases 
let Application =  PIXI.Application ,
loader =  PIXI.loader ,
resource =  PIXI.loader.resources ,
Sprite =  PIXI.Sprite ;	

/*TEXT STYLE*/
let style = new PIXI.TextStyle({
    fontFamily:"Arial",
    fontSize:36,
    fill:" white ",
    stroke:'#0x66FF33',
    strokeThickness:4,
    dropShadow:true,
    dropShadowColor:"#000000",
    dropShadowBlur:4,
    dropShadowAngle:Math.PI/6,
    dropShadowDistance:6,
});

var width =  app.screen.width;
var height = app.screen.height;

loader
    .add("./resource/stage.png")
    .add("./resource/icon/icon_hair.png")
	.add("./resource/icon/icon_clothes.png")
    .add("./resource/icon/icon_pant.png")
    .add("dragonBonesData", "./resource/Character/Character_ske.json")
	.add("textureData", "./resource/Character/Character_tex.json")
	.add("texture", "./resource/Character/Character_tex.png")
	.load(init);
loader.load();

 function init() {
    this.onResize(); 
    window.onresize = this.onResize; 

    let newUser = true;

    /* check使用者是不是是否有創過角角色 */
    //尚未創建角色則執行
    if(newUser)
        createNewCharacter();
    else
        alert('Gogo!');
}

function createNewCharacter(){
    /* Title */
    let title =  new PIXI.Text ("創建角色",style);
    title.anchor.set(0.5,0.5);
    app.stage.addChild(title);
    title.position.set(width/2,height*0.1);
    /*----------------------------------------*/
    /*Draws a Wardrobe*/
    let wardrobe =  new  PIXI.Graphics ();
    wardrobe.lineStyle(4,0xFFFFFF);
    // rectangle.beginFill( 0x66CCFF );
    wardrobe.drawRoundedRect(0,0,600,450,10);
    wardrobe.endFill();
    wardrobe.x  =  width/2;
    wardrobe.y  =  height*0.1+150;
    app.stage.addChild (wardrobe);
    /*----------------------------------------*/
    /*hair_icon setting*/
    let hair_icon =  new  PIXI.Sprite (
        PIXI.loader.resources ["./resource/icon/icon_hair.png"].texture
    );
    hair_icon.scale.x=0.3;
    hair_icon.scale.y=0.3;
    hair_icon.position.set(0,0);
    hair_icon.interactive = true; // 設定可以互動
    hair_icon.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
    hair_icon.click = function(){
 
    }
    /*clothes_icon setting*/
    let clothes_icon =  new  PIXI.Sprite (
        PIXI.loader.resources ["./resource/icon/icon_clothes.png"].texture
    );
    clothes_icon.scale.x=0.3;
    clothes_icon.scale.y=0.3;
    clothes_icon.position.set(236*0.3,0);
    clothes_icon.interactive = true; // 設定可以互動
    clothes_icon.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
    clothes_icon.click = function(){

     }
    /*pant_icon setting*/
    let pant_icon =  new  PIXI.Sprite (
        PIXI.loader.resources ["./resource/icon/icon_pant.png"].texture
    );
    pant_icon.scale.x=0.3;
    pant_icon.scale.y=0.3;
    pant_icon.position.set(236*0.3*2,0);
    pant_icon.interactive = true; // 設定可以互動
    pant_icon.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
    pant_icon.click = function(){

    }
    /*icon container*/
    var IconContainer = new PIXI.Container();
    app.stage.addChild(IconContainer);
    IconContainer.x = width/2;
    IconContainer.y = height*0.1+80;
    IconContainer.addChild(hair_icon,clothes_icon,pant_icon);
    /*----------------------------------------*/
    /* Stage */
    var showCharacter = new PIXI.Container();
    let stage =  new  PIXI.Sprite (
        PIXI.loader.resources ["./resource/stage.png"].texture
    );
    stage.scale.x=0.2;
    stage.scale.y=0.2;
    stage.position.set(0,300+stage.height*0.2);
    app.stage.addChild(showCharacter);
    showCharacter.x = width*0.1;
    showCharacter.addChild(stage);
    /*----------------------------------------*/
    /* Character */
    var textureImg = resource["texture"].texture; //紋理圖png
	var textureData = resource["textureData"].data; //紋理圖data
	var skeletonData = resource["dragonBonesData"].data; //骨骼data
			
	factory = new dragonBones.PixiFactory();
	factory .parseDragonBonesData(skeletonData);
	factory .parseTextureAtlasData(textureData, textureImg); 

	armatureDisplay = factory.buildArmatureDisplay(skeletonData.armature[0].name);
    // armatureDisplay.animation.play('handmove',0);
	armatureDisplay.x = stage.x+stage.width-55;
	armatureDisplay.y = stage.y-stage.height*0.2+135;
    armatureDisplay.scale.set(0.5,0.5);
    app.stage.addChild(armatureDisplay);
}