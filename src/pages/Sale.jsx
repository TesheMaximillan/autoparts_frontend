import MainBody from "../components/common/MainBody";
import MainContainer from "../components/common/MainContainer";
import Sidebar from "../components/common/Sidebar";
import SubContainer from "../components/common/SubContainer";
import AddSales from "../components/sales/AddSales";

const Sale = () => {
    
        return (
            <MainContainer>
            <Sidebar />
          <SubContainer>
                <MainBody>
                    <div className="flex flex-col">

            <AddSales/>
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
