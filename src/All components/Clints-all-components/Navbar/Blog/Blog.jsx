import React, { useEffect, useState } from 'react';
import { FaCalendarAlt, FaUser } from 'react-icons/fa';
import './Blog.css';

const Blog = () => {
    const [blogData, setBlogData] = useState([]);
    const [expanded, setExpanded] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 6;

    useEffect(() => {
        fetch('/All post data/post.json')
            .then(res => res.json())
            .then(data => {
                const blog = data.filter(item => item.category2 === "blog");
                setBlogData(blog);
            });
    }, []);

    const toggleReadMore = (id) => {
        setExpanded(expanded === id ? null : id);
    };

    // Pagination logic
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = blogData.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(blogData.length / postsPerPage);

    return (
        <div>
            {/* Blog Cards */}
            <div className="blog-container max-w-7xl mx-auto">
                {currentPosts.map((post) => (
                    <div className="blog-card" key={post.id}>
                        <img src={post.img} alt={post.title} />
                        <h3>{post.title}</h3>

                        <div className="blog-meta">
                            <span className='flex items-center'><FaCalendarAlt /> {post.date}</span>
                            <span className='flex items-center'><FaUser /> {post.category}</span>
                        </div>

                        <p>{post.description}</p>

                        {expanded === post.id && (
                            <p className="full-desc">{post.ldescription}</p>
                        )}

                        <button className="read-more underline" onClick={() => toggleReadMore(post.id)}>
                            {expanded === post.id ? 'READ LESS' : 'READ MORE'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                    <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={currentPage === i + 1 ? 'active' : ''}
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Blog;
