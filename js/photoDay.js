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
	const currentDate = new Date();
	const thirtyDaysAgo = new Date();
	thirtyDaysAgo.setDate(currentDate.getDate() - 30);

	const startDate = thirtyDaysAgo.toISOString().substring(0, 10);
	const endDate = currentDate.toISOString().substring(0, 10);
  
	const url = `https://api.nasa.gov/planetary/apod?api_key=eSrdcJqzrhfKIcvAYj29MEXKZFJGdDTLLn01sXnI&start_date=${startDate}&end_date=${endDate}&thumbs=true`;
	return url;
};

const createItems = (items) => {
	const list = document.querySelector('#pod_list');
	list.innerHTML = '';
	const newElement = document.createElement('div');
	items?.forEach((item) => {
	  if (item.media_type === 'image') {
		let itemHtml = `
		  <div class="list-element flex">
			<div>
			  <h2>${item.title}</h2>
			  <p><strong>Description: </strong>${trimDescription(item.explanation)}</p>
			  <div><strong>Date: </strong>${item.date}</div>
			  <a href="detail.html?date=${item.date}">Detail</a>
			</div>
			<div>
			  <img src="${item.url}">
			</div>  
		  </div>
		`;
		newElement.innerHTML += itemHtml;
	  } else if (item.media_type === 'video') {
		let itemHtml = `
		  <div class="list-element flex">
			<div>
			  <h2>${item.title}</h2>
			  <p><strong>Description: </strong>${trimDescription(item.explanation)}</p>
			  <div><strong>Date: </strong>${item.date}</div>
			  <a href="detail.html?date=${item.date}">Detail</a>
			</div>
			<div>
			  <img src="${item.thumbnail_url}">
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

/*Cortamos descripción a partir de 250 carácteres */
const trimDescription = (desc) => {
	if (desc.length > 250) {
		return desc.substring(0, 250) + ' ...';
	}
	return desc;
};
