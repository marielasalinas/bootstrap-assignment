async function loadDashboardData() {
    try {
      const response = await fetch('data.json'); // GET request
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
  
      //overview and info cards// 
      const overviewContainer = document.querySelector('.overview-cards');
      overviewContainer.innerHTML = '';
  
      const allCards = data.overviewCards.concat(data.infoCards);
      allCards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'col-md-3';
        cardDiv.innerHTML = `
          <div class="card ${card.label === 'Overdue' ? 'overdue' : ''} ${['Resolved', 'New Tickets'].includes(card.label) ? 'bg-info text-white' : ''}">
            <div class="card-body">
              <h6>${card.label}</h6>
              <h2>${card.count}</h2>
            </div>
          </div>
        `;
        overviewContainer.appendChild(cardDiv);
      });
  
      //tickets //
      const ticketList = document.querySelectorAll('.col-md-6 ul')[0];
      ticketList.innerHTML = '';
      data.tickets.forEach(ticket => {
        const li = document.createElement('li');
        li.innerHTML = `${ticket.name} - <span>${ticket.number}</span>`;
        ticketList.appendChild(li);
      });
  
    //tasks //
      const taskList = document.querySelectorAll('.col-md-6 ul')[1];
      taskList.innerHTML = '';
      data.tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.title} - <span class="${task.status.toLowerCase()}">${task.status}</span>`;
        taskList.appendChild(li);
      });
  
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  }
  
  // load
  loadDashboardData();
  