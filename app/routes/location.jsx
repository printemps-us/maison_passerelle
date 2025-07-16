import React, {useEffect} from 'react';
import {data, useLoaderData, defer} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import AnimatedButton from '~/components/AnimatedButton';
import StoreInfo from '~/components/StoreInfo';
import ImageSection from '~/components/ImageSection';
import ImageCard from '~/components/ImageCard';
import SmoothScroll from '~/components/SmoothScroll';
import FooterComponent from '~/components/FooterComponent';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import { LOCATION_PAGE_QUERY } from '~/components/query/locationPageQuery';
export const loader = createStaticDataLoader(LOCATION_PAGE_QUERY);

function Location() {
  const {staticData} = useLoaderData();

  return (
    <SmoothScroll>
      <div className="w-full flex flex-col items-center justify-center h-[260px] text-center mt-12">
        <h2 className="h2-desktop w-[220px]">{staticData.page_header.value}</h2>
        <p className="w-[450px] p-standard-medium-desktop text-black-2">
          {staticData.page_header_sub.value}
        </p>
      </div>
      <div className="h-[500px] bg-white-2 border-y-1 border-y-white-4 flex">
        <div
          className="flex-1 rounded-br-[300px]"
          style={{
            backgroundSize: 'cover', // Ensures the image covers the entire container
            backgroundPosition: 'center', // Centers the image within the container
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
            backgroundImage: `url(${staticData.location_image.reference.image.url})`,
          }}
        ></div>
        <div className="flex-1 flex-col flex justify-center items-center gap-6 text-center">
          <h2 className="h2-desktop w-[220px]">
            {staticData.location_header.value}
          </h2>
          <p className="w-[450px] p-standard-medium-desktop text-black-2">
            {staticData.location_sub.value}
          </p>
          <AnimatedButton
            h={'42px'}
            w={'339px'}
            text={staticData.location_button.reference.button_text.value}
            bgColor={staticData.location_button.reference.color.value}
            hoverColor={staticData.location_button.reference.hover_color.value}
            clickURL={staticData.location_button.reference?.link.value}
          />
        </div>
      </div>
      <StoreInfo
        data={staticData.contact_options}
        bgColor={'#AF4145'}
      ></StoreInfo>
      <ImageSection
        h1={staticData.location_info_header.value}
        sub={staticData.location_info_text.value}
        hours={staticData.location_info_hours.value}
        image={staticData.location_info_image.reference.image}
      ></ImageSection>
      <div className="bg-white">
        {staticData.inside_sections.references.nodes.map((item, index) => (
          <div
            className={`relative bg-white border-y-white-4 border-y-1 z-20' ${
              index === staticData.inside_sections.references.nodes.length - 1
                ? 'pb-[60px] rounded-xl'
                : 'mb-[60px]'
            }`}
            key={`${item.header.value}_card`}
          >
            <ImageCard
              header={item.header.value}
              images={item.images.references.nodes}
              descriptor={item.section.value}
              lContent={item.sub_content_1.value}
              button={item.button?.reference}
              // setModalInfo={setModalInfo}
              // setOpenModal={setOpenModal}
              // secondary_button={item.secondary_button?.reference}
              position={index % 2 ? 'left' : 'right'}
            />
          </div>
        ))}
      </div>
      <FooterComponent></FooterComponent>
    </SmoothScroll>
  );
}


export default Location;
