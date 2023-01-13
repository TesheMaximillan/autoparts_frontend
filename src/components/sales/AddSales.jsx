import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BsFillCheckCircleFill } from "react-icons/bs";
import TransferProductList from "../stocks/TransferProductList";
import styles from "../stocks/TransferStock.module.scss";
import ListSales from "./ListSales";
import { hideNotification, showNotification } from "../../store/reducers/uiReducers";
import Notification from "../common/Notification";


const { form, container, formContainer, input, inputDate, inputp, inputq } =
  styles;

const AddSales = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.product.products);
  const [Sale, setSale] = useState({
    productName: "",
    quantity: 1,
    unitPrice: 70,
  });
  const [sendSale, setSendSale] = useState({
    // productName: "",
    // quantity: 1,
    // unitPrice: 0,
  });
  const isError = useSelector((state) => state.ui.notification.isError);

  // const initProduct = {
  //   productName: "",
  //   quantity: 1,
  //   unitPrice: 0,
  // }
  const [products, setProducts] = useState({});
  const [filteredProducts, setFilteredProducts] = useState({
    quantity: 0,
    selling: "0"});
  const [focus, setFocus] = useState(false);
  const [show, setShow] = useState(false);
  const handleProductClick = (id, name) => {
    setSale({
      ...Sale,
      productName: name,
      productID: id,
    });
    
  };
  const handleChange =  (e)  => {
    const { name, value } = e.target;
setSale({
  ...Sale,
  [name]: value,
});
    if (name === 'productName') {
      
      setFilteredProducts(productsData
        .filter((product) => product.name.toLowerCase().includes(value.toLowerCase())
        ));
          console.log("FILLTER, ITS DIFFERENT FROM 0 CONATINES THE FF", filteredProducts)
      //     setSale({...Sale,
      //       [unitPrice]: filteredProducts[0].selling,
      // })
      console.log("After updating Sale :",Sale)
        
        
    }
       
  }
  const handleInputBlur = () => {
    setFocus(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(filteredProducts.length !== 0) {  
      setSendSale({ ...sendSale, productName: Sale.productName,quantity: Sale.quantity,unitPrice: Sale.unitPrice })
      console.log("On Submit DataSAVED....SendSale: ", sendSale);
    }
    else{
      const message = "Please select a product";
     
        dispatch(showNotification({ message, isError: true, isOpen: false }));
        setTimeout(() => dispatch(hideNotification()), 3000);
  
    }
  }
    
   
  const handleInputFocus = () => {
    setFocus(true);
  };
  console.log("filteredProducts: ", filteredProducts);
 
  const { productName, quantity, unitPrice } = Sale;
  return (
    <>
     {isError && <Notification />}
      <form onSubmit={handleSubmit}>
        <div >
          <div className="flex">
            <label>Product Name</label>
            <input
              type="text"
              name="productName"
              value={productName}
              onChange={handleChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              className={`${input} ${inputp}`}
              placeholder="Name"
              required
            />
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={handleChange}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              className={`${input} ${inputp}`}
              placeholder="Name"
              required
            />
            <label>Unit Price</label>
            <input
              type="number"
              name="unitPrice"
              value={unitPrice}
              onChange={handleChange}
              className={`${input} ${inputq}`}
              placeholder="Quantity"
              required
            />
            <button type="submit" className="saveBtn">
              <BsFillCheckCircleFill />
            </button>
           
          </div>
        </div>
      </form>
      <div className="stockProducts">
        {focus && productName.trim() && (
          <TransferProductList
            products={filteredProducts}
            handleProductClick={handleProductClick}
          />
        )}
      </div>
      <ListSales products={sendSale}/>
    </>
  );
};
export default AddSales;
