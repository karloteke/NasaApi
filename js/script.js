let elementsList;

window.addEventListener('DOMContentLoaded', (event) => {
	const fetchList = async () => {
		await getList();
	}
	/* Método para hacer la petición a la API y obtener el json de resultados */
	const getList = async () => {
		const url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=2023-03-01&end_date=2023-03-27';

		const result = await fetch(url);
		elementsList = await result.json();
		document.querySelector('#search').style.display = 'block';
		console.log(elementsList);
		createItems(elementsList);
	}
	fetchList();
});

	
/** Método para crear el HTML del Elemento Pokemon*/
const createItems = (items) => {
	console.log('Creating items...');
	const list = document.querySelector('#pod_list');
	list.innerHTML = '';
	const newElement = document.createElement('div');
	items?.forEach((item, pos) => {
		const itemHtml = `
			<div class="list-element flex">
				<div>
					<h2>${item.title}</h2>
					<p>Desc: ${trimDescription(item.explanation)}</p>
					<div>Date: ${item.date}</div>
					<button onclick="openDetail(${pos})">Detail</button>
				</div>	
				<div>
					<img src="${item.url}">
				</div>	
			</div>
		`;

		newElement.innerHTML += itemHtml;
	});

	list.appendChild(newElement);
}

const openDetail = (index) => {
	console.log('Abrimos el detalle de: ', elementsList[index]);
	const list = document.querySelector('#pod_list');
	list.innerHTML = '';
	const detailsData = elementsList[index];

	const newElement = document.createElement('div');
	const itemHtml = `
		<div class="list-detail flex">
			<h2>${detailsData.title}</h2>
			<img src="${detailsData.url}">
			<p>Desc: ${detailsData.explanation}</p>
			<div>Date: ${detailsData.date}</div>	
			<div>Autor: ${detailsData.copyright}</div>	
		</div>
	`;

	newElement.innerHTML = itemHtml;

	list.appendChild(newElement);
};

const filterElements = () => {
	let valor = document.querySelector('#search-input').value;
	console.log('Estaos filtrando elementos: ', valor);
	if (valor.length > 3) {
		console.log('Filtramos por: ', valor);
		const filteredList = elementsList.filter((element) => {
			// debugger;
			if (element.title.toLowerCase().includes(valor)) {
				return element;
			}
		});
		createItems(filteredList);
		
		
	} else {
		if (!valor.length) {
			createItems(elementsList);
		}
	}
};

const trimDescription = (desc) => {
	if (desc.length > 250) {
		return desc.substring(0, 250) + ' ...';
	}
	return desc;
};