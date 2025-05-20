import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import { dummyCards } from '@/constants';
import React from 'react';

const Page = async ({ params }: ParamsWithSearch) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { id } = await params;
  return (
    <div className="wrapper page">
      <Header
        subHeader="papaioannoudev@gmail.com"
        title="PapDev"
        userImg="/assets/images/dummy.jpg"
      />
      <section className='video-grid'>
        {dummyCards.map((card) => (
        <VideoCard {...card} key={card.id} />
      ))}
      </section>
    </div>
  );
};

export default Page;
