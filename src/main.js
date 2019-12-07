import { Game, Players } from  './backend.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const players = new Players();
const discardArray = [];

import audioinstructions from './audio.m4a';
const audioInstructions = new Audio();
audioInstructions.src = audioinstructions;


$(document).ready(function() {
  let game;
  let player1;
  let player2;
  let player3;
  let player4;
  let player5;
  let player6;
  let elector;
  let shooter;
  let chancellor;
  let delete1;
  let delete2;

  $("button#5players").click(function() {
    $(".playerNum").hide();
    $(".nameInput5").show();
  });

  $("button#6players").click(function() {
    $(".playerNum").hide();
    $(".nameInput6").show();
  });

  $("form.form5").submit(function(event) {
    event.preventDefault();
    let  playera =  $("input#player1").val();
    let playerb = $("input#player2").val();
    let playerc = $("input#player3").val();
    let playerd = $("input#player4").val();
    let playere = $("input#player5").val();
    player1 = new Players(playera);
    player2 = new Players(playerb);
    player3 = new Players(playerc);
    player4 = new Players(playerd);
    player5 = new Players(playere);
    game = new Game(5);
    let playerArray = [player1, player2, player3, player4, player5];
    game.playerOrder = playerArray;
    game.assignNumbers();
    game.assignParty();
    $("#player1Name").text(playera);
    $("#player2Name").text(playerb);
    $("#player3Name").text(playerc);
    $("#player4Name").text(playerd);
    $("#player5Name").text(playere);
    $(".player1").show();
    $(".player2").show();
    $(".player3").show();
    $(".player4").show();
    $(".player5").show();
    $(".affiliationCheck").show();
    $(".nameInput5").hide();
    game.firstPresident();
    playerTextUpdate();
    console.log(game.playerOrder);
  });


  $("form.form6").submit(function(event) {
    event.preventDefault();
    let playera =  $("input#player1b").val();
    let playerb = $("input#player2b").val();
    let playerc = $("input#player3b").val();
    let playerd = $("input#player4b").val();
    let playere = $("input#player5b").val();
    let playerf = $("input#player6b").val();
    player1 = new Players(playera);
    player2 = new Players(playerb);
    player3 = new Players(playerc);
    player4 = new Players(playerd);
    player5 = new Players(playere);
    player6 = new Players(playerf);
    game = new Game(6);
    game.playerOrder.push(player1, player2, player3, player4, player5, player6);
    game.assignNumbers();
    game.assignParty();
    console.log(game.playerOrder);
    $("#player1Name").text(playera);
    $("#player2Name").text(playerb);
    $("#player3Name").text(playerc);
    $("#player4Name").text(playerd);
    $("#player5Name").text(playere);
    $("#player6Name").text(playerf);
    $(".player1").show();
    $(".player2").show();
    $(".player3").show();
    $(".player4").show();
    $(".player5").show();
    $(".player6").show();
    $(".affiliationCheck").show();
    $(".nameInput6").hide();
    game.firstPresident();
    console.log(player1.party);
    console.log(game.playerOrder);
    playerTextUpdate();
  });
  function playerTextUpdate (){
    $('#player1Affiliation').text("Your Party Afiiliation is " + player1.party + " , Your Secret Identity is " + player1.secret + " , Your Status is " + player1.status);
    $('#player2Affiliation').text("Your Party Afiiliation is " + player2.party + " , Your Secret Identity is " + player2.secret + " , Your Status is " + player2.status);
    $('#player3Affiliation').text("Your Party Afiiliation is " + player3.party + " , Your Secret Identity is " + player3.secret + " , Your Status is " + player3.status);
    $('#player4Affiliation').text("Your Party Afiiliation is " + player4.party + " , Your Secret Identity is " + player4.secret + " , Your Status is " + player4.status);
    $('#player5Affiliation').text("Your Party Afiiliation is " + player5.party + " , Your Secret Identity is " + player5.secret + " , Your Status is " + player5.status);
    if (game.players === 6) {
      $('#player6Affiliation').text("Your Party Afiiliation is " + player6.party + " , Your Secret Identity is " + player6.secret + " , Your Status is " + player6.status);
    }
  }
  //affiliation button needs object information from backend//


  $("#player1Btn").click(function(event) {
    event.preventDefault();
    console.log(player1.party);
    $('#player1Affiliation').toggle();
  });

  $("#player2Btn").click(function(event) {
    event.preventDefault();
    $('#player2Affiliation').toggle();
  });

  $("#player3Btn").click(function(event) {
    event.preventDefault();
    $('#player3Affiliation').toggle();
  });

  $("#player4Btn").click(function(event) {
    event.preventDefault();
    $('#player4Affiliation').toggle();
  });

  $("#player5Btn").click(function(event) {
    event.preventDefault();
    $('#player5Affiliation').toggle();
  });

  $("#player6Btn").click(function(event) {
    event.preventDefault();
    $('#player6Affiliation').toggle();
  });

  $("button#audioPlay").click(function() {
    $(".affiliationCheck").hide();
    $(".audio").show();
    audioInstructions.play();
  });

  $("button#audioDone").click(function() {
    $(".selectChancellor").show();
    $('.audio').hide();
    $(".nameButton").prop("disabled", false);

    for ( let i = 0; i < game.playerOrder.length; i++){
      if (game.playerOrder[i].status === 'Previous Power' || game.playerOrder[i].status === 'President') {
        console.log(game.playerOrder[i].playerNumber);
        let newVar = (game.playerOrder[i].playerNumber + "Name");
        console.log(newVar);
        $("#" + newVar).parent().prop('disabled', true);
      }
    }
    $(".liberalBoard").show();
    $(".fascistBoard").show();

  });

  $("body").on("click", "button.nameButton", function(e) {
    event.preventDefault();
    console.log($(this));
    let mouse = $(this).parent();
    elector = (mouse[0].className);
    console.log(elector);
    console.log(game.playerOrder);
    for (let i = 0; i < game.playerOrder.length; i++) {
      if (elector === game.playerOrder[i].playerNumber) {
        chancellor = game.playerOrder[i];
        console.log(chancellor);
        game.playerOrder[i].nominateChancellor();
        playerTextUpdate();
        $(".nameButton").prop("disabled", true);
        $(".selectChancellor").hide();
        $('.voteButton').show();
        $('input.voteRadio').prop('disabled', false);
        console.log(game.playerOrder);
      }
    }

  });

  $("body").on("click", "button.shoot", function(e) {
    event.preventDefault();
    console.log('shoot clicked');
    let mouse = $(this).parent();
    console.log(mouse);
    shooter = (mouse[0].className);
    for (let i = 0; i < game.playerOrder.length; i++) {
      if (shooter === game.playerOrder[i].playerNumber) {
        let deadGuy = game.playerOrder[i];
        console.log(shooter);
        console.log(game.playerOrder[i]);
        console.log(game.playerOrder[i].secret);
        if (game.playerOrder[i].secret === "Hitler") {
          $(".liberalKillWin").show();
          $(".gameGrid").hide();
        } else {
          console.log(shooter);
          $("." + shooter).hide();
          deadGuy.shootPlayer(game);
          console.log(game.playerOrder);
          updatePoliciesTotal();


        }
      }
    }

    $("button.shoot").addClass("nameButton");
    $("button.nameButton").removeClass("shoot");
    $(".nameButton").prop("disabled", true);
    $(".nextRound").show();
    $(".killFirstPlayer").hide();
    $(".killSecondPlayer").hide();
    $(".voteButton").hide()

  });


  $('#voteTally').click(function() {
    let numberArray = [];
    let vote1 = $('input[name=voteResponse1]:checked').val();
    let vote2 = $('input[name=voteResponse2]:checked').val();
    let vote3 = $('input[name=voteResponse3]:checked').val();
    let vote4 = $('input[name=voteResponse4]:checked').val();
    let vote5 = $('input[name=voteResponse5]:checked').val();
    let vote6 = $('input[name=voteResponse6]:checked').val();
    let voteArray = [vote1, vote2, vote3, vote4, vote5, vote6];
    voteArray.forEach(function(number){
      numberArray.push(parseInt(number));
    });
    for (let i = 0; i < numberArray.length; i++) {
      if (isNaN(numberArray[i])) {
        numberArray.splice(i,1);
        voteArray.splice(i,1);
      }

    }
    console.log(numberArray);
    function voteSum(numberArray) {
      return numberArray.reduce(function(a,b){
        return a + b
      },0);
    }
    let voteTotal = voteSum(numberArray);
    console.log(voteTotal);
    game.totalYesVote = voteTotal;
    console.log(game.totalYesVote);
    if (game.playerOrder.length !== voteArray.length) {
      alert("Please make sure all players have voted.")
    } else {
      chancellor.voteHandle(game);
      if (chancellor.status === "Chancellor") {
        chancellorWin();
        $(".presidentPolicyCheck").show();
        $('.voteButton').hide();
        $('input.voteRadio').prop('checked', false);
        $('input.voteRadio').prop('disabled', true);
        console.log(game.playerOrder);
        playerTextUpdate();
      } else {
        boardLoad();
        console.log(game.executiveActionsTaken);
        console.log(game.fascistPolicies);
        // if (game.electionTracker === 3) {
        //   console.log(game.electionTracker);
        //   game.electionTracker = 0;
        //   $(".chaos").show();
        //   // if (game.executiveActionsTaken === 0 && game.fascistPolicies === 3){
        //   //   game.lookTop3()
        //   //   $(".executiveAction").show();
        //   //   $(".killFirstPlayer").hide();
        //   //   $(".killSecondPlayer").hide();
        //   //   $(".topThreeCheck").show();
        //   //   $(".chaos").hide();
        //   //   $(".newRound").hide();
        //   //   $('.voteButton').hide();
        //   //   $("#fascistPoliciesTotal").text(game.fascistPolicies)
        //   //   $("#liberalPoliciesTotal").text(game.liberalPolicies)
        //   // }
        // } else {
          $(".newRound").show();
          $("#electionsFailed").text(game.electionTracker);
          console.log(game.electionTracker);
          $(".chaos").hide();
          console.log(game.playerOrder);
          $('input.voteRadio').prop('checked', false);
          $('input.voteRadio').prop('disabled', true);
          $('.voteButton').hide();
        // }

      }
    }


  })

  $('button#newRound').click(function() {
    $(".chaos").hide();
    $(".newRound").hide();
    $('.selectChancellor').show();
    game.endOfRound();
    playerTextUpdate();
    $(".nameButton").prop("disabled", false);
    console.log(game.playerOrder);
    for ( let i = 0; i < game.playerOrder.length; i++){
      if (game.playerOrder[i].status === 'Previous Power' || game.playerOrder[i].status === 'President') {
        console.log(game.playerOrder[i].playerNumber);
        let newVar = (game.playerOrder[i].playerNumber + "Name");
        console.log(newVar);
        $("#" + newVar).parent().prop('disabled', true);
      }
    }
  })


  $("button#presidentVerifyButton").click(function() {
    $(".presidentPolicyCheck").hide();
    $(".presidentPolicyElimination").show();
    game.shuffleDeck();
    game.drawThreeCards();
    console.log(game.drawnCardsArray);
    console.log(game.drawnCardsArray[0]);
    if (game.drawnCardsArray[0].includes('f')) {
      $("#presidentPolicy1").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2059%20PM.jpg')
    }else if (game.drawnCardsArray[0].includes('l')) {
      $("#presidentPolicy1").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2024%20PM.jpg')
    }
    if (game.drawnCardsArray[1].includes('f')) {
      $("#presidentPolicy2").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2059%20PM.jpg')
    }else if (game.drawnCardsArray[1].includes('l')) {
      $("#presidentPolicy2").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2024%20PM.jpg')
    }
    if (game.drawnCardsArray[2].includes('f')) {
      $("#presidentPolicy3").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2059%20PM.jpg')
    }else if (game.drawnCardsArray[2].includes('l')) {
      $("#presidentPolicy3").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2024%20PM.jpg')
    }
    $("form.presidentPolicyForm input").prop("checked", false);
    $("form.chancellorPolicyForm input").prop("checked", false);
  });


  $("form.presidentPolicyForm input").click(function() {
    delete1 = $(this).next().hide();
    console.log($(this));
    let badCard = $("#" + $(this).next()[0].id);
    discardArray.push(badCard.text());
    console.log(discardArray);
    console.log(badCard);
    //This was with Travis' help, to get the info for the selected radio to be removed STILL NEED TO FIGURE OUT REMOVAL AND CHANCELLOR ROUND.//
    if (badCard.index() === 1) {
      game.drawnCardsArray.splice(0, 1);
    } else if (badCard.index() === 3) {
      game.drawnCardsArray.splice(1, 1);
    } else {
      game.drawnCardsArray.splice(2, 1);
    }
    console.log(discardArray);
    $(".presidentPolicyElimination").hide();
    $(".chancellorPolicyCheck").show();

  });

  function boardLoad() {
    if(game.liberalPolicies === 1) {
      $(".firstLib").show();
    } else if (game.liberalPolicies === 2) {
      $(".secondLib").show();
    } else if (game.liberalPolicies === 3) {
      $(".thirdLib").show();
    } else if (game.liberalPolicies === 4) {
      $(".fourthLib").show();
    } else if(game.liberalPolicies === 5) {
      $(".fifthLib").show();
    }
    if(game.fascistPolicies === 1) {
      $(".firstFas").show();
    } else if (game.fascistPolicies === 2) {
      $(".secondFas").show();
    } else if (game.fascistPolicies === 3) {
      $(".thirdFas").show();
    } else if (game.fascistPolicies === 4) {
      $(".fourthFas").show();
    } else if(game.fascistPolicies === 5) {
      $(".fifthFas").show();
    } else if(game.fascistPolicies === 6) {
      $(".sixthFas").show();
    }

  }

  $("#chancellorVerifyButton").click(function() {
    console.log(game.drawnCardsArray);
    if (game.drawnCardsArray[0].includes('f')) {
      $("#chancellorPolicy1").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2059%20PM.jpg')
    }else if (game.drawnCardsArray[0].includes('l')) {
      $("#chancellorPolicy1").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2024%20PM.jpg')
    }
    if (game.drawnCardsArray[1].includes('f')) {
      $("#chancellorPolicy2").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2059%20PM.jpg')
    }else if (game.drawnCardsArray[1].includes('l')) {
      $("#chancellorPolicy2").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2024%20PM.jpg')
    }
    $(".chancellorPolicyCheck").hide();
    $(".chancellorPolicyElimination").show();
  });

  $("form.chancellorPolicyForm input").click(function() {
    delete2 = $(this).next().hide();
    let badCard = $("#" + $(this).next()[0].id);
    discardArray.push(badCard.text());
    if (badCard.index() === 1) {
      game.drawnCardsArray.splice(0, 1);
    } else {
      game.drawnCardsArray.splice(1, 1);
    }
    game.cardPlayedOnBoard();
    boardLoad();
    $(".nextRound").show();
    $(".chancellorPolicyElimination").hide();
    if (game.fascistPolicies === 3) {
      if (game.executiveActionsTaken === 1) {
        $(".nextRound").show();
        //THIS IS WHERE WE SHOW THE CARD ON THE BOARD///
        updatePoliciesTotal();
      }else {
        $(".voteButton").hide();
        $(".nextRound").hide();
        $(".executiveAction").show();
        top3Peak();
      }
    }else if (game.fascistPolicies === 4) {
      if (game.executiveActionsTaken === 2) {
        $(".nextRound").show();
        //THIS IS WHERE WE SHOW THE CARD ON THE BOARD///
        updatePoliciesTotal();

      }else {
        $("button.nameButton").addClass("shoot");
        $("button.shoot").removeClass("nameButton");
        $(".voteButton").hide();
        $(".nextRound").hide();
        $(".executiveAction").show();
        shootFirstPlayer();

      }
    }else if (game.fascistPolicies === 5) {
      if (game.executiveActionsTaken === 3) {
        $(".nextRound").show();
        //THIS IS WHERE WE SHOW THE CARD ON THE BOARD///
        updatePoliciesTotal();

      }else {
        console.log('should meet 5 eah');
        $("button.nameButton").addClass("shoot");
        $("button.shoot").removeClass("nameButton");
        $(".voteButton").hide();
        $(".nextRound").hide();
        $(".executiveAction").show();
        shootSecondPlayer();
      }
    }
    updatePoliciesTotal();
    playerTextUpdate();

    winCheck();
  });

  $("button#nextRound").click(function() {
    game.endOfRound();
    $('.selectChancellor').show();
    $(".nextRound").hide();
    playerTextUpdate();
    delete1.show();
    delete2.show();
    $(".nameButton").prop("disabled", false);
    console.log(game.playerOrder);
    for ( let i = 0; i < game.playerOrder.length; i++){
      if (game.playerOrder[i].status === 'Previous Power' || game.playerOrder[i].status === 'President') {
        console.log(game.playerOrder[i].playerNumber);
        let newVar = (game.playerOrder[i].playerNumber + "Name");
        console.log(newVar);
        $("#" + newVar).parent().prop('disabled', true);
      }
    }
  });


  function chancellorWin() {
    if(game.fascistPolicies >= 3 && chancellor.secret === 'Hitler'){
      $(".gameGrid").hide();
      $(".fascistHitlerWin").show();
    }
  }

  function winCheck(){
    //MAYBE SPLIT UP

    if (game.hitler.status === 'Dead') {
      $(".gameGrid").hide();
      $(".liberalKillWin").show();
    }else if (game.fascistPolicies === 6) {
      $(".gameGrid").hide();
      $(".fascistBoardWin").show();
    }else if (game.liberalPolicies === 5) {
      $(".gameGrid").hide();
      $(".liberalBoardWin").show();

    }
  }
  $("button#executivePolicyCheck").click(function(){
    if (game.drawnCardsArray[0].includes('f')) {
      $("#policy1").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2059%20PM.jpg')
    }else if (game.drawnCardsArray[0].includes('l')) {
      $("#policy1").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2024%20PM.jpg')
    }
    if (game.drawnCardsArray[1].includes('f')) {
      $("#policy2").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2059%20PM.jpg')
    }else if (game.drawnCardsArray[1].includes('l')) {
      $("#policy2").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2024%20PM.jpg')
    }
    if (game.drawnCardsArray[2].includes('f')) {
      $("#policy3").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2059%20PM.jpg')
    }else if (game.drawnCardsArray[2].includes('l')) {
      $("#policy3").attr('src','https://raw.githubusercontent.com/Saul-Ordonez/secret-hitler/master/media/Photo%20Dec%2004%2C%2012%2016%2024%20PM.jpg')
    }
    $("#closeTopThree").show();
  })
  $("button#closeTopThree").click(function(){
    $('.executiveAction').hide();
    $('.nextRound').show();
  })
  function top3Peak(){
    console.log('3 fasc branch');
    game.lookTop3();
    $(".executiveAction").show()
    $('.nextRound').hide();
    $('.newRound').hide();
    $('.killFirstPlayer').hide();
    $('.killSecondPlayer').hide();
    game.executiveActionsTaken ++;

  }
  $("#cheatButton").click(function(){
    game.fascistPolicies ++
  })

  //    SOME MORE SHOWING/HIDING NEEDS TO BE DONE BUT I THINK THIS WORKS FOR THE MOST PART
  function shootFirstPlayer(){
    console.log(game.playerOrder);
    $(".shoot").prop("disabled", false);
    let newVar = (game.playerOrder[0].playerNumber + "Name");
    console.log(newVar);
    $("#" + newVar).parent().prop('disabled', true);

    $('.nextRound').hide();
    $('.newRound').hide();
    $(".topThreeCheck").hide();
    $('.killFirstPlayer').show();
    $('.killSecondPlayer').hide();
    game.executiveActionsTaken ++;
    //DOESNT WORK AFFECTS OTHER PARTS OF THE GAME
  }
  function shootSecondPlayer(){
    $(".shoot").prop("disabled", false);
    let newVar = (game.playerOrder[0].playerNumber + "Name");
    console.log(newVar);
    $("#" + newVar).parent().prop('disabled', true);

    $('.nextRound').hide();
    $('.newRound').hide();
    $(".topThreeCheck").hide();
    $('.killFirstPlayer').hide();
    $('.killSecondPlayer').show();
    game.executiveActionsTaken ++;
  }
function updatePoliciesTotal (){
  $("#fascistPoliciesTotal").text(game.fascistPolicies)
  $("#liberalPoliciesTotal").text(game.liberalPolicies)
}




});
