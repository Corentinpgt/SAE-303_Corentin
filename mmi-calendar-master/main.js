import { M } from "./js/model.js";
import { V } from "./js/view.js";
import { Events } from "./js/model.js";
import { EventManager } from "./js/class/event-manager.js";







await M.init();

let C = {};

if(window.innerWidth <= 768){
   V.uicalendar.changeView("day");
}
else {
   V.uicalendar.changeView("week");
}



let tableMmi = [...M.getEvents("mmi1"),...M.getEvents("mmi2"),...M.getEvents("mmi3")];




// IT 3 --------------------

for (let ev of tableMmi) {
   ev.backgroundColor = V.colorMap[ev.calendarId][ev.type];
}

let evt1 = [];
let evt2 = [];
let evt3 = [];
   
   
tableMmi.forEach(event => {
   if (event.calendarId == "mmi1") {
      evt1.push(event);
   }
   else if (event.calendarId == "mmi2") {
      evt2.push(event);
   }
   else if (event.calendarId == "mmi3") {
      evt3.push(event);
   }
});







// IT 2 --------------------




let nav = document.querySelector("nav");

C.handlerNav = function(ev) {
   
   
   if (ev.target.dataset.id == "left") {
      V.uicalendar.move(-1);
   }
   else if (ev.target.dataset.id == "mid") {
      V.uicalendar.today();
   }
   else if (ev.target.dataset.id == "right") {
      V.uicalendar.move(1);
   }
}

nav.addEventListener("click",C.handlerNav);



// IT 4 --------------------


// Affichage des événements en fonction des années choisies 

let check = document.querySelector(".checkbox");

C.handlerCheck = function() {
   
   
   let searchValue = document.getElementById("searchbar").value.toLowerCase();
   let options = document.getElementById("selectmmi").children;
   let mmi = [document.getElementById("mmi1"), document.getElementById("mmi2"), document.getElementById("mmi3")]
   let evt = [evt1,evt2,evt3];
   
   if (searchValue=="") {

      V.uicalendar.clear();
   
      V.uicalendar.createEvents( evt1 );
      V.uicalendar.createEvents( evt2 );
      V.uicalendar.createEvents( evt3 );

   

      for (let i = 0; i < mmi.length; i++) {
         let but = "BUT"+(i+1);
         if ( mmi[i].checked ) {
            V.uicalendar.setCalendarVisibility(evt[i][0].calendarId, true);
            // affichage dynamique des options du selecteur de groupe
            for (let opt of options) {
               if (opt.value.includes(but)) {
                  opt.style.display = "block";
               }
            }
         }
         else {
            V.uicalendar.setCalendarVisibility(evt[i][0].calendarId, false);
            for (let opt of options) {
               if (opt.value.includes(but)) {
                  opt.style.display = "none";
               }
            }
         }
      }
   }

   else {

      let resultSearch = [];
      for (let i = 0; i < mmi.length; i++) {
         let but = "BUT"+(i+1);
         if (mmi[i].checked) {
            evt[i].forEach(event => {
               if (event.location.toLowerCase()==searchValue || event.title.toLowerCase().includes(searchValue)) {
                  resultSearch.push(event)
               }
            });
            for (let opt of options) {
               if (opt.value.includes(but)) {
                  opt.style.display = "block";
               }
            } 
         }
         else {
            for (let opt of options) {
               if (opt.value.includes(but)) {
                  opt.style.display = "none";
               }
            }
         }
         
      }
      
      V.uicalendar.clear();
      V.uicalendar.createEvents( resultSearch );
      resultSearch=[];
   }
   setStorageCheck();
   
   
}


check.addEventListener("change",C.handlerCheck);




// IT 5 --------------------



let select = document.querySelector("#selectmmi");



C.handlerSelect = function() {
   let mmi = [document.getElementById("mmi1"), document.getElementById("mmi2"), document.getElementById("mmi3")]

   let selectMmiValue = document.getElementById("selectmmi").value;
   
   let eventFiltered = [];

   // enlève le filtrage par groupe
   if (selectMmiValue == "none") {
      C.handlerCheck();
   }
   else {
      eventFiltered = tableMmi.filter(event => event.groups.includes(selectMmiValue));

      // Quand un groupe est sélectionné, uncheck toutes les checkbox
      mmi.forEach(check => {
         if ( check.checked) {
            check.click();
         }
      });

      V.uicalendar.clear();
   
      V.uicalendar.createEvents( eventFiltered );
   }

   


   setStorageSelect();

}


select.addEventListener("change",C.handlerSelect);



// IT 6 et 7 --------------------




let searchbtn = document.getElementById("searchbtn");


C.handlerSearch = function() {
   let mmi = [document.getElementById("mmi1"), document.getElementById("mmi2"), document.getElementById("mmi3")]

   let value = document.getElementById("searchbar").value.toLowerCase();
   let multiple = value.split(" ");
   let newSearchEvent = tableMmi.filter(event => multiple.every(recherche => event.title.toLowerCase().includes(recherche) || event.location.toLowerCase().includes(recherche)));

   mmi.forEach(check => {
      if ( check.checked) {
         check.click();
      }
   });
   
   V.uicalendar.clear();
   V.uicalendar.createEvents(newSearchEvent);

}


searchbtn.addEventListener("click",C.handlerSearch);





// IT 8 --------------------

let btnView = document.querySelector(".view");


C.handlerView = function(ev) {
   let btnId = ev.target.dataset.id;
   if (btnId == "day") {
      V.uicalendar.changeView("day");
   }
   else if (btnId == "week") {
      V.uicalendar.changeView("week");
   }
   else if (btnId == "month") {
      V.uicalendar.changeView("month");
   }
}


btnView.addEventListener("click",C.handlerView);






// IT 10 --------------------





let setStorageCheck = function() {
   
   let mmi = [document.getElementById("mmi1"), document.getElementById("mmi2"), document.getElementById("mmi3")]
   
   localStorage.setItem("CheckBox1",mmi[0].checked);
   localStorage.setItem("CheckBox2",mmi[1].checked);
   localStorage.setItem("CheckBox3",mmi[2].checked);
   
}

let setStorageSelect = function() {
   
   localStorage.setItem("Options",document.getElementById("selectmmi").value)
   
}

let getStorage = function() {

   V.uicalendar.clear()
   
   let mmi = [document.getElementById("mmi1"), document.getElementById("mmi2"), document.getElementById("mmi3")]

   let check = [localStorage.getItem("CheckBox1"), localStorage.getItem("CheckBox2"), localStorage.getItem("CheckBox3")]

   let evt = [evt1,evt2,evt3];

   let options = localStorage.getItem("Options");

   for (let i = 0; i < check.length; i++) {
      
      if (check[i] == "true") {
   
         V.uicalendar.createEvents( evt[i] );
   
         if (mmi[i].checked==false) {
            mmi[i].click();
         }
      }
      else {
         if (mmi[i].checked) {
            mmi[i].click();
         }
      }
      
   }


   let eventFiltered = [];


   if (options == "none") {
      C.handlerCheck();
   }
   else {
      eventFiltered = tableMmi.filter(event => event.groups.includes(options));
      
      mmi.forEach(check => {
         if ( check.checked) {
            check.click();
         }
      });

      V.uicalendar.clear();
   
      V.uicalendar.createEvents( eventFiltered );
   }
   
}


getStorage();
