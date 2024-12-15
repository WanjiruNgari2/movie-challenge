fetch('http://localhost:3000/films')
 .then(Response=> Response.json())
 .then (films => {
    const filmList = document.getElementById('films');

    films.forEach(film => {
        const filmItem = document.createElement('li');
        filmItem.classList.add('film');


      const remainingTickets = film.capacity - film.tickets_sold;

        filmItem.innerHTML = `
        <img src="${film.poster}" alt="${film.title} poster" width="150">
                <h3>${film.title}</h3>
                <p>Runtime:${film.runtime}minutes</P>
                <p>Showtime:${film.showtime}showtime}</p>
                <p>Description:${film.description}description}</P>
                <button class="buy-ticket">Buy Ticket</button>
                `;



              const buyButton = filmItem.querySelector('.buy-ticket');
              const remainingTicketsB= filmItem.querySelector('.remaining-tickets');


              buyButton.addEventListener('click',() => {
                  if(remainingTickets > 0) {
                     const ticketSold = film.tickets_sold + 1;


                     fetch(`http://localhost:3000/films/${film.id}`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ tickets_sold:ticketSold}),
                  })
                      .then(response => {
                        console.log("PATCH Response:", response);
                        return response.json();
                      })
                
                      .then(updatedFilm => {
                          const newRemainingTickets = updatedFilm.capacity - updatedFilm.tickets_sold;
                     remainingTicketsB.textContent = `Tickets Remaining: ${newRemainingTickets}`;

                          film.tickets_sold = updatedFilm.tickets_sold;
                          console.log(`Successfully updated tickets for ${film.title}`);
                      })
                      .catch(error => {
                          console.error('Error updating tickets:', error);
                      });
              } else {
                  alert('Tickets are sold out!');
              }
          });

          filmList.appendChild(filmItem);
      });
    })