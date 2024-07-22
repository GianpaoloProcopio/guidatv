import { useEffect, useState } from 'react';
import CardProgram from "./CardProgram";
import SkeletonApp from './SkeletonLista';

export default function ListaProgrammi({ c, day, ora, filtro, setCanale}) {
    const [listaProgrammi, setListaProgrammi] = useState([]);
    const [loading, setLoading] = useState(true);
    const programmi = JSON.parse(localStorage.getItem('listaProgrammi'));

    function getCurrentOra() {
        const now = new Date();
        let ora = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
        let minuti = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        return ora + ':' + minuti;
    }

    useEffect(() => {
        function getProgrammiOra(programmi, ora1, ora2) {
            return programmi.filter(programma => {
                return programma.canale === c.nome && programma.data === day && programma.ora >= ora1 && programma.ora < ora2;
            });
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
                    return programma.categoria === "Serie TV";
                });
            } else if (filtro === 4) {
                programmiFiltrati = programmiFiltrati.filter(programma => {
                    return programma.categoria === "Cartoni";
                });
            } else if (filtro === 5) {
                programmiFiltrati = programmiFiltrati.filter(programma => {
                    return programma.categoria === "Sport";
                });
            }
            return programmiFiltrati;
        }

        const n_programmi = getProgrammiFiltrati(programmi, ora, day, c.nome);
        setListaProgrammi(n_programmi);
        setLoading(false);
    }, [day, ora, filtro, c.nome, programmi]);

    

    return (
        <div className="container_programmi">
            <div className="text">
                <div className="logo">
                    <img src={c.logo} alt="logo" />
                </div>
                <div className="nome_canale">
                    <h2 onClick={() => setCanale(c)}>{c.nome}</h2>
                </div>
            </div>

            <div className="programmi">
                    {

                        loading ? (
                            <SkeletonApp/>
                        ) : (
                            listaProgrammi.length > 0 ? (
                                listaProgrammi.map((programma, index) => (
                                    <CardProgram oraInizio={programma.ora} oraFine={programma.oraFine} title={programma.titolo} key={index} />
                                ))
                            ) : (
                                <p>Nessun programma disponibile sul canale {c.nome}</p>
                            )
                        )
                        
                    }
                </div>
        </div>
    );
}

