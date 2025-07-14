import React from 'react';
import HeaderComponent from '~/components/Header';
import {data, useLoaderData, defer} from '@remix-run/react';

export async function loader(args) {
  const staticData = await loadStaticData(args);
  console.log('Returning from loader:', staticData);
  return defer({staticData});
}
async function loadStaticData({context}) {
  try {
    // Run the query
    const data = await context.storefront.query(LOCATION_PAGE_QUERY);

    // Process the result
    const metaobjects = data.metaobjects.nodes[0];
    console.log('test', metaobjects);
    return {
      staticData: metaobjects,
    };
  } catch (error) {
    console.error('Error in loader:', error);
    // Handle or rethrow the error as needed
    throw new Error('Failed to load static data');
  }
}
function Location() {
  const {staticData} = useLoaderData();
  console.log(staticData, 'here');
  return (
    <div>
      <HeaderComponent></HeaderComponent>
      <div className="h-[500px] bg-white-2 border-y-1 border-y-white-4 flex">
        {/* <div
          className="flex-1 rounded-br-[300px]"
          style={{
            backgroundSize: 'cover', // Ensures the image covers the entire container
            backgroundPosition: 'center', // Centers the image within the container
            backgroundRepeat: 'no-repeat', // Prevents the image from repeating
            backgroundImage: `url(${data.location_image.reference.image.url})`,
          }}
        ></div>
        <div className="flex-1 flex-col flex justify-center items-center gap-6 text-center">
          <h2 className="h2-desktop w-[220px]">{data.location_header.value}</h2>
          <p className="w-[450px] p-standard-medium-desktop text-black-2">
            {data.location_sub.value}
          </p>
          <AnimatedButton
            h={'42px'}
            w={'339px'}
            text={data.location_button.reference.button_text.value}
            bgColor={data.location_button.reference.color.value}
            hoverColor={data.location_button.reference.hover_color.value}
            clickURL={data.location_button.reference?.link.value}
          />
        </div> */}
      </div>
    </div>
  );
}
const LOCATION_PAGE_QUERY = `query StaticPageContent {
  metaobjects(type: "location_page", first: 10) {
    nodes {
logo: field(key: "logo") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
            hero_background: field(key: "hero_background") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
            resy_button: field(key: "resy_button") {
              reference {
                ... on Metaobject {
                  key: field(key: "key") {
                    value
                  }
                  button_text: field(key: "button_text") {
                    value
                  }
                    venueId: field(key: "venue_id") {
                    value
                  }
                  link: field(key: "link") {
                    value
                  }
                  color: field(key: "color") {
                    value
                  }
                  hover_color: field(key: "hover_color") {
                    value
                  }
                    api_key: field(key: "api_key") {
                    value
                  }
                }
              }
            }
            menu_button: field(key: "menu_button") {
              reference {
                ... on Metaobject {
                  key: field(key: "key") {
                    value
                  }
                  button_text: field(key: "button_text") {
                    value
                  }
                  link: field(key: "link") {
                    value
                  }
                  color: field(key: "color") {
                    value
                  }
                  hover_color: field(key: "hover_color") {
                    value
                  }
                }
              }
            }
            lunch_button: field(key: "lunch_button") {
              reference {
                ... on Metaobject {
                  key: field(key: "key") {
                    value
                  }
                  button_text: field(key: "button_text") {
                    value
                  }
                  link: field(key: "link") {
                    value
                  }
                  color: field(key: "color") {
                    value
                  }
                  hover_color: field(key: "hover_color") {
                    value
                  }
                }
              }
            }
            dinner_button: field(key: "dinner_button") {
              reference {
                ... on Metaobject {
                  key: field(key: "key") {
                    value
                  }
                  button_text: field(key: "button_text") {
                    value
                  }
                  link: field(key: "link") {
                    value
                  }
                  color: field(key: "color") {
                    value
                  }
                  hover_color: field(key: "hover_color") {
                    value
                  }
                }
              }
            }
            hero_content: field(key: "hero_content") {
              value
            }
            description_header: field(key: "description_header") {
              value
            }
            description_content: field(key: "description_content") {
              value
            }
            description_images: field(key: "description_images") {
              references(first: 4) {
                nodes {
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
            quote_text: field(key: "quote_text") {
              value
            }
            quote_author: field(key: "quote_author") {
              value
            }
            quote_background_color: field(key: "quote_background_color") {
              value
            }
            publication_header: field(key: "publication_header") {
              value
            }
            publication_content: field(key: "publication_content") {
              value
            }
            publication_sources: field(key: "publication_sources") {
              references(first: 5) {
                nodes {
                  ... on MediaImage {
                    image {
                      url
                      altText
                    }
                  }
                }
              }
            }
            transition_image: field(key: "transition_image") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
            all_header: field(key: "all_header") {
              value
            }
            location_image: field(key: "location_image") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
            location_header: field(key: "location_header") {
              value
            }
            location_sub: field(key: "location_sub") {
              value
            }
              theme_color: field(key: "theme_color") {
              value
            }
            location_button: field(key: "location_button") {
              reference {
                ... on Metaobject {
                  key: field(key: "key") {
                    value
                  }
                  button_text: field(key: "button_text") {
                    value
                  }
                  link: field(key: "link") {
                    value
                  }
                  color: field(key: "color") {
                    value
                  }
                  hover_color: field(key: "hover_color") {
                    value
                  }
                }
              }
            }
            contact_options: field(key: "contact_options") {
              references(first: 10) {
                nodes {
                  ... on Metaobject {
                    contact: field(key: "contact") {
                      value
                    }
                    header: field(key: "header") {
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
            }
            faqs: field(key: "faq") {
              references(first: 10) {
                nodes {
                  ... on Metaobject {
                    section_id: field(key: "section_id") {
                      value
                    }
                    header: field(key: "header") {
                      value
                    }
                    options: field(key: "options") {
                      references(first: 10) {
                        nodes {
                          ... on Metaobject {
                            faq_id: field(key: "faq_id") {
                              value
                            }
                            header: field(key: "header") {
                              value
                            }
                            content: field(key: "content") {
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
            other_dining_options: field(key: "other_dining_options") {
              references(first: 3) {
                nodes {
                  ... on Metaobject {
                    button: field(key: "button") {
                      reference {
                        ... on Metaobject {
                          key: field(key: "key") {
                            value
                          }
                          button_text: field(key: "button_text") {
                            value
                          }
                          link: field(key: "link") {
                            value
                          }
                          color: field(key: "color") {
                            value
                          }
                          hover_color: field(key: "hover_color") {
                            value
                          }
                        }
                      }
                    }
                    header: field(key: "header") {
                      value
                    }
                    content: field(key: "content") {
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
            }
          }
        }
}`;

export default Location;
