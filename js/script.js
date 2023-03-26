window.addEventListener('DOMContentLoaded', (event) => {
	const fetchList = async () => {
		await getList();
	}
	/* Método para hacer la petición a la API y obtener el json de resultados */
	const getList = async () => {
		const url = 'https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&start_date=2023-03-01&end_date=2023-03-27';

		const result = await fetch(url);
		const resultJson = await result.json();
		console.log(resultJson);
		createItems(resultJson);
	}
	fetchList();
});

	
	/** Método para crear el HTML del Elemento Pokemon*/
	const createItems = (items) => {
		console.log('Creating items...');
		const list = document.querySelector('#pod_list');
		const newElement = document.createElement('div');
		items?.forEach(item => {
			const itemHtml = `
				<div class="list-element">
					<div>
						<div>Title: ${item.title}</div>
						<div>Date: ${item.date}</div>
						<button>Detail</button>
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

// 	const getPokemonType = (types) => {
// 		let pokeTypes = '';
// 		types.forEach((element, index) => {
// 			if (index === 0) { pokeTypes = element.type.name; }
// 			else {
// 				pokeTypes = pokeTypes + `, ${element.type.name}`;
// 			}
// 		});
// 		return pokeTypes;
// 	}

