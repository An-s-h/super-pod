import React from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const cat = [
    {
      name: "Business",
      color: "bg-purple-200",
      to: "/categories/Business",
      img: "https://plus.unsplash.com/premium_vector-1710425435145-7f4f0b49edcf?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YnVzaW5lc3N8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Comedy",
      color: "bg-yellow-200",
      to: "/categories/Comedy",
      img: "https://cdni.iconscout.com/illustration/premium/thumb/male-comedian-performs-stand-up-comedy-9649813-7845123.png?f=webp",
    },
    {
      name: "Education",
      color: "bg-blue-200",
      to: "/categories/Education",
      img: "https://plus.unsplash.com/premium_vector-1698192208594-0adbd1ca400e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZWR1Y2F0aW9ufGVufDB8fDB8fHww",
    },
    {
      name: "Hobbies",
      color: "bg-green-200",
      to: "/categories/Hobbies",
      img: "https://plus.unsplash.com/premium_vector-1718623564835-8b32f21574f2?q=80&w=2650&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      name: "Technology",
      color: "bg-red-200",
      to: "/categories/Technology",
      img: "https://plus.unsplash.com/premium_vector-1682310920702-50669014da8f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGVjaG5vbG9neXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Travel",
      color: "bg-orange-200",
      to: "/categories/Travel",
      img: "https://plus.unsplash.com/premium_vector-1711979204455-4c6685665bdb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dHJhdmVsfGVufDB8fDB8fHww",
    },
    {
      name: "Lifestyle",
      color: "bg-pink-200",
      to: "/categories/Lifestyle",
      img: "https://plus.unsplash.com/premium_vector-1720104185076-1da12c931562?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpZmVzdHlsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      name: "Government",
      color: "bg-indigo-200",
      to: "/categories/Government",
      img: "https://png.pngtree.com/png-clipart/20230913/original/pngtree-congress-clipart-the-united-states-government-building-illustration-with-a-meeting-png-image_11069690.png",
    },
  ];

  return (
   <>
   <h1 className="text-4xl lg:text-7xl font-extrabold text-center text-black capitalize mb-5">
        Categories
      </h1>
    <div className="relative flex justify-center p-4 "> 
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full  max-w-screen-lg">
        {cat.map((item, i) => (
          <Link
            to={item.to}
            key={i}
            className={`relative rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ${item.color}`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center ">
              <span className="text-white text-xl md:text-2xl lg:text-3xl font-bold">{item.name}</span>
            </div>
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-full object-cover object-center"
            />
          </Link>
        ))}
      </div>
    </div>
    </>
  );
};

export default Categories;
