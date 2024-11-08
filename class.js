class Character{
    
    _life = 1;
    maxLife = 1;
    attack = 0;
    defense = 0;

    constructor(name){
        this.name = name;
    }
    get life(){
        return this._life;
    }
    set life(newLife){
        this._life = newLife < 0 ? 0 : newLife;
    }
}

class Knight extends Character{
    constructor(name){
        super(name);
        this.life = 160;
        this.maxLife = this.life;
        this.attack = 30;
        this.defense = 22;
    }
}
class Sorcerer extends Character{
    constructor(name){
        super(name);
        this.life = 95;
        this.maxLife = this.life;
        this.attack = 40;
        this.defense = 16;
    }
}
class Assassin extends Character{
    constructor(name){
        super(name);
        this.life = 80;
        this.maxLife = this.life;
        this.attack = 50;
        this.defense = 10;
    }
}
class Giant extends Character{
    constructor(name){
        super(name);
        this.life = 200;
        this.maxLife = this.life;
        this.attack = 23;
        this.defense = 40;
    }
}

class Stage{
    constructor(Fighter1, Fighter2, Fighter1EL, Fighter2EL, count1, count2){
        this.Fighter1 = Fighter1;
        this.Fighter2 = Fighter2;
        this.Fighter1EL = Fighter1EL;
        this.Fighter2EL = Fighter2EL;
        this.count1 = 0;
        this.count2 = 0;
    }
    start(){
        this.update();
        
        

        this.Fighter1EL.querySelector('.attackButton').addEventListener("click", () => {
            this.doattack(this.Fighter1, this.Fighter2);
            if(this.count1 === this.count2){this.count1++;}
            console.log(this.count1, "A")});


        this.Fighter2EL.querySelector('.attackButton').addEventListener("click",() => {
            if(this.count1 - 1 <= this.count2){this.count2++;}
            if(this.count1 <= this.count2){this.doattack(this.Fighter2, this.Fighter1);
                this.count2 = this.count1;
            }
            console.log(this.count2, "M")});

    }
    update(){
        // fighter 1
        this.Fighter1EL.querySelector('.name').innerHTML = `${this.Fighter1.name} - ${this.Fighter1.life} HP`;

        let F1L = (this.Fighter1.life / this.Fighter1.maxLife) * 100

        this.Fighter1EL.querySelector('.bar').style.width = `${F1L}%`;


        //fighter 2
        this.Fighter2EL.querySelector('.name').innerHTML = `${this.Fighter2.name} - ${this.Fighter2.life} HP`;

        let F2L = (this.Fighter2.life / this.Fighter2.maxLife) * 100;

        this.Fighter2EL.querySelector('.bar').style.width = `${F2L}%`;


    }
    doattack(attacking, atacked){

        const ul = document.querySelector(".log");
        let li = document.createElement("li");

        let attackFactor = (Math.random() * 2).toFixed(2);
        let actualAttack = (attacking.attack * attackFactor) - (atacked.defense / 2);
        if(actualAttack < attacking.attack / 10){
            actualAttack = attacking.attack / 10
        }

        if(this.count1 != this.count2){
            li.textContent = "não é sua vez"
            ul.appendChild(li);
            console.log(this.count1, this.count2)
            return;

        }
        if(attacking.life <= 0 || atacked.life <= 0){
            li.textContent = "overkill";
           ul.appendChild(li);
           return;}
        atacked.life -= actualAttack;
        this.update();
        if(attacking.life <= 0 || atacked.life <= 0){
            li.textContent = `${attacking.name} ganhou`;
            this.verify = true;
            ul.appendChild(li);
           }
        else{     
          li.textContent = `${attacking.name} deu ${actualAttack} de dano contra ${atacked.name}`;
        }
        console.log(this.count1, this.count2)
        ul.appendChild(li)
    }
}