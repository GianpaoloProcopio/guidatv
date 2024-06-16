import bs4
import requests
import re
import firebase_admin
import pytz
from datetime import datetime, timedelta
from firebase_admin import credentials, firestore

cred = credentials.Certificate("python/credentials.json")
firebase_admin.initialize_app(
    cred, {
        "databaseURL":
        "url"
    })
db = firestore.client()
programma_ref = db.collection("programmi")

lista_canali = [{
    'numero': 1,
    'canale': 'Rai1',
    'url': 'rai1.html#pal',
    'url2': 'rai_1'
}, {
    'numero': 2,
    'canale': 'Rai2',
    'url': 'rai2.html#pal',
    'url2': 'rai_2'
}, {
    'numero': 3,
    'canale': 'Rai3',
    'url': 'rai3.html#pal',
    'url2': 'rai_3'
}, {
    'numero': 4,
    'canale': 'Rete4',
    'url': 'rete4.html#pal',
    'url2': 'rete4'
}, {
    'numero': 5,
    'canale': 'Canale5',
    'url': 'canale5.html#pal',
    'url2': 'canale5'
}, {
    'numero': 6,
    'canale': 'Italia1',
    'url': 'italia1.html#pal',
    'url2': 'italia_1'
}, {
    'numero': 7,
    'canale': 'La7',
    'url': 'la7.html#pal',
    'url2': 'la7'
}, {
    'numero': 8,
    'canale': 'Canale8',
    'url': 'tv8.html#pal',
    'url2': 'tv8'
}, {
    'numero': 9,
    'canale': 'Nove',
    'url': 'nove.html#pal',
    'url2': 'nove_tv'
}, {
    'numero': 20,
    'canale': 'Mediaset20',
    'url': 'canale20mediaset.html#pal',
    'url2': 'null-canale20mediaset.html#pal'
}, {
    'numero': 21,
    'canale': 'Rai4',
    'url': 'rai4.html#pal',
    'url2': 'rai_4'
}, {
    'numero': 22,
    'canale': 'Iris',
    'url': 'iris.html#pal',
    'url2': 'iris'
}, {
    'numero': 23,
    'canale': 'Rai5',
    'url': 'rai5.html#pal',
    'url2': 'rai_5'
}, {
    'numero': 24,
    'canale': 'RaiMovie',
    'url': 'raimovie.html#pal',
    'url2': 'raisat_movie'
}, {
    'numero': 25,
    'canale': 'RaiPremium',
    'url': 'rai_premium.html#pal',
    'url2': 'raisat_premium'
}, {
    'numero': 26,
    'canale': 'Cielo',
    'url': 'cielo.html#pal',
    'url2': 'cielo'
}, {
    'numero': 27,
    'canale': 'TwentySeven',
    'url': 'twentyseven.html#pal',
    'url2': 'null-twentyseven.html#pal'
}, {
    'numero': 30,
    'canale': 'La5',
    'url': 'la5.html#pal',
    'url2': 'la5'
}, {
    'numero': 31,
    'canale': 'RealTime',
    'url': 'realtime.html#pal',
    'url2': 'discovery_real_time'
}, {
    'numero': 35,
    'canale': 'Focus',
    'url': 'focustv.html#pal',
    'url2': 'focus'
}, {
    'numero': 49,
    'canale': 'Italia2',
    'url': 'italia2.html#pal',
    'url2': 'italia2'
}, {
    'numero': 52,
    'canale': 'DMax',
    'url': 'dmax.html#pal',
    'url2': 'dmax'
}, {
    'numero': 56,
    'canale': 'MotorTrend',
    'url': 'motor_trend.html#pal',
    'url2': 'null-motor_trend.html#pal'
}]

giorni_settimana = [{
    'numero': 0,
    'giorno': 'lunedi',
    'day': 'Monday'
}, {
    'numero': 1,
    'giorno': 'martedi',
    'day': 'Tuesday'
}, {
    'numero': 2,
    'giorno': 'mercoledi',
    'day': 'Wednesday'
}, {
    'numero': 3,
    'giorno': 'giovedi',
    'day': 'Thursday'
}, {
    'numero': 4,
    'giorno': 'venerdi',
    'day': 'Friday'
}, {
    'numero': 5,
    'giorno': 'sabato',
    'day': 'Saturday'
}, {
    'numero': 6,
    'giorno': 'domenica',
    'day': 'Sunday'
}]

