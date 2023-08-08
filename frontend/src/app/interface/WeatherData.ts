export interface WeatherData {
    location: {
        name: string
        region: string
        country: string
        localtime: string
    },
    current: {
        temp_c: number
        temp_f: number
    },
    wind_mph: number
    wind_kph: number
    precip_mm: number
    precip_in: number
    humidity: number
}