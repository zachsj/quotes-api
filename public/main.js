// main.js
const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')


/*update.addEventListener('click', _ => {
  fetch('/quotes', {
  method: 'put',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
  name: 'Clark Griswold',
  quote: 'Russ, when was the last time I overdid anything?',
  })
  })
  .then(res => {
  if (res.ok) return res.json()
  })
  .then(response => {
  window.location.reload(true)
  })
  })*/

  const clarkQuotes = [
    "Russ, when was the last time I overdid anything?",
    "Surprised, Eddie? If I Woke Up Tomorrow With My Head Sewn To The Carpet, I Wouldn't Be More Surprised.",
    "Can I Refill Your Eggnog For You? Get You Something To Eat? Drive You Out To The Middle Of Nowhere... Leave You For Dead?",
    "I'm sorry, this is our family's first kidnapping.",
    "Dad, you taught me everything I know about exterior illumination.",
    "Eat my road grit, Liver Lips!",
    "Merry Christmas. Merry Christmas, Merry Christmas, Merry Christmas, kiss my *ss. Kiss his *ss. Happy Hanukkah."
    // Add more Clark Griswold quotes here
  ];
  
  update.addEventListener('click', _ => {
    const randomQuote = clarkQuotes[Math.floor(Math.random() * clarkQuotes.length)];
  
    fetch('/quotes', {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Clark Griswold',
        quote: randomQuote,
      })
    })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(response => {
      window.location.reload(true);
    });
  });

deleteButton.addEventListener('click', _ => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Clark Griswold'
    })
  })
      .then(res => {
        if (res.ok) return res.json()
      })
      .then(response => {
        if (response === 'No quote to delete') {
        messageDiv.textContent = 'No Clark Griswold quote to delete'
        } else {
        window.location.reload(true)
       }
    })
})

