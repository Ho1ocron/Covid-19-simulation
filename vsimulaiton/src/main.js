const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const particleArray = [];
var elt = 0;

canvas.addEventListener("click", canvasEventListener);


class Particle
{
    constructor()
    {
        
        this.x = 300;
        this.y = 300;
        this.v = 2;
        this.angle = Math.random() * 360;
        this.size = 2; //random size)
        this.color = "rgb(235, 58, 93)"//"hsl(" + elt + ", 100%, 50%)";  

        this.speedX = Math.random() * 5 - 1.5;
        this.speedY = Math.random() * 5 - 1.5;
    }


    update()
    {
        this.x += this.v * Math.cos(this.angle);
        this.y += this.v * Math.sin(this.angle);
        
        if((this.x < this.size) || (this.x > canvas.width - this.size)) {
            this.angle = Math.PI - this.angle;
            if(this.x < this.size) {this.x = this.size;}

            if(this.x > canvas.width - this.size) {
                this.x = canvas.width - this.size;
            }
        }

        if((this.y < this.size) || (this.y > canvas.height - this.size)) {
            this.angle = Math.PI*2 - this.angle;
            if(this.y < this.size) {this.y = this.size;}

            if(this.y > canvas.height - this.size) {
                this.y = canvas.height - this.size;
            }
        }
    }


    draw()
    {
        ctx.fillStyle = this.color;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}



function handleParticles()
{
    for (let i = 0; i < particleArray.length; i++)
    {
        particleArray[i].update();
        particleArray[i].draw();
    }
}


function animate()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleParticles();
    elt+=1;
    requestAnimationFrame(animate);
}


function canvasEventListener() 
{
    var x = 10;
    var y = 10;
    var inputElement = document.getElementById("PeopleAmountInput");
    let numberValue = Number(inputElement.value);
    for (let i = 0; i < numberValue; i++) {
        particleArray.push(new Particle());
    }
}


animate();