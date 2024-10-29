import time
from pathlib import Path
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
from selenium.webdriver.common.by import By
from selenium import webdriver
from selenium.webdriver.chrome.service import Service

from utils import get_redtickets_category_url, redtickets_categories_url, send_events_to_database, convertir_fecha

BASE_DIR = str(Path(__file__).resolve().parent)


def get_event_location(event):
    location_icon = event.find_element(By.XPATH, "//img[@alt='Location']")
    parent_element = location_icon.find_element(By.XPATH, "..")
    location = parent_element.find_element(By.CLASS_NAME, "EventInfo")
    return location.text


def get_event_date(event):
    date_icon = event.find_element(By.XPATH, "//img[@alt='Date']")
    parent_element = date_icon.find_element(By.XPATH, "..")
    date = parent_element.find_element(By.CLASS_NAME, "EventInfo")
    return date.text

def get_event_img(event):
    img = event.find_element(By.TAG_NAME, "img")
    return img.get_attribute("src")

def get_event_url(event):
    url = event.find_element(By.TAG_NAME, "a")
    return url.get_attribute("href")

def get_event_loc_n_desc(event_url, browser):
    browser.get(event_url)

    location_element = browser.find_element(By.XPATH, "//*[@name='W0007EMBMAP']")
    description_element = browser.find_element(By.XPATH, "//*[@property='og:description']")

    location = location_element.get_attribute("src")

    description_html = description_element.get_attribute("content")
    # Parseo el string porque viene en html
    soup = BeautifulSoup(description_html, 'html.parser')
    description = soup.get_text()

    return location, description

def get_event_price(browser):
    #browser.get(event_url)

    precios = driver.find_elements(By.CSS_SELECTOR, ".id-radio-tile-label.label-big")

    print(precios[0].text)
    return precios[0].text


def get_all_dates_for_event(event_url, browser):
    browser.get(event_url)
    dates = []

    #Intento obtener la fecha para el caso que tenga una sola fecha
    try:
        dates_selector_element = browser.find_element(By.ID, "radioButtonDate")
        date_container = dates_selector_element.find_element(By.CLASS_NAME, "id-input-container")
        single_date_container = date_container.find_element(By.CLASS_NAME, "id-radio-tile")
        single_date = single_date_container.find_element(By.CLASS_NAME, "id-radio-tile-label").text
        #Si esta vacio es porque esta oculto, siempre existe no siempre esta cargado
        if single_date == '':
            raise Exception()
        dates.append(single_date)
    except:
        #Si falla intento obtener las multiples fechas del evento
        dates_selector_element = browser.find_element(By.ID, "comboDate")
        date_options = dates_selector_element.find_elements(By.CSS_SELECTOR, '*')
        #La primera opcion es una pregunta de que fecha quiere seleccionar
        date_options.pop(0)
        for date_option in date_options:
            dates.append(date_option.text)
    formatted_dates = []
    try:
        for date in dates:
            formatted_date = convertir_fecha(date)
            formatted_dates.append(formatted_date.strftime('%Y-%m-%d'))
    except:
        formatted_dates = []
    return formatted_dates



def scrape_events(category):
    # driver_path = f"{BASE_DIR}/driver/chromedriver-mac-x64/chromedriver"
    # Cambiar driver dependiendo de la maquina que tengamos
    driver_path = f"{BASE_DIR}/driver/chromedriver-win64/chromedriver.exe"
    
    service = Service(executable_path=driver_path)
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=old")  #  Para que el navegador no se muestre

    # Creo el browswe para listing
    browser_listing = webdriver.Chrome(service=service, options=options)

    # Creo el browser para el detail
    browser_detail = webdriver.Chrome(service=service, options=options)

    browser_listing.get(get_redtickets_category_url(category))

    paginator_elems = browser_listing.find_elements(By.XPATH, "//*[contains(@class, 'wPageSelector') and not(contains(@style, 'display:none'))]")
    total_pages = len(paginator_elems) + 1

    results = []

    for page in range(0, total_pages):
        # Obtener todos los elementos con la clase 'card'
        events = browser_listing.find_elements(By.CLASS_NAME, "card")

        for event in events:
            try: 
                event_url = get_event_url(event)

                new_event = {
                    "title": event.find_element(By.CLASS_NAME, "EventTitle").text,
                    "location_text": get_event_location(event),
                    "dates_raw": get_event_date(event),
                    "img_url": get_event_img(event),
                    "event_url": event_url,
                    "category": category
                }

                location, description = get_event_loc_n_desc(event_url, browser_detail)
                dates = get_all_dates_for_event(event_url, browser_detail)

                new_event["location_url"] = location
                new_event["description"] = description
                new_event["dates"] = dates

                # Agregar precio siguiendo como se hace en `get_event_loc_n_desc`
                # obtener divs con las clases `id-radio-tile-label label-big` y luego parsear el valor
                price = get_event_price(browser_detail)

                results.append(new_event)
            except:
                print("Ocurrio un error para scrapear el evento" + str(event))
        browser_listing.get(f"{get_redtickets_category_url(category)}/{page + 1}")

    print(f"Resultados para la categoría {category}: {len(results)}")

    # Exit browsers
    browser_listing.quit()
    browser_detail.quit()

    return results

## Función main, scrapea todos los eventos de todas las categorías y las envía a la base de datos
def main():
    start = time.time()
    categories = redtickets_categories_url.keys()
    total_results = {}

    with ThreadPoolExecutor(max_workers=5) as executor:
        for category in categories:
            total_results[category] = executor.submit(scrape_events, category)
    for category in categories:
        total_results[category] = total_results[category].result()
    end = time.time()
    # comento para probar local nomas
    send_events_to_database(total_results, redtickets_categories_url.keys())
    print(total_results)
    
    # # save json
    # with open("jsonGeneradoRedTickets.txt", "w") as text_file:
    #     text_file.write(total_results)

    print(f"Tiempo total: {end - start}")

if __name__ == "__main__":
    main()
