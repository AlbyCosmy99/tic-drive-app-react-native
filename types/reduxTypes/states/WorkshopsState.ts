import Workshop from '@/types/workshops/Workshop';

interface WorkshopsState {
  selectedWorkshop: Workshop | null | undefined;
  lastWorkshopSelectedFromFilter: Workshop | undefined;
}

export default WorkshopsState;
