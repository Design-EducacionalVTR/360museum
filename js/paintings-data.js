// Dados das obras de arte do museu virtual

const PAINTINGS_DATA = {
    monalisa: {
        id: 'monalisa',
        title: 'Mona Lisa',
        artist: 'Leonardo da Vinci',
        year: '1503-1519',
        period: 'Renascimento',
        technique: 'Óleo sobre madeira de álamo',
        dimensions: '77 cm × 53 cm',
        location: 'Museu do Louvre, Paris',
        description: 'A Mona Lisa, também conhecida como La Gioconda, é uma das pinturas mais famosas do mundo. O retrato mostra Lisa Gherardini, esposa de Francesco del Giocondo, um comerciante florentino. A obra é famosa pelo sorriso enigmático da modelo e pela técnica revolucionária de sfumato utilizada por Leonardo.',
        historicalContext: 'Pintada durante o Alto Renascimento italiano, a obra representa o auge da arte renascentista. Leonardo da Vinci trabalhou nesta pintura por aproximadamente 16 anos, levando-a consigo em suas viagens.',
        curiosities: [
            'A pintura não possui sobrancelhas nem cílios, pois era moda na época removê-los',
            'Foi roubada do Louvre em 1911 e recuperada apenas em 1913',
            'Leonardo nunca entregou a obra ao cliente que a encomendou',
            'A técnica sfumato cria transições suaves entre cores e tons',
            'É a obra de arte mais valiosa do mundo, avaliada em mais de 850 milhões de dólares'
        ],
        significance: 'Considerada a pintura mais famosa do mundo, revolucionou a arte do retrato e estabeleceu novos padrões para a representação humana na arte.',
        imageId: 'monalisa-img'
    },

    starryNight: {
        id: 'starryNight',
        title: 'A Noite Estrelada',
        artist: 'Vincent van Gogh',
        year: '1889',
        period: 'Pós-Impressionismo',
        technique: 'Óleo sobre tela',
        dimensions: '73,7 cm × 92,1 cm',
        location: 'Museu de Arte Moderna (MoMA), Nova York',
        description: 'A Noite Estrelada é uma das obras mais reconhecidas de Van Gogh. Pintada durante sua estadia no asilo de Saint-Rémy-de-Provence, a obra retrata a vista de sua janela durante a noite, com adições imaginárias como a vila idealizada.',
        historicalContext: 'Criada em junho de 1889, durante um período de intensa criatividade artística de Van Gogh, mas também de grande instabilidade mental. O artista estava internado no asilo de Saint-Paul-de-Mausole.',
        curiosities: [
            'Van Gogh pintou a obra de memória, não observando diretamente o céu noturno',
            'A vila na pintura é imaginária, inspirada em várias cidades francesas',
            'As pinceladas em espiral do céu podem refletir o estado mental turbulento do artista',
            'É uma das poucas obras noturnas de Van Gogh',
            'A obra só se tornou famosa décadas após a morte do artista'
        ],
        significance: 'Representa o auge do estilo único de Van Gogh e é considerada uma das obras mais importantes do pós-impressionismo, influenciando gerações de artistas.',
        imageId: 'starry-night-img'
    },

    theScream: {
        id: 'theScream',
        title: 'O Grito',
        artist: 'Edvard Munch',
        year: '1893',
        period: 'Expressionismo',
        technique: 'Óleo, têmpera e pastel sobre cartão',
        dimensions: '91 cm × 73,5 cm',
        location: 'Galeria Nacional da Noruega, Oslo',
        description: 'O Grito é uma das obras mais icônicas da arte ocidental. A pintura expressa a angústia existencial através de uma figura andrógina em um momento de desespero, com a boca aberta em um grito silencioso contra um céu turbulento.',
        historicalContext: 'Criada durante o movimento expressionista, a obra reflete as ansiedades da sociedade moderna do final do século XIX. Munch foi inspirado por um momento real quando ouviu "o grito da natureza".',
        curiosities: [
            'Existem quatro versões da obra: duas pinturas e dois pastéis',
            'Uma das versões foi roubada em 2004 e recuperada em 2006',
            'A figura central pode ter sido inspirada em uma múmia peruana que Munch viu em Paris',
            'O céu vermelho pode ter sido inspirado por erupções vulcânicas distantes',
            'É uma das obras de arte mais parodiadas da história'
        ],
        significance: 'Tornou-se um símbolo universal da ansiedade moderna e é considerada precursora do movimento expressionista na arte.',
        imageId: 'scream-img'
    },

    sunflowers: {
        id: 'sunflowers',
        title: 'Os Girassóis',
        artist: 'Vincent van Gogh',
        year: '1888',
        period: 'Pós-Impressionismo',
        technique: 'Óleo sobre tela',
        dimensions: '92 cm × 73 cm',
        location: 'National Gallery, Londres',
        description: 'Esta série de pinturas de girassóis representa algumas das obras mais celebradas de Van Gogh. Pintadas em Arles, as flores simbolizam gratidão e devoção, e foram criadas para decorar o quarto de Paul Gauguin.',
        historicalContext: 'Pintada durante o período mais produtivo de Van Gogh em Arles, sul da França, quando o artista estava esperando a visita de Paul Gauguin. As obras fazem parte de uma série de naturezas-mortas com girassóis.',
        curiosities: [
            'Van Gogh pintou duas séries de girassóis: uma em Paris (1887) e outra em Arles (1888)',
            'Usou uma técnica chamada "impasto", aplicando tinta espessa diretamente na tela',
            'Os girassóis eram suas flores favoritas e simbolizavam felicidade para ele',
            'Uma das versões foi vendida por mais de 40 milhões de dólares em 1987',
            'Van Gogh experimentou com diferentes tons de amarelo, sua cor preferida'
        ],
        significance: 'Representa a maestria de Van Gogh no uso da cor e textura, sendo considerada uma das séries mais importantes do pós-impressionismo.',
        imageId: 'sunflowers-img'
    },

    guernica: {
        id: 'guernica',
        title: 'Guernica',
        artist: 'Pablo Picasso',
        year: '1937',
        period: 'Cubismo/Arte Moderna',
        technique: 'Óleo sobre tela',
        dimensions: '349,3 cm × 776,6 cm',
        location: 'Museu Reina Sofía, Madrid',
        description: 'Guernica é uma das obras anti-guerra mais poderosas da história da arte. Criada em resposta ao bombardeio da cidade basca de Guernica durante a Guerra Civil Espanhola, a obra retrata o horror e a brutalidade da guerra através do estilo cubista.',
        historicalContext: 'Encomendada pelo governo republicano espanhol para o Pavilhão Espanhol na Exposição Internacional de Paris de 1937. O bombardeio de Guernica foi um dos primeiros ataques aéreos contra civis na história.',
        curiosities: [
            'É pintada apenas em preto, branco e cinza para evocar fotografias de jornal',
            'Picasso se recusou a explicar o simbolismo da obra',
            'Ficou no MoMA de Nova York por décadas antes de retornar à Espanha',
            'Mede quase 8 metros de largura',
            'Inspirou inúmeras obras de arte e movimentos pacifistas'
        ],
        significance: 'Considerada uma das obras de arte mais influentes do século XX, tornou-se um símbolo universal contra a guerra e a opressão.',
        imageId: 'guernica-img'
    }
};

