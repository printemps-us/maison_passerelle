import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import AnimatedButton from '~/components/AnimatedButton';
import RestaurantModal from '~/components/RestaurantModal';
import FooterComponent from '~/components/FooterComponent';
import {createStaticDataLoader} from '~/components/functions/loadStaticData';
import {HOME_QUERY} from '~/components/query/homeQuery';
import StoreInfo from '~/components/StoreInfo';
import RoomCard from '~/components/RoomCard';
/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Maison Passerelle'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export const loader = createStaticDataLoader(HOME_QUERY);

export default function Homepage() {
  const [modalOpen, setModalOpen] = useState(false);

  /** @type {LoaderReturnData} */
  const {staticData} = useLoaderData();
  console.log(staticData);
  return (
    <div>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87094'}
        link={'https://resy.com/cities/new-york-ny/venues/maison-passerelle'}
        api_key={'bJMvYfY5EA6goX7ncWUkx9PMjXdA5v66'}
      ></RestaurantModal>
      <div className="bg-[#AF4145] flex flex-col items-center gap-2 py-[100px]">
        <Image
          className="logo"
          src={
            'https://cdn.shopify.com/s/files/1/0581/1011/5943/files/MaisonPasser.svg?v=1737053887'
          }
          width={'450px'}
          sizes="(min-width: 35em) 60vw, 70vw"
          alt="Maison Passerelle Logo"
        ></Image>
        <p className="moderat-bold text-center" style={{color: '#e8d09b'}}>
          One Wall street, NY
        </p>
        <p className="moderat-bold text-center" style={{color: '#e8d09b'}}>
          MONDAY - SATURDAY, 5:00PM - 10:30PM
        </p>

        <div className="mt-16  h-auto w-full flex max-[835px]:flex-col gap-3 justify-center items-center">
          <AnimatedButton
            text={'Book with Resy'}
            bgColor={'#e8d09b'}
            hoverColor={'#e8d09b'}
            textColor={'black'}
            border="#e8d09b"
            hoverBorder={'#e8d09b'}
            onClick={() => setModalOpen(true)}
            h="42px"
            w="90%"
          />
          <AnimatedButton
            text={'View Menu'}
            bgColor={'#e8d09b'}
            hoverColor={'#e8d09b'}
            textColor={'black'}
            border="#e8d09b"
            hoverBorder={'#e8d09b'}
            clickURL={'/menu'}
            h="42px"
            w="90%"
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center h-[120px] text-center my-12">
        <h2 className="h2-desktop">{staticData.title_header.value}</h2>
        <p className="w-[450px] p-standard-medium-desktop text-black-2">
          {staticData.title_sub.value}
        </p>
      </div>
      <div className="flex gap-4 px-6 mb-10">
        {staticData.title_images.references.nodes.map((item, index) => (
          <div key={index} className="overflow-hidden rounded-xl h-[400px]">
            <Image data={item.image} className="w-full h-full object-cover">
              {/* your content here */}
            </Image>
          </div>
        ))}
      </div>
      <div className="h-[500px] bg-white-2 border-y-1 border-y-white-4 flex">
        <div
          className="flex-1 rounded-br-[300px]"
          style={{
            backgroundSize: 'cover', // Ensures the image covers the entire container
            backgroundPosition: 'center', // Centers the image within the container
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
            backgroundImage: `url(${staticData.find_us_image.reference.image.url})`,
          }}
        ></div>
        <div className="flex-1 flex-col flex justify-center items-center gap-6 text-center">
          <h2 className="h2-desktop w-[220px]">
            {staticData.find_us_title.value}
          </h2>
          <p className="w-[450px] p-standard-medium-desktop text-black-2">
            {staticData.find_us_sub.value}
          </p>
          <AnimatedButton
            h={'42px'}
            w={'339px'}
            text={staticData.find_us_button.reference.button_text.value}
            bgColor={staticData.find_us_button.reference.color.value}
            hoverColor={staticData.find_us_button.reference.hover_color.value}
            clickURL={staticData.find_us_button.reference?.link.value}
          />
        </div>
      </div>
      <StoreInfo data={staticData.icons} bgColor={'#AF4145'}></StoreInfo>
      <div className='py-10 border-y-1 border-white-4 my-10 mx-20'>
        <p className="h2-desktop text-center">
          {staticData.as_seen_header?.value}
        </p>
        <div className="pt-12 flex gap-6 items-center overflow-x-auto py-4 justify-center">
          {staticData.as_seen_images?.references.nodes.map((item, index) => (
            <div key={index} className="h-10 flex-shrink-0">
              <Image
                data={item.image}
                className="h-full w-auto object-contain"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="overflow-hidden w-full h-[300px]">
        <Image
          data={staticData.filler_image?.reference.image}
          className="w-full h-full object-cover"
        ></Image>
      </div>
      <div className="w-full flex flex-col items-center justify-center h-[200px] text-center my-6">
        <h2 className="h2-desktop">{staticData.about_header.value}</h2>
        <p className="w-[450px] p-standard-medium-desktop text-black-2">
          {staticData.about_sub.value}
        </p>
      </div>
      <div className="flex gap-2 w-full overflow-y-hidden hide-scrollbar h-[550px] no-overscroll px-8">
        {staticData.about_options.references.nodes.map((item, index) => (
          <div key={item.id} id={item.header.value} className="flex-1">
            <RoomCard
              header={item.header.value}
              sub={item.sub?.value}
              button_text={item.button_text.value}
              image={item.image.reference.image}
              link={item.link?.value}
            />
          </div>
        ))}
      </div>
      <FooterComponent></FooterComponent>
    </div>
  );
}

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
