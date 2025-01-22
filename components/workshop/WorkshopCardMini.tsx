import {memo} from 'react';
import {WorkshopExtended, WorkshopMini} from '@/types/workshops/Workshop';
import WorkshopCard from '../WorkshopCard';

function WorkshopCardMini({workshop}: {workshop: WorkshopMini}) {
  return (
    <WorkshopCard
      workshop={workshop}
      pressableContainerStyle={{padding: 0, paddingHorizontal: 2}}
      iconTextPairsContainerTailwindCss="px-1 pb-0 pt-0.5"
      iconTextPairTextTailwindCss="text-xs"
      iconTextPairContainerTailwindCss="gap-1 py-1"
      imageContainerStyle={{height: 80}}
    />
  );
}

export default memo(WorkshopCardMini);
