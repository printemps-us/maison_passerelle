import React, {useEffect} from 'react';
import AnimatedButton from './AnimatedButton';
import Close from '~/assets/CloseIcon.svg';
function MenuModal({
  setOpenModal,
  openModal,
  venue_id,
  link,
  api_key,
  isMobile = false,
}) {
  const handleClick = () => {
    if (window.resyWidget) {
      resyWidget.openModal({
        venueId: venue_id,
        apiKey: api_key,
        replace: 'true',
      });
    } else {
      console.error('Resy widget is not available.');
    }
  };
  return (
    <>
      {openModal && (
        <div className="z-110 fixed top-[-100px] left-0 w-screen h-[calc(100vh+100px)] bg-black-op40 flex items-center justify-center px-6">
          <div className="bg-white rounded-xl flex flex-col items-center px-6 pt-[18px] pb-6 gap-8">
            <div className="relative w-full">
              <div className="w-full flex justify-end mb-2">
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    setOpenModal(false);
                    console.log('trigger')
                  }}
                >
                  <img src={Close} alt="close icon" width={20} height={20} />
                </button>
              </div>
              <h3
                className={`${
                  isMobile ? 'h3-mobile' : 'h3-desktop'
                } text-center`}
              >
                View Our Menus
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <AnimatedButton
                text={'Lunch Menu'}
                bgColor={'black'}
                hoverColor={'black'}
                border="black"
                clickURL={'/menu/lunch'}
                h={isMobile ? '42px' : '42px'}
                w={isMobile ? '225px' : '339px'}
              />
              <AnimatedButton
                text={'Dinner Menu'}
                bgColor={'white'}
                hoverColor={'#e8d09b'}
                h={isMobile ? '42px' : '42px'}
                w={isMobile ? '225px' : '339px'}
                clickURL={'/menu/dinner'}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuModal;
