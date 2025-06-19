const canvas = document.getElementById('myGame') as HTMLCanvasElement | null;
if (!canvas) {
    throw new Error('Canvas or context not found');
}
const ctx = canvas.getContext('2d');

var debug = true;

var x = 0;
var y = 0;

function update() {
    if (ctx && canvas) {
        ctx.fillStyle = '#222';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.beginPath();
        ctx.rect(x,y, 100, 100);
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.stroke();
        
    }


    requestAnimationFrame(update);
}

document.addEventListener('keydown', (event) => {
    
    if (event.code === 'KeyW') {
        y -= 10;
    }
    if (event.code === 'KeyS') {
        y += 10;
    }
    if (event.code === 'KeyD') {
        x += 10;
    }
    if (event.code === 'KeyAaa') {
        x -= 10;
    }

    if(debug){ console.log(`Key pressed: ${event.code}`);}
});

update();