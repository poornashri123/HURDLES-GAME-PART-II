class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    athlete1 = createSprite(100,75);
    athlete1.addImage("athlete1",athlete1Img);
    athlete2 = createSprite(300,75);
    athlete2.addImage("athlete2",athlete2Img);
    athlete3 = createSprite(500,75);
    athlete3.addImage("athlete3",athlete3Img);
    athlete4 = createSprite(700,75);
    athlete4.addImage("athlete4",athlete4Img);
    athletes = [athlete1, athlete2, athlete3, athlete4];
  }

  play(){
    form.hide();
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allAthletes !== undefined){
      background(rgb(198,135,103));
      image(track, 0,-displayHeight*4,displayWidth, displayHeight*5);
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the athletes
      var x;
      var y = 75;

      for(var plr in allAthletes){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the athletes a little away from each other in y direction
        y = y + 200;
        //use data form the database to display the athletes in x direction
        x = displayHeight - allAthletes[plr].distance;
        athletes[index-1].x = x;
        athletes[index-1].y = y;
       // console.log(index, player.index)

       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          athletes[index - 1].shapeColor = "red";
          camera.position.y = displayHeight/2;
          camera.position.x = athletes[index-1].x;
        }
       
        //textSize(15);
        //text(allAthletes[plr].name + ": " + allAthletes[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }

    if(player.distance < -3860){
      gameState = 2;
      player.rank +=1
      Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
