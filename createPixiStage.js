//Aliases
let Application = PIXI.Application,
    Container = PIXI.Container,
    loader = PIXI.loader,
    resource = PIXI.loader.resources,
    TextureCache = PIXI.utils.TextureCache,
    Sprite = PIXI.Sprite;

/* 创建Pixi 应用 和 舞台 */
var app = new Application({
    width: 1440,
    height: 821,
    antialias: true,    // default: false
    transparent: false, // default: false
    resolution: 1,       // default: 1      
    view: document.getElementById('main')
  });

/* 渲染畫面和resize畫面(滿版畫面) */
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(1440, 821);
app.renderer.backgroundColor = 0xC9DDF0;//更新畫面顏色

document.body.appendChild(app.view);

/* 視窗調整 */
function onResize() { 
    var w = window.innerWidth; 
    var h = window.innerHeight; 
    var scale = Math.min(w/width,h/height); 
    app.view.style.left = (w-scale*1440)/2 + "px"; 
    app.view.style.top = (h-scale*821)/2 + "px"; 
    app.view.style.width = scale*1440 + "px"; 
    app.view.style.height = scale*821 + "px";  
}
