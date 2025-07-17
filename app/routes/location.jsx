import React, {useEffect} from 'react';
import {data, useLoaderData, defer} from '@remix-run/react';
import {json} from '@shopify/remix-oxygen';
import AnimatedButton from '~/components/AnimatedButton';
import { Image } from '@shopify/hydrogen';
import StoreInfo from '~/components/StoreInfo';
import ImageSection from '~/components/ImageSection';
import ImageCard from '~/components/ImageCard';
import SmoothScroll from '~/components/SmoothScroll';
import FooterComponent from '~/components/FooterComponent';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {LOCATION_PAGE_QUERY} from '~/components/query/locationPageQuery';
import ContactForm from '~/components/ContactForm';
import { FormattedText } from '~/components/functions/formatText';
export const loader = createStaticDataLoader(LOCATION_PAGE_QUERY);

function Location() {
  const {staticData} = useLoaderData();
  console.log(staticData)
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
      {/* Two Column Layout */}
      <div className="flex w-full px-[15%] gap-12 pt-12 pb-20">
        {/* Left Column */}
        <div className="w-[50%] pt-[60px]">
          {/* Content Text */}

          <div className="flex flex-col gap-6 mb-12">
            <span className="p-small-regular-desktop text-black-3">
              {staticData.contact_content.reference.content1.value
                .split(/(\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b)/)
                .map((part, index) => {
                  // Check if part matches email pattern
                  if (
                    part.match(
                      /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/,
                    )
                  ) {
                    return (
                      <a
                        key={index}
                        href={`mailto:${part}`}
                        className="font-bold underline-important text-black"
                      >
                        {part}
                      </a>
                    );
                  }
                  return part;
                })}
            </span>
            <span className="p-small-regular-desktop text-black-3">
              <FormattedText text={staticData.contact_content.reference.content2.value} />
            </span>
          </div>

          {/* Contact Options */}
          <div className="flex flex-col gap-8">
            {staticData.contact_content.reference.contact_options.references.nodes.map((item, index) => (
              <div key={index} className="flex items-center gap-6">
                <div className="w-[28px]">
                  <Image
                    src={item.image.reference.image.url}
                    alt={item.image.reference.image.altText}
                    width={28}
                    sizes="(min-width: 3em) 5em, 10em"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <span className="p-standard-bold-desktop uppercase">
                    {item.header.value}
                  </span>
                  {item.contact.value.includes('@') ? (
                    <a
                      className="text-black-op70 p-small-regular-desktop underline-important"
                      href={`mailto:${item.contact.value}`}
                    >
                      {item.contact.value}
                    </a>
                  ) : (
                    <span className="text-black-op70 p-small-regular-desktop">
                      {item.contact.value}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div className="w-[50%] pt-[60px]">
          <ContactForm />
        </div>
      </div>
      <FooterComponent></FooterComponent>
    </SmoothScroll>
  );
}

export default Location;
