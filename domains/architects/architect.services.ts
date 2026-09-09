import { ArchitectRepository } from "./architect.repository";


export async function getArchitectService () {
    return ArchitectRepository.getArchitects()
}