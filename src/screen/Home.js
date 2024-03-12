import { useEffect, useState } from "react";
import Navbar from "../component/Navbar";
import SliderWithInfo from "../component/SliderWithInfo";
import Select from "../component/Select";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "../component/PieChart";
import { Pagination } from '@mui/material';

Chart.register(CategoryScale);


const Home = () => {  

  const [homevalue, setHomeValue] = useState(1700);  
  const [downPaymentValue, setDownPaymentValue] = useState(180);  
  const [loanAmountValue, setLoanAmountValue] = useState(1520);  
  const [interestValue, setInterestValue] = useState(2); // Yearly
  const [tenureParent, setTenureParent] = useState();
  const [monthlyInterest, setMonthlyInterest] = useState();

  const [chartData, setChartData] = useState({
    labels: ["Principal", "Interest"], 
    datasets: [
      {
        label: "Monthly Payment",
        data: [homevalue, 230],
        backgroundColor: [
          "#F00F00",
          "#FCFCFC",  
        ],
        borderColor: "black",
        borderWidth: 2
      }
    ]
  })


  
  useEffect(()=>{
 
    const downPayment = homevalue * 0.20
    setDownPaymentValue(downPayment)

   
    const loanAmount = homevalue - downPaymentValue
    setLoanAmountValue(loanAmount)
  },[homevalue])


  useEffect(()=>{
    const r = interestValue/12;
    const n = tenureParent * 12;
    const EMI = (loanAmountValue * r * (1 + r)^n) / ((1 + r)^n - 1)
    setMonthlyInterest(EMI)
  },[loanAmountValue, interestValue, tenureParent])

  return (
    <>
        <Navbar/>
        <div
            style={{
                display:'flex'
            }}
        >
            
            <div style={{width: '50%', padding: '0px 10px'}}>
                <SliderWithInfo title={"Home Value"} symbol={"$"} setValue={setHomeValue} value={homevalue} min={1000} max={10000}/>
                <SliderWithInfo title={"Down Payment"} symbol={"$"} setValue={setDownPaymentValue} value={downPaymentValue} min={0} max={homevalue}/>
                <SliderWithInfo title={"Loan Amount"} symbol={"$"} setValue={setLoanAmountValue} value={loanAmountValue} min={0} max={homevalue}/>
                <SliderWithInfo title={"Interest Rate"} symbol={"%"} setValue={setInterestValue} value={interestValue} min={2} max={18}/>
                <Select setTenureParent={setTenureParent}/>
            </div>
            
            <div style={{width: '50%'}}>
                <p style={{
                    textAlign:'center'
                }}>{monthlyInterest}</p>
                <PieChart chartData={chartData} />
                
                
            </div>
        </div>
    </>
  )
}

export default Home;