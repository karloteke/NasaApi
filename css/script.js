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
	const dateFrom = new Date( new Date().setDate(new Date().getDate() - 30));
	const until = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	const from = dateFrom.getFullYear() + '-' + (dateFrom.getMonth() + 1) + '-' + dateFrom.getDate();
	const url = `https://api.nasa.gov/planetary/apod?api_key=eSrdcJqzrhfKIcvAYj29MEXKZFJGdDTLLn01sXnI&start_date=2023-03-01&end_date=2023-03-30`;
	return url;
}

const createItems = (items) => {
	// console.log('Creating items...');
	const list = document.querySelector('#pod_list');
	list.innerHTML = '';
	const newElement = document.createElement('div');
	items?.forEach((item) => {
		if (item.media_type === 'image') {
			let itemHtml = `
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
		}
	});

	list.appendChild(newElement);
}

const filterElements = () => {
	let valor = document.querySelector('#search-input').value;
	// console.log('Estamos filtrando elementos por el término: ', valor);
	if (valor.length > 2) {
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

/*Cortamos descripción a partir de 250 carácteres */
const trimDescription = (desc) => {
	if (desc.length > 250) {
		return desc.substring(0, 250) + ' ...';
	}
	return desc;
};

  
   