import React, {useState, useRef} from 'react';
import {Image} from '@shopify/hydrogen';
import RestaurantModal from './RestaurantModal';
import {Link} from '@remix-run/react';
import {data, useLoaderData, defer} from '@remix-run/react';
import AnimatedButton from './AnimatedButton';
import HeaderDropDown from './HeaderDropDown';
import Carrot from '~/assets/Carrot';

function HeaderComponent({data}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const hoverRef = useRef(null);
  const dropdownRef = useRef(null);
  let leaveTimeout = null;
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
        <div className="p-4">
          <Link to="/">
            <Image
              src="https://cdn.shopify.com/s/files/1/0581/1011/5943/files/MaisonPasser.svg?v=1737053887"
              width={250} // ✅ number, not '50px'
              sizes="(min-width: 35em) 250px, 500px"
              alt="Maison Passerelle Logo"
            />
          </Link>

          <div className="mt-1">
            <p className="moderat-bold text-xs " style={{color: '#e8d09b'}}>
              One Wall street, NY &#8226; MONDAY - SATURDAY, 5:00PM - 10:30PM
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
          >
            <p>ABOUT</p>
            <div className="mb-[2px]">
              <Carrot rotated={!isHover}></Carrot>
            </div>
          </div>
          <Link
            to="/menu"
            className="text-[#e8d09b] moderat-bold cursor-pointer"
          >
            MENU
          </Link>
          <AnimatedButton
            text={'Reservations'}
            bgColor={'#e8d09b'}
            hoverColor={'#e8d09b'}
            textColor={'black'}
            border="#e8d09b"
            hoverBorder={'#e8d09b'}
            onClick={() => setModalOpen(true)}
            h="36px"
            w="200px"
          />
        </div>
        <HeaderDropDown
          isHover={isHover}
          dropdownRef={dropdownRef}
          hoverRef={hoverRef}
          headerData={data}
          handleMouseLeave={handleMouseLeave}
          handleMouseEnter={handleMouseEnter}
        ></HeaderDropDown>
      </div>
    </>
  );
}

export default HeaderComponent;
