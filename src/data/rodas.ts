export interface Roda {
    id: string;
    name: string;
    location: string;
    day: string;
    time: string;
    coordinates: { x: number; y: number }; // Percentage relative to map container
    description?: string;
    battleType?: 'Sangue' | 'Conhecimento' | 'Tradicional';
    mcs?: string[];
    social?: string;
}

export const rodas: Roda[] = [
    {
        id: 'pacstao',
        name: "Pac'stão",
        location: "Biblioteca Parque de Manguinhos",
        day: "15 Dezembro (Especial)",
        time: "19:00",
        coordinates: { x: 50, y: 50 },
        description: "A nossa casa. Onde a cultura respira. Edição especial de fim de ano com Pocket Show da Leigo Records.",
        battleType: 'Sangue',
        mcs: ['Maui', 'Anticonstantino', 'Maskotte', 'Kbrum'],
        social: '@pacstao'
    },
    {
        id: 'ccrp',
        name: "CCRP",
        location: "Rocinha",
        day: "Sextas",
        time: "20:00",
        coordinates: { x: 30, y: 70 },
        description: "Resistência cultural na favela da Rocinha.",
        battleType: 'Conhecimento'
    },
    {
        id: 'bangu',
        name: "Roda de Bangu",
        location: "Praça da Fé",
        day: "Quintas",
        time: "19:30",
        coordinates: { x: 70, y: 30 },
        battleType: 'Sangue'
    },
    {
        id: 'meier',
        name: "Roda do Méier",
        location: "Jardim do Méier",
        day: "Terças",
        time: "19:00",
        coordinates: { x: 60, y: 60 },
        battleType: 'Tradicional'
    }
];
