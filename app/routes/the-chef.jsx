import React from 'react';
import {data, useLoaderData, defer} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import FooterComponent from '~/components/FooterComponent';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {CHEF_QUERY} from '~/components/query/theChefQuery';
import {FormattedText} from '~/components/functions/formatText';
import PersonSection from '~/components/PersonSection';
import QuoteBlock from '~/components/QuoteBlock';
export const loader = createStaticDataLoader(CHEF_QUERY);

function TheChef() {
  const {staticData} = useLoaderData();
  return (
    <div>
      <div className="w-full flex flex-col items-center justify-center h-[260px] text-center">
        <h2 className="h2-desktop w-[220px]">
          {staticData.title_header.value}
        </h2>
        <p className="w-[450px] p-standard-medium-desktop text-black-2">
          {staticData.title_sub.value}
        </p>
      </div>
      <PersonSection
        filler2={staticData.chef_image_2.reference.image}
        name={staticData.chef_header.value}
        mainImg={staticData.chef_image_1.reference.image}
        section={staticData.chef_sub.value}
      ></PersonSection>
      <div className="flex px-6 py-10">
        <div className="flex-1">
          <h2 className="h2-desktop">{staticData.meet_chef_header.value}</h2>
          <div className=" bg-[#AF4145] h-2 w-[250px]"></div>
        </div>
        <div className="flex-1 p-standard-medium-desktop">
          <FormattedText
            text={staticData.meet_chef_content.value}
          ></FormattedText>
        </div>
      </div>
      <div className="overflow-hidden w-full h-[300px]">
        <Image
          data={staticData.filler_image_1.reference.image}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div className="flex px-6 py-10">
        <div className="flex-1 p-standard-medium-desktop">
          <FormattedText
            text={staticData.early_life_content.value}
          ></FormattedText>
        </div>
        <div className="flex-1 items-end flex flex-col">
          <h2 className="h2-desktop">{staticData.early_life_header.value}</h2>
          <div className=" bg-[#AF4145] h-2 w-[250px]"></div>
        </div>
      </div>
      <QuoteBlock data={staticData.quote_block.reference}></QuoteBlock>
      <div className="flex px-6 py-10">
        <div className="flex-1">
          <h2 className="h2-desktop">{staticData.awards_header?.value}</h2>
          <div className=" bg-[#AF4145] h-2 w-[250px]"></div>
        </div>
        <div className="flex-1 p-standard-medium-desktop">
          <FormattedText
            text={staticData.awards_content?.value}
          ></FormattedText>
        </div>
      </div>
      <div className="overflow-hidden w-full h-[300px]">
        <Image
          data={staticData.filler_image_2.reference.image}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default TheChef;
