let form = document.querySelector("form").addEventListener("submit", Myfunc);
async function Myfunc(e) {
  e.preventDefault();
  const ItemPrice = e.target.price.value;
  const ItemName = e.target.productName.value;
  const Itemcategory = e.target.category.value;
  const obj = {
    ItemName,
    ItemPrice,
    Itemcategory,
  };
  if (ItemName === "" || ItemPrice === "" || Itemcategory === "") {
    alert("please fill all fields");
  } else {
    try {
      await axios.post(
        `https://crudcrud.com/api/718e3debb5914a059e737cc271d0a26d/product/`,
        obj
      );
      window.location.reload();
    } catch (error) {
      console.log("error:", error);
    }
  }
}

async function getData() {
  try {
    let res = await axios.get(
      "https://crudcrud.com/api/718e3debb5914a059e737cc271d0a26d/product"
    );
    // console.log(res.data);
    Data(res.data);
  } catch (error) {
    console.log("error:", error);
  }
}

getData();

function Data(data) {
  data.forEach((el) => {
    // console.log(el);
    let electric = document.getElementById("Electronics");
    let Food = document.getElementById("Food");
    let Skincare = document.getElementById("Skincare");
    let li = document.createElement("li");
    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", async () => {
      try {
        let res = await axios.delete(
          `https://crudcrud.com/api/718e3debb5914a059e737cc271d0a26d/product/${el._id}`
        );
        // console.log(res);
        if (el.Itemcategory === "ElectronicsItems") {
          electric.removeChild(li);
        }
        if (el.Itemcategory === "FoodItems") {
          Food.removeChild(li);
        }
        if (el.Itemcategory === "SkincareItems") {
          Skincare.removeChild(li);
        }
      } catch (error) {
        console.log("error:", error);
      }
    });
    let edit = document.createElement("button");
    edit.innerText = "Edit";
    edit.addEventListener("click", async () => {
      try {
        await axios.delete(
          `https://crudcrud.com/api/718e3debb5914a059e737cc271d0a26d/product/${el._id}`
        );
        document.getElementById("productName").value = el.ItemName;
        document.getElementById("price").value = el.ItemPrice;
        document.getElementById("category").value = el.Itemcategory;
        if (el.Itemcategory === "ElectronicsItems") {
          electric.removeChild(li);
        }
        if (el.Itemcategory === "FoodItems") {
          Food.removeChild(li);
        }
        if (el.Itemcategory === "SkincareItems") {
          Skincare.removeChild(li);
        }
      } catch (error) {
        console.log("error:", error);
      }
    });
    li.innerText = `Product-Price : ${el.ItemPrice} ₹  ----- Product-Name : ${el.ItemName} ---- Product Category : ${el.Itemcategory}`;
    li.append(deleteBtn);
    li.append(edit);
    if (el.Itemcategory === "ElectronicsItems") {
      electric.append(li);
    }
    if (el.Itemcategory === "FoodItems") {
      Food.append(li);
    }
    if (el.Itemcategory === "SkincareItems") {
      Skincare.append(li);
    }
  });
}