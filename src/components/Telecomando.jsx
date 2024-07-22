export default function Telecomando({canali, setCanale}){

    function closeMenu(){
        document.getElementById('menu_canali').style.display = 'none';
        document.getElementById('pellicola').style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    
    return(
        <div className="menu_canali" id="menu_canali">

            <div className="close">
                <h1>CANALI</h1>
                <span onClick={closeMenu} className="material-symbols-outlined close" >close</span>
            </div>

            <div className="canali">
                {
                    canali.length > 0 ? (
                        canali.map((canale, index) => (
                            <div className="canale" onClick={ () => {setCanale(canale); closeMenu();}} key={index}>
                                <img src={canale.logo} alt="logo" />
                                <h3>{canale.nome}</h3>
                                <h6>{canale.numero}</h6>
                            </div>
                        
                        ))
                    ) : (
                        <p>La lista è vuota</p>
                    )
                }
            </div>
        </div>
    );
}