/**This is a key listenener. It listens for specified keys to be pressed, and will keep track of how long ago (how many frames) each key was last pressed**/
function KeyWatcher(){
	var self = this;

	window.addEventListener(
		'keyup',
		function(event) {
			self.onKeyUp(event);
		},
		false
	);

	window,addEventListener(
		'keydown',
		function(event) {
			self.onKeyDown(event);
		},
		false
	);
}

//The keycodes for all of the keys
KeyWatcher.prototype.KEYS = {
	"BACKSPACE" : 8, "TAB"  : 9, "ENTER" : 13, "SHIFT" : 16,
	"CTRL" : 17, "ALT" : 18, "PAUSE_BREAK" : 19, "CAPS_LOCK" : 20, "ESCAPE" : 27,
	"PAGE_UP" : 33, "PAGE_DOWN" : 34, "END" : 35, "HOME" : 36, "LEFT" : 37,
	"UP"  : 38, "RIGHT" : 39, "DOWN" : 40, "INSERT" : 45, "DELETE" : 46,
	"ZERO" : 48, "ONE" : 49, "TWO" : 50, "THREE" : 51, "FOUR" : 52, "FIVE" : 53,
	"SIX" : 54, "SEVEN" : 55, "EIGHT" : 56, "NINE" : 57, "A" : 65, "B" : 66,
	"C" : 67, "D" : 68, "E" : 69, "F" : 70, "G" : 71, "H" : 72, "I" : 73, "J" : 74,
	"K" : 75, "L" : 76, "M" : 77, "N" : 78, "O" : 79, "P" : 80, "Q" : 81, "R" : 82,
	"S" : 83, "T" : 84, "U" : 85, "V" : 86, "W" : 87, "X" : 88, "Y" : 89, "Z" : 90,
	"LEFT_WIN" : 91, "RIGHT_WIN" : 92, "SELECT" : 93, "NUM_ZERO" : 96,
	"NUM_ONE" : 97, "NUM_TWO" : 98, "NUM_THREE" : 99, "NUM_FOUR" : 100,
	"NUM_FIVE" : 101, "NUM_SIX" : 102, "NUM_SEVEN" : 103, NUM_8 : 104, NUM_9 : 105,
	"NUM_MULTIPLY" : 106, "NUM_PLUS" : 107, "NUM_MINUS" : 109, "NUM_DECIMAL" : 110,
	"NUM_DIVIDE" : 111, "F1" : 112, "F2" : 113, "F3" : 114, "F4" : 115, "F5" : 116,
	"F6" : 117, "F7" : 118, "F8" : 119, "F9" : 120, "F10" : 121, "F11" : 122,
	"F12" : 123, "NUM_LOCK" : 144, "SCROLL_LOCK" : 145, "SEMICOLON" : 186,
	"EQUALS" : 187, "COMMA" : 188, "DASH" : 189, "PERIOD" : 190,
	"FORWARD_SLASH" : 191, "GRAVE_ACCENT" : 192, "OPEN_BRACKET" : 219,
	"BACKSLASH" : 220, "CLOSE_BRACKET" : 221, "QUOTE" : 222
};

//The maximum number of frames the watch_list will keep track of
//KEYDOWN is the number of frames to watch when a key is held
//KEYUP is the number of frames to watch after a key is released
KeyWatcher.prototype.MAX_WATCH_LENGTH = {
	"KEYDOWN" : 300,
	"KEYUP"   : 150
};

//Keeps track of pressed keys
KeyWatcher.prototype.pressed = {};

//Keeps track of how long user-specified keys are pressed
//A watch list is used so that we don't have to iterate over
//Every key at every frame, but rather only keys we're interested in
KeyWatcher.prototype.watch_list = {};

/* This function is to be activated by a key listener when a key is pressed */
KeyWatcher.prototype.onKeyDown = function(event) {
	this.pressed[event.keyCode] = true;
};

/* This function is to be activated by a key listener when a key is unpressed */
KeyWatcher.prototype.onKeyUp = function(event) {
	delete this.pressed[event.keyCode];
};

/* Add a key to the watch_list */
KeyWatcher.prototype.addToWatchList = function(key_name){
	//if this is a key
	if(this.KEYS[key_name]){

		var key_code = this.KEYS[key_name];

		//watch list items hold a key, its code, and how long the key has been held
		this.watch_list[key_code] = {
			"key_name" : key_name,
			"key_code" : key_code,
			//A positive value indicates how many frames this key has been held for
			//A negative value indicates how many frames since this key has been held
			"length_held" : 0
		};
	}
};
/* Remove a key from the watch list */
KeyWatcher.prototype.removeFromWatchList = function(key_name){
	if(this.KEYS[key_name]){
		var key_code = this.KEYS[key_name];
		if (this.watch_list[key_code]){
			delete this.watch_list[key_code];
		}
	}
};
/** Responds with the length of time the key has been pressed
 * @param {Object} key_name
 */
KeyWatcher.prototype.pollKey = function(key_name){
	if(this.KEYS[key_name]){
		var key_code = this.KEYS[key_name];
		if (this.watch_list[key_code]){
			return this.watch_list[key_code].length_held;
		}
	}
};

/** to be called during the games update loop **/
KeyWatcher.prototype.update = function(){
	for(i in this.watch_list){
		//If the key listener has heard the key being pressed
		if(this.pressed[i]){
			//If the watch length hasn't been breached
			if(this.watch_list[i].length_held < this.MAX_WATCH_LENGTH.KEYDOWN){
				//If this key was held last frame
				if(this.watch_list[i].length_held >= 0){
					//Add one frame to the held length
					this.watch_list[i].length_held += 1;
				}
				//If this key was not held last frame
				else{
					this.watch_list[i].length_held = 1;
				}
			}
		}
		//If the key_listener did not hear the key being pressed (or heard it being unpressed)
		else{
			//If there is a record of the key being pressed recently
			if(this.watch_list[i].length_held < 0){
				if(this.watch_list[i].length_held > -1*this.MAX_WATCH_LENGTH.KEYUP){
					//Subtract one frame to the held length to indicate how many frames since
					//This key has been pressed
				this.watch_list[i].length_held -= 1;
				}
			}
			//if it was being held last frame, indicate that it is now not being held.
			else if(this.watch_list[i].length_held > 0){
				this.watch_list[i].length_held = -1;
			}
			//For keys that we have no record of being pressed recently, we do nothing.
		}
	}
};