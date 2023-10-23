// document.addEventListener("DOMContentLoaded", function () {
//     const addProductButton = document.querySelector('#add_product');
//     const tableBody = document.querySelector('table tbody');
//     const form = document.getElementById('form');
//     const productName = document.getElementById('product-name');
//     const productDescription = document.getElementById('product-description');
//     const productPrice = document.getElementById('product-price');
//     const editProductButton = document.querySelector('#update_product');
//     const editModal = new bootstrap.Modal(document.getElementById('editModal'));
//     let editProductId;

//     // Load data from localStorage or initialize an empty array
//     let productData = JSON.parse(localStorage.getItem('products')) || [];

//     // Initialize a mapping object to store the relationship between data-id and row
//      const rowMapping = {}

//     // Function to add a new product to the table and localStorage
//     const createPost = (product) => {
//         // Create a new table row and populate it with product information
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <th scope="row">${product.id}</th>
//             <td>${product.name}</td>
//             <td>${product.description}</td>
//             <td>${product.price}</td>
//             <td>
//                 <i class="fas fa-edit edit-icon" data-id="${product.id}"></i>
//                 <i class="fas fa-trash-alt delete-icon" data-id="${product.id}"></i>
//             </td>
//         `;

//         // Add the row to the table
//         tableBody.appendChild(row);

//         // Reset input fields and set up event listeners for the new row
//         productName.value = "";
//         productDescription.value = "";
//         productPrice.value = "";

//         // Store the row in the mapping object using the product's data-id
//         rowMapping[product.id] = row;
//         console.log(row);

//         const editIcon = row.querySelector('.edit-icon');
//         const deleteIcon = row.querySelector('.delete-icon');

//         // Set up click event listeners for edit and delete icons
//         editIcon.addEventListener('click', () => openEditModal(product.id));
//         deleteIcon.addEventListener('click', () => deletePost(product.id));
//     };

//     // Function to open the edit modal
//     const openEditModal = (productId) => {
//         editProductId = productId;
//         const product = productData.find((product) => product.id == productId);
//         console.log(product);
//         if (product) {
//             document.getElementById('edit-product-id').value = productId;
//             document.getElementById('edit-product-name').value = product.name;
//             document.getElementById('edit-product-description').value = product.description;
//             document.getElementById('edit-product-price').value = product.price;
//             editModal.show();

          
//         }
//     };

//     // Event listener for the "Save Changes" button in the edit modal
//     editProductButton.addEventListener('click', function () {
//         // Get the updated product data from the modal
//         const editedName = document.getElementById('edit-product-name').value;
//         const editedDescription = document.getElementById('edit-product-description').value;
//         const editedPrice = document.getElementById('edit-product-price').value;

//         console.log(editedPrice);

//         // Find the product in the data array by ID
//         const productIndex = productData.findIndex((product) => product.id == editProductId);
//         console.log(productIndex);

//         if (productIndex !== -1) {
//             // Update the product data in the array
//             productData[productIndex].name = editedName;
//             productData[productIndex].description = editedDescription;
//             productData[productIndex].price = editedPrice;

//             // Update localStorage with the modified data
//             localStorage.setItem('products', JSON.stringify(productData));

//              // Use the rowMapping object to find the corresponding row and update its cells
//             const row = rowMapping[editProductId];
//             console.log(row);
//              if (row) {
//                  row.querySelector('td:nth-child(2)').textContent = editedName;
//                  row.querySelector('td:nth-child(3)').textContent = editedDescription;
//                  row.querySelector('td:nth-child(4)').textContent = editedPrice;
//              }

//             // Hide the edit modal
//             editModal.hide();
//         } else {
//             console.log('Product not found for editing.');
//         }
//     });

//     // Function to delete a product from the table and localStorage
//     const deletePost = (productId) => {
//         // Remove the product from the data array
//         productData = productData.filter((product) => product.id != productId);

//         // Update localStorage
//         localStorage.setItem('products', JSON.stringify(productData));

//         // Remove the row from the table
//         const row = document.querySelector(`[data-id="${productId}"]`);
//         if (row) {
//             row.remove();
//         }
//     };

//     // Event listener for the "Add Product" button
//     addProductButton.addEventListener('click', function () {
//         formValidation();

//     });

//     // Function to validate form data and add a new product
//     const formValidation = () => {
//         if (productName.value === "" || productDescription.value === "" || productPrice.value === "") {
//             console.log("Validation failed: Please fill in all fields.");
//         } else {
//             acceptData();
//         }
//     };

//     // Function to accept and add new product data
//     const acceptData = () => {
//         const name = productName.value;
//         const description = productDescription.value;
//         const price = productPrice.value;
//         const newProduct = {
//             id: productData.length + 1, // Auto-increment the ID
//             name: name,
//             description: description,
//             price: price,
//         };

//         productData.push(newProduct);

//         // Update localStorage with the new product
//         localStorage.setItem('products', JSON.stringify(productData));

//         createPost(newProduct);
//     };

//     // Populate the table with existing product data from localStorage
//     productData.forEach((product) => {
//         createPost(product);
//     });
// });


