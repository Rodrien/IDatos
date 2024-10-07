import React, { Context, createContext, useState } from 'react'

type FiltersProps = {
    minDate: Date | null;
    maxDate: Date | null;
    minDistanceInKM: number | null;
    maxDistanceInKM: number | null;
    activeCategory: string;
}

type ContextProps = FiltersProps & {
    setMinDate: any,
    setMaxDate: any,
    searchText: any
    setMinDistanceInKM: any,
    setSearchText: any,
    setMaxDistanceInKM: any,
    setActiveCategory: any,
    categories: string[],
  };

export const FiltersContext: Context<ContextProps> = createContext<ContextProps>({
    minDate: null,
    maxDate: null,
    minDistanceInKM: null,
    maxDistanceInKM: null,
    searchText: "",
    activeCategory: "Todos",
    setMinDate: () => {},
    setMaxDate: () => {},
    setSearchText: () => {},
    setMinDistanceInKM: () => {},
    setMaxDistanceInKM: () => {},
    setActiveCategory: () => {},
    categories: [],
});

export const FiltersProvider = (props: any) => {
    
    const categories = ["Todos", "Teatro", "Musica", "Fiestas", "Deportes", "Especiales", "Futbol", "Cursos", "Giras", "Conferencias", "Familiares", "Afiliados", "Empresarial", "Festivales", "Danza", "Otros"]

    const [minDate, setMinDate] = useState<Date | null>(null);
    const [maxDate, setMaxDate] = useState<Date | null>(null);
    const [searchText, setSearchText] = useState<string>("")
    const [minDistanceInKM, setMinDistanceInKM] = useState<number | null>(null);
    const [maxDistanceInKM, setMaxDistanceInKM] = useState<number | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>(categories[0]);

    
    return (
      <FiltersContext.Provider
        value={{
            activeCategory,
            searchText,
            minDate,
            maxDate,
            minDistanceInKM,
            maxDistanceInKM,
            setMinDate,
            setMaxDate,
            setSearchText,
            setActiveCategory,
            setMaxDistanceInKM,
            setMinDistanceInKM,
            categories,
        }}
      >
        {props.children}
      </FiltersContext.Provider>
    );
  };

