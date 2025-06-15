//отрисовывает список тикетов
import moment from "moment";

export default class TicketRender {
  constructor(container) {
    this.container = container;
  }

  drawTickets(tickets) {
    this.container.innerHTML = '';

    tickets.forEach(element => {
      if (!element) return;

      const ticket = this.createTicket(element);
      this.container.insertAdjacentHTML('beforeend', ticket);
    });
  }

  drawFullTicket(ticket) {
    if(!ticket) return;

    const container = document.querySelector(`[data-id=${ticket.id}]`);
    const mainContent = container.querySelector('.ticket_main_content');
    const description = `<div class="ticket_description">${ticket.description}</div>`;

    //if (container.contains('ticket_description')) return;
    mainContent.insertAdjacentHTML('beforeend', description);
  }


  openModal(type) {
    if (!type) return;

    if (type === 'add') document.body.insertAdjacentHTML('beforeend', this.getAddTicketForm());
    if (type === 'change') document.body.insertAdjacentHTML('beforeend', this.getChangeTicketForm());
    if (type === 'delete') document.body.insertAdjacentHTML('beforeend', this.getDeleteTicketForm());
  }

  createTicket(element) {
    if (!element) return;

    return `
      <div data-id="${element.id}" class="ticket_item">
        <input type="checkbox" class="ticket_status" ${element.status ? 'checked' : ''}>

        <div class="ticket_main_content">
          <div class="ticket_name">${element.name}</div>
        </div>

        <div class="ticket_date">${moment(element.created).format('DD.MM.YYYY HH:mm')}</div>
        <div class="button_container">
          <button class="ticket_btn change_ticket_btn">✎</button>
          <button class="ticket_btn delete_ticket_btn">x</button>
        </div>

      </div>`;
  }

  getAddTicketForm() {
    return `
    <form name="addForm" action="" class="add_form form">
      <h2 class="add_form_title">Добавить тикет</h2>
      <label for="form_name">Краткое описание</label>
      <input id="form_name" type="text" class="form_name" required>

      <label for="form_description">Подробное описание</label>
      <textarea id="form_description" class="form_description" required></textarea>

      <div class="button_container">
        <button type="button" class="btn cancel_btn">Отмена</button>
        <button type="submit" class="btn add_btn">Ок</button>
      </div>
    </form>`;
  }

  getChangeTicketForm() {
    return `
    <form name="changeForm" action="" class="change_form form">
      <h2 class="change_form_title">Изменить тикет</h2>
      <label for="form_name">Краткое описание</label>
      <input id="form_name" type="text" class="form_name" required>

      <label for="form_description">Подробное описание</label>
      <textarea id="form_description" class="form_description" required></textarea>

      <div class="button_container">
        <button class="btn cancel_btn">Отмена</button>
        <button type="submit" class="btn add_btn">Ок</button>
      </div>
    </form>`;
  }

  getDeleteTicketForm() {
    return `
    <form name="deleteForm" action="" class="delete_form form">
      <h2 class="delete_form_title">Удалить тикет</h2>
      <p>Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
      <div class="button_container">
        <button class="btn cancel_btn">Отмена</button>
        <button type="submit" class="btn add_btn">Ок</button>
      </div>
    </form>`;
  }
}