lista_mesi = [{
    'numero': 1,
    'mese': 'gennaio'
}, {
    'numero': 2,
    'mese': 'febbraio'
}, {
    'numero': 3,
    'mese': 'marzo'
}, {
    'numero': 4,
    'mese': 'aprile'
}, {
    'numero': 5,
    'mese': 'maggio'
}, {
    'numero': 6,
    'mese': 'giugno'
}, {
    'numero': 7,
    'mese': 'luglio'
}, {
    'numero': 8,
    'mese': 'agosto'
}, {
    'numero': 9,
    'mese': 'settembre'
}, {
    'numero': 10,
    'mese': 'ottobre'
}, {
    'numero': 11,
    'mese': 'novembre'
}, {
    'numero': 12,
    'mese': 'dicembre'
}]

guida = 'python/guida.txt'


#inserisce un programma nel database
def inserisciProgramma(canale, numero, data, id, ora, oraFine, titolo, categoria):
  programma_ref.add({
      "canale": canale,
      "numero": numero,
      "data": data,
      "id": id,
      "ora": ora,
      "oraFine": oraFine,
      "titolo": titolo,
      "categoria": categoria
  })


#legge il file python/guida.txt ed inserisce tutti i programmi cotenuti nel file nel database
def addProgrammiDb():
  with open(guida, 'r', encoding='utf-8') as file:
    lines = file.readlines()

    current_canale = None
    current_numero_canale = None
    current_data = None
    current_ora = None
    current_oraFine = None
    current_titolo = None
    current_categoria = None
    current_id = None

    for line in lines:
      stripped_line = line.strip()
      if not stripped_line:
        continue

      if stripped_line.startswith("canale | "):
        current_canale = stripped_line[len("canale | "):]
        if current_canale == "":
          current_canale = "Canale"

      elif stripped_line.startswith("numeroCanale | "):
        current_numero_canale = stripped_line[len("numeroCanale | "):]
        if current_numero_canale == "":
          current_numero_canale = "Numero"

      elif stripped_line.startswith("data | "):
        current_data = stripped_line[len("data | "):]
        if current_data == "":
          current_data = "Data"

      elif stripped_line.startswith("id | "):
        current_id = stripped_line[len("id | "):]
        if current_id == "":
          break

      elif stripped_line.startswith("ora | "):
        current_ora = stripped_line[len("ora | "):]
        if current_ora == "":
          current_ora = "Ora"

      elif stripped_line.startswith("oraFine | "):
        current_oraFine = stripped_line[len("oraFine | "):]
        if current_oraFine == "":
          current_oraFine = "OraFine"

      elif stripped_line.startswith("titolo | "):
        current_titolo = stripped_line[len("titolo | "):]
        if current_titolo == "":
          current_titolo = "Titolo"

      elif stripped_line.startswith("categoria | "):
        current_categoria = stripped_line[len("categoria | "):]
        if current_categoria == "":
          current_categoria = "Categoria"

        if current_canale and current_numero_canale and current_data and current_id and current_ora and current_oraFine and current_titolo and current_categoria:
          inserisciProgramma(current_canale, current_numero_canale, current_data, int(current_id), current_ora, current_oraFine, current_titolo, current_categoria)
          print("\r" + " " * 40, end='')
          print("\r" + current_canale + " " + str(current_data), end='')

        else:
          print("Errore: mancano informazioni.")
      else:
        print(line)

    print("\nInserimento completato.")


#scansiona la pagina del sito staseraInTV
def scanPage(url):
  res = requests.get(url)

  try:
    res.raise_for_status()
  except Exception as exc:
    print(f'Si è verificato questo problema: {exc}')

  html_page = bs4.BeautifulSoup(res.text, 'html.parser')

  ora = html_page.select('.listingbox')

  t = ''

  for x in ora:
    text_element = x.getText()
    t = t + text_element + ' '

  pattern = r'(\d{1,2}:\d{2}) - ([^0-9]+)'
  matches = re.findall(pattern, t)
  programmi = [{
      "ora": match[0],
      "titolo": match[1].strip(),
      "categoria": 'categoria'
  } for match in matches]

  return programmi


#scansiona la pagina del sito guidatv.quotidiano
def scanPage2(url):
  res = requests.get(url)

  if 'null-' in url:
    url = url.replace('null-', '')
    scanPage(url)
  else:
    try:
      res.raise_for_status()
    except Exception as exc:
      print(f'Si è verificato questo problema: {exc}')

    html_page = bs4.BeautifulSoup(res.text, 'html.parser')

    program_elements = html_page.select('div.programs a.program')

    programmi = []

    for program_element in program_elements:
      ora = program_element.select_one('div.hour').text
      categoria = program_element.select_one('div.program-category').text
      titolo = program_element.select_one('div.program-title').text

      if ora == 'IN ONDA':
        local_timezone = pytz.timezone('Europe/Rome')
        current_time = datetime.now(local_timezone)
        ora = current_time.strftime('%H:%M')

      if titolo == "":
        titolo = "Titolo"
      
      if categoria == "":
        categoria = "Categoria"

      programma = {"ora": ora, "titolo": titolo, "categoria": categoria}

      programmi.append(programma)

    return programmi

