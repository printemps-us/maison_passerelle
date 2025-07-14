import React, {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import RestaurantModal from './RestaurantModal';
import AnimatedButton from './AnimatedButton';
function HeaderComponent() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <RestaurantModal
        setOpenModal={setModalOpen}
        openModal={modalOpen}
        venue_id={'87094'}
        link={'https://resy.com/cities/new-york-ny/venues/maison-passerelle'}
        api_key={'bJMvYfY5EA6goX7ncWUkx9PMjXdA5v66'}
      ></RestaurantModal>
      <div className="w-full bg-[#AF4145] p-4 flex justify-between">
        <div>
          <Image
            src="https://cdn.shopify.com/s/files/1/0581/1011/5943/files/MaisonPasser.svg?v=1737053887"
            width={250} // ✅ number, not '50px'
            sizes="(min-width: 35em) 250px, 500px"
            alt="Maison Passerelle Logo"
          />

          <div className="mt-1">
            <p className="moderat-bold text-xs " style={{color: '#e8d09b'}}>
              One Wall street, NY &#8226; MONDAY - SATURDAY, 5:00PM - 10:30PM
            </p>
          </div>
        </div>
        <div className="flex gap-12 items-center">
          <button className="text-[#e8d09b] moderat-bold cursor-pointer">
            LOCATION
          </button>
          <button className="text-[#e8d09b] moderat-bold cursor-pointer">
            ABOUT
          </button>
          <button className="text-[#e8d09b] moderat-bold cursor-pointer">
            MENU
          </button>
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
      </div>
    </>
  );
}

export default HeaderComponent;
