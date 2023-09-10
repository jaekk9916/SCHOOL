"use strict";

/* global variables */
var images = [];
var currentIndex = 0;
var timeout;
// var imageListUrl = 'http://studentweb.cencol.ca/jjang35/comp125/imageList.txt';
var imageListUrl = 'https://github.com/jaekk9916/jaekk9916.github.io/tree/main/_posts/imageList.txt';


function rightArrow() {
   currentIndex++;
   if (currentIndex === images.length) {
      currentIndex = 0;
   }
   displayImage();
}

function leftArrow() {
   currentIndex--;
   if (currentIndex < 0) {
      currentIndex = images.length - 1;
   }
   displayImage();
}

function fetchImageList() {
   let xhr = new XMLHttpRequest();
   xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
         images = JSON.parse(xhr.responseText);
         displayImage();
      }
   };
   xhr.open('GET', imageListUrl, true);
   xhr.send();
}

function displayImage() {
   clearTimeout(timeout);

   let currentImage = images[currentIndex];
   let endIdx = parseInt(currentImage.file.indexOf('_') + 1);
   let fileName = currentImage.file.substring(0, endIdx);
   let duration = parseInt(currentImage.file.slice(-8).substring(0, 4));

   document.getElementById('fig3').children[0].src = fileName + (currentIndex + 1) + '_' + duration + '.jpg';
   timeout = setTimeout(function () {
      rightArrow();
   }, duration);
}

function updateImageList() {
   currentIndex = 0;
   fetchImageList();
}


function setUpPage() {
   document.getElementById('leftarrow').onclick = leftArrow;
   document.getElementById('rightarrow').onclick = rightArrow;

   let updateBtn = document.getElementById('updateButton');
   updateBtn.onclick = updateImageList;

   fetchImageList();
}

/* run setUpPage() function when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", setUpPage, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", setUpPage);
}
