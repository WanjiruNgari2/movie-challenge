fetch('http://localhost:3000/films')
 .then(Response=> Response.json())
 .then (films => {
    const filmList = document.getElementById('films');}

    films.forEach(film => {
        const filmItem = document.createElement('li');
        filmItem.classList.add('film');




        filmItem.innerHTML = `
        <img src="${film.poster}" alt="${film.title} poster" width="150">
                <h3>${film.title}</h3>
                <p>Runtime:${film.runtime}minutes</P>
                <p>Showtime:${film.showtime}showtime}</p>
                <p>Description:${film.description}description}</P>
                <button>Buy Ticket </button>
                `;



                const buyButton = filmItem.querySelector('.buy ticket');
                const remainingTickets = filmItem.querySelector('.remaining tickets');


                buyButton.addEventListener('click',() => {
                    if(remainingTickets > 0) {
                        const ticketSold = film.tickets_sold + 1;


                        fetch(`http://localhost:3000/films/${film.id}`,{
                            method: 'PATCH',
                            headers: {
                                'content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                tickets_sold:ticketSold,
                            }),
                        })
                        .then(Response => {
                        if(Response.ok){
                            return Response.json();
                        }
                    })
                }
                filmList.appendChild(filmItem);
    
        
    });
})
 