document.addEventListener("DOMContentLoaded", function (){
    const addProductButton = document.querySelector('#add_product');
    const tableBody = document.querySelector('table tbody');
    const form = document.getElementById('form');
    const productName = document.getElementById('product-name');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const productImage = document.getElementById('product-image'); // Added this line
    const editProductButton = document.querySelector('#update_product');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    let editProductId;

    // Load data from localStorage or initialize an empty array
    let productData = JSON.parse(localStorage.getItem('products')) || [];

    // Initialize a mapping object to store the relationship between data-id and row
    const rowMapping = {}

    // Function to add a new product to the table and localStorage
    const createPost = (product) => {
        // Create a new table row and populate it with product information
    const row = document.createElement('tr');
    row.innerHTML = `
    <th scope="row">${product.id}</th>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" alt="Product Image" width="50"></td>
            &nbsp; &nbsp;
            <td>
                <i class="fas fa-edit edit-icon" data-id="${product.id}"></i>
                <i class="fas fa-trash-alt delete-icon" data-id="${product.id}"></i>
            </td>
    `

    // Add the row to the table
    tableBody.appendChild(row);

    // // Reset input fields and set up event listeners for the new row

    productName.value = "";
    productDescription.value = "";
    productPrice.value = "";
    productImage.value = ""; // clear the image input field

    // Store the row in the mapping object using the product's data-id
    rowMapping[product.id] = row;

    const editIcon = row.querySelector('.edit-icon');
    const deleteIcon = row.querySelector('.delete-icon');

    // Set up click event listeners for edit and delete icons
    editIcon.addEventListener('click', () => openEditModal(product.id));
    deleteIcon.addEventListener('click', () => deletePost(product.id));

    };

    // function to open the edit modal

    const openEditModal = (productId) => {
        editProductId = productId;
        const product = productData.find((product) => product.id == productId );

        if(product){
            document.getElementById('edit-product-id').value = productId;
            document.getElementById('edit-product-name').value = product.name;
            document.getElementById('edit-product-description').value = product.description;
            document.getElementById('edit-product-price').value = product.price;
            // Reset the image input field
            document.getElementById('edit-product-image').value = '';
            editModal.show();
        }
    };

    // Event listner for the "Save Changes" button in the edit modal

    editProductButton.addEventListener('click', function(){
        // Get the updated product data from the modal

        const editedName = document.getElementById('edit-product-name').value;
        const editedDescription = document.getElementById('edit-product-description').value;
        const editedPrice = document.getElementById('edit-product-price').value;
        const editedImage = document.getElementById('edit-product-image').value; // Get the updated image URL
        console.log(editedImage);

        // find the product in the data array by ID

        const productIndex = productData.findIndex((product) => product.id == editProductId);

        if(productIndex !== -1){
            // Update the product data in the array
            productData[productIndex].name = editedName;
            productData[productIndex].description = editedDescription;
            productData[productIndex].price = editedPrice;
            productData[productIndex].image = editedImage; // Update the product image URL

            // Update localStorage with the modified data
            localStorage.setItem('products', JSON.stringify(productData));

            // Update localStorage with the modified data
            const row = rowMapping[editProductId];
            if(row){
                row.querySelector('td:nth-child(2)').textContent = editedName;
                row.querySelector('td:nth-child(3)').textContent = editedDescription;
                row.querySelector('td:nth-child(4)').textContent = editedPrice;
                row.querySelector('td:nth-child(5)').innerHTML = `<img src="${editedImage}" alt="Product Image" width="50">`;
            }

            // Hide the edit modal
            editModal.hide();
        } else{
            console.log('Product not found for editing.');
        }
    });

    // Function to delete a product from the table and localStorage
    const deletePost = (productId) => {
        // Remove the product from the data array
        productData = productData.filter((product) => product.id != productId);

        // Update localStorage
        localStorage.setItem('products', JSON.stringify(productData));

        // Remove the row from the table
        // const row = document.querySelector(`[data-id="${productId}"]`);
        const row = rowMapping[productId];
        console.log(row);
    if (row) {
        row.remove();
    }
    };

     // Event listener for the "Add Product" button
     addProductButton.addEventListener('click', function () {
        formValidation();
    });

    // Function to validate form data and add a new product
    const formValidation = () => {
        if (productName.value === "" || productDescription.value === "" || productPrice.value === "" || productImage.value === "") {
            console.log("Validation failed: Please fill in all fields and provide an image URL.");
        } else {
            acceptData();
        }
    };

    // Function to accept and add new product data
    const acceptData = () => {
        const name = productName.value;
        const description = productDescription.value;
        const price = productPrice.value;
        const image = productImage.value; // Get the entered image URL

        const newProduct = {
            id: productData.length + 1, // Auto-increment the ID
            name: name,
            description: description,
            price: price,
            image: image, // Store the entered image URL
        };

        productData.push(newProduct);

        // Update localStorage with the new product
        localStorage.setItem('products', JSON.stringify(productData));

        createPost(newProduct);
    };

    // Populate the table with existing product data from localStorage
    productData.forEach((product) => {
        createPost(product);
    });
} ) 




if (editedImage) {
    // If a new image was selected, update the product image
    productData[productIndex].image = URL.createObjectURL(editedImage);
}




