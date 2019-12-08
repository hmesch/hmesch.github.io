var pos = {
    x: 10,
    y: 90
};

var dx = 0;
var dy = 0;

function step() {
    if (dx == 0 && dy == 0) {
        return;
    }
    
    var xmax = document.getElementById('field').clientWidth -
        document.getElementById('x').offsetWidth;
    var ymax = document.getElementById('field').clientHeight -
        document.getElementById('x').offsetHeight;

    if (pos.x > xmax && dx > 0) {
        dx = 0;
    }
    
    if (pos.x < 0 && dx < 0) {
        dx = 0;
    }
    
    if (pos.y > ymax && dy > 0) {
        dy = 0;
    } 
    
    if (pos.y < 0 && dy < 0) {
        dy = 0;
    }
    
    pos.x += dx;
    pos.y += dy;
    
    document.getElementById('x').style.top = pos.y + 'px';
    document.getElementById('x').style.left = pos.x + 'px';
}

window.setInterval(step, 5);

function keyup(event) {
    if (event.keyCode == 37) {
	    dx = 0;
        event.preventDefault();
    }
    if (event.keyCode == 38) {
	    dy = 0;
        event.preventDefault();
    }
    if (event.keyCode == 39) {
	    dx = 0;
        event.preventDefault();
    }
    if (event.keyCode == 40) {
	    dy = 0;
        event.preventDefault();
    }      
}

function keydown(event) {
    if (event.keyCode == 37) {
	    dx = -1;
        event.preventDefault();
    }
    if (event.keyCode == 38) {
	    dy = -1;
        event.preventDefault();
    }
    if (event.keyCode == 39) {
	    dx = 1;
        event.preventDefault();
    }
    if (event.keyCode == 40) {
	    dy = 1;
        event.preventDefault();
    }
}
