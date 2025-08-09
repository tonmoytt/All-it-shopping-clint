import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "./Blog.css";
import { Link } from "react-router-dom";

const categories = ["All", "Fashion", "Tech", "Lifestyle", "Health", "Travel"];
const tags = ["React", "JavaScript", "CSS", "Travel", "Fashion", "Health", "Lifestyle", "Tech"];

const popularPostsDummy = [
    { id: 101, title: "How to Style Your Summer Outfits", img: "/images/popular1.jpg" },
    { id: 102, title: "Top 10 React Tips & Tricks", img: "/images/popular2.jpg" },
    { id: 103, title: "Healthy Living: 5 Easy Habits", img: "/images/popular3.jpg" },
];

const recentCommentsDummy = [
    { id: 1, name: "Alice", comment: "Great post! Really helped me.", postTitle: "How to Style Your Summer Outfits" },
    { id: 2, name: "Bob", comment: "Very informative, thanks for sharing.", postTitle: "Top 10 React Tips & Tricks" },
    { id: 3, name: "Clara", comment: "Loved this article!", postTitle: "Healthy Living: 5 Easy Habits" },
];

const authors = [
    {
        id: 1,
        name: "John Doe",
        bio: "John is a passionate lifestyle blogger who loves sharing tips on fashion and health.",
        img: "https://i.ibb.co.com/1Jh8Cnck/author2.jpg",
    },
    {
        id: 2,
        name: "Jane Smith",
        bio: "Jane is a tech enthusiast and front-end developer sharing insights on React and JavaScript.",
        img: "https://i.ibb.co.com/1Jd0nwHX/author4.jpg",
    },
];

