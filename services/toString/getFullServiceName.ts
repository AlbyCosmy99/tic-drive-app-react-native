import Service from '@/types/Service';

const getFullServiceName = (services: Service[]) => {
  if (!Array.isArray(services)) return '';

  return services
    .filter(service => service && service.title?.trim())
    .map(service => service.title.trim())
    .join(' - ');
};

export default getFullServiceName;
