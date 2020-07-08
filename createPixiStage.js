/* 创建Pixi 应用 和 舞台 */
var app = new PIXI.Application();
document.body.appendChild(app.view);
/* 渲染畫面和resize畫面(滿版畫面) */
app.renderer.view.style.position = "absolute";
app.renderer.view.style.display = "block";
app.renderer.autoResize = true;
app.renderer.resize(1440, 821);
// app.renderer.resize(window.innerWidth, window.innerHeight);
app.renderer.backgroundColor = 0xC9DDF0;//更新畫面顏色

// // Listen for window resize events
// window.addEventListener('resize', resize);

// // Resize function window
// function resize() {
// 	// Resize the renderer
// 	app.renderer.resize(window.innerWidth, window.innerHeight);
// }

var width =  app.screen.width;
var height = app.screen.height;

function onResize() { 
    var w = window.innerWidth; 
    var h = window.innerHeight; 
    var scale = Math.min(w/width,h/height); 
    app.view.style.left = (w-scale*1440)/2 + "px"; 
    app.view.style.top = (h-scale*821)/2 + "px"; 
    app.view.style.width = scale*1440 + "px"; 
    app.view.style.height = scale*821 + "px";  
}
