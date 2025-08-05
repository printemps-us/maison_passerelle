import React, {useState, useRef, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import RestaurantModal from './RestaurantModal';
import {Link} from '@remix-run/react';
import {data, useLoaderData, defer} from '@remix-run/react';
import AnimatedButton from './AnimatedButton';
import HeaderDropDown from './HeaderDropDown';
import Carrot from '~/assets/Carrot';
import {useLocation} from '@remix-run/react';
import Homepage from '~/routes/_index';
import useIsMobile from './functions/isMobile';
import HeaderMobile from './mobile/HeaderMobile';

function HeaderComponent({data, isMobile}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showDetails, setShowDetails] = useState(() => {
    // On homepage, show only if already scrolled
    if (typeof window !== 'undefined' && isHomePage) {
      return window.scrollY > 200;
    }
    // On any other page, always show
    return true;
  });

  const hoverRef = useRef(null);
  const dropdownRef = useRef(null);
  let leaveTimeout = null;
  
  // Use the server-side mobile detection
  const isMobileActive = useIsMobile(isMobile);

  console.log('isMobileActive', isMobileActive);
  
  useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowDetails(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);
  
  const handleMouseLeave = (e) => {
    if (e.relatedTarget instanceof Window) {
      setIsHover(false);
      // Add your hover close logic here
    } else if (
      e.relatedTarget &&
      dropdownRef.current &&
      dropdownRef.current?.contains(e.relatedTarget) &&
      !hoverRef.current.contains(e.relatedTarget)
    ) {
      // If the mouse is moving into the specific div, do nothing.
      return;
    }
    leaveTimeout = setTimeout(() => {
      setIsHover(false);
    }, 200);
  };
  
  const handleMouseEnter = () => {
    clearTimeout(leaveTimeout);
    setIsHover(true);
  };

  // If mobile, render the mobile header
  if (isMobileActive) {
    return (
      <>
        <RestaurantModal
          setOpenModal={setModalOpen}
          openModal={modalOpen}
          venue_id={'87094'}
          link={'https://resy.com/cities/new-york-ny/venues/maison-passerelle'}
          api_key={'bJMvYfY5EA6goX7ncWUkx9PMjXdA5v66'}
        />
        <HeaderMobile data={data} />
      </>
    );
  }

  // Desktop header
  return (
    <>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87094'}
        link={'https://resy.com/cities/new-york-ny/venues/maison-passerelle'}
        api_key={'bJMvYfY5EA6goX7ncWUkx9PMjXdA5v66'}
      ></RestaurantModal>
      <div className="w-full bg-[#AF4145] flex justify-between sticky top-0 h-[100px] z-100">
        <div
          className={`p-4 transition-all duration-500 ease-in-out flex flex-col justify-center  ${
            showDetails ? 'opacity-100 h-full' : 'opacity-0 max-h-0'
          }`}
        >
          <Link to="/">
            <Image
              src="https://cdn.shopify.com/s/files/1/0581/1011/5943/files/MaisonPasser.svg?v=1737053887"
              width={250} // ✅ number, not '50px'
              sizes="(min-width: 35em) 250px, 500px"
              alt="Maison Passerelle Logo"
            />
          </Link>

          <div className="mt-1 ml-1">
            <p className="moderat-bold text-xs " style={{color: '#e8d09b'}}>
              ONE WALL STREET, NEW YORK, NEW YORK
            </p>
          </div>
        </div>
        <div className="flex gap-12 items-center px-4">
          <Link
            to="/location"
            className="text-[#e8d09b] moderat-bold cursor-pointer"
          >
            LOCATION
          </Link>
          <div
            className="text-[#e8d09b] moderat-bold cursor-pointer h-full flex items-center gap-1"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={hoverRef}
          >
            <span>MENU</span>
            <Carrot rotated={isHover} />
          </div>
          <Link
            to="/about"
            className="text-[#e8d09b] moderat-bold cursor-pointer"
          >
            ABOUT
          </Link>
          <Link
            to="/the-chef"
            className="text-[#e8d09b] moderat-bold cursor-pointer"
          >
            THE CHEF
          </Link>
          <Link
            to="/the-space"
            className="text-[#e8d09b] moderat-bold cursor-pointer"
          >
            THE SPACE
          </Link>
          <Link
            to="/faqs"
            className="text-[#e8d09b] moderat-bold cursor-pointer"
          >
            FAQS
          </Link>
          <Link
            to="/community-and-press"
            className="text-[#e8d09b] moderat-bold cursor-pointer"
          >
            COMMUNITY & PRESS
          </Link>
          <AnimatedButton
            text="RESERVE A TABLE"
            clickURL="https://resy.com/cities/new-york-ny/venues/maison-passerelle"
            onClick={() => setModalOpen(true)}
            bgColor="#e8d09b"
            textColor="#AF4145"
            hoverColor="#d4b87a"
            w="180px"
            h="40px"
            borderRadius="8px"
          />
        </div>
        <HeaderDropDown
          isHover={isHover}
          handleMouseLeave={handleMouseLeave}
          dropdownRef={dropdownRef}
          hoverRef={hoverRef}
          hoverValue="menu"
          headerData={data}
          handleMouseEnter={handleMouseEnter}
        />
      </div>
    </>
  );
}

export default HeaderComponent;
