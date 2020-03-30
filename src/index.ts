
import './styles.css';

const items: ShoppingItem[] = [
    { description: 'Tolilet Paper' },
    { description: 'Beer' },
    { description: 'Lysol' },
    { description: 'Shampoo' }
];

const theList = document.getElementById('the-list') as HTMLUListElement;
// <li class="alert alert-info"><span>Shampoo</span></li>
drawList();
function drawList() {
    items.forEach(item => {
        const newElement = document.createElement('li');
        newElement.classList.add('alert');
        newElement.classList.add('alert-info');
        const newSpan = document.createElement('span');
        newSpan.innerText = item.description;
        newElement.appendChild(newSpan);
        theList.appendChild(newElement);
    });
}

interface ShoppingItem { description: string; }
