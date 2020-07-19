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

var show_area;//container
var dressing_room;
var character;//角色
var item_data;//角色配件
var user = new Character();

loader
    .add("./resource/stage.png")
    .add("./resource/icon/icon_hair.png")
	.add("./resource/icon/icon_clothes.png")
    .add("./resource/icon/icon_pant.png")
    .add("./resource/icon/icon_shoes.png")
    .add("./resource/icon/icon_hairdeco.png")
    .add("./resource/icon/icon_wristdeco.png")
    .add("./resource/genderGirl.png")
    .add("./resource/genderBoy.png")
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
    if(newUser){
        user.call_item_data();//取得角色配件資料
        user.create_new_character();
    }
    else
        alert('Gogo!');
}

