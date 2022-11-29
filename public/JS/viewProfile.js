const viewProfileHandeler = async (event) => {
  event.preventDefault();

  const userData = document.querySelector("#viewProfile").value.trim();
  if (userData) {
    const response = await fetch("/profile/:id", {
        method: 'POST',
        body: JSON.stringify({userData}),

    });

    if (response.ok) {
        document.location.replace('/viewProfile')
    } else {
        alert(response.statusText)
    }
  }
};

document
    .querySelector()