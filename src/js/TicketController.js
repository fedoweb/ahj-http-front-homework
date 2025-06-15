//обрабатыевает данные ввода из форм Modals и создает??
import ApiService from "./ApiService";
import Ticket from "./Ticket";
import TicketRender from "./TicketRender";

export default class TicketController {
  constructor() {
    this.apiService = new ApiService();
    this.ticketContainer = document.querySelector('.tickets_container');
    this.ticketRender = new TicketRender(this.ticketContainer);
    this.ticket = new Ticket();

    this.selectedTicketId = null;
  }

  init() {
    this.loadTickets();

    document.addEventListener('click', this.onClick);
    document.addEventListener('submit', this.onSubmit);

    this.ticketContainer.addEventListener('click', (e) => this.onTicketClick(e));
    this.ticketContainer.addEventListener('change', this.onChange);
  }

  onClick = (e) => {
    if (e.target.classList.contains('new_ticket_btn')) this.ticketRender.openModal('add');

    if (e.target.classList.contains('cancel_btn')) {
      e.preventDefault();
      e.target.closest('.form').remove()
    };
  }

  onTicketClick = async (e) => {
    const ticketItem = e.target.closest('.ticket_item');
      if (!ticketItem) return;

      this.selectedTicketId = ticketItem.dataset.id;

      if (e.target.classList.contains('change_ticket_btn')) {
        this.ticketRender.openModal('change');
        return;
      } else if (e.target.classList.contains('delete_ticket_btn')) {
        this.ticketRender.openModal('delete');
        return;
      } else if (e.target.classList.contains('ticket_status')) {
        return;
      } else if (ticketItem.querySelector('.ticket_description')) {
        ticketItem.querySelector('.ticket_description').remove();
        return;
      } else {
        const ticket = await this.loadTicket(this.selectedTicketId);
        this.ticketRender.drawFullTicket(ticket);
      }
    
  }

  onSubmit = async (e) => {
    e.preventDefault();

      if (e.target.name === 'addForm') {
        const name = e.target.querySelector('.form_name').value;
        const description = e.target.querySelector('.form_description').value;
        const ticket = await this.ticket.create(name, description);
        await this.createTicket(ticket);
      } 
      else if (e.target.name === 'changeForm') {
        const name = e.target.querySelector('.form_name').value;
        const description = e.target.querySelector('.form_description').value;
        const ticket = this.ticket.create(name, description);
        await this.updateTicket(this.selectedTicketId, ticket);
      }
      else if (e.target.name === 'deleteForm') {
        
        await this.deleteTicket(this.selectedTicketId);
      }
      
      e.target.closest('.form').remove();
      this.loadTickets();
  }

  onChange = async (e) => {
    if (e.target.classList.contains('ticket_status')) {
      const ticketItem = e.target.closest('.ticket_item');
      if (!ticketItem) return;

      await this.updateTicket(this.selectedTicketId, {status: e.target.checked});
      this.loadTickets();
    }
  }

  async loadTicket(id) {
    try {
      const ticket = await this.apiService.getTicket(id);
      this.ticketRender.drawFullTicket(ticket);
    } catch (error) {
      console.error('Error loading ticket:', error);
    }
  }

  async loadTickets() {
    try {
      const tickets = await this.apiService.getAllTicket();
      this.ticketRender.drawTickets(tickets);
    } catch (error) {
      console.error('Error loading tickets:', error);
    }
  }

  async createTicket(name, description) {
    try {
      await this.apiService.createTicket(name, description);
      await this.loadTickets(); 
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  }

  async updateTicket(id, ticket) {
    try {
      await this.apiService.updateTicket(id, ticket);
      await this.loadTickets(); 
    } catch (error) {
      console.error('Failed to create ticket:', error);
    }
  }

  async deleteTicket(id) {
    try {
      await this.apiService.deleteTicket(id);
      await this.loadTickets(); 
    } catch (error) {
      console.error('Failed to delete ticket:', error);
    }
  }
}