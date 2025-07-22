import {defer} from '@shopify/remix-oxygen';
import {Await, useLoaderData, Link} from '@remix-run/react';
import {Suspense, useState} from 'react';
import {Image, Money} from '@shopify/hydrogen';
import AnimatedButton from '~/components/AnimatedButton';
import RestaurantModal from '~/components/RestaurantModal';
/**
 * @type {MetaFunction}
 */
export const meta = () => {
  return [{title: 'Maison Passerelle'}];
};

/**
 * @param {LoaderFunctionArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {LoaderFunctionArgs}
 */
async function loadCriticalData({context}) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {LoaderFunctionArgs}
 */
function loadDeferredData({context}) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const [email, setEmail] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [state, setState] = useState({
    isWaiting: false,
    isSubmitted: false,
    isError: false,
  });
  const url = 'https://printempsnewyork.activehosted.com/proc.php?jsonp=true';

  // NOTE • Valid Email checker
  const validEmail = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
  );

  console.log(state);

  function handleSubmit() {
    exponea.identify(
      {email_id: email.toLowerCase()},
      {
        email: email.toLowerCase(),
        data_source: 'maison passerelle',
      },
    );
    exponea.track('consent', {
      category: 'mp_email',
      valid_until: 'unlimited',
      action: 'accept',
      data_source: 'maison passerelle',
    });
    setState({
      isWaiting: false,
      isSubmitted: true,
    });
  }

  /** @type {LoaderReturnData} */
  const data = useLoaderData();
  return (
    <div className="background">
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87094'}
        link={'https://resy.com/cities/new-york-ny/venues/maison-passerelle'}
        api_key={'bJMvYfY5EA6goX7ncWUkx9PMjXdA5v66'}
      ></RestaurantModal>
      <div className="main-area">
        <Image
          className="logo"
          src={
            'https://cdn.shopify.com/s/files/1/0581/1011/5943/files/MaisonPasser.svg?v=1737053887'
          }
          width={'450px'}
          sizes="(min-width: 35em) 60vw, 70vw"
          alt="Maison Passerelle Logo"
        ></Image>
        <div className="mt-4">
          <p className="moderat-bold text-center" style={{color: '#e8d09b'}}>
            One Wall street, NY
          </p>
        </div>
        <div>
          <p className="moderat-bold text-center" style={{color: '#e8d09b'}}>
            SUNDAY - MONDAY, 5:00PM - 9:00PM
          </p>
          <p className="moderat-bold text-center" style={{color: '#e8d09b'}}>
            TUESDAY - SATURDAY, 5:00PM - 10:00PM
          </p>
        </div>

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
      <div className="footer-container">
        <div className="above-footer">
          <a
            href="https://urlgeni.us/instagram/maisonpasserellenyc"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="https://cdn.shopify.com/s/files/1/0581/1011/5943/files/IG_LOGO.png?v=1736792345"
              alt="Instagram Logo"
              width={42}
            />
          </a>
          <p className="moderat-bold sign-up-text" style={{color: '#e8d09b'}}>
            Maison Passerelle is part of Printemps new york, For more
            information sign up for our newsletter
          </p>
        </div>
        <div className="footer-area">
          <p
            className="moderat-bold"
            style={{fontSize: '14px', color: 'black', marginRight: '8px'}}
          >
            {state.isSubmitted ? 'Merci!' : 'Sign up for our newsletter'}
          </p>
          {state.isSubmitted ? (
            <p
              className="moderat-bold"
              style={{fontSize: '14px', color: 'black', marginRight: '8px'}}
            >
              Check your email for updates
            </p>
          ) : (
            <input
              value={email}
              placeholder="Enter email address"
              onChange={(e) => setEmail(e.target.value)}
              className="moderat-bold footer-input bg-white"
              style={{fontSize: '12px'}}
            ></input>
          )}
          {state.isSubmitted ? (
            <p></p>
          ) : (
            <button
              className="footer-button"
              onClick={handleSubmit}
              disabled={!validEmail.test(email)}
              style={{cursor: !validEmail.test(email) ? 'auto' : 'pointer'}}
            >
              <p
                className="moderat-bold"
                style={{fontSize: '12px', color: 'white'}}
              >
                Submit
              </p>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({collection}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}
      <h1>{collection.title}</h1>
    </Link>
  );
}

/**
 * @param {{
 *   products: Promise<RecommendedProductsQuery | null>;
 * }}
 */
function RecommendedProducts({products}) {
  return (
    <div className="recommended-products">
      <h2>Recommended Products</h2>
      <Suspense fallback={<div>Loading...</div>}>
        <Await resolve={products}>
          {(response) => (
            <div className="recommended-products-grid">
              {response
                ? response.products.nodes.map((product) => (
                    <Link
                      key={product.id}
                      className="recommended-product"
                      to={`/products/${product.handle}`}
                    >
                      <Image
                        data={product.images.nodes[0]}
                        aspectRatio="1/1"
                        sizes="(min-width: 45em) 20vw, 50vw"
                      />
                      <h4>{product.title}</h4>
                      <small>
                        <Money data={product.priceRange.minVariantPrice} />
                      </small>
                    </Link>
                  ))
                : null}
            </div>
          )}
        </Await>
      </Suspense>
      <br />
    </div>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 1) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('@shopify/remix-oxygen').LoaderFunctionArgs} LoaderFunctionArgs */
/** @template T @typedef {import('@remix-run/react').MetaFunction<T>} MetaFunction */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
