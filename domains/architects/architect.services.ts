import { ArchitectRepository } from "./architect.repository";
import { ArchitectCreationType, ArchitectDeleteType, ArchitectUpdateType } from "./architect.validations";


export async function getArchitectService () {
    return ArchitectRepository.getArchitects()
}

export async function getArchitectDetailsService (id: string) {
    return ArchitectRepository.getArchitectDetails(id)
}

export async function createArchitectService (data: ArchitectCreationType) {
    ArchitectRepository.createArchitect(data)
}

export async function updateArchitectService (data: ArchitectUpdateType) {
    ArchitectRepository.updateArchitect(data)
}

export async function deleteArchitectService (data: ArchitectDeleteType) {
    return ArchitectRepository.deleteArchitect(data)
}