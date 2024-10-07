from fastapi import FastAPI
from scraper_redtickets import  main as scraper_redtickets
from scraper_tickantel import main as scraper_tickantel

app = FastAPI()

@app.get('/scrapers')
def api_main():
    #scraper_redtickets()
    scraper_tickantel()
    return {"message": "Operaciones ejecutadas correctamente"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)