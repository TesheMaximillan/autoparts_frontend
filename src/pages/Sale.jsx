import { useSelector } from "react-redux";
import MainBody from "../components/common/MainBody";
import MainContainer from "../components/common/MainContainer";
import Sidebar from "../components/common/Sidebar";
import TopBar from "../components/common/Topbar";
import SubContainer from "../components/common/SubContainer";
import Navbar3 from "../components/modules/Navbar3";
import Navio from "../components/modules/Navio";
import { FcSalesPerformance } from 'react-icons/fc';
const Sale = () => {
    const sales = useSelector((state) => state.sale.fetching);

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
            io: <p>Number</p>
        },
        {
            id: 2,
            name: 'Reference Number',
            io: <p>Ref Number</p>
        },{
            id: 3,
            name: 'PO Number',
            io: <p>PO Number</p>
        },
        {
            id: 4,
            name: 'Delivery Number',
            io: <p>Delivery Number</p>
        }
    ]
    const navcomp3 = [
        {
            id: 1,
            name: 'OtherCost',
            io: <p>Mark</p>,
        },
        {
            id: 2,
            name: 'withold',
            io: <p>Mark</p>,
        },
        {
            id: 3,
            name: 'Vat',
            io: <p>Mark</p>,
        },
        {
            id: 4,
            name: 'Date',
            io: <input type="date" name="date" id="date" />,
        }
    ]
    const navcomp4 = [
        {
            id: 1,
            name: 'Product Name',
            io: <input type="text" name="productName" id="productName" />,
        },
        {
            id: 2,
            name: 'Quantity',
            io: <input type="number" name="quantity" id="quantity" />,
        },
        {
            id: 3,
            name: 'Unit Price',
            io: <input type="number" name="unitPrice" id="unitPrice" />,
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
            <div className="w-full">
                <div className="flex">
                
                <div>
            <Navio data={navcomp1[0]} />
            <Navio data={navcomp1[1]} />
                </div>
                <div>
            <Navio data={navcomp2[0]} />
            <Navio data={navcomp2[1]} />
            <Navio data={navcomp2[3]} />
            </div>
            </div>
            <div className="flex">
            <Navio data={navcomp3[0]} />
            <Navio data={navcomp3[1]} />
            <Navio data={navcomp3[2]} />
            <Navio data={navcomp3[3]} />
            </div>
            <div className="flex">
            <Navio data={navcomp4[0]} />
            <Navio data={navcomp4[1]} />
            <Navio data={navcomp4[2]} />
            </div>
                {/* <MainBody>
               
                    </MainBody> */}
                    </div>
                    </MainBody>
                </SubContainer>
            </MainContainer>
        )
}
export default Sale;

