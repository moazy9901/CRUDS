let ProductNameInput = document.getElementById("ProductNameInput");
let ProductPriceInput = document.getElementById("ProductPriceInput");
let ProductCategoryInput = document.getElementById("ProductCategoryInput");
let ProductDiscriptionInput = document.getElementById("ProductDiscriptionInput");
let AddProductButton =document.getElementById("AddProductButton"); 
let ProductSearchInput = document.getElementById("ProductSearchInput");
let TableBody = document.getElementById("TableBody");
let alertName = document.getElementById("productNameAlert");
let alertPrice = document.getElementById("productPriceAlert");
let alertCategory = document.getElementById("productCategoryAlert");
let alertDisc = document.getElementById("productDiscAlert");
let myForm = document.getElementById("myForm");
// let ProductList = []; //-------------- f1: step 2  override يمنع ال 

let ProductList;
let mode = "addProduct"; //---- f5: step 3
let temp; //---- f5: step 4
//localStorage.getItem return string so we use JSON.parse to return array
if(JSON.parse(localStorage.getItem("OurProduct"))==null){
    ProductList=[];
}
else{
    ProductList=JSON.parse(localStorage.getItem("OurProduct"));
    DisplayProduct(ProductList);
}


//f1: AddProduct

function AddProduct(){ 
    let Product = {   //---------------------- f1: step 1 elements يخزن ال
        name:ProductNameInput.value,
        price : ProductPriceInput.value,
        category:ProductCategoryInput.value,
        disc:ProductDiscriptionInput.value
    }

    //----check mode for add or update
    if(mode == "addProduct"){
        ProductList.push(Product);//-------------- f1: step 2  override يمنع ال 
    }
    else{
        ProductList[temp]=Product;//---------- f5 : step 4
        currentButton = "addProduct"; //---- f5: step 5 return current mode
        document.getElementById("AddProductButton").innerHTML="addProduct";
        document.getElementById("AddProductButton").classList.replace( "btn-warning" , "btn-info");
    }

//---------------------------------------------------------------------------------
//localStorage=> setItem : just accept strings so we use JSON.stringify
localStorage.setItem("OurProduct", JSON.stringify(ProductList)) //-------- localStorage : step 1
//---------------------------------------------------------------------------------
    DisplayProduct(ProductList); //------ f2: step 3 عرض المعلومات بعد الاضافه مباشره

    ClearForm();   //------- f3 : step 1
}

//---------------------------------------------------------------------------
//check if the inputs are empty
myForm.addEventListener("submit", function(event){
    let AllInputs = this.querySelectorAll("#myForm input , #MyForm textarea");
    let isValid = true;
    let errorMessage = document.getElementById("error-message");

    AllInputs.forEach(input=>{
        if(input.value.trim() ===""){  //trin remove space and tabs
            isValid = false;
            input.classList.add("is-invalid");
        }
        else{
            input.classList.remove("is-invalid");
            input.classList.add("is-valid");
        }
    });
    if(isValid){
        errorMessage.classList.add("d-none");
        AddProduct();
    }
    else{
        event.preventDefault(); // Stop form submission
        errorMessage.classList.remove("d-none");
    }
})

//----------------------------------------------------------------------------------------------

//f2: DisplayProduct
function DisplayProduct(List){
    let cartona ="";   //------------------ f2: step 1 ProductList يحمل كل عناصر ال 
    for(let i=0 ; i<List.length;i++){
        cartona +=`
        <tr>
        <td>${i}</td>
        <td>${List[i].name}</td>
        <td>${List[i].price}</td>
        <td>${List[i].category}</td>
        <td>${List[i].disc}</td>
        <td><button onclick="updateProduct(${i})" class="btn btn-warning">update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-danger">delete</button></td>
        </tr>`
    }
    TableBody.innerHTML = cartona; //------ f2: step 2 body داخل ال ProductList عرض معلومات ال 
}

//----------------------------------------------------------------------------------------------

//f3: ClearForm

function ClearForm(){
    ProductNameInput.value = "" ;
    ProductPriceInput.value = "" ;
    ProductCategoryInput.value = "" ;
    ProductDiscriptionInput.value = "" ;
}

//----------------------------------------------------------------------------------------------

//f4: deleteProduct

function deleteProduct(index){
    ProductList.splice(index , 1);
    localStorage.setItem("OurProduct", JSON.stringify(ProductList));
    DisplayProduct(ProductList);
}

//----------------------------------------------------------------------------------------------

//f5: updateProduct

