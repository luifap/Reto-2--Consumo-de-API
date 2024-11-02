import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Star } from 'lucide-react';

const Review = ({ productId }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const mockReviews = [
        {
          id: 1,
          userId: 1,
          userName: "Usuario Ejemplo",
          rating: 4,
          comment: "¡Excelente producto!",
          createdAt: new Date().toISOString()
        }
      ];
      setReviews(mockReviews);
    } catch (error) {
      console.error('Error al cargar reseñas:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para dejar una reseña');
      return;
    }

    setLoading(true);
    try {
      const newReview = {
        id: Date.now(),
        userId: user.id,
        userName: user.name,
        rating,
        comment,
        createdAt: new Date().toISOString()
      };

      setReviews([newReview, ...reviews]);
      setRating(0);
      setComment('');
    } catch (error) {
      console.error('Error al enviar la reseña:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-8 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-6">Reseñas y Valoraciones</h3>
      
      {/* Formulario de reseña */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h4 className="text-lg font-semibold mb-4">Escribe una reseña</h4>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Calificación</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`h-6 w-6 ${
                      value <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Comentario</label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border rounded-md p-2"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading || !isAuthenticated}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? 'Enviando...' : 'Publicar reseña'}
          </button>
        </form>
      </div>

      {/* Lista de reseñas */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-2">
              <div className="font-medium">{review.userName}</div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{review.comment}</p>
            <div className="text-sm text-gray-500 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Review;