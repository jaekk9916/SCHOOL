/*    JavaScript 6th Edition
 *    Chapter 5
 *    Chapter case

 *    Photo zoom
 *    Variables and functions
 *    Author: 
 *    Date:   

 *    Filename: zoom.js
 */

"use strict"; // interpret document contents in JavaScript strict mode
let figFilename = window.location.search.substring(1).split('=')[1];

/* global variables */
// var photoOrderArray = window.opener.photoOrder;

// var figFilename = "images/IMG_0" + photoOrderArray[2] + ".jpg";
function addToFavorite(){
    window.opener.postMessage(figFilename, '*');
}

/* populate img element and create event listener */
function pageSetup() {
    document.getElementsByTagName('img')[0].src = figFilename; // assign filename to img element
    document.getElementsByTagName('img')[0].style.marginTop = '3%';
    document.getElementById('close').addEventListener('click', function(){
        window.close();
    });

    document.getElementById('favorite').addEventListener('click', addToFavorite);

    window.addEventListener('message', function(event){
        let imgObj = document.createElement('img');
        imgObj.src = event.data;
        imgObj.style.width = '200px';
        document.getElementById('divFav').appendChild(imgObj);
    });
}

/* add img src value and create event listener when page finishes loading */
window.onload = pageSetup;
