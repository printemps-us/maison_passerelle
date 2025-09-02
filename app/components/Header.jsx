import React, {useState, useRef, useEffect} from 'react';
import {Image} from '@shopify/hydrogen';
import RestaurantModal from './RestaurantModal';
import {Link} from '@remix-run/react';
import AnimatedButton from './AnimatedButton';
import HeaderDropDown from './HeaderDropDown';
import Carrot from '~/assets/Carrot';
import {useLocation} from '@remix-run/react';
import useIsMobile from './functions/isMobile';
import HeaderMobile from './mobile/HeaderMobile';

function HeaderComponent({data, isMobile, pathname}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(''); // '' | 'about' | 'menu'
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [showDetails, setShowDetails] = useState(() => {
    if (typeof window !== 'undefined' && isHomePage) {
      return window.scrollY > 200;
    }
    return true;
  });

  const hoverRef = useRef(null);
  const dropdownRef = useRef(null);
  let leaveTimeout = null;

  const isMobileActive = useIsMobile(isMobile);

  useEffect(() => {
    if (location.pathname !== '/') {
      setShowDetails(true);
      return;
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowDetails(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleMouseLeave = () => {
    leaveTimeout = setTimeout(() => {
      setIsHover('');
    }, 200);
  };

  const handleMouseEnter = (section) => {
    clearTimeout(leaveTimeout);
    setIsHover(section); // 'about' or 'menu'
  };

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
        <HeaderMobile data={data} pathname={pathname} />
      </>
    );
  }

  return (
    <>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87094'}
        link={'https://resy.com/cities/new-york-ny/venues/maison-passerelle'}
        api_key={'bJMvYfY5EA6goX7ncWUkx9PMjXdA5v66'}
      />
      <div className="w-full bg-[#AF4145] flex justify-between sticky top-0 h-[100px] z-100">
        <div
          className={`p-4 transition-all duration-500 ease-in-out flex flex-col justify-center  ${
            showDetails ? 'opacity-100 h-full' : 'opacity-0 max-h-0'
          }`}
        >
          <Link to="/">
            <Image
              src="https://cdn.shopify.com/s/files/1/0581/1011/5943/files/MaisonPasser.svg?v=1737053887"
              width={250}
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
          {/* ABOUT */}
          <div
            className="text-[#e8d09b] moderat-bold cursor-pointer h-full flex items-center gap-1 relative"
            onMouseEnter={() => handleMouseEnter('about')}
            onMouseLeave={handleMouseLeave}
            ref={hoverRef}
          >
            <span>ABOUT</span>
            <Carrot rotated={isHover === 'about'} />
            {isHover === 'about' && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50"
              >
                <Link
                  to="/about/history"
                  className="block px-4 py-2 text-sm text-[#AF4145] hover:bg-gray-100"
                >
                  History
                </Link>
                <Link
                  to="/about/team"
                  className="block px-4 py-2 text-sm text-[#AF4145] hover:bg-gray-100"
                >
                  Team
                </Link>
              </div>
            )}
          </div>

          {/* LOCATION */}
          <Link
            to="/location"
            className="text-[#e8d09b] moderat-bold cursor-pointer"
          >
            LOCATION
          </Link>

          {/* MENU */}
          <div
            className="text-[#e8d09b] moderat-bold cursor-pointer h-full flex items-center gap-1 relative"
            onMouseEnter={() => handleMouseEnter('menu')}
            onMouseLeave={handleMouseLeave}
            ref={hoverRef}
          >
            <span>MENU</span>
            <Carrot rotated={isHover === 'menu'} />

            {isHover === 'menu' && (
              <div
                ref={dropdownRef}
                className="absolute top-full mt-2 bg-white shadow-lg rounded-md py-2 w-40 z-50"
              >
                <Link
                  to="/menu/lunch"
                  className="block px-4 py-2 text-sm text-[#AF4145] hover:bg-gray-100"
                >
                  Lunch
                </Link>
                <Link
                  to="/menu/dinner"
                  className="block px-4 py-2 text-sm text-[#AF4145] hover:bg-gray-100"
                >
                  Dinner
                </Link>
              </div>
            )}
          </div>

          {/* CONTACT */}
          <Link
            to="/contact-us"
            className="text-[#e8d09b] moderat-bold cursor-pointer"
          >
            CONTACT US
          </Link>

          {/* RESERVE BUTTON */}
          <AnimatedButton
            text="RESERVE A TABLE"
            onClick={() => setModalOpen(true)}
            bgColor="#e8d09b"
            textColor="#AF4145"
            hoverColor="#e8d09b"
            border="#e8d09b"
            w="180px"
            h="40px"
          />
        </div>

        {/* Shared dropdown handler (if you want to centralize About/Menu) */}
        <HeaderDropDown
          isHover={isHover}
          handleMouseLeave={handleMouseLeave}
          dropdownRef={dropdownRef}
          hoverRef={hoverRef}
          hoverValue={isHover}
          headerData={data}
          handleMouseEnter={handleMouseEnter}
        />
      </div>
    </>
  );
}

export default HeaderComponent;
