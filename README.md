# Viddy Well
#### jQuery Plugin that makes using Video JS even easier

### How To Use

##### Requirements
```html
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
<link href="//vjs.zencdn.net/4.2/video-js.css" rel="stylesheet">
<script src="//vjs.zencdn.net/4.2/video.js"></script>
<script src="jquery.viddywell.js"></script>
```

##### Construct your video div using data- attributes to define your video file URI and poster image URI
```html
<div class="yourclass" data-video="http://video-js.zencoder.com/oceans-clip.mp4" data-poster="http://video-js.zencoder.com/oceans-clip.png"></div>
```

##### Call Viddy Well once the DOM is ready
```js
$('.yourclass').ViddyWell();
```

View: [Plug-In page with demos](http://inspiredroots.com/__devlab/2014/viddy-well/)

### Optional settings

```js
$('.yourclass').ViddyWell({
  VideoWidth			:	800,        // default 400
  VideoHeight			: 450,        // default 225
  VideoAutoStart	:	false,      // default false
  VideoPlayButton	: false,      // default true
  VideoFitScreen	:	false,      // default false 
  VideoHasMobile 	:	true,       // default false
  VideoOnEnd : function() {     // default null
    // do something
	}
});
```

### Under The Hood
- Dependent upon jQuery and Video JS files (JS + CSS)
- 3 Kb
