import Event from '../src/models/Event'

const data: Event[] = [
    {
        name: "Fiesta en la ciudad",
        location: "Kibon",
        description: "Una fiesta inolvidable en uno de los mejores lugares de montevideo",
        price: "500",
        categories: ["Fiesta"],
        latitude: 40,
        dates: [new Date(2024,10,17, 0, 0,0,0)],
        longitude: 40,
        urlImage: "https://revistahsm.com/wp-content/uploads/2018/08/Fiestas.png",
        datesString: "",
        eventUrl: "www.google.com"
    },
    {
        name: "Partido de Uruguay",
        description: "Juega la celeste y no te lo podes perder",
        location: "Estadio centenario",
        price: "1500",
        categories: ["Deporte"],
        latitude: 30,
        longitude: 50,
        dates: [new Date(2024,11,10, 0,0,0,0)],
        urlImage: "https://storage.googleapis.com/tenfield-storage/2023/11/e4db0a0f-uruguay-previo.jpg",
        datesString: "",
        eventUrl: "www.google.com"

    },
    {
        name: "Obra de teatro",
        description: "Obra de teatro clasica protagonizada por Carlos Perez sobre la familia",
        location: "Teatro solis",
        price: "700",
        categories: ["Teatro"],
        latitude: 23,
        longitude: 34,
        dates: [new Date(2024,11,5, 0, 0, 0, 0)],
        urlImage: "https://static.wixstatic.com/media/538475_478811638c544313a41283121bdd7bbf~mv2.jpg/v1/fill/w_549,h_392,al_c,q_80,enc_auto/538475_478811638c544313a41283121bdd7bbf~mv2.jpg",
        datesString: "",
        eventUrl: "www.google.com"
    },
    {
        name: "IT Builders",
        description: "Obra de teatro clasica protagonizada por Carlos Perez sobre la familia",
        location: "Teatro solis",
        price: "700",
        categories: ["Teatro"],
        latitude: -34.89106944, 
        longitude: -56.18726111,
        dates: [new Date(2024,5,22, 0, 0, 0, 0)],
        urlImage: "https://www.uruguayxxi.gub.uy/uploads/noticia/8ce9b80a8c8ddc684e247b7065719a3ab4741ae7.jpg",
        datesString: "",
        eventUrl: "www.google.com"
    },
    {
        name: "Concierto Bad Bunny",
        description: "Obra de teatro clasica protagonizada por Carlos Perez sobre la familia",
        location: "Teatro solis",
        price: "700",
        categories: ["Teatro"],
        latitude: -34.91106944, 
        longitude: -56.14726111,
        dates: [new Date(2024,8,8, 0, 0, 0, 0)],
        urlImage: "https://s1.elespanol.com/2024/02/25/social/835426700_240244602_1706x960.jpg",
        datesString: "",
        eventUrl: "www.google.com"
    },
    {
        name: "Fiesta de la cerveza",
        description: "Obra de teatro clasica protagonizada por Carlos Perez sobre la familia",
        location: "Teatro solis",
        price: "700",
        categories: ["Teatro"],
        latitude: 23,
        longitude: 34,
        dates: [new Date(2024,8,8, 0, 0, 0, 0)],
        urlImage: "https://www.laangosturadigital.com.ar/wp-content/uploads/2023/02/FIESTA-DE-LA-CERVEZA-1-411.jpg",
        datesString: "",
        eventUrl: "www.google.com"
    }
]

export default data;