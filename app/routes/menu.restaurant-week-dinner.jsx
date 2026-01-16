import React, {useRef, useState, useEffect} from 'react';
import {data, useLoaderData, defer} from '@remix-run/react';
import {Image, getSeoMeta} from '@shopify/hydrogen';
import {Link, useLocation, useNavigate} from '@remix-run/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import SmoothScroll from '~/components/SmoothScroll';
import FooterComponent from '~/components/FooterComponent';
import useIsMobile from '~/components/functions/isMobile';
import FooterMobile from '~/components/mobile/FooterMobile';

export async function loader(args) {
  const staticData = await loadStaticData(args);

  return defer({...staticData});
}
export const meta = ({data}) => {
  return getSeoMeta({
    title: data?.staticData?.seo?.reference?.title?.value,
    description: data?.staticData?.seo?.reference?.description?.value,
    image: data?.staticData?.seo?.reference?.image?.reference?.image?.url,
  });
};
async function loadStaticData({context}) {
  try {
    // Run the query
    const data = await context.storefront.query(MENU_QUERY);

    // Process the result
    const metaobjects = data.metaobjects.nodes[0];
    return {
      staticData: metaobjects,
    };
  } catch (error) {
    console.error('Error in loader:', error);
    // Handle or rethrow the error as needed
    throw new Error('Failed to load static data');
  }
}
function menu() {
  const data = useLoaderData();
  const navigate = useNavigate();
  const isInitialRender = useRef(true);
  const isMobileActive = useIsMobile(false);

  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const isBigger =
    width > data.staticData.content?.references.nodes.length * 140;
  const [currentSection, setCurrentSection] = useState(null);
  const roomsHeaderRef = useRef();
  const location = useLocation();
  const handleClick = () => {
    if (window.resyWidget) {
      resyWidget.openModal({
        venueId: data.resy_button?.reference?.venueId?.value,
        apiKey: data.resy_button?.reference?.api_key?.value,
        replace: 'true',
      });
    } else {
      console.error('Resy widget is not available.');
    }
  };

  function organizeMenuItems(data) {
    const result = [];
    let currentArray = [];

    data.forEach((item) => {
      if (item.master_header) {
        // Start a new array for the master header
        currentArray = [item];
        result.push(currentArray);
      } else if (!item.link) {
        // Continue adding items under the current master header
        currentArray.push(item);
      } else {
        // If there's a link, start a new array
        currentArray = [item];
        result.push(currentArray);
      }
    });

    return result;
  }
  const organizedMenuItems = organizeMenuItems(
    data.staticData.content.references.nodes,
  );
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    navigate(location.pathname, {replace: true});
    // Wait for content to be ready
    const initScrollTriggers = () => {
      // Kill any existing ScrollTriggers first
      ScrollTrigger.getAll().forEach((st) => st.kill());

      // Section tracking
      gsap.utils.toArray('.section').forEach((section) => {
        const sectionId = section.id;
        // Find the corresponding node in data
        const node = data?.staticData.content?.references?.nodes.find(
          (n) => n?.link?.value === sectionId,
        );
        if (!node) {
          return;
        }

        ScrollTrigger.create({
          trigger: section,
          start: '-100px 25%',
          end: '100% 25%',
          toggleActions: 'play none none reverse',
          onEnter: () => setCurrentSection(section.id),
          onEnterBack: () => setCurrentSection(section.id),
          immediateRender: false,
        });
      });

      // Force a refresh after initialization
      ScrollTrigger.refresh();
    };

    // Delay initialization and add a second refresh
    const timer = setTimeout(() => {
      initScrollTriggers();
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.killAll();
    };
  }, []);
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false; // Skip first render
      return;
    }

    if (location.hash) {
      const scrollToTarget = () => {
        const target = document.querySelector(location.hash);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 300,
            behavior: 'smooth',
          });
        }
      };

      const timeout = setTimeout(() => {
        requestAnimationFrame(scrollToTarget);
      }, 0);

      return () => clearTimeout(timeout);
    }
  }, [location]);
  // Empty dependency array since we want this to run once on mount
  let nodesWithLinks =
    data?.staticData.content?.references?.nodes?.filter(
      (node) => node?.link?.value,
    )?.length + 1 || 0;

  return (
    <SmoothScroll>
      <div
        ref={roomsHeaderRef}
        className="flex gap-8 w-full px-8 sticky hide-scrollbar top-[100px]  py-[18px] z-20 overflow-x-scroll border-b-1 border-b-[#AF4145]"
        style={{
          paddingLeft: `max((100vw - ${nodesWithLinks * 132}px) / 2, 20px)`,
          backgroundColor: '#e8d09b',
        }}
      >
        {data?.staticData.content?.references?.nodes?.map((item, index) => (
          <>
            {item?.link?.value && (
              <Link
                key={index}
                className="text-center w-[100px] flex flex-col gap-3 cursor-pointer items-center link"
                to={`#${item?.link?.value}`}
              >
                <div
                  className={`${
                    currentSection == item?.link?.value ? 'border-2' : ''
                  } border-[#000000] h-[75px] w-[75px] p-0.5 rounded-full room`}
                >
                  <div className=" rounded-full w-full h-full overflow-hidden ">
                    <Image
                      className="h-full w-full object-cover"
                      src={item?.image?.reference?.image?.url}
                      alt={item?.image?.reference?.image?.altText}
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center',
                      }}
                      sizes="(min-width: 2em) 5em, 10em"
                    ></Image>
                  </div>
                </div>
                <span
                  className={`${
                    currentSection == item?.link?.value
                      ? 'p-small-bold-desktop'
                      : 'p-small-regular-desktop'
                  } text-black-2`}
                >
                  {item?.master_header?.value
                    ? item?.master_header?.value
                    : item?.title?.value}
                </span>
              </Link>
            )}
          </>
        ))}
        <a
          className="text-center w-[100px] flex flex-col gap-3 cursor-pointer items-center link"
          target="_blank"
          rel="noopener noreferrer"
          href={`https://cdn.shopify.com/s/files/1/0636/5164/3554/files/NEW_WINE_MENU_10.28.25.pdf?v=1762910223`}
        >
          <div
            className={` border-[#000000] h-[75px] w-[75px] p-0.5 rounded-full room`}
          >
            <div className=" rounded-full w-full h-full overflow-hidden ">
              <Image
                className="h-full w-full object-cover"
                src={
                  'https://cdn.shopify.com/s/files/1/0636/5164/3554/files/F_BMenuItems_ByTheBottle.png?v=1763001263'
                }
                alt={'wine icon'}
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                sizes="(min-width: 2em) 5em, 10em"
              ></Image>
            </div>
          </div>
          <span className={`${'p-small-regular-desktop'} text-black-2`}>
            Wine List
          </span>
        </a>
      </div>

      <div
        className="flex flex-col items-center gap-[120px] pt-[100px] pb-[200px]"
        style={{
          color: 'black',
          backgroundColor: '#e8d09b',
        }}
      >
        <div className="text-center">
          <h3 className={`${isMobileActive ? 'h3-mobile' : 'h3-desktop'} pb-3`}>
            NYC RESTAURANT WEEK WINTER 2026
          </h3>
          <h2
            className={`${
              isMobileActive
                ? 'p-small-regular-desktop'
                : 'p-standard-medium-desktop'
            } italic`}
          >
            Jan 20th - Feb 12th, Monday-Friday & Sunday
          </h2>
          <div className="h-8"> </div>
          <h2 className={`${isMobileActive ? 'h5-mobile' : 'h5-desktop'}`}>
            Dinner Prix Fixe - 3 courses - $60*
          </h2>
          <div className="h-4"></div>
          <h2
            className={`${
              isMobileActive
                ? 'p-small-regular-desktop'
                : 'p-standard-medium-desktop'
            } italic`}
          >
            PLEASE CHOOSE ONE COURSE FROM EACH SECTION
          </h2>
          <div className="h-8"></div>
          <div className="italic">*taxes and gratuity not included</div>
        </div>

        {organizedMenuItems.map((section, section_index) => (
          <div
            key={`${section?.title?.value}_title_${section_index}`}
            id={section[0]?.link?.value}
            className="section flex flex-col items-center gap-8"
          >
            {section.map((item, index) => (
              <div
                key={`${item?.title?.value}_title_${index}`}
                className="flex flex-col items-center gap-8 "
              >
                <h3 className="h3-desktop pb-3 moderat-bold text-center">
                  {item?.title?.value}
                </h3>
                {item?.menu_items?.references?.nodes?.map((item, index) => (
                  <div
                    key={`${item?.title?.value}_item_${index}`}
                    className="gap-3 flex flex-col items-center w-[90%]"
                  >
                    <p className="p-standard-bold-desktop uppercase urbanist text-center">
                      {item.title.value}
                    </p>
                    <div className="flex urbanist flex-wrap text-center justify-center">
                      {item?.ingredients?.value &&
                        JSON.parse(item?.ingredients?.value).map(
                          (ingredient, index, array) => (
                            <p
                              key={`${ingredient}_item_${index}`}
                              className="p-small-regular-desktop text-center"
                            >
                              {ingredient}
                              {index < array.length - 1 && '・'}
                            </p>
                          ),
                        )}
                    </div>
                    {item?.price?.value && (
                      <p className="p-small-bold-desktop text-center">
                        ${item?.price?.value}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
      {!isMobileActive ? (
        <FooterComponent></FooterComponent>
      ) : (
        <div className="mt-[-2px]">
          <FooterMobile></FooterMobile>
        </div>
      )}
    </SmoothScroll>
  );
}

export default menu;

const MENU_QUERY = `query StaticPageContent {
  metaobjects(type: "restaurant_week_dinner_menu", first: 10) {
    nodes {
      handle
      seo: field(key: "seo") {
        reference {
          ... on Metaobject {
            title: field(key: "title") {
              value
            }
            description: field(key: "description") {
              value
            }
            image: field(key: "image") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
          }
        }
      }
      content: field(key: "content") {
        references(first: 30) {
          nodes {
            ... on Metaobject {
              title: field(key: "title") {
                value
              }
              link: field(key: "link") {
                value
              }
                master_header: field(key: "master_header") {
              value
            }
                image: field(key: "image") {
                      reference {
                        ... on MediaImage {
                          image {
                            url
                            altText
                          }
                        }
                      }
                    }
              menu_items: field(key: "menu_items") {
                references(first: 50) {
                  nodes {
                    ... on Metaobject {
                      title: field(key: "title") {
                        value
                      }
                      price: field(key: "price") {
                        value
                      }
                      ingredients: field(key: "ingredients") {
                        value
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}`;