function updateProduct(index){
        ProductNameInput.value = ProductList[index].name;    //----f5: step 1 to make inputs include valuse
        ProductPriceInput.value = ProductList[index].price ;
        ProductCategoryInput.value = ProductList[index].category ;
        ProductDiscriptionInput.value = ProductList[index].disc ;
    //-------------------------------------------------------------
        AddProductButton.innerHTML="Update";                //-----f5: step 2 to change style of addproductButton to updateproductButton
        AddProductButton.style.backgroundColor="#ffc107";
        AddProductButton.style.borderColor="#ffc107";
        AddProductButton.style.boxShadow="none"
    //-------------------------------------------------------------
        mode = "updateProduct";                             //---- f5: step 3 change mode from add tto update
        temp = index;
        scroll({
            top:0 , 
            behavior:"smooth"
        })
}
//----------------------------------------------------------------------------------------------

//f6: Search

function Search(){
    let item=ProductSearchInput.value;
    let wantedProduct=[];
    
    for(let i=0;i<ProductList.length;i++){
        if(ProductList[i].name.toUpperCase().includes(item.toUpperCase())){
            wantedProduct.push(ProductList[i]);
        }
    }
    DisplayProduct(wantedProduct);
}

//-----------------------------------------------------------------------------------------------

//Regular Expression

//f1: validateProductNameInput
// productName must be required and start with UpperCase then 3 or 6 lowerCase 

function validateProductName(ProductName){
    let regex = /^[A-Z][a-z]{3,6}$/
    if(regex.test(ProductName)==true){
        ProductNameInput.classList.remove("is-invalid");
        ProductNameInput.classList.add("is-valid");
        alertName.classList.replace("visible", "d-none");
    }
    else{
        alertName.classList.replace("d-none", "visible");
        ProductNameInput.classList.remove("is-valid");
        ProductNameInput.classList.add("is-invalid");
    }
}

ProductNameInput.addEventListener("keyup", function(){
    validateProductName(ProductNameInput.value);
})

//-----------------------------------------------------------------------------------------------

//f2: validateProductPriceInput : 
// productPrice must be required and from 100 to 10000



function validateProductPrice(productPrice){
    let regex = /^(([1-9][0-9][0-9])+([0-9])?$)|10000$/;
    if(regex.test(productPrice)==true){
        ProductPriceInput.classList.add("is-valid");
        ProductPriceInput.classList.remove("is-invalid");
        alertPrice.classList.replace("visible" , "d-none");
    }
    else{
        alertPrice.classList.replace("d-none" , "visible");
        ProductPriceInput.classList.add("is-invalid");
        ProductPriceInput.classList.remove("is-valid");
    }
    
    
}

ProductPriceInput.addEventListener("keyup", function(){
    validateProductPrice(ProductPriceInput.value);
})

//-----------------------------------------------------------------------------------------------

//Regular Expression

//f3: validateProductCategoryInput
// productCategory must be required 3 or 7 lowerCase 

function validateProductCategory(ProductCategory){
    let regex = /^[a-z]{3,7}$/
    if(regex.test(ProductCategory)==true){
        ProductCategoryInput.classList.remove("is-invalid");
        ProductCategoryInput.classList.add("is-valid");
        alertCategory.classList.replace("visible", "d-none");
    }
    else{
        alertCategory.classList.replace("d-none", "visible");
        ProductCategoryInput.classList.remove("is-valid");
        ProductCategoryInput.classList.add("is-invalid");
    }
}

ProductCategoryInput.addEventListener("keyup", function(){
    validateProductCategory(ProductCategoryInput.value);
})

//-----------------------------------------------------------------------------------------------

//Regular Expression

//f3: validateProductDiscInput
// productDisc must be required upercase or lowerCase 

function validateProductDiscInput(productDisc){
    let regex = /^[(A-Z)|(a-z)]{4,20}$/
    if(regex.test(productDisc)==true){
        console.log("true");
        ProductDiscriptionInput.classList.remove("is-invalid");
        ProductDiscriptionInput.classList.add("is-valid");
        // ProductDiscriptionInput.classList.replase("is-invalid","is-valid");
        alertDisc.classList.replace("visible", "d-none");
    }
    else{
        console.log("false");
        alertDisc.classList.replace("d-none","visible");
        ProductDiscriptionInput.classList.replace("is-valid","is-invalid");
    }
}

ProductDiscriptionInput.addEventListener("keyup", function(){
    validateProductDiscInput(ProductDiscriptionInput.value);
})



