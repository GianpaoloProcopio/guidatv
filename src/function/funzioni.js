export function getData(xDay){
    const oggi = new Date();
    let giorno = oggi;  
    const g = new Date(giorno.setDate(oggi.getDate() + (xDay)));
    const day = g.getDate().toString().padStart(2, '0');
    const weekday = g.toLocaleDateString('it-IT', { weekday: 'long' }).toLowerCase();
    const month = g.toLocaleDateString('it-IT', { month: 'long' }).toLowerCase();
    const data =  weekday + ' ' + day + ' ' + month + ' ' + g.getFullYear();
    return data.replace(/ì/g, 'i');
}
