import { M } from "./js/model.js";
import { V } from "./js/view.js";
import { Events } from "./js/model.js";
import { EventManager } from "./js/class/event-manager.js";

/*
   Ce fichier correspond au contrôleur de l'application. Il est chargé de faire le lien entre le modèle et la vue.
   Le modèle et la vue sont définis dans les fichiers js/model.js et js/view.js et importés (M et V, parties "publiques") dans ce fichier.
   Le modèle contient les données (les événements des 3 années de MMI).
   La vue contient tout ce qui est propre à l'interface et en particulier le composant Toast UI Calendar.
   Le principe sera toujours le même : le contrôleur va récupérer les données du modèle et les passer à la vue.
   Toute opération de filtrage des données devra être définie dans le modèle.
   Et en fonction des actions de l'utilisateur, le contrôleur pourra demander au modèle de lui retourner des données filtrées
   pour ensuite les passer à la vue pour affichage.

   Exception : Afficher 1, 2 ou les 3 années de formation sans autre filtrage peut être géré uniquement au niveau de la vue.
*/
   

// loadind data (and wait for it !)
await M.init();

// sample events for testing
// let edt = [
//   {
//     id: '1',
//     calendarId: '1',
//     title: 'my event',
//     category: 'time',
//     start: '2023-12-11T08:30:00',
//     end: '2023-12-11T10:30:00',
//   },
//   {
//     id: '2',
//     calendarId: '1',
//     title: 'second event',
//     category: 'time',
//     start: '2023-12-13T14:00:00',
//     end: '2023-12-13T15:30:00',
//   },
// ]
let C = {};
V.uicalendar.createEvents( M.getEvents("mmi1") );
V.uicalendar.createEvents( M.getEvents("mmi2") );
V.uicalendar.createEvents( M.getEvents("mmi3") );

let event1 = M.getEvents("mmi1");
let event2 = M.getEvents("mmi2");
let event3 = M.getEvents("mmi3");

V.uicalendar.setCalendarVisibility(event1[0].calendarId, 0);
V.uicalendar.setCalendarVisibility(event2[0].calendarId, 0);
V.uicalendar.setCalendarVisibility(event3[0].calendarId, 0);







let select = document.querySelector("#selectmmi");

C.handlerSelect = function() {
   let selectMmiValue = document.getElementById("selectmmi").value;

   let changes = {};
   event1.forEach(event => {

      if (event.groups.includes(selectMmiValue)) {
         changes.isVisible=true;
      }
      else {
         changes.isVisible=false;
      }   
      V.uicalendar.updateEvent(event.id, event.calendarId, changes);
   });

   event2.forEach(event => {

      if (event.groups.includes(selectMmiValue)) {
         changes.isVisible=true;
      }
      else {
         changes.isVisible=false;
      }   
      V.uicalendar.updateEvent(event.id, event.calendarId, changes);
   });

   event3.forEach(event => {

      if (event.groups.includes(selectMmiValue)) {
         changes.isVisible=true;
      }
      else {
         changes.isVisible=false;
      }   
      V.uicalendar.updateEvent(event.id, event.calendarId, changes);
   });



}


select.addEventListener("change",C.handlerSelect);






let check = document.querySelector(".checkbox");

C.handlerCheck = function() {

   let options = document.getElementById("selectmmi").children;


   let mmi1 = document.getElementById("mmi1");
   let mmi2 = document.getElementById("mmi2");
   let mmi3 = document.getElementById("mmi3");
   
   if (mmi1.checked) {
      V.uicalendar.setCalendarVisibility(event1[0].calendarId, 1);
      for (let opt of options) {
         if (opt.value.includes("BUT1")) {
            opt.style.display = "block";
         }
      }
   }
   else {
      V.uicalendar.setCalendarVisibility(event1[0].calendarId, 0);
      for (let opt of options) {
         if (opt.value.includes("BUT1")) {
            opt.style.display = "none";
         }
      }
   }
   
   if (mmi2.checked) {
      V.uicalendar.setCalendarVisibility(event2[0].calendarId, 1);
      for (let opt of options) {
         if (opt.value.includes("BUT2")) {
            opt.style.display = "block";
         }
      }
   }
   else {
      V.uicalendar.setCalendarVisibility(event2[0].calendarId, 0);
      for (let opt of options) {
         if (opt.value.includes("BUT2")) {
            opt.style.display = "none";
         }
      }
   }
   
   if (mmi3.checked) {
      V.uicalendar.setCalendarVisibility(event3[0].calendarId, 1);
      for (let opt of options) {
         if (opt.value.includes("BUT3")) {
            opt.style.display = "block";
         }
      }
   }
   else {
      V.uicalendar.setCalendarVisibility(event3[0].calendarId, 0);
      for (let opt of options) {
         if (opt.value.includes("BUT3")) {
            opt.style.display = "none";
         }
      }
   }
}


check.addEventListener("change",C.handlerCheck);






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




let changes = {};

event1.forEach(evnt => {
   if (evnt.title.includes("CM")) {
      changes.backgroundColor = "#751a2c";
   }
   else if (evnt.title.includes("TD")) {
      changes.backgroundColor = "#b33a3a";
   }
   else if (evnt.title.includes("TP")) {
      changes.backgroundColor = "#d57056";
   }
   else {
      changes.backgroundColor = "#751a2c";
   }
   V.uicalendar.updateEvent(evnt.id, evnt.calendarId, changes);

});

event2.forEach(evnt => {
   if (evnt.title.includes("CM")) {
      changes.backgroundColor = "#344C11";
   }
   else if (evnt.title.includes("TD")) {
      changes.backgroundColor = "#778D45";
   }
   else if (evnt.title.includes("TP")) {
      changes.backgroundColor = "#AEC670";
   }
   else {
      changes.backgroundColor = "#344C11";
   }
   V.uicalendar.updateEvent(evnt.id, evnt.calendarId, changes);

});

event3.forEach(evnt => {
   if (evnt.title.includes("CM")) {
      changes.backgroundColor = "#036280";
   }
   else if (evnt.title.includes("TD")) {
      changes.backgroundColor = "#378BA4";
   }
   else if (evnt.title.includes("TP")) {
      changes.backgroundColor = "#81BECE";
   }
   else {
      changes.backgroundColor = "#036280";
   }
   V.uicalendar.updateEvent(evnt.id, evnt.calendarId, changes);

});





let searchbtn = document.getElementById("searchbtn");


C.handlerSearch = function(ev) {
   let value = document.getElementById("searchbar").value;
   let changes = {};
   event1.forEach(event => {
      if (event.location==value || event.title.includes(value)) {
         changes.isVisible=true;
      }
      else {
         changes.isVisible=false;
      }
      V.uicalendar.updateEvent(event.id, event.calendarId, changes);
   });

   event2.forEach(event => {
      if (event.location==value || event.title.includes(value)) {
         changes.isVisible=true;
      }
      else {
         changes.isVisible=false;
      }
      V.uicalendar.updateEvent(event.id, event.calendarId, changes);
   });

   event3.forEach(event => {
      if (event.location==value || event.title.includes(value)) {
         changes.isVisible=true;
      }
      else {
         changes.isVisible=false;
      }
      V.uicalendar.updateEvent(event.id, event.calendarId, changes);
   });
}


searchbtn.addEventListener("click",C.handlerSearch);

