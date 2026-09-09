import { ArchitectRepository } from "./architect.repository";
import { ArchitectCreationType, ArchitectUpdateType } from "./architect.validations";


export async function getArchitectService () {
    return ArchitectRepository.getArchitects()
}

export async function createArchitectService (data: ArchitectCreationType) {
    ArchitectRepository.createArchitect(data)
}

export async function updateArchitectService (data: ArchitectUpdateType) {
    ArchitectRepository.updateArchitect(data)
}