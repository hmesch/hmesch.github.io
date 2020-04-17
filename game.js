var dx = 0;
var dy = 0;

const cellSize = 10;

function transpose(field) {
    var field2 = [];
    var I = field[0].length;
    var J = field.length;
    for (var i = 0; i < I; ++i) {
        field2.push([]);
        for (var j = 0; j < J; ++j ) {
            field2[i][j] = field[j][i];
        }
    }
    return field2;
}

var field = transpose(
    [[1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0],
     [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,1,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0],
     [1,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,2,2,2,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
     [0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0],
     [0,0,1,0,0,1,0,0,0,1,0,0,0,1,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0]]);

function init() {
    var I = Math.ceil(document.getElementById('field').clientWidth /
                      document.getElementById('x').clientWidth);
    var J = Math.ceil(document.getElementById('field').clientHeight /
                      document.getElementById('x').clientHeight);
    
    for (var i = 0; i < field.length; ++i) {
        for (var j = 0; j < field[i].length; ++j) {
            if (field[i][j] >  0) {
                var e = document.createElement('div');
                e.className = 'rock';
                e.style.top = (j * cellSize) + 'px';
                e.style.left = (i * cellSize) + 'px';
                document.getElementById('field').appendChild(e);
            }
        }
    }
    
    window.document.body.onkeydown = keydown;
    window.document.body.onkeyup = keyup;
    window.setInterval(step, 10);
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

    var posx1 = posx + dx;
    var posy1 = posy + dy;
    
    var i0 = Math.floor(posx1 / cellSize);
    var j0 = Math.floor(posy1 / cellSize);

    var i1 = Math.floor((posx1 + xm)/ cellSize);
    var j1 = Math.floor((posy1 + ym)/ cellSize);

    var dx1 = dx;
    var dy1 = dy;
    
    if (dx > 0) {
        if (posx1 > xmax) {
            dx1 = 0;
        }

        if (field[i1][j0] == 1 ||
            field[i1][j1] == 1) {
            dx1 = 0;
        }
        
    } else if (dx < 0) {
        if (posx1 < 0) {
            dx1 = 0;
        }

        if (field[i0][j0] == 1 ||
            field[i0][j1] == 1) {
            dx1 = 0;
        }
    }

    if (dy > 0) {
        if (posy1 > ymax) {
            dy1 = 0;
        }

        if (field[i1][j0] == 1 ||
            field[i1][j1] == 1) {
            dy1 = 0;
        }

    } else if (dy < 0) {
        if (posy1 < 0) {
            dy1 = 0;
        }

        if (field[i0][j0] == 1 ||
            field[i0][j1] == 1) {
            dy1 = 0;
        }
    }
    
    posx += dx1;
    posy += dy1;
    
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
    showd();
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
    showd();
}

function showd() {
    document.getElementById('dx').innerText = dx;
    document.getElementById('dy').innerText = dy;
}
