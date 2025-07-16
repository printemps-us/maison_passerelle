import React, {useRef, useEffect} from 'react';
import {data, useLoaderData, defer} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import FooterComponent from '~/components/FooterComponent';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {PRESS_QUERY} from '~/components/query/pressQuery';
import {FormattedText} from '~/components/functions/formatText';
import PersonSection from '~/components/PersonSection';
import QuoteBlock from '~/components/QuoteBlock';
import AnimatedButton from '~/components/AnimatedButton';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {ScrollToPlugin} from 'gsap/ScrollToPlugin';
import RoomCard from '~/components/RoomCard';
export const loader = createStaticDataLoader(PRESS_QUERY);

function Press() {
  const {staticData} = useLoaderData();
  const frenchApartmentRef = useRef();

  //   useEffect(() => {
  //     gsap.registerPlugin(ScrollTrigger);
  //     gsap.registerPlugin(ScrollToPlugin);

  //     gsap.fromTo(
  //       frenchApartmentRef.current,
  //       {opacity: 0}, // Scroll to the middle
  //       {
  //         opacity: 1,
  //         duration: 2.5,
  //         scrollTrigger: {
  //           id: 'opacityApartment',
  //           trigger: frenchApartmentRef.current,
  //           start: '-20% 90%', // When container is 90% down viewport
  //           end: 'bottom 50%',
  //           toggleActions: 'play none none reverse',
  //         },
  //       },
  //     );
  //     return () => {
  //       // Clean up on component unmount
  //       ScrollTrigger.killAll();
  //     };
  //   }, []);
  return (
    <div>
      {/* <div className="py-24">
        <p className="h2-desktop text-center">
          {staticData.press_header?.value}
        </p>
        <div className="pt-12 flex gap-6 items-center overflow-x-auto py-4 justify-center">
          {staticData.press_logos?.references.nodes.map((item, index) => (
            <div key={index} className="h-10 flex-shrink-0">
              <Image
                data={item.image}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div> */}
      <div className="flex flex-col py-15 rounded-b-2xl bg-white">
        <div className="flex flex-col justify-center items-center gap-6 py-12">
          <h2
            ref={frenchApartmentRef}
            className="h1-desktop  text-center w-[775px]"
          >
            {staticData.press_header?.value}
          </h2>
          {/* <AnimatedButton
            text={staticData.rooms_button.reference.button_text.value}
            h={'42px'}
            w={'339px'}
            clickURL={staticData.rooms_button.reference.link.value}
            hoverColor={staticData.rooms_button.reference.hover_color.value}
          /> */}
        </div>
        <div className="flex gap-2 w-full overflow-y-hidden hide-scrollbar py-15 h-[550px] no-overscroll px-8">
          {staticData.rooms_list_1.references.nodes.map((item, index) => (
            <div key={item.id} id={item.header.value} className="flex-1">
              <RoomCard
                header={item.header.value}
                sub={item.sub.value}
                button_text={item.button_text.value}
                image={item.image.reference.image}
                link={item.link?.value}
              />
            </div>
          ))}
        </div>
      </div>
      <QuoteBlock data={staticData.quote_block_1.reference}></QuoteBlock>
      <div className="flex gap-2 w-full overflow-y-hidden hide-scrollbar py-15 h-[550px] no-overscroll px-8">
        {staticData.rooms_list_2.references.nodes.map((item, index) => (
          <div key={item.id} id={item.header.value} className="flex-1">
            <RoomCard
              header={item.header.value}
              sub={item.sub.value}
              button_text={item.button_text.value}
              image={item.image.reference.image}
              link={item.link?.value}
            />
          </div>
        ))}
      </div>
      <QuoteBlock data={staticData.quote_block_2.reference}></QuoteBlock>
      <div className="flex gap-2 w-full overflow-y-hidden hide-scrollbar py-15 h-[550px] no-overscroll px-8">
        {staticData.rooms_list_3.references.nodes.map((item, index) => (
          <div key={item.id} id={item.header.value} className="flex-1">
            <RoomCard
              header={item.header.value}
              sub={item.sub.value}
              button_text={item.button_text.value}
              image={item.image.reference.image}
              link={item.link?.value}
            />
          </div>
        ))}
      </div>
      <div className="overflow-hidden w-full h-[300px]">
        <Image
          data={staticData.filler_image?.reference.image}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default Press;
