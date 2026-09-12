export interface PasoReceta {
  numero: number;
  accion: string;
  detalle: string;
  colorAcento: string;
}

export interface Receta {
  id: string;
  titulo: string;
  subtitulo: string;
  tiempo: string;
  dificultad: string;
  badge: string;
  pasos: PasoReceta[];
}

export const RECETAS_BRUJITOS: Receta[] = [
  {
    id: "galletas-calabaza",
    titulo: "Galletas Especiadas de Calabaza",
    subtitulo: "Textura suave y mantecosa con aroma a canela y nuez moscada.",
    tiempo: "45 min",
    dificultad: "Fácil",
    badge: "Favorito Otoño 🍂",
    pasos: [
      {
        numero: 1,
        accion: "Batir mantequilla y azúcar moreno",
        detalle: "Bate enérgicamente hasta que la mezcla cambie de color a un dorado pálido y suave como crema pastelera.",
        colorAcento: "#F3A261",
      },
      {
        numero: 2,
        accion: "Incorporar el puré de calabaza",
        detalle: "Añade el puré tibio junto a una pizca de canela y jengibre en polvo. Verás formarse remolinos aromáticos.",
        colorAcento: "#E28771",
      },
      {
        numero: 3,
        accion: "Tamizar la harina en lluvia lenta",
        detalle: "Pasa la harina por el tamiz suavemente sobre el tazón, creando una fina neblina blanca que integraremos con espátula.",
        colorAcento: "#A3B18A",
      },
      {
        numero: 4,
        accion: "Moldear y hornear a 180°C",
        detalle: "Forma discos con pequeñas muescas de calabaza y llévalas al calor del horno hasta que los bordes doren ligeramente.",
        colorAcento: "#CDB4DB",
      },
    ],
  },
  {
    id: "fantasmas-merengue",
    titulo: "Besitos Fantasmales de Vainilla",
    subtitulo: "Nubes crocantes por fuera y suaves por dentro con caritas de chocolate.",
    tiempo: "60 min",
    dificultad: "Media",
    badge: "Especial Brujitos 👻",
    pasos: [
      {
        numero: 1,
        accion: "Montar claras a punto de nieve",
        detalle: "Bate las claras con paciencia hasta levantar picos firmes y satinados como nieve fresca.",
        colorAcento: "#CDB4DB",
      },
      {
        numero: 2,
        accion: "Manga pastelera y horneado suave",
        detalle: "Dibuja pequeños fantasmas cónicos sobre la bandeja y deshidrata a fuego muy bajo.",
        colorAcento: "#F3A261",
      },
    ],
  },
];