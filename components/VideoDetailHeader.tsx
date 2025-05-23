'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const VideoDetailHeader = ({
  title,
  createdAt,
  userImg,
  username,
  ownerId,
  id,
}: VideoDetailHeaderProps) => {
  const router = useRouter();
  const [copied, setCopied] = React.useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/video/${id}`);
    setCopied(true);
  };

  useEffect(() => {
    const changeChecked = setTimeout(() => {
      if (copied) setCopied(false);
    }, 2000);

    return () => clearTimeout(changeChecked);
  }, [copied]);

  return (
    <header className="detail-header">
      <aside className="user-info">
        <h1>{title}</h1>
        <figure>
          <button onClick={() => router.push(`/profile/${ownerId}`)}>
            <Image
              src={userImg || ''}
              alt="User"
              width={26}
              height={26}
              className="rounded-full"
            />
            <h2>{username ?? 'Guest'}</h2>
          </button>
          <figcaption>
            <span>•</span>
            <span>{createdAt?.toLocaleString()}</span>
          </figcaption>
        </figure>
      </aside>
      <aside className="cta">
        <button onClick={handleCopyLink}>
          <Image
            src={
              copied ? '/assets/images/checked.png' : `/assets/icons/link.svg`
            }
            alt="Copy"
            width={24}
            height={24}
          />
        </button>
      </aside>
    </header>
  );
};

export default VideoDetailHeader;
