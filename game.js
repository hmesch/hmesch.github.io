var dx = 0;
var dy = 0;

var field = [];

function init() {
    var I = Math.ceil(document.getElementById('field').clientWidth /
                      document.getElementById('x').clientWidth);
    var J = Math.ceil(document.getElementById('field').clientHeight /
                      document.getElementById('x').clientHeight);

    for (var i = 0; i < I; ++i) {
        field.push([]);
        for (var j = 0; j < J; ++j) {
            if (Math.random() > 0.9) {
                field[i].push(1);
            } else {
                field[i].push(0);
            }
        }
    }
    
    for (var i = 0; i < field.length; ++i) {
        for (var j = 0; j < field[i].length; ++j) {
            if (field[i][j] == 1) {
                var e = document.createElement('div');
                e.className = 'rock';
                e.style.top = (j * 10) + 'px';
                e.style.left = (i * 10) + 'px';
                document.getElementById('field').appendChild(e);
            }
        }
    }
    
    window.setInterval(step, 5);
}

function step() {
    if (dx == 0 && dy == 0) {
        return;
    }

    var xsize = document.getElementById('field').clientWidth;
    var ysize = document.getElementById('field').clientHeight;

    var xm = document.getElementById('x').clientWidth
    var ym = document.getElementById('x').clientHeight
    
    var xmax = xsize - document.getElementById('x').offsetWidth;
    var ymax = ysize - document.getElementById('x').offsetHeight;

    var posx = document.getElementById('x').offsetLeft;
    var posy = document.getElementById('x').offsetTop;

    var i = Math.floor(posx / xm);
    var j = Math.floor(posy / ym);
    
    if (dx > 0) {
        if (posx > xmax) {
            dx = 0;
        }

        if (field[i+1][j] == 1) {
            dx = 0;
        }
        
    } else if (dx < 0) {
        if (posx < 0) {
            dx = 0;
        }

        if (field[i][j] == 1) {
            dx = 0;
        }
    }

    if (dy > 0) {
        if (posy > ymax) {
            dy = 0;
        }

        if (field[i][j+1] == 1) {
            dy = 0;
        }

    } else if (dy < 0) {
        if (posy < 0) {
            dy = 0;
        }

        if (field[i][j] == 1) {
            dy = 0;
        }
    }
    
    posx += dx;
    posy += dy;
    
    document.getElementById('x').style.top = posy + 'px';
    document.getElementById('x').style.left = posx + 'px';
}

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

