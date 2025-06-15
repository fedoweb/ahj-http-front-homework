//управление приложением
import TicketController from "./TicketController";


document.addEventListener('DOMContentLoaded', () => {

    const ticketController = new TicketController();
    ticketController.init();

});

