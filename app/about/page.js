import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gray-900 text-white">
      <title>About Us - Get Me a Chai</title>
      <meta name="description" content="Learn more about Get Me a Chai, your go-to place for the best chai experience." />
      
      <div className="container mx-auto py-10 px-5">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-2">About Get Me a Chai</h1>
          <p className="text-lg">Your go-to place for the best chai experience</p>
        </header>
        
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <img 
                src="https://cdn11.bigcommerce.com/s-5ljyj9oebs/images/stencil/600x600/products/2883/25369/P062622203113_1__24360.1701721227.jpg?c=2" 
                alt="Chai Preparation" 
                className="w-3/4 h-96 mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div>
              <p className="mb-4">
                Welcome to <strong>Get Me a Chai</strong>! We are passionate about bringing you the best chai experience possible. Our mission is to provide a unique and delightful chai experience for every chai lover.
              </p>
              <p className="mb-4">
                At Get Me a Chai, we believe in the art of brewing the perfect cup of chai. Whether you prefer it spicy, sweet, or milky, we have the perfect blend for you. Our chai recipes are crafted with love and precision, ensuring every sip is a moment of pure joy.
              </p>
            </div>
          </div>
        </section>
        
        <section className="mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="mb-4">
                Founded by chai enthusiasts, our journey began with a simple idea: to share the love of chai with the world. We source the finest ingredients and use traditional brewing methods to bring you an authentic chai experience.
              </p>
              <p className="mb-4">
                Thank you for visiting our website. We hope you enjoy our chai as much as we enjoy making it for you. Stay tuned for exciting updates and new chai blends!
              </p>
              <p className="mb-4">
                If you have any questions or feedback, feel free to reach out to us. We would love to hear from you!
              </p>
            </div>
            <div>
              <img 
                src="https://m.media-amazon.com/images/I/61cYVqskIlL.jpg"  
                alt="Chai Cup" 
                className=" h-96 w-3/4 mx-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;

export const metadata = {
  title: "About - Get Me a Chai",
};
