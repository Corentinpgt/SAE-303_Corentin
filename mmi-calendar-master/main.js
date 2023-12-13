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

let C = {};

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


V.uicalendar.createEvents( evt1 );
V.uicalendar.createEvents( evt2 );
V.uicalendar.createEvents( evt3 );
V.uicalendar.setCalendarVisibility(evt1[0].calendarId, false);
V.uicalendar.setCalendarVisibility(evt3[0].calendarId, false);





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




let check = document.querySelector(".checkbox");

C.handlerCheck = function() {
   
   V.uicalendar.clear();
   
   

   V.uicalendar.createEvents( evt1 );
   V.uicalendar.createEvents( evt2 );
   V.uicalendar.createEvents( evt3 );
   V.uicalendar.setCalendarVisibility(evt1[0].calendarId, false);
   V.uicalendar.setCalendarVisibility(evt3[0].calendarId, false);


   let options = document.getElementById("selectmmi").children;

   let mmi = [document.getElementById("mmi1"), document.getElementById("mmi2"), document.getElementById("mmi3")]

   if (mmi[0].checked) {
      V.uicalendar.setCalendarVisibility(evt1[0].calendarId, true);
      for (let opt of options) {
         if (opt.value.includes("BUT1")) {
            opt.style.display = "block";
         }
      }
   }
   else if (mmi[0].checked==false) {
      V.uicalendar.setCalendarVisibility(evt1[0].calendarId, false);
      for (let opt of options) {
         if (opt.value.includes("BUT1")) {
            opt.style.display = "none";
         }
      }
   }

   if (mmi[1].checked) {
      V.uicalendar.setCalendarVisibility(evt2[0].calendarId, true);
      for (let opt of options) {
         if (opt.value.includes("BUT2")) {
            opt.style.display = "block";
         }
      }
   }
   else if (mmi[1].checked==false) {
      V.uicalendar.setCalendarVisibility(evt2[0].calendarId, false);
      for (let opt of options) {
         if (opt.value.includes("BUT2")) {
            opt.style.display = "none";
         }
      }
   }

   if (mmi[2].checked) {
      V.uicalendar.setCalendarVisibility(evt3[0].calendarId, true);
      for (let opt of options) {
         if (opt.value.includes("BUT3")) {
            opt.style.display = "block";
         }
      }
   }
   else if (mmi[2].checked==false) {
      V.uicalendar.setCalendarVisibility(evt3[0].calendarId, false);
      for (let opt of options) {
         if (opt.value.includes("BUT3")) {
            opt.style.display = "none";
         }
      }
   }
   
}


check.addEventListener("change",C.handlerCheck);




// IT 5 --------------------



let select = document.querySelector("#selectmmi");



C.handlerSelect = function() {
   let selectMmiValue = document.getElementById("selectmmi").value;

   let eventFiltered = tableMmi.filter(event => event.groups.includes(selectMmiValue));

   V.uicalendar.clear();

   V.uicalendar.createEvents( eventFiltered );

}


select.addEventListener("change",C.handlerSelect);



// IT 6 --------------------




let searchbtn = document.getElementById("searchbtn");


C.handlerSearch = function(ev) {
   let value = document.getElementById("searchbar").value;
   let newSearchEvent = [];
   tableMmi.forEach(event => {
      if (event.location==value || event.title.includes(value)) {
         newSearchEvent.push(event)
      }
   });
   V.uicalendar.clear();
   V.uicalendar.createEvents(newSearchEvent);

}


searchbtn.addEventListener("click",C.handlerSearch);
