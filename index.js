class Game {
    constructor() {
        while (true) {
            this.countPlayer = prompt('Введите кол-во игроков на Кровавой Арене Смерти(min 2, max: 16): ');
            if (this.countPlayer >= 2 && this.countPlayer <= 16) {
                break;
            } else if (this.countPlayer > 16) {
                console.log('Слишком много игроков!')
            } else {
                console.log('Недостаточно игроков!');
            }
        };
        this.playerObj = {};
        for (let i = 1; i <= this.countPlayer; i++) {
            while (true) {
                this.playerName = prompt(`Введите имя игрока ${i}`);
                if (this.playerName.length >= 3) {
                    this.playerObj[this.playerName] = {};
                    break;
                }
                else {
                    console.log('Имя слишком короткое!')
                }

            }

        }
        this.fighter1;
        this.fighter2;
        this.setupPerks();
        this.fightButton = document.querySelector('.fight');
        this.attackBtn = document.querySelector('.fighter__attack');
        this.fightButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.playerObjKeys = Object.keys(this.playerObj);
            if (this.playerObjKeys.length > 1) {
                this.playMusic.play();
                this.fightButton.classList.add('hidden')
                this.attackBtn.classList.remove('hidden')
                this.play();
            } else if (this.playerObjKeys.length === 1) {
                console.log(`Победил ${this.playerObjKeys[0]}`);
            } else {
                console.log('Все мертвы:(')
            }
        });
        this.playMusic = new Audio('./music.mp3');



    }
    setupPerks() {
        for (let player in this.playerObj) {
            this.playerObj[player]['HP'] = 100; // по умолчанию у всех 100 хп
            this.playerObj[player]['DAMAGE'] = parseInt(Math.random() * (90 - 10) + 10); // Дамаг (мин 10)
            this.playerObj[player]['DEX'] = parseInt(Math.random() * 60); // Отвечает за уклонение
            this.playerObj[player]['CRITICAL'] = parseInt(Math.random() * 70); // Шанс крит удара 
            this.playerObj[player]['BLADEMAIL'] = (parseInt(Math.random() * 100) <= 100) ? true : false; // За отражаемый урон (имеется ли данный предмет)
        }
        console.log('Да начнутся бои!');
        console.log('Игроки будут сражаться между собой в случайном порядке!');
    }
    play() {
        const placeFight = document.querySelector('.fighters__list');
        placeFight.innerHTML = '';
        function createPerson(fighter, index, array, keys) {
            const personCreator = `<li class="fighter fighters__item fighter${fighter}">
                                <div class="fighter__info">
                                    <div class="fighter__name">${keys[fighter]}</div>
                                    <div class="fighter__healthPoint">
                                        <div class="fighter__hp fighter__hp${fighter}">${array[keys[fighter]].HP}hp</div>
                                        <div class="damage damage${fighter}"></div>
                                    </div>
                                </div>
                                <div class="fighter__person">
                                    <img src="./img/stay.png" alt="#" class="fighter__person--img fighter__person--img--fighter${fighter} fighter__person--img${index}">
                                </div>
                                <div class="fighter__miss fighter__miss${fighter} fighter__miss--pos${index} hidden">MISS!</div>
                                <div class="fighter__critical fighter__critical${fighter} hidden">CRITICAL</div>
                                <div class="blade-mail hidden blade-mail${fighter}"><img src="./img/blade_mail.png" class="blade-mail--img"></div>
                                
                            </li>`;
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = personCreator;
            placeFight.appendChild(tempDiv.firstChild);
        }
        const keysPlayer = Object.keys(this.playerObj);
        while (true) {
            this.fighter1 = parseInt(Math.random() * keysPlayer.length);
            this.fighter2 = parseInt(Math.random() * keysPlayer.length);
            if (this.fighter1 != this.fighter2 && this.fighter2 !== undefined) {
                createPerson(this.fighter1, 0, this.playerObj, keysPlayer);
                createPerson(this.fighter2, 1, this.playerObj, keysPlayer);
                break;
            }
        };
        console.log(`на поле боя выходят!: ${keysPlayer[this.fighter1]} и ${keysPlayer[this.fighter2]}`)
        console.log('--------------ХАРАКТЕРИСТИКА---------------')
        console.log(`${keysPlayer[this.fighter1]} имеет ${this.playerObj[keysPlayer[this.fighter1]].HP} HP, ${this.playerObj[keysPlayer[this.fighter1]].DAMAGE} Урона, ${this.playerObj[keysPlayer[this.fighter1]].DEX}% шанса на уклонение, ${this.playerObj[keysPlayer[this.fighter1]].CRITICAL}% шанс крит. удара, и ${this.playerObj[keysPlayer[this.fighter1]].BLADEMAIL ? 'имеет' : 'не имеет'} блейдмейл`);
        console.log('-------------------------------------------')
        console.log(`${keysPlayer[this.fighter2]} имеет ${this.playerObj[keysPlayer[this.fighter2]].HP} HP, ${this.playerObj[keysPlayer[this.fighter2]].DAMAGE} Урона, ${this.playerObj[keysPlayer[this.fighter2]].DEX}% шанса на уклонение, ${this.playerObj[keysPlayer[this.fighter2]].CRITICAL}% шанс крит. удара, и ${this.playerObj[keysPlayer[this.fighter2]].BLADEMAIL ? 'имеет' : 'не имеет'} блейдмейл`);
        console.log('-------------------------------------------')

        function attack(playerAttack, playerObj, enemy) {
            console.log(`${keysPlayer[playerAttack]} Атакует!`);
            console.log(enemy);
            console.log(playerAttack);
            document.querySelector(`.fighter__miss${playerAttack}`).classList.add('hidden');
            document.querySelector(`.fighter__miss${enemy}`).classList.add('hidden');
            document.querySelector(`.fighter__critical${playerAttack}`).classList.add('hidden');
            document.querySelector(`.fighter__critical${enemy}`).classList.add('hidden');
            document.querySelector(`.fighter__person--img--fighter${playerAttack}`).src = './img/stay.png';
            document.querySelector(`.fighter__person--img--fighter${enemy}`).src = './img/stay.png';
            document.querySelector(`.blade-mail${playerAttack}`).classList.add('hidden');
            document.querySelector(`.blade-mail${enemy}`).classList.add('hidden');
            let criticalDamage;
            function rand() {
                return parseInt(Math.random() * 100);
            }
            if (rand() <= playerObj[keysPlayer[playerAttack]].DEX) { // проверка на уклон
                console.log(`Противник ${keysPlayer[enemy]} уклонился!`)
                document.querySelector(`.fighter__miss${enemy}`).classList.remove('hidden');
            } else {
                console.log('Удар прошел!');
                if (rand() <= playerObj[keysPlayer[playerAttack]].CRITICAL) { // проверка выпал ли крит
                    criticalDamage = true;
                    console.warn('крит сработал! урон увеличен в 1.5 раз')
                    document.querySelector(`.fighter__critical${enemy}`).classList.remove('hidden');
                }
                if (playerObj[keysPlayer[enemy]].BLADEMAIL) { // проверка есть ли блейд мейл у противника
                    console.error(`Блейдмейл сработал! ${keysPlayer[playerAttack]} теряет ${criticalDamage ? (playerObj[keysPlayer[playerAttack]].DAMAGE * 1.5) * 25 / 100 : playerObj[keysPlayer[playerAttack]].DAMAGE * 25 / 100} HP`)
                    playerObj[keysPlayer[playerAttack]].HP -= ((criticalDamage === true) ? (playerObj[keysPlayer[playerAttack]].DAMAGE * 1.5) * 25 / 100 : playerObj[keysPlayer[playerAttack]].DAMAGE * 25 / 100);
                    document.querySelector(`.blade-mail${enemy}`).classList.remove('hidden');
                    document.querySelector(`.damage${playerAttack}`).textContent = `-(${criticalDamage ? (playerObj[keysPlayer[playerAttack]].DAMAGE * 1.5) * 25 / 100 : playerObj[keysPlayer[playerAttack]].DAMAGE * 25 / 100} HP)`
                }
                console.log(`Противник потерял ${((criticalDamage === true) ? (playerObj[keysPlayer[playerAttack]].DAMAGE * 1.5) : playerObj[keysPlayer[playerAttack]].DAMAGE)} HP`);
                playerObj[keysPlayer[enemy]].HP -= ((criticalDamage === true) ? (playerObj[keysPlayer[playerAttack]].DAMAGE * 1.5) : playerObj[keysPlayer[playerAttack]].DAMAGE);
                document.querySelector(`.fighter__hp${enemy}`).textContent = `${playerObj[keysPlayer[enemy]].HP}hp`;
                document.querySelector(`.fighter__person--img--fighter${playerAttack}`).src = './img/attack.png';
                document.querySelector(`.damage${enemy}`).textContent = `-(${((criticalDamage === true) ? (playerObj[keysPlayer[playerAttack]].DAMAGE * 1.5) : playerObj[keysPlayer[playerAttack]].DAMAGE)} HP)`
            }
            console.log('-------------------------------------------')
        }
        // Replace your existing while loop with this code

        let itter = true;

        this.attackBtn.addEventListener('click', () => {
            if (itter) {
                attack(this.fighter1, this.playerObj, this.fighter2);
                itter = false;
            } else if (!itter) {
                attack(this.fighter2, this.playerObj, this.fighter1);
                itter = true;
            }
            if (this.playerObj[keysPlayer[this.fighter1]].HP <= 0 || this.playerObj[keysPlayer[this.fighter2]].HP <= 0) {
                let winner;
                if (this.playerObj[keysPlayer[this.fighter1]].HP <= 0 && this.playerObj[keysPlayer[this.fighter2]].HP <= 0) {
                    console.warn(`ничья!`);
                    console.log('В случае ничьи оба вылетают!')
                    winner = `<li class="fighter fighters__item fighter${this.fighter1}">
                    <div class="fighter__info">
                        <div class="fighter__name">${keysPlayer[this.fighter1]}</div>
                        <div class="fighter__healthPoint">
                            <div class="fighter__hp fighter__hp${this.fighter1}">${this.playerObj[keysPlayer[this.fighter1]].HP}hp</div>
                            <div class="damage damage${this.fighter1}"></div>
                        </div>
                    </div>
                    <div class="fighter__person winner">
                        <img src="./img/dead.png" alt="#" class="fighter__person--img">
                    </div>
                </li><li class="fighter fighters__item fighter${this.fighter2}">
                <div class="fighter__info">
                    <div class="fighter__name">${keysPlayer[this.fighter2]}</div>
                    <div class="fighter__healthPoint">
                        <div class="fighter__hp fighter__hp${this.fighter2}">${this.playerObj[keysPlayer[this.fighter2]].HP}hp</div>
                        <div class="damage damage${this.fighter2}"></div>
                    </div>
                </div>
                <div class="fighter__person winner">
                    <img src="./img/dead.png" alt="#" class="fighter__person--img">
                </div>
            </li>`;
                    delete this.playerObj[keysPlayer[this.fighter1]];
                    delete this.playerObj[keysPlayer[this.fighter2]];
                    

                } else if (this.playerObj[keysPlayer[this.fighter1]].HP <= 0) {
                    console.warn(`${keysPlayer[this.fighter2]} победил!, у него осталось ${this.playerObj[keysPlayer[this.fighter2]].HP} хп!`);
                    winner = `<li class="fighter fighters__item fighter${this.fighter2}">
                    <div class="fighter__info">
                        <div class="fighter__name">${keysPlayer[this.fighter2]}</div>
                        <div class="fighter__healthPoint">
                            <div class="fighter__hp fighter__hp${this.fighter2}">${this.playerObj[keysPlayer[this.fighter2]].HP}hp</div>
                            <div class="damage damage${this.fighter2}"></div>
                        </div>
                    </div>
                    <div class="fighter__person winner">
                        <img src="./img/winner.png" alt="#" class="fighter__person--img">
                    </div>
                </li><li class="fighter fighters__item fighter${this.fighter1}">
                <div class="fighter__info">
                    <div class="fighter__name">${keysPlayer[this.fighter1]}</div>
                    <div class="fighter__healthPoint">
                        <div class="fighter__hp fighter__hp${this.fighter1}">${this.playerObj[keysPlayer[this.fighter1]].HP}hp</div>
                        <div class="damage damage${this.fighter1}"></div>
                    </div>
                </div>
                <div class="fighter__person winner">
                    <img src="./img/dead.png" alt="#" class="fighter__person--img">
                </div>
            </li>`;
                    delete this.playerObj[keysPlayer[this.fighter1]];
                    
                }
                else {
                    console.warn(`${keysPlayer[this.fighter1]} победил!, у него осталось ${this.playerObj[keysPlayer[this.fighter1]].HP} хп!`);
                    winner = `<li class="fighter fighters__item fighter${this.fighter2}">
                    <div class="fighter__info">
                        <div class="fighter__name">${keysPlayer[this.fighter2]}</div>
                        <div class="fighter__healthPoint">
                            <div class="fighter__hp fighter__hp${this.fighter2}">${this.playerObj[keysPlayer[this.fighter2]].HP}hp</div>
                            <div class="damage damage${this.fighter2}"></div>
                        </div>
                    </div>
                    <div class="fighter__person winner">
                        <img src="./img/dead.png" alt="#" class="fighter__person--img">
                    </div>
                </li>
                    <li class="fighter fighters__item fighter${this.fighter1}">
                    <div class="fighter__info">
                        <div class="fighter__name">${keysPlayer[this.fighter1]}</div>
                        <div class="fighter__healthPoint">
                            <div class="fighter__hp fighter__hp${this.fighter1}">${this.playerObj[keysPlayer[this.fighter1]].HP}hp</div>
                            <div class="damage damage${this.fighter1}"></div>
                        </div>
                    </div>
                    <div class="fighter__person winner">
                        <img src="./img/winner.png" alt="#" class="fighter__person--img">
                    </div>
                </li>`;
                    delete this.playerObj[keysPlayer[this.fighter2]];
                    
                }
                console.log(this.playerObj)
                placeFight.innerHTML = winner;
                this.fightButton.classList.remove('hidden');
                this.attackBtn.classList.add('hidden')

            }
        })

    }
}






document.querySelector('.restart').addEventListener('click', ()=>{
    document.querySelector('.fight').classList.remove('hidden');
    const game = new Game();
})
