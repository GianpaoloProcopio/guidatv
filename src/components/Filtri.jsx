export default function Filtri({filtro, setFiltro}){

    return(
        <div className="filtri" id="filtri">
            <h6 className={`filtro ${filtro === 1 ? 'h6-active' : ''}`} onClick={ () => setFiltro(1)}>TUTTI</h6>
            <h6 className={`filtro ${filtro === 2 ? 'h6-active' : ''}`} onClick={ () => setFiltro(2)}>FILM</h6>
            <h6 className={`filtro ${filtro === 3 ? 'h6-active' : ''}`} onClick={ () => setFiltro(3)}>SERIE</h6>
            <h6 className={`filtro ${filtro === 4 ? 'h6-active' : ''}`} onClick={ () => setFiltro(4)}>SPETTACOLO</h6>
            <h6 className={`filtro ${filtro === 5 ? 'h6-active' : ''}`} onClick={ () => setFiltro(5)}>SPORT</h6>
            <h6 className={`filtro ${filtro === 6 ? 'h6-active' : ''}`} onClick={ () => setFiltro(6)}>DOCUMENTARIO</h6>
        </div>
    )
}