import { useEffect, useState } from 'react';
import CardProgram from "./CardProgram";
import Skeleton from './SkeletonLista';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "your-key",
    authDomain: "authDomain",
    projectId: "projectId"
};

const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);

export default function ListaProgrammi({ c, day, ora, filtro, changeCanale, type, checkLista }) {
    const [listaProgrammi, setListaProgrammi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sceltaOra, setSceltaOra] = useState(0);
    const [data, setData] = useState(null);
    const [canale, setCanale] = useState({});
    const [categoria, setCategoria] = useState(0);

    function getCurrentOra() {
        const now = new Date();
        let ora = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
        let minuti = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        return ora + ':' + minuti;
    }

    useEffect(() => {
        const lastOpen = localStorage.getItem('lastOpenDate');
        const current_date = new Date().toLocaleDateString();

        function getProgrammiOra(programmi, ora1, ora2) {
            return programmi.filter(programma => {
                return programma.canale === c.nome && programma.data === day && programma.ora >= ora1 && programma.ora < ora2;
            });
        }

        async function getProgrammiFromFirestore() {
            const programmiData = [];
            try {
                const programmiCollection = collection(firestore, 'programmi');
                const q = query(programmiCollection);
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    programmiData.push({ id: doc.id, ...doc.data() });
                });
                localStorage.setItem('listaProgrammi', JSON.stringify(programmiData));
            } catch (error) {
                throw error;
            }
        }

        function getProgrammiFiltrati(programmi, ora, data, canale) {
            const current_ora = getCurrentOra();
            let programmiFiltrati = programmi.filter(programma => {
                return programma.data === data && programma.canale === canale;
            });
            programmiFiltrati.sort((a, b) => a.id - b.id);

            if (programmiFiltrati.length === 0) {
                return programmiFiltrati;
            }

            if (ora === 1) {
                for (let i = 0; i < programmiFiltrati.length - 1; i++) {
                    const ora_inizio = programmiFiltrati[i].ora;
                    const ora_fine = programmiFiltrati[i + 1].ora;
                    let n_programmi = [];
                    if (ora_inizio <= current_ora && ora_fine > current_ora) {
                        n_programmi.push(programmiFiltrati[i]);
                        for (let k = 1; k < 4; k++) {
                            if (programmiFiltrati[i + k] !== null) {
                                n_programmi.push(programmiFiltrati[i + k]);
                            } else {
                                break;
                            }
                        }
                        programmiFiltrati = n_programmi;
                        break;
                    }
                }
            } else if (ora === 2) {
                programmiFiltrati = getProgrammiOra(programmi, '06:00', '13:29');
            } else if (ora === 3) {
                programmiFiltrati = getProgrammiOra(programmi, '13:30', '20:59');
            } else if (ora === 4) {
                programmiFiltrati = getProgrammiOra(programmi, '21:00', '23:59');
                if (programmiFiltrati.length === 0) {
                    programmiFiltrati = getProgrammiOra(programmi, '20:30', '23:59');
                }
            }

            if (filtro === 1) {
                programmiFiltrati = programmiFiltrati.filter(programma => {
                    return programma.data === data && programma.canale === canale;
                });
            } else if (filtro === 2) {
                programmiFiltrati = programmiFiltrati.filter(programma => {
                    return programma.categoria === "Film";
                });
            } else if (filtro === 3) {
                programmiFiltrati = programmiFiltrati.filter(programma => {
                    return programma.categoria === "Serie TV" || programma.categoria === "Sitcom";
                });
            } else if (filtro === 4) {
                programmiFiltrati = programmiFiltrati.filter(programma => {
                    return programma.categoria === "SHOW" || programma.categoria === "Talk show" || programma.categoria === "Gioco a quiz";
                });
            } else if (filtro === 5) {
                programmiFiltrati = programmiFiltrati.filter(programma => {
                    return programma.categoria === "sport";
                });
            } else if (filtro === 6) {
                programmiFiltrati = programmiFiltrati.filter(programma => {
                    return programma.categoria === "Real TV" || programma.categoria === "Documentario";
                });
            }

            if (programmiFiltrati.length > 0) {
                programmiFiltrati.sort((a, b) => a.id - b.id);
            }

            return programmiFiltrati;
        }

        function checkProgramAvailable() {
            let check = false;
            const programmi = JSON.parse(localStorage.getItem('listaProgrammi'));

            if (programmi !== null && programmi.length > 0) {
                check = true;
            } else {
                checkLista(false);
            }

            return check;
        }

        const fetchData = async () => {
            setLoading(true);

            try {
                if (lastOpen !== current_date || !checkProgramAvailable()) {
                    console.log('Recupero dati');
                    localStorage.setItem('lastOpenDate', current_date);
                    await getProgrammiFromFirestore();
                }
                
                const all_programs = JSON.parse(localStorage.getItem('listaProgrammi'));

                if (all_programs !== null && all_programs.length > 0) {
                    if (data !== day || sceltaOra !== ora || canale !== c.nome || categoria !== filtro) {
                        setData(day);
                        setSceltaOra(ora);
                        setCanale(c ? c.nome : null);
                        setCategoria(filtro);
                        const programmi = getProgrammiFiltrati(all_programs, ora, day, c.nome);
                        setListaProgrammi(programmi);
                    }
                }

                setLoading(false);
            } catch (error) {
                console.error("Errore durante il recupero dei dati:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [day, ora, c, data, sceltaOra, canale, filtro, categoria]);

    return (
        <div className="container_programmi">
            <div className="text">
                <div className="logo">
                    <img src={c.logo} alt="logo" />
                </div>
                <div className="nome_canale">
                    <h2 onClick={() => changeCanale(c)}>{c.nome}</h2>
                </div>
            </div>

            <div className="programmi">
                {
                    loading ? (
                        <Skeleton />
                    ) : listaProgrammi.length > 0 ? (
                        listaProgrammi.map((programma, index) => (
                            <CardProgram oraInizio={programma.ora} oraFine={programma.oraFine} title={programma.titolo} key={index} />
                        ))
                    ) : (
                        <p>Nessun programma disponibile con filtro: {filtro} sul canale {c.nome}</p>
                    )
                }
            </div>
        </div>
    );
}
