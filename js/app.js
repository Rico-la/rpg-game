const app = {     

    board : document.getElementById('board'),
    gameOver: false,
    count: 0,
    row: 4,

    cell: 6,

    player: {
        x: 0,
        y: 0,
        direction: 'right'
    },

    targetCell: {
        x: 5,
        y: 3
    },

    isGameOver: function () {
        if (app.player.x === app.targetCell.x && app.player.y === app.targetCell.y) {
            app.gameOver = true;
            let message = document.createElement('div');
            message.textContent = `Congratulation you win in ${app.count+1} shifts`;
            message.className = 'message';
            app.board.appendChild(message);
            // restart Game
            let buttonRestart = document.getElementsByTagName('button')
            buttonRestart[0].addEventListener('click', ()=> {
                app.gameOver = false;
                app.player.x = 0;
                app.player.y = 0;
                app.count = 0;
                app.clearBoard();
                app.init();
            });
        }
        return 0;

    },

    drawBoard : function () {

        for (var lineIndex=0; lineIndex < app.row ; lineIndex++) {

            var row = document.createElement('div');
  
            row.className = 'row';

            for (var columnIndex=0; columnIndex< app.cell; columnIndex++) {
              
                var cell = document.createElement('div');
                cell.className = 'cell';
                
                row.appendChild(cell);
                
                if (lineIndex === app.targetCell.y && columnIndex === app.targetCell.x){
                    cell.classList.add('targetCell');
                }
                if(lineIndex === app.player.y && columnIndex === app.player.x){
                    const player = document.createElement('div');
                    player.classList.add('player');
                    cell.appendChild(player);
        

                    //Direction players
                    switch (app.player.direction) {
                    case 'up':
                        player.classList.add('player--up');
                        break;
                    case 'left':
                        player.classList.add('player--left');
                        break;
                    case 'down':
                        player.classList.add('player--down');
                        break;
                    case 'right':
                        player.classList.add('player--right');
                        break;
                    }
                }
                
            }   
               
            app.board.appendChild(row);
        }
        

        app.isGameOver();
    },

    clearBoard : function () {
        app.board.textContent = '';
    },

    redrawBoard : function () {
        app.clearBoard();
        app.drawBoard();
    },

    turnLeft : function (){
        if(app.gameOver) {
            return;
        } else {

            switch (app.player.direction) {
            case 'right' :
                app.player.direction = 'up';
                break;
            case 'up' :
                app.player.direction = 'left';
                break;
            
            case 'left':
                app.player.direction = 'down';
                break;
            
            case 'down':
                app.player.direction = 'right';
                break;
            }
            app.redrawBoard();
        }
    },

    turnRight : function (){
        if (app.gameOver) {
            return;
        } else {
            switch (app.player.direction) {
            case 'right':
                app.player.direction = 'down';
                break;
            case 'down': 
                app.player.direction = 'left';
                break;
            case 'left':
                app.player.direction = 'up';
                break;
            case 'up':
                app.player.direction = 'right';
                break;
            }
            app.redrawBoard();
        }
    },

    moveForward: function () {
        if (app.gameOver) {
            return;
            
        } else { 

            if(app.player.x < 5 && app.player.direction === 'right') {
                app.player.x++;
            } else if (app.player.y < 3 && app.player.direction === 'down'){
                app.player.y++;
            } else if (app.player.x > 0  && app.player.direction === 'left'){
                app.player.x--;
            } else if (app.player.y > 0 && app.player.direction === 'up'){
                app.player.y--;
            } else {
                console.log('Attention, tu vas tomber Michel');
            }
            app.redrawBoard();
        }
    },

    listenKeyboardEvents : function (event) {
        if (event.key === 'ArrowRight'){
            app.moveForward();
            return app.count++;
        } else if (event.key === 'ArrowUp') {
            app.turnLeft();
            return app.count++;
        } else if (event.key === 'ArrowDown') {
            app.turnRight();
            return app.count++;
        }
    },
    
    

    init: function () {
        console.log('init !');
        app.drawBoard();
        document.addEventListener('keyup', app.listenKeyboardEvents);
    }    
};

// Initialize app
document.addEventListener('DOMContentLoaded', app.init);










