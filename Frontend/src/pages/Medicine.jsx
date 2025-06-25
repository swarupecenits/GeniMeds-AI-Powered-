import { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';

const formatINR = (amount) => {
    return amount?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

const getImagePath = (image) => {

    const filename = image.split('/').pop();
    return `/products/${filename}`;
};

const Medicine = () => {
    const [medicines, setMedicines] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetch('/database/products.json')
            .then(res => res.json())
            .then(data => setMedicines(data));
    }, []);

    return (
        <div className="lg:p-24 p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 text-gray-800 lg:-mt-7 pb-5">Generic Products</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {medicines.map((med) => (
                    <div key={med.id} className="flex flex-col justify-center items-center space-y-3 bg-white border border-gray-200 hover:shadow-xl transition duration-700 ease-in-out transform hover:scale-105 p-4 box-border rounded-xl">
                        <img className="w-full h-72 object-cover" src={getImagePath(med.image)} alt={med.title} />
                        <h1 className="text-gray-600 poppins text-lg text-center">{med.title}</h1>
                        <p className="text-gray-500 text-center flex-grow">{med.description.slice(0, 70)}...</p>
                        <h2 className="text-gray-900 text-center font-bold poppins text-3xl">{formatINR(med.price)}</h2>
                        <div className="flex items-center space-x-2">
                            <Rating
                                emptySymbol={<AiOutlineStar className="text-gray-600 text-xl" />}
                                fullSymbol={<AiFillStar className="text-yellow-400 text-xl" />}
                                initialRating={Number(med.rating)}
                                readonly
                            />
                            <span className="text-gray-600">({med.reviews})</span>
                        </div>
                        <button
                            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                            onClick={() => setSelected(med)}
                        >
                            View Details
                        </button>
                    </div>
                ))}
                {/* Modal for details */}
                {selected && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                        <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
                            <button className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-2xl" onClick={() => setSelected(null)}>&times;</button>
                            <img className="w-full h-72 object-cover mb-4" src={getImagePath(selected.image)} alt={selected.title} />
                            <h1 className="text-gray-900 font-bold text-2xl mb-2">{selected.title}</h1>
                            <p className="text-gray-700 mb-2">{selected.description}</p>
                            <h2 className="text-gray-900 font-bold text-xl mb-2">{formatINR(selected.price)}</h2>
                            <div className="flex items-center space-x-2 mb-2">
                                <Rating
                                    emptySymbol={<AiOutlineStar className="text-gray-600 text-xl" />}
                                    fullSymbol={<AiFillStar className="text-yellow-400 text-xl" />}
                                    initialRating={Number(selected.rating)}
                                    readonly
                                />
                                <span className="text-gray-600">({selected.reviews})</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Medicine;
