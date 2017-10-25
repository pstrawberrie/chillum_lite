const socket = io();
import {CSSPlugin} from 'gsap';
import Draggable from 'gsap/Draggable';

/* Set Up Screen Dragging */

//+ DRAGGABLE: Widgets
const droppables = document.querySelectorAll(".widget");
const overlapThreshold = "1%";
function dragDrop(dragged, dropped) {
  TweenMax.fromTo(dropped, 0.1, {opacity:1}, {opacity:0, repeat:3, yoyo:true});
}
Draggable.create(droppables, {
	bounds: document.getElementById("screen"),
	onClick:function() {
		console.log("clicked");
	},
	onDragEnd:function() {
    var i = droppables.length;
		while (--i > -1) {
			if (this.hitTest(droppables[i], overlapThreshold)) {
        dragDrop(this.target, droppables[i]);
			}
		}
		console.log("drag ended - fire save here");
    const topPosition = this.target.getBoundingClientRect().top;
    const leftPosition = this.target.getBoundingClientRect().left;
    console.log(`${topPosition}/${leftPosition}`);
	}
});

/* Screen Socket Listeners */

//+ SOCKET: Test
socket.on('test', function(info) {

  console.log('test socket came in from back-end');
  console.log(info);

});

//+ SOCKET: Screen Chat
socket.on('screenChat', function(info) {

  console.log(`${info.username} - ${info.message}`);
  // $('.screen-chat').prepend(`
  //   <div class="item">
  //     <span class="user">${info.username}</span>
  //     <span class="message">${info.message}</span>
  //   </div>
  // `)

});
