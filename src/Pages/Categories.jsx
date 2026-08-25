import { Link } from "react-router-dom";

import iphone from "../assets/Product/iphone.jpeg";
import laptop from "../assets/Product/laptop.jpeg";
import headphone from "../assets/Product/headphone.jpeg";
import smartwatch from "../assets/Product/smartwatch.jpeg";
import camera from "../assets/Product/camera.jpeg";

function Categories() {
  const categories = [
    {
      name: "Smartphones",
      image: iphone,
      description: "Latest smartphones and mobile devices",
    },
    {
      name: "Laptops",
      image: laptop,
      description: "Powerful laptops for work and study",
    },
    {
      name: "Audio",
      image: headphone,
      description: "Headphones and wireless audio",
    },
    {
      name: "Wearables",
      image: smartwatch,
      description: "Smartwatches and wearable technology",
    },
    {
      name: "Gaming",
      image: laptop,
      description: "Gaming devices and accessories",
    },
    {
      name: "Cameras",
      image: camera,
      description: "Digital cameras and photography",
    },
    {
      name: "Accessories",
      image: headphone,
      description: "Useful electronics accessories",
    },
    {
      name: "Tablets",
      image: laptop,
      description: "Modern tablets for work and entertainment",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

   
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">

          <p className="text-blue-200 uppercase tracking-widest font-semibold mb-3">
          
          </p>

          <h1 className="text-4xl md:text-5xl font-bold">
          
          </h1>

          <p className="mt-4 text-lg text-blue-100">
            
          </p>

        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-14">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7">

          {categories.map((category) => (
            <Link
              to="/products"
              key={category.name}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
            >

            
              <div className="h-56 bg-gray-100 flex items-center justify-center p-6 overflow-hidden">

                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                />

              </div>

              
              <div className="p-5 text-center">

                <h2 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition">
                  {category.name}
                </h2>

                <p className="text-gray-500 text-sm mt-2">
                  {category.description}
                </p>

                <div className="mt-4 text-blue-600 font-semibold">
                  Shop Now →
                </div>

              </div>

            </Link>
          ))}

        </div>

      </section>

    </div>
  );
}

export default Categories;