import { Game, Players } from  './backend.js';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';

const players = new Players();
const discardArray = [];


$(document).ready(function() {
  $(".liberalBoard").hide();
  $(".fascistBoard").hide();
  let game;
  let player1;
  let player2;
  let player3;
  let player4;
  let player5;
  let player6;
  let elector;
  let chancellor;

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
    game.assignParty();
    console.log(game.playerOrder);
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
    $('#player1Affiliation').text(player1.party + " " + player1.secret);
    $('#player2Affiliation').text(player2.party + " " + player2.secret);
    $('#player3Affiliation').text(player3.party + " " + player3.secret);
    $('#player4Affiliation').text(player4.party + " " + player4.secret);
    $('#player5Affiliation').text(player5.party + " " + player5.secret);
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
    $('#player1Affiliation').text(player1.party + " " + player1.secret);
    $('#player2Affiliation').text(player2.party + " " + player2.secret);
    $('#player3Affiliation').text(player3.party + " " + player3.secret);
    $('#player4Affiliation').text(player4.party + " " + player4.secret);
    $('#player5Affiliation').text(player5.party + " " + player5.secret);
    $('#player6Affiliation').text(player6.party + " " + player6.secret);
    console.log(game.playerOrder);
  });

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
    //AUDIO WOULD BE PROMPTED HERE!!!!!!!////
  });

  $("button#audioDone").click(function() {
    $(".selectChancellor").show();
    $('.audio').hide();
    $(".nameButton").prop("disabled", false);
    $(".liberalBoard").show();
    $(".fascistBoard").show();

  });

  $("button.nameButton").click(function(e) {
    event.preventDefault();
    console.log($(this));
    let mouse = $(this).parent();
    elector = (mouse[0].className);
    console.log(elector);

    for (let i = 0; i < game.playerOrder.length; i++) {
      if (elector === game.playerOrder[i].playerNumber) {
        chancellor = game.playerOrder[i];
        game.playerOrder[i].nominateChancellor();
      }
    }
    $(".nameButton").prop("disabled", true);
    $(".selectChancellor").hide();
    $('.voteButton').show();
    $('input.voteRadio').prop('disabled', false);
    players.nominateChancellor();
    console.log(game.playerOrder);
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
    if (isNaN(vote6)) {
      numberArray.pop();
      voteArray.pop();
    }
    console.log(numberArray);
    function voteSum(numberArray) {
      return numberArray.reduce(function(a,b){
        return a + b
      },0);
    }
    let voteTotal = voteSum(numberArray);
    console.log(voteSum(numberArray));
    game.totalYesVote = voteTotal;
    if (isNaN(voteTotal)) {
      alert("Please make sure all players have voted.")
    } else {
      $(".presidentPolicyCheck").show();
      $('.voteButton').hide();
      players.voteHandle(); //THIS IS WHERE game.playerOrder[i]. GOES//
      $('input.voteRadio').prop('checked', false);
      $('input.voteRadio').prop('disabled', true);
    }

  })


  $("button#presidentVerifyButton").click(function() {
    $(".presidentPolicyCheck").hide();
    $(".presidentPolicyElimination").show();
    game.shuffleDeck();
    game.drawThreeCards();
    console.log(game.drawnCardsArray[0]);
    $("#presidentPolicy1").text(game.drawnCardsArray[0]);
    $("#presidentPolicy2").text(game.drawnCardsArray[1]);
    $("#presidentPolicy3").text(game.drawnCardsArray[2]);
  });


  $("form.presidentPolicyForm input").click(function() {
    $(this).hide();
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

  $("#chancellorVerifyButton").click(function() {
    $("#chancellorPolicy1").text(game.drawnCardsArray[0]);
    $("#chancellorPolicy2").text(game.drawnCardsArray[1]);
    $(".chancellorPolicyCheck").hide();
    $(".chancellorPolicyElimination").show();
  });

  $("form.chancellorPolicyForm input").click(function() {
    $(this).hide();
    let badCard = $("#" + $(this).next()[0].id);
    discardArray.push(badCard.text());
    if (badCard.index() === 1) {
      game.drawnCardsArray.splice(0, 1);
    } else {
      game.drawnCardsArray.splice(1, 1);
    }
    game.cardPlayedOnBoard();
    $(".chancellorPolicyElimination").hide();
    //THIS IS WHERE WE SHOW THE CARD ON THE BOARD///
    $(".nextRound").show();
    $("#fascistPoliciesTotal").text(game.fascistPolicies)
    $("#liberalPoliciesTotal").text(game.liberalPolicies)
  });

  $("button#nextRound").click(function() {
    $('.selectChancellor').show();
    $(".nextRound").hide();
    game.endOfRound();
    console.log(game.playerOrder);
  });




});
