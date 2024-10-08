export type League = {
    _id: string;
    createdAt: string;
    title: string; // premier league
    startDate: string;
    endDate: string;
    logo: string;
}

export const dummyLeagues: League[] = [
    {
        _id: "league001",
        createdAt: "2023-01-01T00:00:00Z",
        title: "Premier League",
        startDate: "2023-08-11",
        endDate: "2024-05-19",
        logo: "https://1000logos.net/wp-content/uploads/2017/05/Premier-League-logo.png"
    },
    {
        _id: "league002",
        createdAt: "2023-01-02T00:00:00Z",
        title: "La Liga",
        startDate: "2023-08-13",
        endDate: "2024-05-26",
        logo: "https://1000logos.net/wp-content/uploads/2019/01/Spanish-La-Liga-Logo.png"
    },
    {
        _id: "league003",
        createdAt: "2023-01-03T00:00:00Z",
        title: "Bundesliga",
        startDate: "2023-08-18",
        endDate: "2024-05-18",
        logo: "https://1000logos.net/wp-content/uploads/2020/09/Bundesliga-Logo.png"
    },
    {
        _id: "league004",
        createdAt: "2023-01-04T00:00:00Z",
        title: "Serie A",
        startDate: "2023-08-19",
        endDate: "2024-05-26",
        logo: "https://1000logos.net/wp-content/uploads/2017/05/Premier-League-logo.png"
    },
    {
        _id: "league005",
        createdAt: "2023-01-05T00:00:00Z",
        title: "Ligue 1",
        startDate: "2023-08-12",
        endDate: "2024-05-18",
        logo: "https://1000logos.net/wp-content/uploads/2017/05/Premier-League-logo.png"
    }
];
