# CoordinadorEventos

## Como usar los scripts de web scraping

### Primero instalar crear y activar un venv de python

```
python -m venv <path to new env>

source <path to new env>/bin/activate
```

Instala los requerimientos

```
pip3 install -r requirements.txt
```

### Descargar driver

Es una parte muy importante para que funcione Selenium.

En este caso se utilizará el driver de chrome, aunque en la [documentación de Selenium](https://selenium-python.readthedocs.io/installation.html) se puede descargar el driver acorde a su navegador.

**Es necesario elegir el binario acorde a su sistema operativo.**

Download chromedriver: [https://googlechromelabs.github.io/chrome-for-testing/]()

![1714829977780](image/README/1714829977780.png)

Luego de descargar el driver, coloque el path correspondiente en el archivo `scrapers.py`

### Utilizar scraper

Con esto hecho, ya estamos en condiciones de utilizar el script que hará el web scraping.

Desde la terminal, parándonos en la carpeta donde se encuentra `scraper_<plataforma>.py`.

Las plataformas disponibles son:

- redtickets
- tickantel

Se puede utilizar de la siguiente manera:

```
python3 scraper_<plataforma>.py
```

## Como levantar el sistema con docker

Parados sobre la raiz de nuestro directorio donde se encuentra el archivo de `docker-compose` ejecutar el siguiente comando:

```bash
docker compose up
```

Esto hara que automaticamente se levanten API, Motor, sitio web y BD, listos para utilizar.
Los mapeos por defecto son:
- API: `localhost:8080`
- Motor: `localhost:8088`
- Web Angular: `localhost:4200`
- FrontEnd para telemetria y logs (Seq): `localhost:8787`
