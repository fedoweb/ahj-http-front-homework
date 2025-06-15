//создает экземпляр тикета из полученных данных

export default class Ticket {
  constructor() {
   
  }
  
  create(name, description) {
    return {
      name,
      description,
      status: false
    }
  }
}