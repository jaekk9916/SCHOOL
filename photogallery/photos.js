/*    JavaScript 6th Edition
 *    Chapter 5
 *    Chapter case

 *    Photo gallery
 *    Variables and functions
 *    Author: Jaekyeong Jang
 *    Date:   Tue. 02.26.2023

 *    Filename: photos.js
 */

"use strict"; // interpret document contents in JavaScript strict mode

/* global variables */
var photoOrder = [1,2,3,4,5];

/* shift all images one figure to the left, and change values in photoOrder array to match  */
function rightArrow() {
   for(let i = 0; i < 5; i++) {
      if ((photoOrder[i] + 1) === 6) {
         photoOrder[i] = 1;
      } else {
         photoOrder[i] += 1;
      }
      populateFigures();
   }
}

/* shift all images one figure to the right, and change values in photoOrder array to match  */
function leftArrow() {
   for (let i = 0; i < 5; i++) {
      if ((photoOrder[i] - 1) === 0) {
         photoOrder[i] = 5;
      } else {
         photoOrder[i] -= 1;
      }
      populateFigures();
   }
}

/* open center figure in separate window */
function zoomFig() {
   let obj = document.getElementById('fig3').children[0];
   let child = window.open('zoom.htm?src='+obj.src,'new','width=1080,height=700');
}

/* create event listeners and populate image elements */
function setUpPage() {
   createEventListeners();
   populateFigures();
}

function chkFav5(){
   let chk = Boolean(false);
   let parentObj = document.getElementById('divFav');
   if(parentObj.hasChildNodes() && parentObj.childNodes.length == 5){
      chk = Boolean(true);
   }

   return chk;
}

// add img To favorite Area
function addToFavorite(event){
   if(chkFav5()){
      window.alert('You cannot add five pictures to Favorite Area');
      return;
   }

   let parentObj = document.getElementById('divFav');
   if(!parentObj.hasChildNodes()){
      let pObj = document.querySelector('footer').getElementsByTagName('p')[0];

      pObj.style.fontSize = '3em';
      pObj.style.marginBottom = '0.5em';
      pObj.style.visibility = 'visible';
   }

   let divObj = document.createElement('div');

   // add img
   let imgObj = document.createElement('img');
   imgObj.src = event.data;
   imgObj.style.width = '250px';

   let delBtn = document.createElement('button');
   delBtn.innerHTML = 'Delete Favorite';
   delBtn.style.visibility = 'hidden';
   delBtn.addEventListener('click', function(){
      parentObj.removeChild(divObj);
      if(document.getElementById('divFav').children.length == 0){
         visibleCheckFavorite(document.querySelector('footer').getElementsByTagName('p')[0]);
      }
   });

   // when the user clicks, delete button visible
   imgObj.addEventListener('click', function(){
      visibleCheckFavorite(delBtn);
   });

   divObj.appendChild(imgObj);
   divObj.appendChild(delBtn);
   document.getElementById('divFav').appendChild(divObj);
}

function populateFigures(){
   let figObj = document.getElementsByTagName('figure');
   for(let i=0;i<figObj.length;i++){
      figObj[i].children[0].src = 'images/IMG_0'+(photoOrder[i])+'.jpg';
   }
}

function visibleCheckFavorite(obj){
   if(obj.style.visibility === 'hidden'){
      obj.style.visibility = 'visible';
   } else {
      obj.style.visibility = 'hidden';
   }
}

function chgPicsNumber(){
   if(document.getElementsByTagName('figure').length == 5){
      document.getElementById('fig1').remove();
      document.getElementById('fig5').remove();

      document.getElementById('fiveButton').children[0].innerHTML = 'Show More images';

      rightArrow();
   } else {
      let newLeftImg = document.createElement('img');
      newLeftImg.width = 150;
      newLeftImg.height = 120;

      let newLeftfig = document.createElement('figure');
      newLeftfig.id = 'fig1';
      newLeftfig.appendChild(newLeftImg);

      let artObj = document.getElementsByTagName('article')[0];
      let fig2= document.getElementById('fig2');
      artObj.insertBefore(newLeftfig, fig2);

      let newRightImg = document.createElement('img');
      newRightImg.width = 150;
      newRightImg.height = 120;

      let newRightFig = document.createElement('figure');
      newRightFig.id = 'fig5';
      newRightFig.appendChild(newRightImg);

      let rightImg = document.getElementById('fig4');
      rightImg.after(newRightFig);

      document.getElementById('fiveButton').children[0].innerHTML = 'Show fewer images';

      leftArrow();
   }
}

function createEventListeners() {
   visibleCheckFavorite(document.querySelector('footer').getElementsByTagName('p')[0]);

   document.getElementById('fig3').onclick = zoomFig;
   document.getElementById('leftarrow').onclick = leftArrow;
   document.getElementById('rightarrow').onclick = rightArrow;

   window.addEventListener('message', addToFavorite);

   document.getElementById('fiveButton').onclick = chgPicsNumber;
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
  window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent)  {
  window.attachEvent("onload", setUpPage);
}