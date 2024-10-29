import time
from pathlib import Path
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

from utils import get_tickantel_category_url, tickantel_categories_url, send_events_to_database, convertir_fecha

BASE_DIR = str(Path(__file__).resolve().parent)

month_mapping = {
    'ene': 'enero', 'feb': 'febrero', 'mar': 'marzo', 'abr': 'abril',
    'may': 'mayo', 'jun': 'junio', 'jul': 'julio', 'ago': 'agosto',
    'sep': 'septiembre', 'oct': 'octubre', 'nov': 'noviembre', 'dic': 'diciembre'
}

def get_event_url(event):
    url = event.find_element(By.TAG_NAME, "a")
    return url.get_attribute("href")

def get_event_title(event):
    container = event.find_element(By.CLASS_NAME, "title")
    title = container.find_element(By.TAG_NAME, "span")
    return title.text

def get_event_location(event):
    p_element = event.find_element(By.XPATH, "//p[contains(text(), '-')]")

    # Obtener el HTML del elemento <p> encontrado
    p_html = p_element.get_attribute('outerHTML')

    # Utilizar BeautifulSoup para parsear el HTML y extraer el texto
    soup = BeautifulSoup(p_html, 'html.parser')
    location = soup.get_text()

    return location

def get_event_date(event):
    date = event.find_element(By.XPATH, "//*[contains(@class, 'txt-upper') and contains(@class, 'txt-blue') and contains(@class, 'txt-bold') and contains(@class, 'auto-pf-date')]")
    return date.text

def get_event_img(event):
    img = event.find_element(By.TAG_NAME, "img")
    return img.get_attribute("src")

def get_event_loc_n_desc(event_url, browser):
    browser.get(event_url)

    try: 
        location_element = browser.find_element(By.XPATH, "//iframe[contains(@src, 'www.openstreetmap.org')]")
        location = location_element.get_attribute("src")
    except:
        location = "Lo sentimos, TickAntel no proporciona ubicación de este evento"

    description = "Lo sentimos, TickAntel no proporciona descripciones para los eventos"

    formatted_dates = []

    try:
        calendar = browser.find_element(By.ID, "calendar-select")
        dates = calendar.find_elements(By.CLASS_NAME, "item")
        for date in dates:
            text_date = date.find_element(By.TAG_NAME, "p")
            html_date = text_date.get_attribute("outerHTML")
            soup = BeautifulSoup(html_date, 'html.parser')
            raw_date = soup.get_text()
            month = month_mapping[raw_date.split()[1]]
            to_convert_date = f"{raw_date.split()[0]} de {month}"

            formatted_date = convertir_fecha(to_convert_date)
            formatted_dates.append(formatted_date.strftime("%Y-%m-%d"))
    except:
        try:
            date = browser.find_element(By.XPATH, "//small[contains(text(), 'Función')]")
            parent = date.find_element(By.XPATH, "parent::*")

            spans = parent.find_elements(By.TAG_NAME, "span")

            date = ''
            for i in range(3):
                if i == 0:
                    day = spans[i].text.split()[1]
                    date += day
                elif i == 1:
                    date += f" de "
                else:
                    month = spans[i].text.split()[0]
                    date += month
            formatted_date = convertir_fecha(date)
            formatted_dates.append(formatted_date.strftime("%Y-%m-%d"))
        except:
            formatted_dates = []

    return location, description, formatted_dates


def get_event_price(event_url, browser):
    browser.get(event_url)

    precios = browser.find_elements(By.XPATH, "//*[contains(@class, 'col-costo')]")

    for precio in precios:
        if ("$" in precio.text):
            print(float(precio.text.replace("$ ", "")))
            return float(precio.text.replace("$ ", ""))        
    return 0

def scrape_events(category):
    # driver_path = f"{BASE_DIR}/driver/chromedriver-mac-x64/chromedriver"
    driver_path = f"{BASE_DIR}/driver/chromedriver-win64/chromedriver.exe"
    service = Service(executable_path=driver_path)
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=old")  #  Para que el navegador no se muestre

    # Creo el browswe para listing
    browser_listing = webdriver.Chrome(service=service, options=options)

    # Creo el browser para detail
    browser_detail = webdriver.Chrome(service=service, options=options)

    browser_listing.get(get_tickantel_category_url(category))

    # Get scroll height
    last_height = browser_listing.execute_script("return document.body.scrollHeight")

    while True:
        # Scroll down to bottom
        browser_listing.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # Wait to load page
        time.sleep(1)

        # Calculate new scroll height and compare with last scroll height
        new_height = browser_listing.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            try:
                cargar_resultados_elem = browser_listing.find_element(By.CLASS_NAME, "cargar-link")
                cargar_resultados_elem.click()
            except:
                break

        last_height = new_height

    events = browser_listing.find_elements(By.CLASS_NAME, "item")

    results = []

    for event in events:
        try:
            event_url = get_event_url(event)

            new_event = {
                "title": get_event_title(event),
                "location_text": get_event_location(event),
                "dates_raw": get_event_date(event),
                "img_url": get_event_img(event),
                "event_url": event_url,
                "category": category
            }

            location, description, dates = get_event_loc_n_desc(event_url, browser_detail)

            new_event["location_url"] = location
            new_event["description"] = description
            new_event["dates"] = dates

            # TODO: Agregarle precio del evento haciendo click en el unico <a> que existe en la variable `event`
            # Obtener divs con la clase `col-costo` y luego parsea el valor
            price = get_event_price(event_url, browser_detail) # tiene que hacerse siguiendo de ejemplo `get_event_loc_n_desc`

            results.append(new_event)
        except:
            print("Ocurrio un error para scrapear el evento" + str(event))

    print(f"Resultados para la categoría {category}: {len(results)}")
    return results

    


## Función main, scrapea todos los eventos de todas las categorías y las envía a la base de datos
def main():
    start = time.time()
    categories = tickantel_categories_url.keys()
    total_results = {}

    with ThreadPoolExecutor(max_workers=5) as executor:
        for category in categories:
            total_results[category] = executor.submit(scrape_events, category)
    for category in categories:
        total_results[category] = total_results[category].result()
    end = time.time()
    send_events_to_database(total_results, tickantel_categories_url.keys())
    print(f"Tiempo total: {end - start}")

if __name__ == "__main__":
    main()