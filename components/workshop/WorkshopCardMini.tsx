import {memo} from 'react';
import WorkshopCard from '../WorkshopCard';
import Workshop from '@/types/workshops/Workshop';

function WorkshopCardMini({workshop}: {workshop: Workshop}) {
  return (
    <WorkshopCard
      workshop={workshop}
      pressableContainerStyle={{padding: 0, paddingHorizontal: 2}}
      iconTextPairsContainerTailwindCss="px-0.5 pb-0 pt-0.5 justify-between h-24 mx-0.5 my-0.5"
      iconTextPairTextTailwindCss="text-xs mr-1"
      iconTextPairContainerTailwindCss="gap-1 py-0.5 min-h-14 w-40 pr-1.5"
      imageContainerStyle={{height: 80}}
      viewContainerStyle={{height: 190}}
      isServiceDetailsEnabled={false}
    />
  );
}

export default memo(WorkshopCardMini);
