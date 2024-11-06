import React from 'react';

const Blog = () => {
  // Datos simulados del blog sobre productos
  const posts = [
    {
      id: 1,
      title: 'Pensamos en tus pies',
      date: '2024-10-01',
      image: '/imagenBlog01.webp',
      excerpt: 'Explora nuestra colección de zapatos',
    },
    {
      id: 2,
      title: 'Ofertas Especiales en Camisetas',
      date: '2024-10-10',
      image: '/imagenBlog02.jpg',
      excerpt: 'Aprovecha nuestras increíbles ofertas en los últimos dispositivos electrónicos...',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-red-600 mb-6 md:text-4xl  ">Blog de Productos</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="col-span-2">
            <div className="grid grid-cols-1 gap-8">
                {posts.map(post => (
                <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                    <div className="p-4">
                    <h2 className="text-2xl font-semibold text-red-600 mb-2">{post.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">{new Date(post.date).toLocaleDateString()}</p>
                    <p className="text-gray-700 mb-4">{post.excerpt}</p>
                    <button className="text-red-600 hover:text-red-700 font-semibold">
                        Leer más
                    </button>
                    </div>
                </div>
                ))}
            </div>
            </div>

            <div className="space-y-4">
            {/* Sección 1 */}
            <div className="bg-gray-100 rounded-lg">
                <div className="h-2 bg-gradient-to-r from-red-500 to-red-700 rounded-t-lg"></div>
                <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Productos Destacados</h3>
                <ul className="list-disc pl-5 mb-4">
                    <li><a href="#" className="text-red-600 hover:underline">Producto 1</a></li>
                    <li><a href="#" className="text-red-600 hover:underline">Producto 2</a></li>
                    <li><a href="#" className="text-red-600 hover:underline">Producto 3</a></li>
                </ul>
                </div>
            </div>

            <div className="bg-gray-100 rounded-lg">
                <div className="h-2 bg-gradient-to-r from-red-500 to-red-700 rounded-t-lg"></div>
                <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Ofertas Especiales</h3>
                <p className="text-gray-700 mb-4">No te pierdas nuestras ofertas especiales en productos seleccionados. ¡Visítanos regularmente!</p>
                </div>
            </div>

            
            <div className="bg-gray-100 rounded-lg">
                <div className="h-2 bg-gradient-to-r from-red-500 to-red-700 rounded-t-lg"></div>
                <div className="p-4">
                <h3 className="text-lg font-bold mb-2">Síguenos en Redes Sociales</h3>
                <div className="flex space-x-4 mb-8">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-3xl">
                    <i className="fa fa-facebook-f"></i>
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-3xl">
                    <i className="fa fa-twitter"></i>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-red-600 text-3xl">
                    <i className="fa fa-instagram"></i>
                    </a>
                </div>
                </div>
            </div>
            </div>
        </div>
    </div>
  );
};

export default Blog;