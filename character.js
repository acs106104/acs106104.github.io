class Character{
    // constructor(user_name,character) {
    //     this.user_name = user_name;
    //     this.armatureDisplay = character;
    // }

    /* 沒有建立過角色 */
    create_new_character(){
        this.gender = 'gg';//預設boy
        /* Title */
        let title =  new PIXI.Text ("創建角色",style);
        title.anchor.set(0.5,0.5);
        app.stage.addChild(title);
        title.position.set(app.screen.width/2,app.screen.height*0.1);
        /* Create a dressing_room */
        app.stage.addChild(this.create_dressing_room());
        /* Show the character */
        app.stage.addChild(this.show_character());
    }
    /* 建立換衣間 */
    create_dressing_room(){
        /* Create a dressing room */
        let dressing_room = new Container();
        dressing_room.position.set(width/2,height*0.2);
        /*----------------------------------------*/
        /* Create icons */
        /* Icon container */
        this.IconContainer = new Container();
        dressing_room.addChild(this.IconContainer);
        this.IconContainer.position.set(0,0);
        /* Hair_icon setting */
        this.create_replacement_icon("hair","./resource/icon/icon_hair.png");
        /* Clothes_icon setting */
        this.create_replacement_icon("clothes","./resource/icon/icon_clothes.png");
        /* Bottoms_icon setting */
        this.create_replacement_icon("bottoms","./resource/icon/icon_pant.png");
        /*----------------------------------------*/
        /* Draws a wardrobe */
        let wardrobe = new PIXI.Graphics();
        wardrobe.lineStyle(4,0xFFFFFF);
        wardrobe.beginFill( 0xCCDDFF );//填充
        wardrobe.drawRoundedRect(0,0,600,450,10);
        wardrobe.endFill();
        wardrobe.position.set(0,236*0.3);
        dressing_room.addChild(wardrobe);
        this.wardrobeWidth = 600-40;
        this.wardrobeHeight= 4502-40;
        /*----------------------------------------*/
        /* Replacements' area */
        this. replacement = new Container();
        dressing_room.addChild(this.replacement);
        this.replacement.position.set(wardrobe.x+20,wardrobe.y+20)
        /*----------------------------------------*/
        return dressing_room;
    }
    create_replacement_icon(iconName,iconPic){
        let t = this;
        let icon = new Sprite (PIXI.loader.resources [iconPic].texture);
        icon.name = iconName;
        icon.scale.set(0.3,0.3);
        icon.position.set(236*0.3*this.IconContainer.children.length+1,0);
        icon.interactive = true; // 設定可以互動
        icon.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
        icon.click = function(){
            t.choose_replacement(icon);
        }
        this.IconContainer.addChild(icon);
    }
    choose_replacement(which_icon){
        let choose_icon = which_icon;
        //alert(this.IconContainer.children);
        let t = this;
        this.IconContainer.children.forEach(item=>{
                if(item.name == choose_icon.name){
                    item.filters = [new PIXI.filters.GlowFilter(15,5,0,0xffffff)];
                    this.show_item(item.name);
                    t.itemName = item.name;
                }
                else
                    item.filters = null;
            }
        );
    }
    show_item(itemName){
        this.replacement.removeChildren();
        let mJson=$.ajax({url:"./resource/Character/Character_tex.json",async:false});//改axios
        let temp=JSON.parse(mJson.responseText);//將 JavaScript 物件表示法 (JSON) 字串轉換為物件。
        let xx=0;
        let yy=0;

        for(let i=0;i<temp.SubTexture.length;i++){
            let str = temp.SubTexture[i].name;
            let yn = str.indexOf(itemName);
            console.log(str);
            if(yn > -1){
                let genderyn = str.indexOf(this.gender);
                if(genderyn > -1){
                    let height = temp.SubTexture[i].height;
                    let width = temp.SubTexture[i].width;
                    let  x = temp.SubTexture[i].x;
                    let y = temp.SubTexture[i].y;
                    if((xx+100)>this.wardrobeWidth){
                        yy += 100;
                        xx = 0;
                    }
                    this.show_itemPic(itemName,str,xx,yy,x,y,height,width);
                    //針對clothes
                    if(itemName !='clothes1'){
                        xx += 100; 
                    }
                }
            }
        }
    }

    show_itemPic(itemName,str,xx,yy,x,y,height,width) {
        //從紋理創建精靈
        let texture = PIXI.utils.TextureCache["./resource/Character/Character_tex.png"].clone();
    
        //創建一個定義位置矩形對象
        //並且要從紋理中提取的子圖像的大小
        //`Rectangle`是`PIXI.Rectangle`的别名
        let rectangle = new PIXI.Rectangle(x, y, width, height);
        //告訴紋理使用該矩形的形塊
        texture.frame = rectangle;
        //從紋理中創建一個精靈
        let show = new PIXI.Sprite(texture);
        //定位精靈在canvas畫布上
        show.x = xx;
        show.y = yy;
        show.scale.set(80/width);
        show.interactive = true; // 設定可以互動
        show.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
        let t = this;
        show.click = function(){
            let armature = t.armatureDisplay._armature;
            t.factory.replaceSlotDisplay( "Character", "Boy",itemName,str,armature.getSlot(itemName));//局部換裝
        }
    
        //將精靈添加到舞台中
        this.replacement.addChild(show);
        //重新渲染舞台 
        app.renderer.render(app.stage);
    }
    
    /* 顯示角色 */
    show_character(){
        /* Create a show area */
        let show_area = new Container();
        show_area.position.set(width*0.1,height*0.1);
        /*----------------------------------------*/
        /* Character */
        let textureImg = resource["texture"].texture; //紋理圖png
        let textureData = resource["textureData"].data; //紋理圖data
        let skeletonData = resource["dragonBonesData"].data; //骨骼data
                
        this.factory = new dragonBones.PixiFactory();
        this.factory.parseDragonBonesData(skeletonData);
        this.factory.parseTextureAtlasData(textureData, textureImg); 

        this.armatureDisplay = this.factory.buildArmatureDisplay(skeletonData.armature[0].name);//預設男孩
        // armatureDisplay.animation.play('handmove',0);
        this.armatureDisplay.position.set(200,350);
        this.armatureDisplay.scale.set(0.4,0.4);
        /*----------------------------------------*/
        /* Stage */
        let stage = new Sprite (PIXI.loader.resources ["./resource/stage.png"].texture);
        show_area.addChild(stage);
        stage.scale.set(0.2,0.2);
        stage.position.set(10,260);
        /*----------------------------------------*/
        /* Gender button */
        let girlBtn = new Sprite (PIXI.loader.resources ["./resource/genderGirl.png"].texture);
        let boyBtn = new Sprite (PIXI.loader.resources ["./resource/genderBoy.png"].texture);
        let genderBtn = new PIXI.Graphics();
        genderBtn.lineStyle(4,0xCCEEFF);
        genderBtn.beginFill(0xffffff,0.8);//填充
        genderBtn.drawRoundedRect(0,0,150,55,10);
        genderBtn.endFill();
        genderBtn.position.set(125,558);
    
        let t = this;

        boyBtn.scale.set(0.5,0.5);
        boyBtn.position.set(140,562);
        boyBtn.alpha = 1;//預設為男生
        boyBtn.filters = [new PIXI.filters.GlowFilter(10,2,0,0x1e90ff)];//(distance,outerStrength,innerStrength,color);
        boyBtn.interactive = true; // 設定可以互動
        boyBtn.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
        boyBtn.click = function(){
            t.gender='gg';
            show_area.removeChild(t.armatureDisplay);
            t.armatureDisplay = t.factory.buildArmatureDisplay(skeletonData.armature[0].name);//預設男孩
            show_area.addChild(t.armatureDisplay);
            t.armatureDisplay.position.set(200,350);
            t.armatureDisplay.scale.set(0.4,0.4);
            boyBtn.alpha = 1;
            boyBtn.filters = [new PIXI.filters.GlowFilter(10,2,0,0x1e90ff)];
            girlBtn.alpha = 0.3;
            girlBtn.filters = null;
            t.show_item(t.itemName);
        }
        girlBtn.scale.set(0.5,0.5);
        girlBtn.position.set(210,562);
        girlBtn.alpha = 0.3;
        girlBtn.interactive = true; // 設定可以互動
        girlBtn.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
        girlBtn.click = function(){
            t.gender='mm';
            show_area.removeChild(t.armatureDisplay);
            t.armatureDisplay = t.factory.buildArmatureDisplay(skeletonData.armature[1].name);//Girl
            show_area.addChild(t.armatureDisplay);
            t.armatureDisplay.position.set(200,350);
            t.armatureDisplay.scale.set(0.4,0.4);
            girlBtn.alpha = 1;
            girlBtn.filters = [new PIXI.filters.GlowFilter(8,2,0,0xff1493)];
            boyBtn.alpha = 0.3;
            boyBtn.filters = null;
            t.show_item(t.itemName);

        }
        /*----------------------------------------*/
        show_area.addChild(genderBtn);
        show_area.addChild(girlBtn);
        show_area.addChild(boyBtn);
        show_area.addChild(stage);
        show_area.addChild(this.armatureDisplay);
        
        return show_area;
    }

}