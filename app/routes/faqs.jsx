import React, {useState} from 'react';
import {FAQ_QUERY} from '~/components/query/faqQuery';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {data, useLoaderData, defer} from '@remix-run/react';
import Chip from '~/components/Chip';
import DropDownInfo from '~/components/DropDownInfo';
import {Image} from '@shopify/hydrogen';
import FooterComponent from '~/components/FooterComponent';
import QuoteBlock from '~/components/QuoteBlock';
export const loader = createStaticDataLoader(FAQ_QUERY);
function Faqs() {
  const {staticData} = useLoaderData();
  const faqData = staticData.faqs.references.nodes.reduce((acc, item) => {
    const key = item.section_id?.value;
    const value = item.options.references.nodes;
    acc[key] = value;
    return acc;
  }, {});
  const [selected, setSelected] = useState(() => Object.keys(faqData)[0] || '');
  return (
    <div>
      <div className="flex gap-4 px-6 pt-20">
        {staticData.images.references.nodes.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-xl h-[450px]">
            <Image data={item.image} className="w-full h-full object-cover">
              {/* your content here */}
            </Image>
          </div>
        ))}
      </div>
      <div className=" w-full pt-[80px] flex-col flex items-center gap-12">
        <p className="h5-desktop">{staticData.section?.value}</p>
        <h4 className="h2-desktop">{staticData.header?.value}</h4>
        {/* <div className="mt-[-4px]">
          <Underline4Up size={'sm'} reflection={true} />
        </div> */}
      </div>

      <div className="flex gap-3 justify-center w-full py-6 px-[60px]">
        {staticData.faqs.references.nodes?.map((item, index) => (
          <Chip
            key={index}
            text={item.header?.value}
            selected={selected}
            id={item.section_id?.value}
            setSelected={setSelected}
          />
        ))}
      </div>
      <div className="items-center flex flex-col pb-[120px] px-[100px]">
        {faqData[selected]?.map((item, index) => (
          <div
            key={`${selected}_${index}`}
            className="w-full justify-center flex"
          >
            <DropDownInfo
              header={item.header?.value}
              content={item.content?.value}
              isMobile={false}
            />
          </div>
        ))}
      </div>
      <QuoteBlock></QuoteBlock>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default Faqs;
