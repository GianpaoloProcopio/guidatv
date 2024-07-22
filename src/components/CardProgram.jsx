export default function CardProgram({oraInizio, oraFine, title}){ 

    const now = new Date();
    let ora = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
    let minuti = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
    const current_ora = ora + ':' + minuti;

    function onClickTitle(){
        const ricercaUrl = `https://www.google.com/search?q=${encodeURIComponent(title)}`;
        window.open(ricercaUrl, '_blank');
    }

    if(oraInizio <= current_ora && oraFine > current_ora){
        
        return(
            <div className="card_program">

                <div className="ora red">
                    <h5>{oraInizio}</h5>
                </div>

                <div className="text">
                    <h4 onClick={ () => onClickTitle()}>{title}</h4>
                </div>
            </div>
        )
    }else{
        return(
            <div className="card_program">

                <div className="ora">
                    <h5>{oraInizio}</h5>
                </div>

                <div className="text">
                    <h4 onClick={ () => onClickTitle()}>{title}</h4>
                </div>
            </div>
        )
    }
   
}