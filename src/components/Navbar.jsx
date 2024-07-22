import { useState } from "react";
import {getData} from "../function/funzioni.js";

function Navbar({setDay, setOra, setFiltro, setCanale}) {

    const [currentDay, setCurrentDay] = useState('OGGI');
    const [contDay, setContDay] = useState(0);
    
    function splitYears(xDay){
        return xDay.split(' ').slice(0, -1).join(' ');
    }

    function handleChangeDay(k){
        if(k === 'dx'){
            if(contDay >= 0 && contDay < 6){
                const cont = contDay;
                setContDay(cont+1);
                let xDay = getData(cont+1);
                setDay(xDay)
                if(contDay === 0){
                    setCurrentDay('DOMANI');
                }else{
                    setCurrentDay(splitYears(xDay));
                }

            }
        }else{
            if(k === 'sx'){
                if(contDay >= 1 && contDay < 7){
                    const cont = contDay;
                    setContDay(cont-1);
                    let xDay = getData(cont-1);
                    setDay(xDay)
                    if(contDay === 1){
                        setCurrentDay('OGGI');
                    }else{
                        if(contDay === 2){
                            setCurrentDay('DOMANI');
                        }else{
                            setCurrentDay(splitYears(xDay));
                        }
                    }
                }
            }
        }
    }

    return(
        <nav>
            <div className="navbar">
                
                <div className="menu-home">
                    <span onClick={() => {setOra(1); setFiltro(1); setCanale([])}} className="material-symbols-outlined">home</span>
                </div>

                <div className="text">

                    <div className="left">
                        <span onClick={() => handleChangeDay('sx')} className="material-symbols-outlined">arrow_back_ios</span>
                    </div>

                    <div className="day">
                        <h3>{currentDay}</h3>
                    </div>

                    <div className="right">
                        <span onClick={() => handleChangeDay('dx')} className="material-symbols-outlined">arrow_forward_ios</span>
                    </div>
                </div>
                
                <div></div>
            </div>
        </nav>
    )
}

export default Navbar;