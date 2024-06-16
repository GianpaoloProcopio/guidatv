import {useState, useEffect} from 'react';
import Navbar from './components/Navbar';
import Orari from './components/Orari';
import Telecomando from './components/Telecomando';
import ListaProgrammi from './components/ListaProgrammi';
import Filtri from './components/Filtri';
import SkeletonApp from './components/SkeletonApp';
import {getData} from "./function/funzioni";

function App(){
    const [canali] = useState(
        [
            {
                'numero': 1,
                'nome': 'Rai1',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Rai_1_-_Logo_2016.svg/1200px-Rai_1_-_Logo_2016.svg.png'
            },{
                'numero': 2,
                'nome': 'Rai2',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Rai_2_-_Logo_2016.svg/2560px-Rai_2_-_Logo_2016.svg.png'
            },{
                'numero': 3,
                'nome': 'Rai3',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Rai_3_logo.svg/2560px-Rai_3_logo.svg.png'
            },{
                'numero': 4,
                'nome': 'Rete4',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Rete_4_logo_1999.svg/1200px-Rete_4_logo_1999.svg.png'
            },{
                'numero': 5,
                'nome': 'Canale5',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Canale_5_-_2018_logo.svg/1200px-Canale_5_-_2018_logo.svg.png'
            },{
                'numero': 6,
                'nome': 'Italia1',
                'logo': 'https://upload.wikimedia.org/wikipedia/it/thumb/3/30/Logo_Italia_1.svg/1200px-Logo_Italia_1.svg.png'
            },{
                'numero': 7,
                'nome': 'La7',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/LA7_-_Logo_2011.svg/1200px-LA7_-_Logo_2011.svg.png'
            },{
                'numero': 8,
                'nome': 'Canale8',
                'logo': 'https://upload.wikimedia.org/wikipedia/it/thumb/6/6d/TV8_Logo_2016.svg/1200px-TV8_Logo_2016.svg.png'
            },{
                'numero': 9,
                'nome': 'Nove',
                'logo': 'https://d2v9mhsiek5lbq.cloudfront.net/eyJidWNrZXQiOiJsb21hLW1lZGlhLWl0Iiwia2V5Ijoibm92ZS1pbWFnZS1jZDNiYmQ1OS0zNzdlLTQ3OWQtOGFiZi00OWI4MmYyMWY1MjcuanBnIiwiZWRpdHMiOnsicmVzaXplIjp7ImZpdCI6ImNvdmVyIiwid2lkdGgiOjE5MjAsImhlaWdodCI6MTA4MH0sImpwZWciOnsicXVhbGl0eSI6NTUsInByb2dyZXNzaXZlIjp0cnVlfX19'
            },{
                'numero': 20,
                'nome': 'Mediaset20',
                'logo': 'https://upload.wikimedia.org/wikipedia/it/thumb/e/e4/20_Mediaset_-_Logo_2018.svg/800px-20_Mediaset_-_Logo_2018.svg.png'
            },{
                'numero': 21,
                'nome': 'Rai4',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Rai_4_-_Logo_2016.svg/1200px-Rai_4_-_Logo_2016.svg.png'
            },{
                'numero': 22,
                'nome': 'Iris',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/9/98/Iris_logo_2013.svg'
            },{
                'numero': 23,
                'nome': 'Rai5',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Rai_5_logo.svg/1280px-Rai_5_logo.svg.png'
            },{
                'numero': 24,
                'nome': 'RaiMovie',
                'logo': 'https://confindustriaradiotv.it/wp-content/uploads/2019/04/Rai-Movie.jpg'
            },{
                'numero': 25,
                'nome': 'RaiPremium',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Rai_Premium_Logo_%282010%29.svg/1280px-Rai_Premium_Logo_%282010%29.svg.png'
            },{
                'numero': 26,
                'nome': 'Cielo',
                'logo': 'https://upload.wikimedia.org/wikipedia/it/thumb/6/61/Cielo_TV_logo.svg/1280px-Cielo_TV_logo.svg.png'
            },{
                'numero': 27,
                'nome': 'TwentySeven',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Twentyseven_logo.svg/1200px-Twentyseven_logo.svg.png'
            },{
                'numero': 30,
                'nome': 'La5',
                'logo': 'https://upload.wikimedia.org/wikipedia/it/thumb/6/64/La5_Italy.svg/1200px-La5_Italy.svg.png'
            },{
                'numero': 31,
                'nome': 'RealTime',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Real_Time_logo.svg/2560px-Real_Time_logo.svg.png'
            },{
                'numero': 35,
                'nome': 'Focus',
                'logo': 'https://upload.wikimedia.org/wikipedia/it/thumb/1/11/Focus_Logo.svg/1200px-Focus_Logo.svg.png' 
            },{
                'numero': 49,
                'nome': 'Italia2',
                'logo': 'https://upload.wikimedia.org/wikipedia/it/thumb/c/c5/Logo_Italia2.svg/1059px-Logo_Italia2.svg.png'
            },{
                'numero': 52,
                'nome': 'DMax',
                'logo': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/DMAX_-_Logo_2016.svg/1200px-DMAX_-_Logo_2016.svg.png'
            },{
                'numero': 59,
                'nome': 'MotorTrend',
                'logo': 'https://play-lh.googleusercontent.com/_4eySUbB4EybnxAvbvB0iNco-LqD2dRNzpzuORIwUGKHcnbgP_5T9zQUQ1KBvRFkEmUp'
            }
        ]
    );

    const [day, setDay] = useState(getData(0));
    const [ora, setOra] = useState(1);
    const [canale, setCanale] = useState([]);
    const [filtro, setFiltro] = useState(1);
    const [loading, setLoading] = useState(true);
    const [checkLista, setCheckLista] = useState(true);

    function changeDay(xDay) {
        if (day !== xDay) {
            setDay(xDay);
        }
    }

    function changeOra(xOra) {
        if (ora !== xOra) {
            setOra(xOra);
        }
    }

    function changeCanale(xCanale) {
        if (canale.numero !== xCanale.numero) {
            setCanale(xCanale);
        }
    }

    function changeFiltro(xFiltro) {
        if (filtro !== xFiltro) {
            setFiltro(xFiltro);
        }
    }

    function changeCheckLista(xCheckLista) {
        if (checkLista !== xCheckLista) {
            setCheckLista(xCheckLista);
        }
    }

    function openMenuCanali() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
          });
        document.getElementById('menu_canali').style.display = 'block';
        document.getElementById('pellicola').style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    useEffect(() => {
        setTimeout(() => setLoading(false), 1500);
    }, []);

    if (checkLista) {
        if (canale.length === 0) {
            return (
                <div className='home'>
                    <Navbar changeDay={changeDay} changeOra={changeOra} changeFiltro={changeFiltro} setCanale={setCanale} />
                    <Telecomando canali={canali} changeCanale={changeCanale} />
                    <div className='app'>
                        <div className='pellicola' id='pellicola'></div>
                        <Orari changeOra={changeOra} oraHome={ora} />
                        <Filtri filtro={filtro} changeFiltro={changeFiltro} />

                        <div className='lista_programmi'>
                            {
                                loading ? (
                                    <SkeletonApp />
                                ) : (
                                    canali.length > 0 ? (
                                        canali.map((canale, index) => (
                                            <ListaProgrammi c={canale} day={day} ora={ora} filtro={filtro} changeCanale={changeCanale} type={false} checkLista={changeCheckLista} key={index} />
                                        ))
                                    ) : (
                                        <h1>Nessun canale disponibile</h1>
                                    )
                                )
                            }
                        </div>

                        <div className="telecomando" onClick={openMenuCanali}>
                            <span className="material-symbols-outlined">remote_gen</span>
                        </div>
                    </div>
                </div>
            );
        } else {
            return (
                <div className='home'>
                    <Navbar changeDay={changeDay} changeOra={changeOra} changeFiltro={changeFiltro} setCanale={setCanale} />
                    <Telecomando canali={canali} changeCanale={changeCanale} />
                    <div className='app'>
                        <div className='pellicola' id='pellicola'></div>
                        <Orari changeOra={changeOra} oraHome={ora} />
                        <Filtri filtro={filtro} changeFiltro={changeFiltro} />
                        {
                            loading ? (
                                <SkeletonApp />
                            ) : (
                                <div className='lista_programmi'>
                                    <ListaProgrammi c={canale} day={day} ora={ora} type={true} filtro={filtro} />
                                </div>
                            )
                        }

                        <div className="telecomando" onClick={openMenuCanali}>
                            <span className="material-symbols-outlined">remote_gen</span>
                        </div>
                    </div>
                </div>
            );
        }
    } else {
        return (
            <div className="home">
                <Navbar changeDay={changeDay} changeOra={changeOra} changeFiltro={changeFiltro} setCanale={setCanale} />
                <div className="app">
                    <Orari changeOra={changeOra} oraHome={ora} />
                    <Filtri filtro={filtro} changeFiltro={changeFiltro} />

                    <div className="error">
                        <h1>Nessun programma disponibile</h1>
                        <h1>{day}</h1>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
