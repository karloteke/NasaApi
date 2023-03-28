let elementsList;

window.addEventListener('DOMContentLoaded', (event) => {
	const fetchDetail = async () => {
		await getDetail();
	}
	/* Método para hacer la petición a la API y obtener el json de resultados */
	const getDetail = async () => {
        let params = new URLSearchParams(document.location.search);
        let date = params.get("date"); 
        if (date) {
            const url = `https://api.nasa.gov/planetary/apod?api_key=eSrdcJqzrhfKIcvAYj29MEXKZFJGdDTLLn01sXnI&date=${date}`;
            const result = await fetch(url);
            element = await result.json();
            console.log(element);
            createDetail(element);
        }
	}
	fetchDetail();
});

const createDetail = (detailsData) => {
	const list = document.querySelector('#pod_list');
	list.innerHTML = '';

	const newElement = document.createElement('div');
	const itemHtml = `
		<div class="list-detail flex">
			<h2>${detailsData.title}</h2>
			<img src="${detailsData.url}">
			<p>${detailsData.explanation}</p>
			<div>Date: ${detailsData.date}</div>	
			<div>Autor: ${detailsData.copyright ? detailsData.copyright : 'Not specified'}</div>	
		</div>
	`;

	newElement.innerHTML = itemHtml;

	list.appendChild(newElement);
};
