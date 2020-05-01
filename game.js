var dx = 0;
var dy = 0;
var visible = false;
var cellSize = 10;

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
    [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
     [1,0,0,1,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,0,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,1,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,1,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,1,0,0,1,0,0,2,1,1,1,1,1,1,1,1,1,1],
     [1,0,0,1,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,1,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0],
     [1,0,0,1,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0],
     [1,1,1,1,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,1,1,1,2,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,1,1,1,1,0,0,0,0,1,1,2,2,1,1,1,1,1,1],
     [0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]);

function init() {
    var I = field.length;
    var J = field[0].length;
    var w = Math.floor(window.innerWidth / I);
    var h = Math.floor(window.innerHeight / J);
    if (w < h) {
        cellSize = w;
    } else {
        cellSize = h;
    }
    
    var f = document.getElementById('field');
    f.style.width = (I * cellSize)+'px';
    f.style.height = (J * cellSize)+'px';
    var x = document.getElementById('x');
    x.style.width = x.style.height =Math.floor(cellSize/2)+'px'; 
    x.style.top = (3 * cellSize)+'px';
    x.style.left = (3 * cellSize)+'px';
    for (var i = 0; i < I; ++i) {
        for (var j = 0; j < J; ++j) {
            if (field[i][j] >  0) {
                var e = document.createElement('div');
                e.className = 'rock';
                e.style.top = (j * cellSize) + 'px';
                e.style.left = (i * cellSize) + 'px';
                e.style.height = e.style.width = ( cellSize ) + 'px';
                
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

    if (visible) {
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
    if (event.keyCode == 83) {
        document.getElementById('field').className = '';
        visible = false;
    }
    showd(event.keyCode);
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
    if (event.keyCode == 83) {
        document.getElementById('field').className = 'show';
        visible = true;
    }
    showd(event.keyCode);
}

function showd(keycode) {
    document.getElementById('dx').innerText = dx;
    document.getElementById('dy').innerText = dy;
    document.getElementById('key').innerText = keycode;
}

