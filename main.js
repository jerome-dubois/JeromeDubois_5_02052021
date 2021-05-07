const url = 'http://localhost:3000/api/cameras';

fetch(url)
  .then((resp) => resp.json())
  .then(function(data) {
     
    const queryString_url_id = window.location.search;
    console.log(queryString_url_id);

    const urlSearchParams = new URLSearchParams(queryString_url_id);
    console.log(urlSearchParams);

    const _id = urlSearchParams.get("id");
    console.log(_id);

    console.log(data);
    const product_selected_by_id = data.find((camera) => camera._id === _id);

    console.log(product_selected_by_id);

    const positionCard = document.querySelector(".card");

    const structureCard = `
      <img src="${product_selected_by_id.imageUrl}" class="d-block w-100" alt="Caméra vintage n°1" />
      <div class="card-body">
        <h5 class="card-title">Caméra vintage n°1</h5>
        <p class="card-text">Caméra vintage n°1</p>
      </div>
    `;

    positionCard.innerHTML = structureCard;
       
  })
  .catch(function(error) {
     console.log(error);
  });

