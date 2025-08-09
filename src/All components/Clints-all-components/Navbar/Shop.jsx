import axios from "axios";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { FaChevronDown, FaSort, FaBars, FaTimes, FaHeart } from "react-icons/fa";
import benner from "../../../assets/Images/shop benner.jpg";
import TrandingPost from "./TrandingPost";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom";

const Shop = () => {
    const [cardData, setCardData] = useState([]);
    const [defaultCollection, setDefaultCollection] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Filters state
    const [selectedBrand, setSelectedBrand] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [sortOption, setSortOption] = useState("All");
    const [brandSearch, setBrandSearch] = useState("");
    const [priceRange, setPriceRange] = useState(5000);
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedProductType, setSelectedProductType] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedAvailability, setSelectedAvailability] = useState("");
    const [selectedMaterial, setSelectedMaterial] = useState("");
    const [selectedDiscount, setSelectedDiscount] = useState("");
    const [filtersOpen, setFiltersOpen] = useState(false);

    const productSectionRef = useRef(null);
    const defaultBrandLogo = "https://i.ibb.co.com/JjYJsZmK/haire.png";

    // Fetch data
    useEffect(() => {
        setLoading(true);
        axios("/All post data/post.json")
            .then((res) => {
                const cleanData = res.data.map((item) => ({
                    ...item,
                    price: Number(item.price) || 0,
                    rating: Number(item.rating) || 0,
                    stock: Number(item.stock) || 0,
                    discount: Number(item.discount) || 0,
                }));
                setCardData(cleanData);

                const defaultItems = cleanData
                    .filter((item) => item.collection === "collection")
                    .slice(0, 35);
                setDefaultCollection(defaultItems);
                setFilteredData(defaultItems);
            })
            .catch((err) => console.error("Failed to fetch data", err))
            .finally(() => setLoading(false));
    }, []);

    const brands = useMemo(
        () => [...new Set(cardData.map((item) => item.brand).filter(Boolean))],
        [cardData]
    );
    const categories = useMemo(
        () => [...new Set(cardData.map((item) => item.category).filter(Boolean))],
        [cardData]
    );

    const sizeOptions = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
    const colorOptions = ["red", "blue", "green", "black", "white"];
    const productTypes = ["Electronics", "Kitchen", "Fashion", "Home"];
    const ratings = [5, 4, 3, 2, 1];
    const availabilityOptions = ["In Stock", "Out of Stock"];
    const materialOptions = ["Plastic", "Metal", "Wood", "Glass"];
    const discountOptions = ["10%", "20%", "30%", "50%"];

    // Filtering logic
    useEffect(() => {
        const noFiltersApplied =
            !selectedBrand &&
            !selectedSize &&
            sortOption === "All" &&
            !selectedColor &&
            !selectedCategory &&
            !selectedProductType &&
            !selectedRating &&
            !selectedAvailability &&
            !selectedMaterial &&
            !selectedDiscount &&
            priceRange === 5000;

        if (noFiltersApplied) {
            setFilteredData(defaultCollection);
            return;
        }

        let data = [...cardData];

        if (selectedBrand) data = data.filter((item) => item.brand === selectedBrand);
        if (selectedSize) {
            data = data.filter((item) =>
                item.size
                    ? Array.isArray(item.size)
                        ? item.size.includes(selectedSize)
                        : item.size === selectedSize
                    : false
            );
        }
        if (sortOption !== "All") {
            const option = sortOption.toLowerCase();
            data = data.filter(
                (item) =>
                    (item.specialCategory &&
                        item.specialCategory.toLowerCase() === option) ||
                    (item.productCategory &&
                        item.productCategory.toLowerCase() === option) ||
                    (item.category && item.category.toLowerCase() === option) ||
                    (item.status && item.status.toLowerCase() === option)
            );
        }
        data = data.filter((item) => item.price <= priceRange);
        if (selectedColor) {
            data = data.filter(
                (item) =>
                    item.color && item.color.toLowerCase() === selectedColor.toLowerCase()
            );
        }
        if (selectedCategory) {
            data = data.filter(
                (item) =>
                    item.category &&
                    item.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }
        if (selectedProductType) {
            data = data.filter(
                (item) =>
                    item.productCategory &&
                    item.productCategory.toLowerCase() ===
                    selectedProductType.toLowerCase()
            );
        }
        if (selectedRating) {
            data = data.filter((item) => item.rating >= Number(selectedRating));
        }
        if (selectedAvailability) {
            if (selectedAvailability === "In Stock")
                data = data.filter((item) => item.stock > 0);
            else data = data.filter((item) => item.stock === 0);
        }
        if (selectedMaterial) {
            data = data.filter(
                (item) =>
                    item.material &&
                    item.material.toLowerCase() === selectedMaterial.toLowerCase()
            );
        }
        if (selectedDiscount) {
            const discountValue = parseInt(selectedDiscount);
            data = data.filter((item) => (item.discount || 0) >= discountValue);
        }

        setFilteredData(data);
    }, [
        selectedBrand,
        selectedSize,
        sortOption,
        priceRange,
        selectedColor,
        selectedCategory,
        selectedProductType,
        selectedRating,
        selectedAvailability,
        selectedMaterial,
        selectedDiscount,
        cardData,
        defaultCollection,
    ]);

    const clearFilters = () => {
        setSelectedBrand("");
        setSelectedSize("");
        setSortOption("All");
        setBrandSearch("");
        setPriceRange(5000);
        setSelectedColor("");
        setSelectedCategory("");
        setSelectedProductType("");
        setSelectedRating("");
        setSelectedAvailability("");
        setSelectedMaterial("");
        setSelectedDiscount("");
    };

    return (
        <div className="w-full bg-gray-50 min-h-screen flex flex-col">
            {/* Banner */}
            <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] bg-gray-200 flex items-center justify-center mb-4">
                <img
                    src={benner}
                    alt="Banner"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="relative z-10 text-white text-3xl sm:text-5xl md:text-6xl font-bold drop-shadow text-center px-2">
                    Simple is More
                </div>
            </div>

            {/* Mobile Filter Toggle */}
            {/* Mobile Toggle Button */}
            <div className="max-w-7xl mx-auto px-4 py-4 md:hidden flex justify-end">
                <button
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="text-gray-700 bg-purple-100 p-2 rounded shadow focus:outline-none"
                    aria-label="Toggle filters"
                >
                    {filtersOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Overlay for Mobile when Filters are Open */}
            {filtersOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setFiltersOpen(false)} // Clicking outside closes filters
                ></div>
            )}

            {/* Your Filter Sidebar */}
            <div
                className={`fixed top-0 right-0  w-64 h-full bg-white shadow-lg z-50 transform transition-transform duration-300 ${filtersOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Close Button Inside Sidebar */}
                <div className="flex justify-end p-4 border-b">
                    <button
                        onClick={() => setFiltersOpen(false)}
                        className="text-gray-700 hover:text-red-500"
                    >
                        <FaTimes size={24} />
                    </button>
                </div>
                {/* Sidebar Content */}
                <div className="p-4">
                    {/* Your filter content here */}
                    <p className="text-gray-700">Filter Options...</p>
                </div>
            </div>


            {/* Main Content */}
            <div
                ref={productSectionRef}
                className="max-w-7xl mx-auto grid grid-cols-12 gap-6 px-4 pb-12 flex-1"
            >
                {/* Sidebar Filters */}
                <aside
                    className={`col-span-12 md:col-span-3 bg-white p-4 rounded-xl shadow-lg transition-transform duration-300
            ${filtersOpen ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0 fixed md:static top-0 left-0 h-full md:h-auto z-50 md:z-auto overflow-y-auto
            w-72 md:w-auto`}
                >
                    {/* Brand Filter */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Brand</h2>
                        <input
                            type="text"
                            placeholder="Search brand..."
                            value={brandSearch}
                            onChange={(e) => setBrandSearch(e.target.value)}
                            className="w-full border p-2 rounded mb-3"
                        />
                        <ul className="space-y-1 max-h-[250px] overflow-y-auto">
                            {brands
                                .filter((brand) =>
                                    (brand || "")
                                        .toLowerCase()
                                        .includes(brandSearch.toLowerCase())
                                )
                                .map((brand) => (
                                    <li
                                        key={brand}
                                        onClick={() =>
                                            setSelectedBrand(selectedBrand === brand ? "" : brand)
                                        }
                                        className={`flex items-center gap-2 cursor-pointer p-1 rounded transition ${selectedBrand === brand
                                            ? "bg-purple-100"
                                            : "hover:bg-gray-100"
                                            }`}
                                    >
                                        <img
                                            src={defaultBrandLogo}
                                            alt="logo"
                                            className="w-5 h-5 object-cover rounded"
                                        />
                                        {brand}
                                    </li>
                                ))}
                        </ul>
                    </div>

                    {/* Size Filter */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Size</h2>
                        <div className="flex flex-wrap gap-2">
                            {sizeOptions.map((size) => (
                                <span
                                    key={size}
                                    onClick={() =>
                                        setSelectedSize(selectedSize === size ? "" : size)
                                    }
                                    className={`px-3 py-1 border rounded cursor-pointer transition ${selectedSize === size
                                        ? "bg-purple-100"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Price Range</h2>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            step="100"
                            value={priceRange}
                            onChange={(e) => setPriceRange(Number(e.target.value))}
                            className="w-full"
                        />
                        <p className="text-gray-600">Up to SAR {priceRange}</p>
                    </div>

                    {/* Color Filter */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Color</h2>
                        <div className="flex gap-2 flex-wrap">
                            {colorOptions.map((color) => (
                                <div
                                    key={color}
                                    onClick={() =>
                                        setSelectedColor(selectedColor === color ? "" : color)
                                    }
                                    className="w-6 h-6 rounded-full border cursor-pointer"
                                    style={{
                                        backgroundColor: color,
                                        boxShadow:
                                            selectedColor === color ? "0 0 8px #000" : "",
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Category Filter */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Category</h2>
                        <ul className="space-y-1 max-h-[200px] overflow-y-auto">
                            {categories.map((cat) => (
                                <li
                                    key={cat}
                                    onClick={() =>
                                        setSelectedCategory(selectedCategory === cat ? "" : cat)
                                    }
                                    className={`cursor-pointer p-1 rounded transition ${selectedCategory === cat
                                        ? "bg-purple-100"
                                        : "hover:bg-gray-100"
                                        }`}
                                >
                                    {cat}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Product Type */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Product Type</h2>
                        {productTypes.map((type) => (
                            <div key={type} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={selectedProductType === type}
                                    onChange={() =>
                                        setSelectedProductType(
                                            selectedProductType === type ? "" : type
                                        )
                                    }
                                />
                                <label>{type}</label>
                            </div>
                        ))}
                    </div>

                    {/* Rating */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Rating</h2>
                        {ratings.map((r) => (
                            <div
                                key={r}
                                className="cursor-pointer select-none"
                                onClick={() =>
                                    setSelectedRating(selectedRating === r ? "" : r)
                                }
                            >
                                {"⭐".repeat(r)}
                            </div>
                        ))}
                    </div>

                    {/* Availability */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Availability</h2>
                        {availabilityOptions.map((status) => (
                            <div key={status} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={selectedAvailability === status}
                                    onChange={() =>
                                        setSelectedAvailability(
                                            selectedAvailability === status ? "" : status
                                        )
                                    }
                                />
                                <label>{status}</label>
                            </div>
                        ))}
                    </div>

                    {/* Material */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Material</h2>
                        {materialOptions.map((mat) => (
                            <div key={mat} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={selectedMaterial === mat}
                                    onChange={() =>
                                        setSelectedMaterial(
                                            selectedMaterial === mat ? "" : mat
                                        )
                                    }
                                />
                                <label>{mat}</label>
                            </div>
                        ))}
                    </div>

                    {/* Discount */}
                    <div className="mb-6">
                        <h2 className="font-semibold mb-3">Discount</h2>
                        {discountOptions.map((d) => (
                            <div key={d} className="flex items-center gap-2">
                                <input
                                    type="radio"
                                    checked={selectedDiscount === d}
                                    onChange={() =>
                                        setSelectedDiscount(selectedDiscount === d ? "" : d)
                                    }
                                />
                                <label>{d} or more</label>
                            </div>
                        ))}
                    </div>

                    {/* Clear Filters */}
                    <button
                        onClick={clearFilters}
                        className="w-full py-2 mt-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Clear All Filters
                    </button>
                </aside>

                {/* Products */}
                <main className="col-span-12 md:col-span-9">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-5 py-2 rounded-lg shadow-lg">
                            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                                Shop Now
                            </h1>
                        </div>
                        <div className="flex items-center gap-3 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-xl shadow-lg border border-gray-200">
                            <p className="flex items-center gap-2 text-gray-800 font-semibold text-lg">
                                <FaSort className="text-purple-500 text-xl" /> Sort by
                            </p>
                            <select
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value)}
                                className="rounded-lg px-4 py-2 text-gray-800 font-medium border border-gray-300 bg-white shadow-sm"
                            >
                                <option>All</option>
                                <option>Special</option>
                                <option>Top Sell</option>
                                <option>Featured</option>
                                <option>New Arrival</option>
                                <option>Rice Cooker</option>
                                <option>Pressure Cooker</option>
                                <option>Blender</option>
                                <option>Sale</option>
                                <option>Sold</option>
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center h-64">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
                            <span className="ml-4 text-purple-600 font-semibold">
                                Loading...
                            </span>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredData.length === 0 && (
                                <p className="col-span-full text-center text-gray-500">
                                    No products found.
                                </p>
                            )}
                            {/* card section */}
                            {filteredData.map((item) => (
                                <Tilt
                                    glareEnable={true}
                                    glareMaxOpacity={0.2}
                                    glareColor="#ffffff"
                                    glarePosition="top"
                                    tiltMaxAngleX={10}
                                    tiltMaxAngleY={10}
                                    className="relative group rounded-2xl border border-transparent bg-gradient-to-br from-white via-gray-50 to-gray-100 
        shadow-lg hover:shadow-2xl transform transition-all duration-500 overflow-hidden"
                                >
                                    {/* Shine Animation */}
                                    <span className="absolute top-0 left-[-75%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent 
        transform skew-x-12 animate-shine"></span>

                                    {/* Border Gradient Animation */}
                                    <span className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-purple-400 transition-all duration-500"></span>
                                    <span className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 opacity-0 group-hover:opacity-20 blur-lg transition-all duration-500"></span>

                                    {/* Image */}
                                    <div className="relative overflow-hidden rounded-t-2xl">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-72 h-72 mx-auto object-cover rounded-t-2xl transform group-hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Heart Icon */}
                                        <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-md cursor-pointer hover:bg-pink-500 hover:text-white transition-colors duration-300">
                                            <FaHeart />
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div className="p-4 space-y-2">
                                        <div className="flex justify-between items-center  ">
                                            <p className="text-xs text-gray-400">{item.model}</p>
                                            <p
  className="px-3 py-1 rounded-full text-white text-sm font-semibold bg-gradient-to-r from-greeen-500 via-blue-500 to-cyan-500 shadow-md"
>
  {item.status}
</p>

                                        </div>
                                        <h3 className="font-semibold text-lg text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                                            {item.name}
                                        </h3>
                                        <p className="text-blue-600 font-bold text-lg">
                                            SAR {item.price.toFixed(2)}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <p className="text-sm text-gray-500">{item.brand}</p>
                                            <Link to={`/details/${item.id}`}>
                                                <button
                                                    className="relative px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                rounded-lg overflow-hidden shadow-lg group-hover:scale-105 transition-transform duration-300"
                                                >
                                                    <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg"></span>
                                                    <span className="relative z-10">Details</span>
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </Tilt>




                                // ses
                            ))}
                        </div>
                    )}




                    {/* Extra Sections */}

                    <TrandingPost></TrandingPost>

                </main>
            </div>

        </div>
    );
};

export default Shop;
