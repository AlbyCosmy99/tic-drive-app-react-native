import {memo} from 'react';
import WorkshopCard from '../WorkshopCard';
import Workshop from '@/types/workshops/Workshop';

function WorkshopCardMini({workshop}: {workshop: Workshop}) {
  return (
    <WorkshopCard
      workshop={workshop}
      pressableContainerStyle={{padding: 0, paddingHorizontal: 2}}
      iconTextPairsContainerTailwindCss="px-0.5 pb-0 pt-1.5"
      iconTextPairTextTailwindCss="text-xs"
      iconTextPairContainerTailwindCss="gap-1 py-0.5"
      imageContainerStyle={{height: 80}}
    />
  );
}

export default memo(WorkshopCardMini);
