export default function Orari({setOra, oraHome}){

    function handleChangeOra(xOra){
        setOra(xOra);
    }

    return(
        <div className="orari">

            <div className="container-orari">

                <div className={`ora ${oraHome === 0 ? 'ora-active' : ''}`} id="ora-tutte" onClick={() => handleChangeOra(0)}>
                <span class="material-symbols-outlined">brightness_6</span>
                    <h3>Tutte</h3>
                </div>

                <div className={`ora ${oraHome === 1 ? 'ora-active' : ''}`} id="ora-adesso" onClick={() => handleChangeOra(1)}>
                    <span className="material-symbols-outlined">schedule</span>
                    <h3>Adesso</h3>
                </div>

                <div className={`ora ${oraHome === 2 ? 'ora-active' : ''}`} id="ora-mattina" onClick={() => handleChangeOra(2)}>
                    <span className="material-symbols-outlined">wb_twilight</span>
                    <h3>Mattina</h3>
                </div>
                
                <div className={`ora ${oraHome === 3 ? 'ora-active' : ''}`} id="ora-pomeriggio" onClick={() => handleChangeOra(3)}>
                    <span className="material-symbols-outlined">light_mode</span>
                    <h3>Pomeriggio</h3>
                </div>
                
                <div className={`ora ${oraHome === 4 ? 'ora-active' : ''}`} id="ora-sera" onClick={() => handleChangeOra(4)}>
                    <span className="material-symbols-outlined">nightlight</span>
                    <h3>Sera</h3>
                </div>

            </div>

        </div>
    )
}