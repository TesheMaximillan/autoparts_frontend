import React,  { useState , forwardRef, useImperativeHandle} from 'react'
import { useDispatch, useSelector  } from 'react-redux';
import { FcSalesPerformance } from 'react-icons/fc';
import { createTransactions } from '../../store/actions/TransactionActions';
import Navbar3 from '../modules/Navbar3';
import Navio from '../modules/Navio';
import TopBar from "../common/Topbar";

const Addtransctions = (props, ref) => {
    const dispatch = useDispatch();
    const sales = useSelector((state) => state.sale.fetching);
    const products = useSelector((state) => state.product.products);
    const [transaction,settransaction] = useState({
        customer: '',
        recivedBy: '',
        transactionNumber: 'T1',
        referenceNumber: 'G10',
        poNumber: 'PO1',
        deliveryNumber: 'D40',
        othercost: 1,
        withold: 1,
        vat: 1,
        date: new Date().toISOString().slice(0, 10),
        status: 'cash',
 });
 const [sendTransaction, setSendTransaction] = useState({});

const handletransaction = () => {
    setSendTransaction({...setSendTransaction, 
        customer: transaction.customer,
        received_by: transaction.recivedBy,
        transaction_number: transaction.transactionNumber,
        reference_number: transaction.referenceNumber,
        po_number: transaction.poNumber,
        delivery_number: transaction.deliveryNumber,
        other_costs: transaction.othercost,
        withold: transaction.withold,
        vat: transaction.vat,
        date: transaction.date,
        status: transaction.status,
            })
}
 const handleSubmit = async () => {
 
    console.log("Transaction HANDLE SUBMIT CALLED SUCESSSSSS SENDING date to back-end", transaction);
   
        dispatch(createTransactions(sendTransaction));
   
 }

    useImperativeHandle(ref, () => ({
        handleSubmit,
        handletransaction
      }));
      

    const handleOnchange = (selectedSale) => {
        const {value} = selectedSale.target;
        const {name} = selectedSale.target;
        settransaction((selectedtransaction) => ({...selectedtransaction,
            [name] : value,
         }));
         console.log("*** Transaction: ***", transaction);
    };
    const {customer,recivedBy,transactionNumber,referenceNumber,poNumber,deliveryNumber,othercost,withold,vat,date} = transaction;
    const navcomp1 = [
        {
            id: 1,
            name: 'Customer Name',
            io: <input type="text" value={customer} onChange={handleOnchange} required name="customer" id="customerName" />,

        },
        {
            id: 2,
            name: 'Recived By',
            io: <input type="text" value={recivedBy} onChange={handleOnchange} required name="recivedBy" id="recivedBy" />
        }
    ]
    const navcomp2 = [
       
        {
            id: 1,
            name:'Transaction Number',
            io: <p>{transactionNumber}</p>
        },
        {
            id: 2,
            name: 'Reference Number',
            io: <p>{referenceNumber}</p>
        },{
            id: 3,
            name: 'PO Number',
            io: <p>{poNumber}</p>
        },
        {
            id: 4,
            name: 'Delivery Number',
            io: <p>{deliveryNumber}</p>
        }
    ]
    const navcomp3 = [
        {
            id: 1,
            name: 'OtherCost',
            io: <input checked={othercost} onChange={handleOnchange} type="checkbox" name="othercost" />,
        },
        {
            id: 2,
            name: 'withold',
            io: <input value={withold} onChange={handleOnchange} type="checkbox" name="withold" />,
        },
        {
            id: 3,
            name: 'Vat',
            io: <input value={vat} onChange={handleOnchange} type="checkbox" name="vat" />,
        },
        {
            id: 4,
            name: 'Date',
            io: <input  value={date} onChange={handleOnchange} type="date" name="date" id="date" />,
        }
    ]
  return (
    <div>
         <TopBar>  
            <Navbar3 title="Sales" icon={<FcSalesPerformance />}>
          </Navbar3>
                </TopBar>
            <div className="flex flex-col w-full bg-[#eceef3] mb-12 ">
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
            </div>
    </div>
  )
}
export default forwardRef(Addtransctions);