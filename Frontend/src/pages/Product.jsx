import React, { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import Rating from 'react-rating';
import { useParams, useNavigate } from 'react-router-dom';

const formatINR = (amount) => {
    // Handle the new price format which might be a string
    const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
    return numericAmount?.toLocaleString('en-IN', { style: 'currency', currency: 'INR' });
};

const getRandomImage = (productId) => {
    // Get a consistent random image based on product ID
    const imageCount = 8; // We have product1.jpg to product8.jpg
    const imageIndex = (parseInt(productId) % imageCount) + 1;
    return `/products/product${imageIndex}.jpg`;
};

const createDescription = (product) => {
    // Create description from composition fields
    let description = '';
    if (product.short_composition1) {
        description += product.short_composition1;
    }
    if (product.short_composition2) {
        description += product.short_composition1 ? ' + ' + product.short_composition2 : product.short_composition2;
    }
    if (product.pack_size_label) {
        description += ` - ${product.pack_size_label}`;
    }
    if (product.manufacturer_name) {
        description += ` by ${product.manufacturer_name}`;
    }
    return description || 'No description available';
};

const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Note: For production with 253,973 records, consider implementing a backend API 
        // or server-side rendering to avoid loading the entire dataset
        setLoading(true);
        
        fetch('/database/products.json')
            .then(res => res.json())
            .then(data => {
                const foundProduct = data.find(item => item.id === id || item.id === parseInt(id));
                setProduct(foundProduct);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching product:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
                <div className="text-xl text-gray-600">Loading product details...</div>
                <div className="text-sm text-gray-500 mt-2">Please wait while we search through 250K+ products</div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
                    <button 
                        onClick={() => navigate('/medicine')}
                        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Back to Medicine
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="lg:p-24 p-6">
            <div className="max-w-4xl mx-auto">
                {/* Back button */}
                <button 
                    onClick={() => navigate('/medicine')}
                    className="mb-6 px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition"
                >
                    ← Back to Medicine
                </button>

                <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="flex justify-center">
                            <img 
                                className="w-full max-w-md h-96 object-cover rounded-lg" 
                                src={getRandomImage(product.id)} 
                                alt={product.name || product.title} 
                            />
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <h1 className="text-3xl font-bold text-gray-900 poppins">{product.name || product.title}</h1>
                            
                            <p className="text-gray-600 text-lg leading-relaxed">{createDescription(product)}</p>

                            {/* Price */}
                            <h2 className="text-4xl font-bold text-gray-900 poppins">{formatINR(product['price(₹)'] || product.price)}</h2>
                            
                            {/* Rating - Generate random rating if not available */}
                            <div className="flex items-center space-x-2">
                                <Rating
                                    emptySymbol={<AiOutlineStar className="text-gray-600 text-2xl" />}
                                    fullSymbol={<AiFillStar className="text-yellow-400 text-2xl" />}
                                    initialRating={Number(product.rating) || Math.floor(Math.random() * 2) + 4} // Random 4-5 rating if not available
                                    readonly
                                />
                                <span className="text-gray-600 text-lg">({product.reviews || Math.floor(Math.random() * 50) + 10} reviews)</span>
                            </div>

                            {/* Additional Details */}
                            <div className="space-y-3">
                                <div className="border-t pt-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">Product Information</h3>
                                    <div className="grid grid-cols-1 gap-4 text-sm space-y-2">
                                        {product.manufacturer_name && (
                                            <div>
                                                <span className="font-medium text-gray-600">Manufacturer:</span>
                                                <span className="ml-2">{product.manufacturer_name}</span>
                                            </div>
                                        )}
                                        {product.type && (
                                            <div>
                                                <span className="font-medium text-gray-600">Type:</span>
                                                <span className="ml-2 capitalize">{product.type}</span>
                                            </div>
                                        )}
                                        {product.pack_size_label && (
                                            <div>
                                                <span className="font-medium text-gray-600">Pack Size:</span>
                                                <span className="ml-2">{product.pack_size_label}</span>
                                            </div>
                                        )}
                                        {product.short_composition1 && (
                                            <div>
                                                <span className="font-medium text-gray-600">Active Ingredients:</span>
                                                <span className="ml-2">
                                                    {product.short_composition1}
                                                    {product.short_composition2 && `, ${product.short_composition2}`}
                                                </span>
                                            </div>
                                        )}
                                        <div>
                                            <span className="font-medium text-gray-600">Status:</span>
                                            <span className={`ml-2 ${product.Is_discontinued === 'FALSE' ? 'text-green-600' : 'text-red-600'}`}>
                                                {product.Is_discontinued === 'FALSE' ? 'Available' : 'Discontinued'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;