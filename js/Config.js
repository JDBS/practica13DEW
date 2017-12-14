const DEFAULT_ZOOM_INITIAL=5;
const DEFAULT_LATITUDE=50.8495314;
const DEFAULT_LONGITUDE=8.7951508;
const ANIMATION_DELAY=2100; //delay in ms to stop animation
const LOAD_DELAY=600; //wait time for markers load

const DEFAULT_ZOOM=5;
const DEFAULT_WIDTH_ZOOM_FIX_FACTOR=30;
const DEFAULT_HEIGHT_ZOOM_FIX_FACTOR=60;

function getDefaultZoomFor(width, height){
	var widthZoom = parseInt(
		Math.log2(
			width/DEFAULT_WIDTH_ZOOM_FIX_FACTOR
			)
		);

	var heightZoom = parseInt(
		Math.log2(
			height/DEFAULT_HEIGHT_ZOOM_FIX_FACTOR
			)
		);

	if(widthZoom<heightZoom)
		return widthZoom;
	else
		return heightZoom;
}