// Configurações de posicionamento das obras no museu
const PAINTINGS_POSITIONS = {
    monalisa: {
        position: { x: 0, y: 2, z: -7.8 },
        rotation: { x: 0, y: 0, z: 0 },
        scale: { x: 1.5, y: 2, z: 1 }
    },
    starryNight: {
        position: { x: -6, y: 2, z: -4 },
        rotation: { x: 0, y: 45, z: 0 },
        scale: { x: 2, y: 1.5, z: 1 }
    },
    theScream: {
        position: { x: 6, y: 2, z: -4 },
        rotation: { x: 0, y: -45, z: 0 },
        scale: { x: 1.5, y: 1.8, z: 1 }
    },
    sunflowers: {
        position: { x: -7.8, y: 2, z: 0 },
        rotation: { x: 0, y: 90, z: 0 },
        scale: { x: 1.5, y: 1.8, z: 1 }
    },
    guernica: {
        position: { x: 0, y: 2, z: 7.8 },
        rotation: { x: 0, y: 180, z: 0 },
        scale: { x: 3, y: 1.5, z: 1 }
    }
};

// Função para obter dados de uma obra
function getPaintingData(paintingId) {
    return PAINTINGS_DATA[paintingId] || null;
}

// Função para obter posição de uma obra
function getPaintingPosition(paintingId) {
    return PAINTINGS_POSITIONS[paintingId] || null;
}

// Função para obter todas as obras
function getAllPaintings() {
    return Object.keys(PAINTINGS_DATA);
}

// Exportar para uso global
window.PAINTINGS_DATA = PAINTINGS_DATA;
window.PAINTINGS_POSITIONS = PAINTINGS_POSITIONS;
window.getPaintingData = getPaintingData;
window.getPaintingPosition = getPaintingPosition;
window.getAllPaintings = getAllPaintings;

