import {memo} from 'react';
import WorkshopCard from '../WorkshopCard';
import Workshop from '@/types/workshops/Workshop';

function WorkshopCardMini({workshop}: {workshop: Workshop}) {
  return (
    <WorkshopCard
      workshop={workshop}
      pressableContainerStyle={{padding: 0, paddingHorizontal: 2}}
      titleTextTailwindCss="text-[13px]"
      iconTextPairsContainerTailwindCss="px-0.5 pb-0 pt-0.5 justify-between h-24 mx-0.5 my-0.5"
      iconTextPairTextTailwindCss="text-[11px] mr-1"
      iconTextPairContainerTailwindCss="gap-1 py-0 min-h-14 pr-0.5"
      addressContainerTailwindCss="h-[65px]"
      imageContainerStyle={{height: 70}}
      viewContainerStyle={{height: 190}}
      isServiceDetailsEnabled={false}
    />
  );
}

export default memo(WorkshopCardMini);
