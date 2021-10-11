# Three.js入门

Three.js 中的一些概念:
想在屏幕上展示 3D 物体，大体上的思路是这样的：
1. 创建一个三维空间，Three.js 称之为场景（ Scene ）
1. 确定一个观察点，并设置观察的方向和角度，Three.js 称之为相机（ Camera ）
1. 在场景中添加供观察的物体，Three.js 中有很多种物体，如 Mesh、Group、Line 等，他们都继承自 Object3D 类。
1. 最后我们需要把所有的东西渲染到屏幕上，这就是 Three.js 中的 Renderer 的作用。

## 流程
``` js
function init() {  
    // 初始化场景，添加场景内物体  
    var scene = initScene();  
    // 初始化整个流程，创建相机、渲染器  
    view = initView(scene);  
    // THREE.TrackballControls 是一个 Three.js 的控制器插件。
    // 使用它之后，我们就不必自己去写代码而能实现用鼠标去移动相机（ Camera ）的效果。
    controls = new THREE.TrackballControls( view.camera );

    // 渲染
    animate();
}
```

### 1. 初始化场景Scene
``` js
function initScene{
  // 创建场景Scene  
  var scene = new THREE.Scene();

  // 添加环境光
  scene.add(new THREE.AmbientLight(0x3f2806));

  // 添加方向光
  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 100, 100);
  scene.add(light);

  // 设置地面
  // 地面纹理
  var textureSquares = textureLoader.load( "./imgs/bright_squares256.png" );
  // 地面材质
  var groundMaterial = new THREE.MeshPhongMaterial( {  shininess: 80,  color: 0xffffff,  specular: 0xffffff,  map: textureSquares} );
  // 地面形状
  var planeGeometry = new THREE.PlaneBufferGeometry( 100, 100 );
  // 生成地面
  var ground = new THREE.Mesh( planeGeometry, groundMaterial );
  scene.add( ground );

  // 将人物放置到场景中
  labeldata.forEach(function(item) { 
      textureLoader.load(item.imgurl, function(texture) {
          // THREE.BoxBufferGeometry为立方体，其构造函数参数对应立方体在 X 轴的宽度，Y 轴的高度，Z 轴的长度
          var geometry = new THREE.BoxBufferGeometry(item.size[0], item.size[1], item.size[2]);
          // 兰伯特材质，这种材质对光照有反应，用于创建暗淡的不发光的物体
          var material = new THREE.MeshLambertMaterial({ map: texture });
          var dotmesh = new THREE.Mesh(geometry, material);
          // 设置人物位置
          dotmesh.position.set(item.position[0], item.position[1], item.position[2]);
          scene.add(dotmesh);
      });
  });

  return scene;
}
```

### 2. 初始化整个流程，创建相机、渲染器

``` js
function initView(scene) {
  // 创建相机
  var camera = new THREE.PerspectiveCamera(FOV, SCREEN_WIDTH / SCREEN_HEIGHT, NEAR, FAR);

  // 设置相机位置
  camera.position.set(0, 0, 300);
  // 将相机添加到场景
  scene.add(camera);

  // 创建渲染器
  var renderer = new THREE.WebGLRenderer({antialias: true, logarithmicDepthBuffer: true});
  // 设置渲染器参数
  renderer.setClearColor(0xf0f0f0);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(SCREEN_WIDTH/2, SCREEN_HEIGHT);
  renderer.domElement.style.position = 'relative’;
  renderer.domElement.id = 'renderer_logzbuf';

  var framecontainer = document.getElementById('container_logzbuf’);
  // 将渲染器添加到html容器中
  framecontainer.appendChild(renderer.domElement);

  return {  container: framecontainer,  renderer: renderer,  scene: scene,  camera: camera };
}
```

### 3. 动画起来

``` js
// 想让元素移动，就需要实现动画
function animate() {
  // 帧动画
  requestAnimationFrame(animate);
  // 更新控制器
  controls.update();
  // 更新屏幕画面
  render();
}

function render() {  
  updateRendererSizes();  
  view.renderer.render(view.scene, view.camera);
}
```