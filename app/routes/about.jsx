import React, {useEffect} from 'react';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {ABOUT_QUERY} from '~/components/query/aboutQuery';
import {data, useLoaderData, defer, useLocation} from '@remix-run/react';
import {Image} from '@shopify/hydrogen';
import PersonSection from '~/components/PersonSection';
import QuoteBlock from '~/components/QuoteBlock';
import FooterComponent from '~/components/FooterComponent';

export const loader = createStaticDataLoader(ABOUT_QUERY);

function About() {
  const {staticData} = useLoaderData();
  const location = useLocation();
  useEffect(() => {
    if (location.hash) {
      const scrollToTarget = () => {
        const target = document.querySelector(location.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 200,
            behavior: 'smooth',
          });
        }
      };

      // Ensure the element is available in the DOM
      const timeout = setTimeout(() => {
        requestAnimationFrame(scrollToTarget);
      }, 0); // Minimal delay for hydration timing

      return () => clearTimeout(timeout); // Cleanup
    }
  }, [location]);
  return (
    <div>
      <div className="overflow-hidden w-full h-[360px]">
        <Image
          data={staticData.hero_image.reference.image}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div
        className="flex px-6 py-[60px] gap-12 rounded-b-xl bg-white z-20 relative rounded-t-xl mt-[-20px]"
        id="printemp-ny"
      >
        <div className="flex-1 flex flex-col gap-8 pr-6">
          <h2 className="h2-desktop mb-2">
            {staticData.tradition_header.value}
          </h2>
          <p className="text-black-2 p-standard-medium-desktop w-[450px]">
            {staticData.tradition_content.value}
          </p>
        </div>
        <div className="flex-1 h-full w-full">
          <Image
            data={staticData.tradition_image.reference.image}
            sizes="(min-width: 45em) 50vw, 100vw"
            className="w-full h-full object-cover"
          ></Image>
        </div>
      </div>
      <div id='the-chef'>
        <PersonSection
          name={staticData.chef_section.reference.header.value}
          section={staticData.chef_section.reference.section.value}
          filler1={
            staticData.chef_section.reference.filler_image_1.reference.image
          }
          filler2={
            staticData.chef_section.reference.filler_image_2.reference.image
          }
          mainImg={staticData.chef_section.reference.main_image.reference.image}
          content={
            staticData.chef_section.reference.executive_content_options
              .references.nodes
          }
        />
      </div>
      <QuoteBlock data={staticData.chef_quote.reference}></QuoteBlock>
      <div
        className="flex px-6 py-[60px] gap-12 rounded-b-xl bg-white z-20 relative rounded-t-xl mt-[-20px]"
        id="printemp-ny"
      >
        <div className="flex-1 h-full w-full">
          <Image
            data={staticData.tradition_image.reference.image}
            sizes="(min-width: 45em) 50vw, 100vw"
            className="w-full h-full object-cover"
          ></Image>
        </div>
        <div className="flex-1 flex flex-col gap-8 pr-6">
          <h2 className="h2-desktop mb-2">
            {staticData.tradition_header.value}
          </h2>
          <p className="text-black-2 p-standard-medium-desktop w-[450px]">
            {staticData.tradition_content.value}
          </p>
        </div>
      </div>
      <div id='the-architect'>
        <PersonSection
          name={staticData.architect_section.reference.header.value}
          section={staticData.architect_section.reference.section.value}
          filler1={
            staticData.architect_section.reference.filler_image_1.reference.image
          }
          filler2={
            staticData.architect_section.reference.filler_image_2.reference.image
          }
          mainImg={staticData.architect_section.reference.main_image.reference.image}
          content={
            staticData.architect_section.reference.executive_content_options
              .references.nodes
          }
        />
      </div>
      <QuoteBlock data={staticData.chef_quote.reference}></QuoteBlock>
      <div className='h-12'></div>
      <FooterComponent></FooterComponent>
    </div>
  );
}

export default About;
