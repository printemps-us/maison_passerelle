import React from 'react';

function QuoteBlock({data}) {
  return (
    <div className="bg-white-2 h-[320px] w-full flex flex-col justify-center items-center text-center">
      <div className="w-[850px]">
        <p className="h2-desktop">
         {data.quote.value}
        </p>
      </div>
      <div className='mt-6'>
        <p className="uppercase p-small-regular-desktop">
          {data.author.value}
        </p>
      </div>
    </div>
  );
}

export default QuoteBlock;
