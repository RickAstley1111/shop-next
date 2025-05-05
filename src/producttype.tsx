export interface productType {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string,
    quantity:number,
    rating: {
        rate: number,
        count: number
    }
}