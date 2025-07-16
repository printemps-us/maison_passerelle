export const CHEF_QUERY = `query StaticPageContent {
  metaobjects(type: "the_chef_page", first: 10) {
    nodes {
      handle
      title_header: field(key: "title_header") {
        value
      }
      title_sub: field(key: "title_sub") {
        value
      }
      chef_header: field(key: "chef_header") {
        value
      }
      chef_sub: field(key: "chef_sub") {
        value
      }
      chef_image_1: field(key: "chef_image_1") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
      chef_image_2: field(key: "chef_image_2") {
        reference {
        ... on MediaImage {
            image {
            url
            altText
            }
        }
        }
    }
        filler_image_1: field(key: "filler_image_1") {
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
              }
            }
      filler_image_2: field(key: "filler_image_2") {
        reference {
        ... on MediaImage {
            image {
            url
            altText
            }
        }
        }
    }
        meet_chef_header: field(key: "meet_chef_header") {
        value
      }
      meet_chef_content: field(key: "meet_chef_content") {
        value
      }
       early_life_header: field(key: "early_life_header") {
        value
      }
      early_life_content: field(key: "early_life_content") {
        value
      }
        awards_header: field(key: "awards_header") {
        value
      }
      awards_content: field(key: "awards_content") {
        value
      }
      quote_block: field(key: "quote_block") {
        reference {
          ... on Metaobject {
            author: field(key: "author") {
              value
            }
            quote: field(key: "quote") {
              value
            }
            
          }
        }
      }
      images: field(key:"images") {
        references(first: 4) {
          nodes {
          ... on MediaImage {
                  image {
                    url
                    altText
                  }
                }
          }}}
      faqs: field(key: "faqs") {
        references(first: 20) {
          nodes {
            ... on Metaobject {
              section_id: field(key: "section_id") {
                value
              }
              header: field(key: "header") {
                value
              }
              options: field(key: "options") {
                references(first: 20) {
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
    }
  }
}`;
