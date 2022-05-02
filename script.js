const dino = document.querySelector('.dino');
const background = document.querySelector('.background');
let isJumping = false;
let position = 0;

function handleKeyUp(e) {
  if (e.keyCode === 32) {
    if (!isJumping) {
      jump();
    }
  }
};

function jump() {
  isJumping = true;
  
  let upInterval = setInterval(() => {
    position += 10;
    dino.style.bottom = `${position}px`;
    
    if (position >= 150) {
      clearInterval(upInterval);
      
      let downInterval = setInterval(() => {
        position -= 10;
        dino.style.bottom = `${position}px`;
        
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
      }, 20);
    }
  }, 20);
};

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = innerWidth;
  let randomTime = Math.floor(Math.random() * 5000);
  
  cactus.classList.add('cactus');
  cactus.style.left = `${cactusPosition}px`;
  background.appendChild(cactus);
  
  let leftInterval = setInterval(() => {
    if (cactusPosition <= -60) {
      clearInterval(leftInterval);
      background.removeChild(cactus);
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) {
      clearInterval(leftInterval);
      document.body.innerHTML = '<h1 class="game-over">Fim de Jogo!</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = `${cactusPosition}px`;
    }
  }, 20);
  
  setTimeout(createCactus, randomTime);
};

createCactus();
document.addEventListener('keyup', handleKeyUp);