const Blog = () => {
    const [blogData, setBlogData] = useState([]);
    const [blogData2, setBlogData2] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [activeCategory, setActiveCategory] = useState("All");
    const postsPerPage = 6;

    useEffect(() => {
        fetch("/All post data/post.json")
            .then((res) => res.json())
            .then((data) => {
                const blog = data.filter((item) => item.category2 === "blog");
                const topsell = data.filter((item) => item.productTag === "Top Sell");
                setBlogData(blog);
                setBlogData2(topsell);
            });
    }, []);

    const toggleReadMore = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    // Filter posts by category
    const filteredData =
        activeCategory === "All"
            ? blogData
            : blogData.filter((post) => post.category === activeCategory);

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredData.length / postsPerPage);

    // Featured post (first post from filtered list)
    const featuredPost = filteredData.length > 0 ? filteredData[0] : null;

    return (
        <div className="blog-page max-w-7xl mx-auto px-4 py-10">
            {/* Header Section */}
            <header className="blog-header text-center mb-12">
                <h1 className="text-4xl font-extrabold mb-4">Our Blog</h1>
                <p className="text-gray-700 max-w-xl mx-auto">
                    Stay updated with the latest trends, tips, and insights from our expert writers.
                </p>
            </header>

            {/* Categories Filter */}
            <nav className="categories-filter flex flex-wrap justify-center gap-4 mb-10">
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => {
                            setActiveCategory(cat);
                            setCurrentPage(1);
                        }}
                        className={`category-btn px-4 py-2 rounded-full border font-semibold transition ${activeCategory === cat
                            ? "bg-yellow-400 text-white border-yellow-400"
                            : "border-gray-300 text-gray-700 hover:bg-yellow-100"
                            }`}
                    >
                        {cat}
                    </button>
                ))}
            </nav>

            {/* Featured Post */}
            {featuredPost && (
                <section className="featured-post mb-14 bg-yellow-50 rounded-lg p-6 shadow-md flex flex-col md:flex-row gap-6 items-center">
                    <img
                        src={featuredPost.img}
                        alt={featuredPost.title}
                        className="w-full md:w-1/3 rounded-lg object-cover max-h-48"
                    />
                    <div className="md:w-2/3">
                        <h2 className="text-3xl font-bold mb-2">{featuredPost.title}</h2>
                        <div className="blog-meta flex gap-6 text-gray-600 mb-4 text-sm">
                            <span className="flex items-center gap-1">
                                <FaCalendarAlt /> {featuredPost.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <FaUser /> {featuredPost.category}
                            </span>
                        </div>
                        <p className="text-gray-700 mb-4">{featuredPost.description}</p>
                        {expanded === featuredPost.id && (
                            <p className="text-gray-800">{featuredPost.ldescription}</p>
                        )}
                        <button
                            className="read-more underline text-yellow-600 font-semibold"
                            onClick={() => toggleReadMore(featuredPost.id)}
                        >
                            {expanded === featuredPost.id ? "READ LESS" : "READ MORE"}
                        </button>
                    </div>
                </section>
            )}

            {/* Blog Cards Grid */}
            <section className="blog-container grid gap-8 mb-12">
                {currentPosts.map((post) => (
                    <article className="blog-card bg-white rounded-lg shadow p-5" key={post.id}>
                        <img
                            src={post.img}
                            alt={post.title}
                            className="rounded-md w-full h-48 object-cover mb-4"
                        />
                        <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                        <div className="blog-meta flex gap-4 text-gray-600 text-sm mb-3">
                            <span className="flex items-center gap-1">
                                <FaCalendarAlt /> {post.date}
                            </span>
                            <span className="flex items-center gap-1">
                                <FaUser /> {post.category}
                            </span>
                        </div>
                        <p className="text-gray-700 mb-3">{post.description}</p>

                        {expanded === post.id && (
                            <p className="full-desc text-gray-800">{post.ldescription}</p>
                        )}

                        <button
                            className="read-more underline text-yellow-600 font-semibold"
                            onClick={() => toggleReadMore(post.id)}
                        >
                            {expanded === post.id ? "READ LESS" : "READ MORE"}
                        </button>
                    </article>
                ))}
            </section>

            {/* Pagination */}
            <div className="pagination flex justify-center gap-3 mb-16">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`px-4 py-2 rounded-md border font-semibold transition ${currentPage === i + 1
                            ? "bg-yellow-400 text-white border-yellow-400"
                            : "border-gray-300 text-gray-700 hover:bg-yellow-100"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>

            {/* Popular Posts Section */}
            <section className="popular-posts mb-16">
                <h2 className="text-3xl font-bold mb-6 text-center text-yellow-500">Popular Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {blogData2.map((post) => (
                        <div
                            key={post.id}
                            className="popular-card rounded-lg bg-gradient-to-br from-yellow-100 to-yellow-50 border border-yellow-300 shadow-lg hover:shadow-2xl transition-shadow duration-300 p-5 flex flex-col"
                        >
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-44 object-cover rounded-lg mb-5 border border-yellow-200"
                            />
                            <div className="flex justify-between items-center">
                                <h3 className="font-semibold text-lg text-yellow-700 hover:text-yellow-900 transition-colors duration-300 cursor-pointer">
                                    {post.name}
                                </h3>
                                <Link to={`/details/${post.id}`}>  <button
                                    className="btn-details bg-yellow-400 text-yellow-900 font-semibold px-4 py-2 rounded-md shadow-md
                       hover:bg-yellow-500 hover:text-white transition-colors duration-300"
                                >
                                    Details
                                </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </section>


            {/* Recent Comments Section */}
            <section className="recent-comments mb-16 max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Recent Comments</h2>
                <ul className="space-y-6">
                    {recentCommentsDummy.map(({ id, name, comment, postTitle }) => (
                        <li key={id} className="border-b pb-4">
                            <p className="italic text-gray-600">"{comment}"</p>
                            <p className="text-sm mt-1 text-gray-800">
                                - <strong>{name}</strong> on <em>{postTitle}</em>
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Author Spotlight */}
            <section className="author-spotlight mb-16 max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6 text-center">Author Spotlight</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    {authors.map(({ id, name, bio, img }) => (
                        <div key={id} className="author-card flex gap-5 items-center bg-white p-6 rounded shadow">
                            <img src={img} alt={name} className="w-24 h-24 rounded-full object-cover" />
                            <div>
                                <h3 className="text-xl font-semibold">{name}</h3>
                                <p className="text-gray-700">{bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Tags Cloud */}
            {/* <section className="tags-cloud mb-16 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Tags</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {tags.map((tag) => (
            <button
              key={tag}
              className="px-4 py-2 rounded-full bg-yellow-200 text-yellow-900 font-semibold hover:bg-yellow-300 transition"
              onClick={() => alert(`Filter posts by tag: ${tag} (implement as needed)`)}
            >
              {tag}
            </button>
          ))}
        </div>
      </section> */}

            {/* Call to Action */}
            <section className="call-to-action mb-16 bg-cyan-400 text-white rounded-lg p-10 text-center max-w-4xl mx-auto shadow-lg">
                <h2 className="text-3xl font-extrabold mb-4">Want to Contribute?</h2>
                <p className="mb-6 max-w-md mx-auto">
                    We welcome guest posts and collaborations! If you have an interesting
                    story or tips to share, get in touch with us.
                </p>
                <button
                    className="bg-yellow-700 hover:bg-yellow-800 font-bold px-6 py-3 rounded-md shadow-md transition"
                    onClick={() => alert("Redirect to contact or submission form")}
                >
                    Contact Us
                </button>
            </section>

            {/* Social Media Links */}
            <section className="social-media mb-16 max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold mb-6">Follow Us</h2>
                <div className="flex justify-center gap-8 text-yellow-500 text-2xl">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><FaFacebookF /></a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter"><FaTwitter /></a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FaInstagram /></a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn /></a>
                </div>
            </section>

            {/* Footer */}
            <footer className="text-center py-6 border-t border-gray-300 text-gray-600 text-sm">
                &copy; {new Date().getFullYear()} Your Blog Name. All rights reserved.
            </footer>
        </div>
    );
};

export default Blog;
