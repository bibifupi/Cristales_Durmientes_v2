class Player {
    constructor(){
        this.time = 0;
        
    }
}
class Sprite {
    constructor( { position, velocity, image, frames = {max: 1}, sprites} ){
        this.position = position
        this.image = image
        this.frames = {...frames,  val: 0, elapsed: 0 }

        //funcion para cargar el Personaje
        this.image.onload =()=>{
            this.width = this.image.width / this.frames.max
            this.height = this.image.height

        }
        this.moving = false
        this.sprites = sprites
    }

    draw() {
        
        //Posición del personaje dentro del mapa
        context.drawImage( //punto de empiece de vista Personaje
            this.image, 

            //Renderización del personaje al moverse
            this.frames.val * this.width, //coordenada X donde empezamos a recortar Spring Personaje
            0, //coordenada Y 
            this.image.width / this.frames.max, 
            this.image.height, 
            
            //Actual
            this.position.x,
            this.position.y,
            this.image.width / this.frames.max,
            this.image.height

        ) 

        if(!this.moving){
            return
        }

        if( this.frames.max > 1){
            this.frames.elapsed++
        }
    
        if(this.frames.elapsed % 10 === 0){
            if (this.frames.val < this.frames.max - 1){
                this.frames.val++
            } else {
                this.frames.val = 0
            }
        }

    }
       
}


class Boundary {
    static width = 48
    static height = 48
    constructor({position}) {
        this.position = position
        this.width = 48
        this.height = 48
    }
    draw(){
        context.fillStyle = 'rgba(255, 0, 0, 0.0)'
        //context.fillStyle = 'red'
        
        context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
