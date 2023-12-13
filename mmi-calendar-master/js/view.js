import Calendar from '@toast-ui/calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';

let V = {};

V.uicalendar = new Calendar('#calendar', {
  defaultView: 'week',
  isReadOnly: true,
  usageStatistics: false,
  useDetailPopup: true,
  week: {
    startDayOfWeek: 1,
    dayNames: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
    workweek: true,
    hourStart: 8,
    hourEnd: 20,
    taskView: false,
    eventView: ['time'],
  },
  template: {
    time: function(event) {
      return `<span style="color: white;">${event.title}</span>`;
    }
  },
 
 
});

V.colorMap = {
  "mmi1": {CM:"#751a2c",TD:"#b33a3a",TP:"#d57056",OTHER:"#751a2c"},
  "mmi2": {CM:"#344C11",TD:"#778D45",TP:"#AEC670",OTHER:"#344C11"},
  "mmi3": {CM:"#036280",TD:"#378BA4",TP:"#81BECE",OTHER:"#036280"}
}

export { V };