#salva i programmi delle pagine web nel file di testo indicato
def salvaText(canale, numeroCanale, data, lista, testo):
  testo.write('canale | ' + canale + '\n')
  testo.write('numeroCanale | ' + str(numeroCanale) + '\n')
  testo.write('data | ' + data + '\n')
  i = 0
  for programma in lista:
    testo.write('id | ' + str(i) + '\n')
    testo.write('ora | ' + programma['ora'] + '\n')

    if i + 1 < len(lista):
      programma_successivo = lista[i + 1]
      testo.write('oraFine | ' + programma_successivo['ora'] + '\n')
    else:
      ora_programma_dt = datetime.strptime(programma['ora'], '%H:%M')
      ora_programma_dt = ora_programma_dt + timedelta(hours=1)
      ora_programma_aggiornata = ora_programma_dt.strftime('%H:%M')
      testo.write('oraFine | ' + ora_programma_aggiornata + '\n')

    testo.write('titolo | ' + programma['titolo'] + '\n')
    testo.write('categoria | ' + programma['categoria'] + '\n')
    i = i + 1
  testo.write('\n')


#restituisce una data in formato nomeGiorno_numeroGiorno_nomeMese_anno
def text_data(data):
  numero = data.day
  nome = data.strftime("%A")
  mese = data.month
  anno = data.year

  for giorno in giorni_settimana:
    if nome == giorno['day']:
      nome = giorno['giorno']
      break

  for m in lista_mesi:
    if mese == m['numero']:
      mese = m['mese']
      break

  if numero < 10:
    numero = '0' + str(numero)

  return (f"{nome}_{numero}_{mese}_{anno}_")


#restituisce il nome del canale a partire dal numero
def getCanale(numero):
  for canale in lista_canali:
    if canale['numero'] == numero:
      return canale['canale']


#restituisce l'url del canala a partire dal numero
def getUrlCanale2(numero):
  for canale in lista_canali:
    if canale['numero'] == numero:
      return canale['url2']


#salva sul file la guida estrapolata dal sito staseraInTV
def addProgrammiStaseraTv(nome_canale, numero_canale, url_canale, testo, cod):
  url_canale = url_canale.replace("null-", "")
  base_url = 'https://www.staseraintv.com/programmi_'
  i = 0
  check = False

  for _ in range(4):
    if i == 0:
      url = base_url + 'stasera_' + url_canale
      data = text_data(datetime.today().date() + timedelta())
    else:
      if i == 1:
        url = base_url + 'domani_' + url_canale
        data = text_data(datetime.today().date() + timedelta(1))
      else:
        data = text_data(datetime.today().date() + timedelta(days=i))
        url = base_url + str(data) + str(url_canale)

    if cod == 0:
      query = db.collection("programmi").where("data", "==", data)
      risultati = query.stream()
      if not any(risultati):
        salvaText(nome_canale, numero_canale, data.replace("_", " "), scanPage(url), testo)
        check = True
        
    else:
      salvaText(nome_canale, numero_canale, data.replace("_", " "), scanPage(url), testo)
   
    i += 1

  return check

    


#salva sul file la guida estrapolata dal sito guidaTv.quotidiano
def addProgrammiGuidaTv(nome_canale, numero_canale, url_canale, testo, cod):
  base_url = 'https://guidatv.quotidiano.net/'
  url = base_url + url_canale
  i = 0
  check = False

  for _ in range(7):

    if i == 0:
      data = text_data(datetime.today().date() + timedelta())
    else:
      data = datetime.today().date() + timedelta(days=i)
      url = base_url + url_canale + '/' + str(data.strftime("%d-%m-%Y"))
      data = text_data(datetime.today().date() + timedelta(i))
    
    if cod == 0:
      query = db.collection("programmi").where("data", "==", data)
      risultati = query.stream()
      if not any(risultati):
        salvaText(nome_canale, numero_canale, data.replace("_", " "), scanPage2(url), testo)
        check = True
    else:
      salvaText(nome_canale, numero_canale, data.replace("_", " "), scanPage2(url), testo)

    i += 1 

  return check

#salva la guida di un solo canale a partire dal numero
def getProgrammi1(canale):

  with open(guida, 'w', encoding='utf-8') as testo:

    nome_canale = getCanale(canale)
    url_canale = getUrlCanale2(canale)

    if 'null-' in url_canale:
      addProgrammiStaseraTv(nome_canale, canale, url_canale, testo, 1)
    else:
      addProgrammiGuidaTv(nome_canale, canale, url_canale, testo, 1)

  print('File aggiornato')


