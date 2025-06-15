//методы общения с сервером

export default class ApiService {
  constructor() {
    this.baseUrl = process.env.API_BASE_URL || 'http://localhost:3030';
    this.ticket;
    //this.init();
  }

  async init() {
    //await this.getAllTicket();
  }

  async createTicket(ticket) {
    this.showSpinner();
    
    try {
      const response = await fetch(`${this.baseUrl}/?method=createTicket`, {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(ticket)
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();

    } finally {
      this.hideSpinner();
    }
  }

  async getTicket(id) {
    this.showSpinner();

    try {
      const response = await fetch(`${this.baseUrl}/?method=ticketById&id=${id}`, {
        method: 'GET'
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();

    } finally {
      this.hideSpinner();
    }
  }

  async getAllTicket() {
    this.showSpinner();

    try {
      const response = await fetch(`${this.baseUrl}/?method=allTickets`, {
        method: 'GET'
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();

    } finally {
      this.hideSpinner();
    }
  }

  async updateTicket(id, data) {
    this.showSpinner();

    try {
      const response = await fetch(`${this.baseUrl}/?method=updateById&id=${id}`, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();

    } finally {
      this.hideSpinner();
    }
  }

  async deleteTicket(id) {
    this.showSpinner();

    try {
      const response = await fetch(`${this.baseUrl}/?method=deleteById&id=${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response}`);
      return await response.json();

    } finally {
      this.hideSpinner();
    }
  }

  showSpinner() {
    document.getElementById('spinner').style.display = 'block';
  }

  hideSpinner() {
    document.getElementById('spinner').style.display = 'none';
  }
}