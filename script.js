document.addEventListener("DOMContentLoaded", function () {
    const addProductButton = document.querySelector('#add_product');
    const tableBody = document.querySelector('table tbody');
    const form = document.getElementById('form');
    const productName = document.getElementById('product-name');
    const productDescription = document.getElementById('product-description');
    const productPrice = document.getElementById('product-price');
    const productImage = document.getElementById('product-image');
    const editProductButton = document.querySelector('#update_product');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    let editProductId = null;

    // Load data from localStorage or initialize an empty array
    let productData = JSON.parse(localStorage.getItem('products')) || [];

    // Initialize a mapping object to store the relationship between data-id and row
    const rowMapping = {};

    let success = true;

    const compressImage = (imgFile, callback) => {
      const reader = new FileReader();
    
      reader.addEventListener("load", () => {
        const img = new Image();
    
        img.src = reader.result;
    
        img.onload = () => {
          const canvas = document.createElement("canvas");
          if (img.height > img.width) {
            canvas.width = 900;
            canvas.height = 1125;
          } else if (img.height < img.width) {
            canvas.width = 900;
            canvas.height = 506.25;
          } else {
            canvas.width = 300;
            canvas.height = 300;
          }
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
          canvas.toBlob(
            (blob) => {
              callback(blob);
            },
            "image/jpeg",
            0.5
          );
        };
      });
    
      reader.readAsDataURL(imgFile);
    };

    // Function to add a new product to the table and localStorage
    const createPost = (product) => {

      product.id = Date.now()
        // Create a new table row and populate it with product information

        const row = document.createElement('tr');
        row.innerHTML = `
            <th scope="row">${product.id}</th>
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.price}</td>
            <td><img src="${product.image}" alt="Product Image" width="50"></td>
            <td>
                <i class="fas fa-edit edit-icon" data-id="${product.id}"></i>
                <i class="fas fa-trash-alt delete-icon" data-id="${product.id}"></i>
            </td>
        `;

        // Add the row to the table
        tableBody.appendChild(row);

        // Reset input fields and set up event listeners for the new row
        

        // Store the row in the mapping object using the product's data-id
        rowMapping[product.id] = row;

        const editIcon = row.querySelector('.edit-icon');
        const deleteIcon = row.querySelector('.delete-icon');

        // Set up click event listeners for edit and delete icons
        editIcon.addEventListener('click', () => openEditModal(product.id));
        deleteIcon.addEventListener('click', () => deletePost(product.id));
    };

    const clearInputs = () => {
      productName.value = "";
      productDescription.value = "";
      productPrice.value = "";
      productImage.value = ""; // clear the image input field
    }

    // Function to open the edit modal
    const openEditModal = (productId) => {
        editProductId = productId;
        const product = productData.find((product) => product.id == productId);

        if (product) {
            document.getElementById('edit-product-id').value = productId;
            document.getElementById('edit-product-name').value = product.name;
            document.getElementById('edit-product-description').value = product.description;
            document.getElementById('edit-product-price').value = product.price;
            // Reset the image input field
            document.getElementById('edit-product-image').value = '';
            editModal.show();
        }
    };

    // Event listener for the "Save Changes" button in the edit modal
    editProductButton.addEventListener('click', function () {
        // Get the updated product data from the modal
        const editedName = document.getElementById('edit-product-name').value;
        const editedDescription = document.getElementById('edit-product-description').value;
        const editedPrice = document.getElementById('edit-product-price').value;
        const editedImage = document.getElementById('edit-product-image').files[0]; // Get the updated image URL

        // Find the product in the data array by ID
        const productIndex = productData.findIndex((product) => product.id == editProductId);

        if (productIndex !== -1) {
            // Update the product data in the array
            productData[productIndex].name = editedName;
            productData[productIndex].description = editedDescription;
            productData[productIndex].price = editedPrice;
            productData[productIndex].image = editedImage; // Update the product image URL

            if (editedImage) {
              // If a new image was selected, update the product image
              productData[productIndex].image = URL.createObjectURL(editedImage);
          }

            // Update localStorage with the modified data
            localStorage.setItem('products', JSON.stringify(productData));

            // Update the table row with the modified data
            const row = rowMapping[editProductId];
            if (row) {
                row.querySelector('td:nth-child(2)').textContent = editedName;
                row.querySelector('td:nth-child(3)').textContent = editedDescription;
                row.querySelector('td:nth-child(4)').textContent = editedPrice;
                row.querySelector('td:nth-child(5)').innerHTML = `<img src="${productData[productIndex].image}" alt="Product Image" width="50">`;
            }

            // Hide the edit modal
            editModal.hide();
        } else {
            console.log('Product not found for editing.');
        }

        // uploadImage();
    });

    const acceptData = () => {
      const name = productName.value;
      const description = productDescription.value;
      const price = productPrice.value;
      const image = productImage.files[0];
    
      if (!name) {
        alert("Please enter product name");
        return;
      }
      if (!description) {
        alert("Please enter product description");
        return;
      }
      if (!price) {
        alert("Please enter product price");
        return;
      }
      if (!image) {
        alert("Please select image");
        return;
      }
    
      compressImage(image, (compressedBlob) => {
        const compressedReader = new FileReader();
    
        compressedReader.addEventListener("load", () => {
          const compressedImageData = compressedReader.result;
          productData.push({
              name: name,
              description: description,
              price: price,
              image: compressedImageData,
          });
    
          try {
            localStorage.setItem("acceptData", JSON.stringify(productData));
            getProduct();
          } catch (err) {
            alert("Storage full!! Please remove some products from your List.");
            return;
          }
    
          const toastLiveExample = document.getElementById("liveToast");
          const toast = new bootstrap.Toast(toastLiveExample);
          document.getElementById("toastMessage").innerHTML =
            "Product added successfully!!!";
          toast.show();
    
          clearInputs();
          document.querySelector("#closeAddBtn").click();
        });
    
        compressedReader.readAsDataURL(compressedBlob);
      });
    };

    // Function to delete a product from the table and localStorage
    const deletePost = (productId) => {
        // Remove the product from the data array
        productData = productData.filter((product) => product.id != productId);

        // Update localStorage
        localStorage.setItem('products', JSON.stringify(productData));

        // Remove the row from the table
        const row = rowMapping[productId];
        if (row) {
            row.remove();
        }
    };

    // Event listener for the "Add Product" button
    addProductButton.addEventListener('click', function (event) {
        event.preventDefault();
        formValidation();
        uploadImage();
    });

    // Function to validate form data and add a new product
    const formValidation = () => {
        if (productName.value === "" || productDescription.value === "" || productPrice.value === "" || productImage.value === "") {
            console.log("Validation failed: Please fill in all fields and provide an image URL.");
        } else {
            acceptData();
        }
    };

    function uploadImage() {
      const name = productName.value;
      const description = productDescription.value;
      const price = productPrice.value;
      const imageInput = document.getElementById('product-image');
  
      if (!name || !description || !price) {
          alert("Please fill in all fields.");
          return;
      }
  
      if (!imageInput.files.length) {
          alert("Please select an image.");
          return;
      }
  
      const imageFile = imageInput.files[0];
      console.log(imageFile);
  
      // You can use the FileReader API to read the selected image file
      const reader = new FileReader();
      reader.onload = function (e) {
          const imageDataURL = e.target.result;
  
          // Add the product data to the array
          productData.push({
              name: name,
              description: description,
              price: price,
              image: imageDataURL,
          });
  
          // Store the updated product data in local storage
          localStorage.setItem('products', JSON.stringify(productData));
  
          // Add the product to the table
          createPost(productData[productData.length - 1]);
  
          // Close the modal
          document.querySelector("#closeAddBtn").click();
  
          // Clear the input fields
          clearInputs();
      };
  
      reader.readAsDataURL(imageFile);
  }

   
   
    // Populate the table with existing product data from localStorage
    productData.forEach((product) => {
        createPost(product);
    });

    const deleteAllButton = document.querySelector('#delete_all');
    deleteAllButton.addEventListener('click', function(){
      Object.keys(rowMapping).forEach((productId) => {
        deletePost(productId);
        
      })
    })
});


 // // Handle file input change event to convert the image to base64
    // const fileInput  = document.getElementById('product-image');


    // fileInput.addEventListener('change', function(){
    //     const file = this.files[0];
    //     const reader = new FileReader();
    //     console.log(reader);
    //     reader.addEventListener("load", function(){
    //         localStorage.setItem("image", reader.result)
    //     }, false);

    //     if(imgPath){
    //         reader.readAsDataURL(imgPath);
    //     }

    // });

    // fileInput.src = localStorage.getItem('product-image')
