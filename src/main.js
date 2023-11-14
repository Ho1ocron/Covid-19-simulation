const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const particleArray = [];
const RecoveredParticleArray = [];
const InfectedParticleArray = [];

canvas.addEventListener("click", canvasEventListener);


class Particle
{
    constructor(ParticleInfected, tag)
    {
        
        this.x = Math.random() * 600;
        this.y = Math.random() * 600;
        this.v = 3;
        this.angle = Math.random() * 360;
        this.size = 8;
        this.tag = tag; 
        this.infected = ParticleInfected;
        this.recovered = false;
        this.triedToRecover = false;

        this.ChanceToBeInfected = Number(document.getElementById("ChanceToBeInfectedInput").value) / 100;

        this.speedX = Math.random() * 5 - 1.5;
        this.speedY = Math.random() * 5 - 1.5;

        if (this.infected === true) {
            this.color = "rgb(235, 58, 93)";
        }

        else if (this.infected === false && this.recovered === false) {
            this.color = "white";
        }
    }


    update()
    {
        this.x += this.v * Math.cos(this.angle);
        this.y += this.v * Math.sin(this.angle);


        if (Math.random() < 0.001) {this.angle = Math.random() * 360;}
        
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

        if (distance != 0 && distance <= 8) {
            target.angle = Math.atan2(dy,dx);
            this.angle = Math.random() * 360;

            if (Math.random() < this.ChanceToBeInfected && this.infected === false && target.infected === true && this.recovered === false) {
                this.infected = true;
                this.color = "rgb(235, 58, 93)";
            }
            
            else if (Math.random() < 0.1 && this.infected === true && target.recovered === true) {
                this.recovered = true;
                this.infected = false;
                this.color = "blue";
            }
        }
    }


    recover()
    {
        if (Math.random() < 0.0005 && this.infected === true && this.recovered === false && this.triedToRecover === false) { 
            this.recovered = true;
            this.infected = false;
            this.color = "blue";
            this.triedToRecover = true;
        }
        
        else {
            this.triedToRecover = true;
        }
    }


    draw()
    {
        ctx.fillStyle = this.color;
        this.recover();
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
    requestAnimationFrame(animate);

    for (const particle of particleArray) {
        if (particle.infected === true && InfectedParticleArray.includes(particle.tag) === false) {
            InfectedParticleArray.push(particle.tag);
        }

        if (particle.recovered === true && RecoveredParticleArray.includes(particle.tag) === false) {
            RecoveredParticleArray.push(particle.tag);
            
        }
    }

    for (const particle1 of particleArray) {
        if (InfectedParticleArray.includes(particle1.tag) === true && particle1.recovered === true) {
            InfectedParticleArray.pop(particle1.tag);
        }
    }

    console.log(InfectedParticleArray);
    console.log(RecoveredParticleArray);
}


function canvasEventListener() 
{
    var inputElement = document.getElementById("PeopleAmountInput");
    let numberValue = Number(inputElement.value);

    for (let i = 0; i < 5; i++) {
        particleArray.push(new Particle(true, "I" + i));
        InfectedParticleArray.push(("I" + i))
    }

    for (let i = 0; i < numberValue-5; i++) {
        particleArray.push(new Particle(false, "N" + i));
    }

    
    console.log(InfectedParticleArray.length)
}


animate();