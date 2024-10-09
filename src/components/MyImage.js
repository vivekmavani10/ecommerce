import React, { useState } from 'react';
import styled from 'styled-components';

function MyImage({ imgs = [] }) {
  const [selectedImage, setSelectedImage] = useState(imgs[0]); // Initialize with the first image

  const handleImageClick = (curElem) => {
    setSelectedImage(curElem); // Update the selected image when clicked
  };

  return (
    <Wrapper>
      <div className='grid grid-four-column'>
        {imgs.length > 0 ? (
          imgs.map((curElem, index) => {
            return (
              <figure key={index}>
                <img
                  src={curElem.url}
                  alt={curElem.filename}
                  className='box-image--style'
                  onClick={() => handleImageClick(curElem)} // Set the clicked image as the main image
                />
              </figure>
            );
          })
        ) : (
          <p>No images available</p>
        )}
      </div>

      <div className='main-screen'>
        {selectedImage && (
          <img src={selectedImage.url} alt={selectedImage.filename} />
        )}
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 0.4fr 1fr;
  gap: 1rem;

  .grid {
    flex-direction: row;
    justify-items: center;
    align-items: center;
    width: 100%;
    gap: 1rem;

    img {
      max-width: 100%;
      max-height: 100%;
      background-size: cover;
      object-fit: contain;
      cursor: pointer;
      box-shadow: ${({ theme }) => theme.colors.shadow};
      transition: transform 0.3s ease; /* Add a hover effect */
    }

    img:hover {
      transform: scale(1.05); /* Slight zoom effect on hover */
    }
  }

  .main-screen {
    display: grid;
    place-items: center;
    order: 1;
    img {
      max-width: 100%;
      height: auto;
      box-shadow: ${({ theme }) => theme.colors.shadow};
    }
  }

  .grid-four-column {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(4, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.media.mobile}) {
    display: flex;
    flex-direction: column;
    order: 1;

    .grid-four-column {
      grid-template-rows: 1fr;
      grid-template-columns: repeat(4, 1fr);
    }
  }
`;

export default MyImage;


