let elementsList;

window.addEventListener('DOMContentLoaded', (event) => {
	const fetchList = async () => {
		await getList();
	}
	/* Método para hacer la petición a la API y obtener el json de resultados */
	const getList = async () => {
		const url = fillUrlParams();
		const result = await fetch(url);
		elementsList = await result.json();
		document.querySelector('#search').style.display = 'block';
		console.log(elementsList);
		createItems(elementsList);
	}
	fetchList();
});

const fillUrlParams = () => {
	const today = new Date();
	const dateDesde = new Date( new Date().setDate(new Date().getDate() - 30));
	console.log(dateDesde);
	const hasta = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDay();
	const desde = dateDesde.getFullYear() + '-' + (dateDesde.getMonth() + 1) + '-' + dateDesde.getDay();
	const url = `https://api.nasa.gov/planetary/apod?api_key=eSrdcJqzrhfKIcvAYj29MEXKZFJGdDTLLn01sXnI&start_date=${desde}&end_date=${hasta}`;
	return url;
}

const createItems = (items) => {
	// console.log('Creating items...');
	const list = document.querySelector('#pod_list');
	list.innerHTML = '';
	const newElement = document.createElement('div');
	items?.forEach((item) => {
		const itemHtml = `
			<div class="list-element flex">
				<div>
					<h2>${item.title}</h2>
					<p>Desc: ${trimDescription(item.explanation)}</p>
					<div>Date: ${item.date}</div>
					<a href="detail.html?date=${item.date}">Detail</a>
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

const filterElements = () => {
	let valor = document.querySelector('#search-input').value;
	// console.log('Estamos filtrando elementos por el término: ', valor);
	if (valor.length > 3) {
		// console.log('Filtramos por: ', valor);
		const filteredList = elementsList.filter((element) => {
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

/*Cortamos descripción a partir de 250 carácteres para verla entera en OpenDetails*/
const trimDescription = (desc) => {
	if (desc.length > 250) {
		return desc.substring(0, 250) + ' ...';
	}
	return desc;
};