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
        /* Shoes_icon setting */
        this.create_replacement_icon("shoe","./resource/icon/icon_shoes.png");
        /* HairDeco_icon setting */
        this.create_replacement_icon("hair_deco","./resource/icon/icon_hairdeco.png");
        /* WristDeco_icon setting */
        this.create_replacement_icon("wrist_deco","./resource/icon/icon_wristdeco.png");
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
        this.replacement.position.set(wardrobe.x+20,wardrobe.y+10)
        /*----------------------------------------*/
        return dressing_room;
    }
    create_replacement_icon(iconName,iconPic){
        let t = this;
        let icon = new Sprite (PIXI.loader.resources [iconPic].texture);
        icon.name = iconName;
        icon.scale.set(0.3,0.3);
        icon.position.set(280*0.3*(this.IconContainer.children.length),0);
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
                    item.filters = [new PIXI.filters.GlowFilter(10,5,0,0xffffff)];
                    this.show_item(item.name);
                    t.itemName = item.name;
                }
                else
                    item.filters = null;
            }
        );
    }
    call_item_data(){
        return axios.get('./resource/Character/Character_tex.json')
        .then((res) => {
            item_data = res.data;
        })
        .catch((error) => { console.error(error) })
    }
    show_item(itemName){
        this.replacement.removeChildren();
        let temp = item_data;
        let xx=0;
        let yy=0;

        for(let i=0;i<temp.SubTexture.length;i++){
            let str = temp.SubTexture[i].name;
            let yn = str.indexOf(itemName);
            if(yn > -1){
                let genderyn = str.indexOf(this.gender);
                if(genderyn > -1){
                    let height = temp.SubTexture[i].height;
                    let width = temp.SubTexture[i].width;
                    let  x = temp.SubTexture[i].x;
                    let y = temp.SubTexture[i].y;
                    if((xx+110)>this.wardrobeWidth){
                        yy += 110;
                        xx = 0;
                    }
                    /* 針對clothes的顯示 */
                    if(itemName =='clothes'){
                        let claddr = 'Character/cleft/';
                        let craddr = 'Character/cright/';
                        let index = str.indexOf('_');    
                        let no = str.substring(index-1,index);
                        let cl = claddr+ 'c' + no +'_' + 'l_' + this.gender;// Character/cleft/c1_l_gg
                        let cr = craddr+ 'c' + no +'_' + 'r_' + this.gender;
                        for(let i=0;i<temp.SubTexture.length;i++){
                            let str = temp.SubTexture[i].name;
                            if(str.indexOf(cl) > -1)
                                this.show_itemPic('clothes_left',cl,xx,yy,temp.SubTexture[i].x,temp.SubTexture[i].y,temp.SubTexture[i].height,temp.SubTexture[i].width);
                            if(str.indexOf(cr) > -1)
                                this.show_itemPic('clothes_right',cl,xx,yy,temp.SubTexture[i].x,temp.SubTexture[i].y,temp.SubTexture[i].height,temp.SubTexture[i].width);
                        }
                    }
                    /* 針對shoes的顯示 */
                    else if(itemName == 'shoe'){
                        let sraddr = 'Character/sright/';//s1_r_gg
                        let index = str.indexOf('_');    
                        let no = str.substring(index-1,index);
                        let sr = sraddr+ 's' + no +'_' + 'r_' + this.gender;// Character/shoe/gg/s1_r_gg
                        for(let i=0;i<temp.SubTexture.length;i++){
                            let str = temp.SubTexture[i].name;
                            if(str.indexOf(sr) > -1)
                                this.show_itemPic('shoe_right',sr,xx,yy,temp.SubTexture[i].x,temp.SubTexture[i].y,temp.SubTexture[i].height,temp.SubTexture[i].width);
                        }
                    }
                    this.show_itemPic(itemName,str,xx,yy,x,y,height,width);
                    xx += 110;
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
        /* 針對clothes的顯示 */
        if(itemName == 'clothes' || itemName == 'clothes_left' || itemName == 'clothes_right'){
            if(itemName == 'clothes_left'){
                show.position.set(xx+10,yy+20);
                show.scale.set(40/width);
            }
            else if(itemName == 'clothes_right'){//126*130 91*96
                show.position.set(xx+70,yy+20);
                show.scale.set(40/width);
            }
            else{//208
                show.position.set(xx+20,yy+20);
                show.scale.set(78/width);
            }
        }
        /* 針對女生hair的顯示 */
        else if(itemName == 'hair' && this.gender == 'mm'){
            // show.position.set(xx+10+(90-width*0.2)/2,yy);
            // show.scale.set(0.2);
            show.position.set(xx+10+(90-width*(90/height))/2,yy+10+(90-height*(90/height))/2);
            show.scale.set(90/height);
        }
        /* 針對shoe的顯示 */
        else if(itemName == 'shoe' || itemName == 'shoe_right'){
            if(itemName == 'shoe'){
                show.position.set(xx+(90-width*(45/height))/2,yy+10+(90-height*(45/height))/2);
                show.scale.set(40/height);
            }
            else{
                show.position.set(xx+45+(90-width*(45/height))/2,yy+10+(90-height*(45/height))/2);
                show.scale.set(40/height);
            }
        }
        else if(itemName == 'wrist_deco'){
            show.position.set(xx+10+(90-width*(90/width))/2,yy+10+(90-height*(90/width))/2);
            show.scale.set(1);
        }
        else{
            let sc = (90/width)<(90/height) ? (90/width) : (90/height);
            show.position.set(xx+10+(90-width*sc)/2,yy+10+(90-height*sc)/2);
            show.scale.set(sc);
        }
        show.interactive = true; // 設定可以互動
        show.buttonMode = true; // 當滑鼠滑過時顯示為手指圖示
        let t = this;
        show.click = function(){
            let armature = t.armatureDisplay._armature;
            /* clothes換裝調整 */
            if(itemName == 'clothes' || itemName == 'clothes_left' || itemName == 'clothes_right'){
                let index = str.indexOf('_');    
                let c = 'Character/clothes/'+ 'clothes' + str.substring(index-1,index) +'_' + t.gender;
                let cl = 'Character/cleft/' + 'c' + str.substring(index-1,index) +'_' + 'l_' + t.gender;// Character/cleft/c1_l_gg
                let cr = 'Character/cright/'+ 'c' + str.substring(index-1,index) +'_' + 'r_' + t.gender;
                t.factory.replaceSlotDisplay( "Character", "Boy",'clothes',c,armature.getSlot("clothes"));//局部換裝
                t.factory.replaceSlotDisplay( "Character", "Boy",'clothes_left',cl,armature.getSlot("clothes_left"));//局部換裝
                t.factory.replaceSlotDisplay( "Character", "Boy",'clothes_right',cr,armature.getSlot("clothes_right"));//局部換裝
            }
             /* shoes換裝調整 */
            else if(itemName == 'shoe' || itemName == 'shoe_right'){
                let sladdr = 'Character/sleft/';//shoe1_l_gg
                let sraddr = 'Character/sright/';//s1_r_gg
                let index = str.indexOf('_'); 
                let sl = sladdr+ 'shoe' + str.substring(index-1,index) +'_' + 'l_' + t.gender;
                let sr = sraddr+ 's' + str.substring(index-1,index) +'_' + 'r_' + t.gender;
                console.log('sl: '+sl);
                console.log('sr: '+sr);
                t.factory.replaceSlotDisplay( "Character", "Boy",'shoe_left',sl,armature.getSlot("shoe_left"));//局部換裝
                t.factory.replaceSlotDisplay( "Character", "Boy",'shoe_right',sr,armature.getSlot("shoe_right"));//局部換裝
            }
            else
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