import type { CarsRepository } from "./cars.repository.js";
import type { CreateCarInput, SearchCarsRequestInput } from "./cars.schema.js";

// Service chama o repository 
export class CarsService {
    constructor(private readonly repository: CarsRepository) {}

    async createCar(input: CreateCarInput) {
        const created = await this.repository.createCar(input);
        return created;
    }

    async searchCars(input: SearchCarsRequestInput) {
        // TODO: Implement search logic with repository
        return [];
    }
}