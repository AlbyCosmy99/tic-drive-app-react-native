import Service from "@/types/Service";

const getFullServiceName = (services: Service[]) => {
    return services.map(service => service.title).join(' - ')
}

export default getFullServiceName