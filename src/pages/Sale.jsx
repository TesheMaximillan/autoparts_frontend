import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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
import ListSales from "../components/sales/ListSales";
import AddSales from "../components/sales/AddSales";

const Sale = () => {
    const dispatch = useDispatch();
    const sales = useSelector((state) => state.sale.fetching);
    const products = useSelector((state) => state.product.products);
    const [Sale,setSale] = useState({
        productName: '',
        quantity: 1,
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
              [productname] : value.id ,
                [quantity] : value.quantity,
                [selling] : value.selling,
            }));
          }
    };
 const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createSale(Sale));
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
        return (
            <MainContainer>
            <Sidebar />
          <SubContainer>
            <TopBar>  
            <Navbar3 title="Sales" icon={<FcSalesPerformance />}>
          </Navbar3>
                </TopBar>
                <MainBody>
                    <div className="flex flex-col">
            <form className="flex flex-col w-full bg-[#eceef3] mb-12 " onSubmit={handleSubmit}>
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
            </form>
            <div className="flex gap-2 w-full flex-wrap">
            <AddSales/>
            </div>
                {/* <MainBody>
               
                    </MainBody> */}
                  
                    <div  className="bg-[#ECEEF3]">
                        
                   
                    </div>
                    </div>
                    </MainBody>
                </SubContainer>
                
            </MainContainer>
        )
}
export default Sale;
