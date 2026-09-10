import { BrokerRepository } from "./broker.repositories";
import { BrokerCreationType, BrokerDeleteType, BrokerUpdateType } from "./broker.validations";


export async function getBrokerService () {
    return BrokerRepository.getBrokers()
}

export async function createBrokerService (data: BrokerCreationType) {
    return BrokerRepository.createBroker(data)
}

export async function updateBrokerService (data: BrokerUpdateType) {
    return BrokerRepository.updateBroker(data)
}

export async function deleteBrokerService (data: BrokerDeleteType) {
    return BrokerRepository.deleteBroker(data)
}