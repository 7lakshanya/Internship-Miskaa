import React, {useEffect, useState, useMemo} from "react";
import axios from "axios";
import { useTable } from "react-table";
import MainTable from "./MainTable";

function Table(){
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios({
            method: "get",
            url: "https://restcountries.com/v2/continent/asia",            
          })
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
    },[])
    const columns = useMemo(() => [
        {
          Header: "Name",
          accessor: "name",
        },
        {
          Header: "Capital",
          accessor:"capital",
          Cell: ({value})=>{if(value) return value;
            return "";
        }
        },
        {
            Header:"Population",
            accessor: "population",
        },
        {
            Header:"Flag",
            accessor:"flags",
            Cell:({value})=>{
                if(value){
                    console.log(value);
                    return(
                        <img src={value[0]} width={"70px"} height={"50px"} />
                    )
                }
                return ""
            }
        },
        {
            Header: "Region",
            accessor: "region",
        },
        {
            Header:"Borders",
            accessor:"borders",
            Cell:({value})=>{
                if(value){
                    let temp="";
                    const iterator = value.values();
                    for (const v of iterator) 
                      temp=temp+v+", ";
                return temp;
                }
                return "";
                
            }
        },
        {
            Header:"Languages",
            accessor:"languages",
            Cell:({value})=>{
                let temp="";
                if(value){
                value.forEach(v => {
                    temp= temp+ v.name+", ";
                });
                return temp;
            }
            return "";
            }
        },
      ]);
    
    return(
        <>
        {console.log("data")}
        {console.log(data)}
        <h2 style={{textAlign:"center"}}>Data for Asian Countries</h2>
        <br/>
        {(data.length===0)?<p style={{textAlign:"center"}}>Loading... (please wait) </p>:<MainTable data={data} columns={columns}/>}
        </>
    )
}
export default Table