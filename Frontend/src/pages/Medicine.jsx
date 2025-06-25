import { useState, useEffect } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import Rating from 'react-rating';

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

const createShortDescription = (product) => {
    // Create short description from composition fields
    let description = '';
    if (product.short_composition1) {
        description += product.short_composition1;
    }
    if (product.short_composition2) {
        description += product.short_composition1 ? ' + ' + product.short_composition2 : product.short_composition2;
    }
    return description || 'Generic medicine';
};

const Medicine = () => {
    const [medicines, setMedicines] = useState([]);
    const [allMedicines, setAllMedicines] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [totalProducts, setTotalProducts] = useState(0);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(0);
    const navigate = useNavigate();
    
    const itemsPerPage = 12; // Show 12 products per page
    const totalPages = Math.ceil((searchTerm ? filteredProducts : totalProducts) / itemsPerPage);

    useEffect(() => {
        setLoading(true);
        fetch('/database/products.json')
            .then(res => res.json())
            .then(data => {
                setAllMedicines(data);
                setTotalProducts(data.length);
                // Calculate the items for current page
                const startIndex = (currentPage - 1) * itemsPerPage;
                const endIndex = startIndex + itemsPerPage;
                const currentPageData = data.slice(startIndex, endIndex);
                setMedicines(currentPageData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (allMedicines.length === 0) return;
        
        let filteredData = allMedicines;
        
        if (searchTerm) {
            filteredData = allMedicines.filter(med => 
                med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                med.short_composition1?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                med.short_composition2?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                med.manufacturer_name?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        
        setFilteredProducts(filteredData.length);
        
        // Calculate the items for current page
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        const currentPageData = filteredData.slice(startIndex, endIndex);
        setMedicines(currentPageData);
    }, [searchTerm, currentPage, allMedicines]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        // Scroll to top when page changes
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    const currentTotal = searchTerm ? filteredProducts : totalProducts;

    const generatePageNumbers = () => {
        const pages = [];
        const maxVisiblePages = 5;
        
        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 4; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('...');
                for (let i = totalPages - 3; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('...');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('...');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <div className="lg:p-24 p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 lg:-mt-7 pb-4">Generic Products</h1>
                
                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-6">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search medicines, compositions, or manufacturers..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className="w-full px-4 py-3 pl-10 pr-4 text-gray-700 bg-white border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                </div>
                
                <p className="text-gray-600">
                    {searchTerm ? (
                        <>Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, currentTotal)} of {currentTotal.toLocaleString()} filtered results</>
                    ) : (
                        <>Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, currentTotal)} of {currentTotal.toLocaleString()} products</>
                    )}
                </p>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="text-2xl text-gray-600">Loading products...</div>
                </div>
            ) : medicines.length === 0 && searchTerm ? (
                <div className="text-center py-20">
                    <div className="text-xl text-gray-600 mb-4">No products found for "{searchTerm}"</div>
                    <button
                        onClick={() => setSearchTerm('')}
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    >
                        Clear Search
                    </button>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {medicines.map((med) => (
                            <div key={med.id} className="flex flex-col justify-center items-center space-y-3 bg-white border border-gray-200 hover:shadow-xl transition duration-700 ease-in-out transform hover:scale-105 p-4 box-border rounded-xl">
                                <img className="w-full h-64 object-cover rounded-lg" src={getRandomImage(med.id)} alt={med.name || med.title} />
                                <h1 className="text-gray-600 poppins text-lg text-center font-medium">{med.name || med.title}</h1>
                                <p className="text-gray-500 text-center text-sm flex-grow">{createShortDescription(med).slice(0, 60)}...</p>
                                <h2 className="text-gray-900 text-center font-bold poppins text-2xl">{formatINR(med['price(₹)'] || med.price)}</h2>
                                <div className="flex items-center space-x-2">
                                    <Rating
                                        emptySymbol={<AiOutlineStar className="text-gray-600 text-lg" />}
                                        fullSymbol={<AiFillStar className="text-yellow-400 text-lg" />}
                                        initialRating={Number(med.rating) || Math.floor(Math.random() * 2) + 4} // Random 4-5 rating if not available
                                        readonly
                                    />
                                    <span className="text-gray-600 text-sm">({med.reviews || Math.floor(Math.random() * 50) + 10})</span>
                                </div>
                                <button
                                    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-full"
                                    onClick={() => navigate(`/product/${med.id}`)}
                                >
                                    View Details
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center items-center mt-12 space-x-2">
                        {/* Previous Button */}
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                currentPage === 1
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            Previous
                        </button>

                        {/* Page Numbers */}
                        {generatePageNumbers().map((page, index) => (
                            <button
                                key={index}
                                onClick={() => typeof page === 'number' && handlePageChange(page)}
                                disabled={page === '...'}
                                className={`px-4 py-2 rounded-lg font-medium transition ${
                                    page === currentPage
                                        ? 'bg-blue-600 text-white'
                                        : page === '...'
                                        ? 'bg-transparent text-gray-500 cursor-default'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                {page}
                            </button>
                        ))}

                        {/* Next Button */}
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className={`px-4 py-2 rounded-lg font-medium transition ${
                                currentPage === totalPages
                                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                        >
                            Next
                        </button>
                    </div>

                    {/* Page Info */}
                    <div className="text-center mt-6 text-gray-600">
                        <span>Page {currentPage} of {totalPages.toLocaleString()}</span>
                    </div>
                </>
            )}
        </div>
    );
};

export default Medicine;
