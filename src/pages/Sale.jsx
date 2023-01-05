import { useState } from "react";
import { useSelector } from "react-redux";
import MainBody from "../components/common/MainBody";
import MainContainer from "../components/common/MainContainer";
import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/common/Topbar";
import SubContainer from "../components/common/SubContainer";
import Navbar3 from "../components/modules/Navbar3";
import Navio from "../components/modules/Navio";
import { FcSalesPerformance } from 'react-icons/fc';
import Select from 'react-select';
import { createSale } from "../store/actions/saleActions";

const Sale = () => {
    const sales = useSelector((state) => state.sale.fetching);


    const products = useSelector((state) => state.product.products);
    const [Sale,setSale] = useState({
        productName: '',
        quantity: 0,
        unitPrice: 0,
 });
    const handleOnchange = (selectedSale) => {
        const {value} = selectedSale.target;
        const {name} = selectedSale.target;
        setSale((selectedSale) => ({...selectedSale,
            [name] : value,
         }));
    };
    const handleSelectChange = (selectedOption) => {
        if (selectedOption) {
            const value = selectedOption;
            const productname = 'productName';
            const quantity = 'quantity';
            const selling= 'unitPrice';
            setSale((currentSale) => ({...currentSale,
              [productname] : value.name ,
                [quantity] : value.quantity,
                [selling] : value.selling,
            }));
          }
    };
 const handleSubmit = (e) => {
    e.preventDefault();
    createSale(Sale);
    console.log("SAVED SALE", sales)
    };
    const navcomp1 = [
        {
            id: 1,
            name: 'Customer Name',
            io: <input type="text" name="customerName" id="customerName" />,

        },
        {
            id: 2,
            name: 'Recived By',
            io: <input type="text" name="recivedBy" id="recivedBy" />
        }
    ]
    const navcomp2 = [
       
        {
            id: 1,
            name:'Transaction Number',
            io: <p>Num1</p>
        },
        {
            id: 2,
            name: 'Reference Number',
            io: <p>Num2</p>
        },{
            id: 3,
            name: 'PO Number',
            io: <p>Num3</p>
        },
        {
            id: 4,
            name: 'Delivery Number',
            io: <p>Num</p>
        }
    ]
    const navcomp3 = [
        {
            id: 1,
            name: 'OtherCost',
            io: <input type="checkbox" name="otherCost" />,
        },
        {
            id: 2,
            name: 'withold',
            io: <input type="checkbox" name="withold" />,
        },
        {
            id: 3,
            name: 'Vat',
            io: <input type="checkbox" name="vat" />,
        },
        {
            id: 4,
            name: 'Date',
            io: <input type="date" name="date" id="date" />,
        }
    ]
    const {productName , quantity, unitPrice} = Sale;
    const navcomp4 = [
        {
            id: 1,
            name: 'productName',
            io: <Select
            name="productName"
            options={products}
            getOptionLabel={option => option.name}
            getOptionValue={option => option.id}
            onChange={handleSelectChange}
          />,
        },
        {
            id: 2,
            name: 'Quantity',
            io: <input type="number" name="quantity" id="quantity" min="1" max={Sale.quantity} value={quantity} onChange={handleOnchange} />,
        },
        {
            id: 3,
            name: 'Unit Price',
            io: <input type="number" name="unitPrice" id="unitPrice" value={unitPrice} min={Sale.unitPrice} onChange={handleOnchange} />,
        },
        {
            id: 4,
            name: '',
            io: <button type="submit" className="bg-black text-white font-bold rounded h-12 w-24 text-3xl" >Add</button>
        }
    ]
    
        return (
            <MainContainer>
            <Sidebar />
          <SubContainer>
            <TopBar>  
            <Navbar3 title="Sales" icon={<FcSalesPerformance />}>
          </Navbar3>
                </TopBar>
                <MainBody>
            <form className="flex flex-col w-full bg-[#eceef3]" onSubmit={handleSubmit}>
                <div className="flex gap-20 pt-3 w-96">
                
                <div className="flex flex-col gap-[4%] w-full">
            <Navio data={navcomp1[0]} />
            <Navio data={navcomp1[1]} />
                </div>
                <div className="flex flex-col">
            <Navio data={navcomp2[0]} />
            <Navio data={navcomp2[1]} />
            <Navio data={navcomp2[3]} />
            </div>
            </div>
            <div className="flex pt-3 pb-3 w-full flex-wrap">
            <Navio data={navcomp3[0]} />
            <Navio data={navcomp3[1]} />
            <Navio data={navcomp3[2]} />
            <Navio data={navcomp3[3]} />
            </div>
            <div className="flex gap-2 w-full flex-wrap">
            <Navio data={navcomp4[0]} />
            <Navio data={navcomp4[1]} />
            <Navio data={navcomp4[2]} />
            <Navio data={navcomp4[3]} />
            </div>
                {/* <MainBody>
               
                    </MainBody> */}
                    </form>
                    </MainBody>
                </SubContainer>
            </MainContainer>
        )
}
export default Sale;
