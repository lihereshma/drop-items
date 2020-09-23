/* Author: Reshma Lihe */

const items = document.querySelectorAll('.item');
const drop_box = document.getElementById('drop-box');
let dragged_item_text;
let dragged_item_id;
const items_array = Array.from(items);

// Function to add draggable property to items
items_array.forEach(function(event){
  event.draggable = true;
});

// Function to set multiple attributes of single element
function setAttributes(element, attribute) {
  for(var key in attribute) {
    element.setAttribute(key, attribute[key]);
  }
}

// Function to drag element
document.addEventListener('dragstart', function(event) {
  dragged_item_id = event.target.id;
  dragged_item_text = event.target.innerHTML;
});

document.addEventListener('dragover', function(event) {
  event.preventDefault();
});


// Function to drop element in specified area
let i = 0;
document.addEventListener('drop', function(event) {
  if(event.target == drop_box){
    const dragged_item = document.createElement('li');
    setAttributes(dragged_item, { "class": "dragged-items", "id": dragged_item_id });
    dragged_item.innerHTML = dragged_item_text;
    event.target.append(dragged_item);
    pushData(dragged_item_text, i);
    i++;
  }
});

// function to push new item in items object
let jsonData = {
  itemsObject: []
};

localStorage.setItem("items", JSON.stringify(jsonData));

function pushData(data, n) {
  var storedItems = JSON.parse(localStorage.getItem("items"));
  storedItems.itemsObject.push({
    id: n,
    name: data
  });
  localStorage.setItem("items", JSON.stringify(storedItems));
  jsonData = localStorage.getItem("items");
  console.log("jsonData", jsonData);
}

