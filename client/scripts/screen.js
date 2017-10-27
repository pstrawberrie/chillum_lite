const socket = io();
import $ from 'jquery';
import {CSSPlugin} from 'gsap';
import Draggable from 'gsap/Draggable';
const saveObj = {};

/* Set Up Screen Dragging */

//+ DRAGGABLE: Widgets
if(window.location.href.includes('/screen') && !window.location.href.includes('/live')) {
  Draggable.create($('.widget'), {
  	bounds: document.getElementById("screen"),
  	onClick:function() {
  		console.log("clicked");
  	},
  	onDragEnd:function() {
  		console.log("drag ended - fire save here");
      const topPosition = this.target.getBoundingClientRect().top;
      const leftPosition = this.target.getBoundingClientRect().left;
      console.log(this.target.id);
      console.log(`${topPosition}/${leftPosition}`);
  	}
  });
}

/* Screen Edit Functions */

//+ Add Widget


//+ Save Screen
function postSave(saveObj) {
  let url = window.location.href.replace('http://localhost:3069','').replace('##','');
  url = url + '/save';
  $.ajax({
    type: "POST",
    url: url,
    dataType: 'json',
    async: false,
    data: saveObj,
    success: function () {
      console.log(`saved obj\n${saveObj}`)
    }
  });
}
$(document).on('keydown', function(e) {
    if(e.ctrlKey && e.which === 83){
      console.log('CTRL+S pressed - save screen here');
      e.preventDefault();
      return false;
    }
});

/* Screen Socket Listeners */

//+ SOCKET: Test
socket.on('test', function(info) {

  console.log('test socket came in from back-end');
  console.log(info);

});

//+ SOCKET: Screen Chat
if($('#chat').length) {
  socket.on('screenChat', function(info) {

    console.log(`${info.username} - ${info.message}`);

  });
}
