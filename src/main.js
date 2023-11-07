const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const particleArray = [];
var elt = 0;

canvas.addEventListener("click", canvasEventListener);


class Particle
{
    constructor(Pinfected)
    {
        
        this.x = Math.random() * 600;
        this.y = Math.random() * 600;
        this.v = 2;
        this.angle = Math.random() * 360;
        this.size = 2; //random size)
        this.color = "white"//"hsl(" + elt + ", 100%, 50%)";  
        this.infected = Pinfected;
        this.recovered = false;

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


    collide(target)
    {
        const dx = target.x - this.x;
        const dy = target.y - this.y;
        const distance  = (dx ** 2 + dy ** 2)**0.5;
        //console.log(distance)

        if (distance != 0 && distance < 1) {
            this.angle = Math.random() * 360;
            //console.log(distance);

            if (Math.random() < 0.1 && this.infected === false && target.infected === true) {
                this.infected = true;
                this.color = "rgb(235, 58, 93)";
            }
            
            else if (this.infected === true && target.recovered === true) {
                this.recovered = true;
                this.infected = false;
                this.color = "blue"
            }
        }
    }


    recover()
    {
        if (Math.random() < 0.001 && this.infected === true) { 
            this.recovered = true;
            this.infected = false;
            this.color = "blue";
        }
    }


    
    startTimer()
    {
        if (this.infected === true) {
            setTimeout(this.recover, 150000);
        }
    }


    draw()
    {
        ctx.fillStyle = this.color;
        this.startTimer()
        this.recover()
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}



function handleParticles()
{
    for (let i = 0; i < particleArray.length; i++) {
        particleArray[i].update();
        particleArray[i].draw();
    }

    for (const person of particleArray) {
        for (const target of particleArray) {
            if(person != target) person.collide(target);

        }
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
    var inputElement = document.getElementById("PeopleAmountInput");
    let numberValue = Number(inputElement.value);

    for (let i = 0; i < numberValue; i++) {
        
        if (Math.random() < 0.1) {
            particleArray.push(new Particle(true));
            particleArray.push(new Particle(true));
            particleArray.push(new Particle(true));
        }

        else {
            particleArray.push(new Particle(false));
        }
    }
}


animate();