#salva la guida nel file txt
def getProgrammi2(cod):

  with open(guida, 'w', encoding='utf-8') as testo:

    for canale in lista_canali:
      numero_canale = canale['numero']
      nome_canale = canale['canale']
      url_canale = canale['url2']
      check = False

      if 'null-' in url_canale:
        check = addProgrammiStaseraTv(nome_canale, numero_canale, url_canale, testo, cod)
      else:
        check = addProgrammiGuidaTv(nome_canale, numero_canale, url_canale, testo, cod)

      print("\r" + " " * 50, end='')
    
      if cod == 0:
        if check:
          print("\rCanale: " + nome_canale, end='')
        else:
          print("\rNon ci sono nuovi programmi da inserire", end='')
      else:
        print("\rCanale: " + nome_canale, end='')


  print('\nFile aggiornato')

#stampa a video solo i programmi con orario maggiore di 21:00 e minore di 22:00
def estraiProgrammiSera(canale, data):
  with open(guida, "r", encoding="utf-8") as file:
    lines = file.read().split('\n')

  canale = getCanale(int(canale))
  programma_corrente = {}
  programmi = []

  for line in lines:
    if line.startswith("canale |"):
      canale_attuale = line.split("|")[1].strip()
    elif line.startswith("data |"):
      data_attuale = line.split("|")[1].strip()
    elif line.startswith("ora |"):
      ora = line.split("|")[1].strip()
    elif line.startswith("titolo |"):
      titolo = line.split("|")[1].strip()
      programma = {
          "canale": canale_attuale,
          "data": data_attuale,
          "ora": ora,
          "titolo": titolo,
      }
      programmi.append(programma)
    

  for programma in programmi:
    if (programma["canale"] == canale and "21:" <= programma["ora"] <= "22:"):
      return programma


#elimina tutti i programmi con data antecedente a oggi
def eliminaProgrammi():
  mesi = {
      "gennaio": 1,
      "febbraio": 2,
      "marzo": 3,
      "aprile": 4,
      "maggio": 5,
      "giugno": 6,
      "luglio": 7,
      "agosto": 8,
      "settembre": 9,
      "ottobre": 10,
      "novembre": 11,
      "dicembre": 12
  }

  programmi_da_eliminare = programma_ref.stream()
  cont = 0

  for programma in programmi_da_eliminare:

    data_db = programma.get("data")
    parti_data = data_db.split()
    giorno = int(parti_data[1])
    mese = mesi[parti_data[2].lower()]
    anno = int(parti_data[3])
    data = datetime(anno, mese, giorno)
    data_formattata = data.strftime("%d-%m-%Y")
    print("\r" + " " * 30, end='')
    print("\rGiorno: " + str(data_formattata), end='')

    if data < datetime.now():
      programma.reference.delete()
      cont += 1

  if cont > 0:
    print("\nProgrammi eliminati con successo.")
  else:
    print("\nNon ci sono programmi da eliminare.")


def eliminaTuttiProgrammi():
  raccolta = 'programmi'
  raccolta_ref = db.collection(raccolta)
  documenti_raccolta = raccolta_ref.list_documents()
  cont = 0
  for documento in documenti_raccolta:
    documento.delete()
    print("\r", " " * 60, end='')
    print("\r" + "Programmi eliminati " + str(cont), end='')
    cont += 1

  print('Programmi eliminati')


while True:

  input_utente = input(
    '\n0. Exit\n1. Recupera programmi di un solo canale\n2. Recupare l intera guida\n3. Inserisci la guida nel Database\n4. Vedi programmi di oggi\n5. Visualizza i programmi in prima serata\n6. Elimina programmi antecedenti a oggi\n7. Elimina tutti i programmi\n8. Recupera programmi mancanti\nINSERISCI LA TUA SCELTA:'
  )

  if input_utente == '0':
    print('EXIT')
    firebase_admin.delete_app(firebase_admin.get_app())
    break

  elif input_utente == '1':
    canale = input('Inserisci canale: ')
    getProgrammi1(int(canale))

  elif input_utente == '2':
    getProgrammi2(1)

  elif input_utente == '3':
    addProgrammiDb()

  elif input_utente == '4':
    canale = input('Inserisci il canale: ')
    query = db.collection("programmi").where("numero", "==", canale).where("data", "==", "Oggi").order_by("id")
    programmi_odierni = query.stream()
    for programma in programmi_odierni:
      print(f"{programma.get('canale')} - {programma.get('numero')} - {programma.get('data')} - {programma.get('id')} - {programma.get('ora')} - {programma.get('titolo')}")

  elif input_utente == '5':
    canale = input('Inserisci il canale: ')
    data = input('Inserisci data (giorno numero mese anno): ')
    print(estraiProgrammiSera(canale, data))

  elif input_utente == '6':
    eliminaProgrammi()

  elif input_utente == '7':
    eliminaTuttiProgrammi()

  elif input_utente == '8':
    getProgrammi2(0)

  else:
    print('Scelta non disponibile')
