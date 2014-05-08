;(function ( $, window, document, undefined ) {
		
/* BEGIN: Mobile Detection */
	var isMobile = {
    	Android: function() {
        	return navigator.userAgent.match(/Android/i) ? true : false;
    	},
    	BlackBerry: function() {
        	return navigator.userAgent.match(/BlackBerry/i) ? true : false;
    	},
    	iOS: function() {
        	return navigator.userAgent.match(/iPhone|iPod|iPad/i) ? true : false;
    	},
    	Windows: function() {
        	return navigator.userAgent.match(/IEMobile/i) ? true : false;
    	},
    	any: function() {
        	return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Windows());
    	}
	};
/* END: Mobile Detection */

/* BEGIN: Hot swap mobile assets */
	function GetMobileAssets(ThisURI) {
		
		var ThisExt, MobileURI;
		
		ThisExt = '.'+ThisURI.substr(ThisURI.lastIndexOf('.') + 1);
		
		MobileURI = ThisURI.replace(ThisExt,'');
		MobileURI+= '_mobile';
		MobileURI+= ThisExt;
		
		return MobileURI;
	}
/* END: Hot swap mobile assets */
	
	var VideoCountInterval = 0;

    var pluginName = "ViddyWell",
        defaults = {
            VideoWidth		:	400,
			VideoHeight		: 	225,
			VideoAutoStart 	: 	false,
			VideoPlayButton	: 	true, 
			VideoFitScreen	:	false, 
			VideoHasMobile	:	false,
			VideoOnEnd		: 	null
        };

    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options );

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {
			this.consoleOutput(this.element, this.options)
        },

        consoleOutput: function(el, options) {
				
			VideoCountInterval++;
	
			ThisVideo = $(el);
			
			/* ---- Grab Video and Poster URIs ---- */
			var VideoURI = ThisVideo.attr('data-video');
			var PosterURI = ThisVideo.attr('data-poster');
			
			/* ---- Grab Mobile Video and Poster URIs, if applicable ---- */
			if(options.VideoHasMobile && isMobile.any()) {
				VideoURI = GetMobileAssets(VideoURI);
				PosterURI = GetMobileAssets(PosterURI);
			}
			
			/* ---- Is Fullscreen? (e.g.: responsive, fancybox modal) ---- */
			if(options.VideoFitScreen) {
			ThisVideo.css({
				'width'		:	'100%',
				'height'	:	'auto',
				'margin'	:	'0 auto',
				'padding'	:	'0',
				'position'	:	'relative',
				//'position'	:	'absolute',
				//'top'		: 	0, 
				//'left'		: 	0,
				'display'	:	'block',
				'overflow'	:	'visible'
			});
			}
			
			/* ---- Assemble The Video Element ---- */
			VideoOutput = '';
			VideoOutput+='<video id="dynamo-video-' + VideoCountInterval + '"';
			VideoOutput+=' class="video-js vjs-default-skin"';
			VideoOutput+=' controls';
			VideoOutput+=' width="' + options.VideoWidth + '" height="' + options.VideoHeight + '"';
			VideoOutput+=' poster="' + PosterURI + '"';
			VideoOutput+=' preload="auto" data-setup="{}"';
			VideoOutput+='>';
			VideoOutput+='<source type="video/mp4" src="' + VideoURI + '">';
			VideoOutput+='</video>';
			
			/* ---- Render Video To Designated Element ---- */
			ThisVideo.html('').html(VideoOutput);
			
			if(options.VideoHasMobile && isMobile.any()) {
					videojs('dynamo-video-' + VideoCountInterval, {"preload":"metadata","poster":PosterURI,"customControlsOnMobile": true}, function(){
						//
					});
				}

			/* ---- On Video Ready ---- */
			videojs('dynamo-video-' + VideoCountInterval).ready(function(){
				
				var myPlayer = this;
			
				/* ---- Big Playback Button ---- */
				var VideoJSPlayButton = $('.vjs-big-play-button');
				var VideoJSPlayButtonWidth = $('.vjs-big-play-button').width()/2;
				var VideoJSPlayButtonHeight = $('.vjs-big-play-button').height()/2;
				
				if(!options.VideoPlayButton) {
					VideoJSPlayButton.css('display','none');
				} else {
					VideoJSPlayButton.css({
						'top':'50%',
						'left':'50%',
						'margin-top':'-' + VideoJSPlayButtonHeight + 'px',
						'margin-left':'-' + VideoJSPlayButtonWidth + 'px'
					});
				}
				
				$('.vjs-fullscreen-control').css('display','none');
				$('.vjs-volume-control').css('margin-right','20px');
    			
				if(options.VideoAutoStart) {
					myPlayer.play();
				}
				
				/* ---- Fullscreen Listener ---- */
				var AspectRatio = options.VideoWidth / options.VideoHeight;
				//AspectRatio = (AspectRatio > 1.5) ? 9/16 : 3/4;
	
				if(options.VideoFitScreen) {
    				function resizeVideoJS(){
      					var width = ThisVideo.width();
      					myPlayer.width(width).height( width * AspectRatio);
					}
    				resizeVideoJS();
    				window.onresize = resizeVideoJS;
				}
				
				/* ---- onVideoEnded Function ---- */
				if(options.VideoOnEnd) {
					myPlayer.on("ended", options.VideoOnEnd);
				}
				
			});
	
        }
		
    };
	
	$.fn[pluginName] = function ( options ) {
		return this.each(function () {
			if (!$.data(this, "plugin_" + pluginName)) {
				$.data(this, "plugin_" + pluginName, new Plugin( this, options ));
			}
		});
	};

})( jQuery, window, document );