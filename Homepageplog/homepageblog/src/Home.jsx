import { useMemo, useState } from "react";
import "./Home.css";
import { posts } from "./data/posts";

const FILTERS = ["All", "Food", "Tech", "Travel"];
const POSTS_PER_PAGE = 3;

export default function Home() {
  const [currentFilter, setCurrentFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => currentFilter === "All" || p.category === currentFilter);
  }, [currentFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));

  const pagePosts = useMemo(() => {
    const start = (currentPage - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return filteredPosts.slice(start, end);
  }, [filteredPosts, currentPage]);

  function changeFilter(filter) {
    setCurrentFilter(filter);
    setCurrentPage(1);
  }

  function goPrev() {
    setCurrentPage((p) => Math.max(1, p - 1));
  }

  function goNext() {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
  }

  if (currentPage > totalPages) {
    setCurrentPage(totalPages);
  }

  return (
    <>
      <header className="header">
        <h1>CardBlog</h1>

        <div className="filter">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter__btn ${currentFilter === f ? "active" : ""}`}
              onClick={() => changeFilter(f)}
              type="button"
            >
              {f}
            </button>
          ))}
        </div>
      </header>

      <main className="content">
        <section className="posts">
          {filteredPosts.length === 0 ? (
            <p className="no-posts">No posts in this category yet.</p>
          ) : (
            <div className="posts__grid">
              {pagePosts.map((p) => (
                <article key={p.id} className="post-card">
                  <img className="post-card__img" src={p.image} alt={p.title} />
                  <div className="post-card__content">
                    <span className="post-card__category">{p.category}</span>

                    <h3 className="post-card__title">
                      {p.title.split("\n").map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </h3>

                    <p className="post-card__desc">{p.desc}</p>
                    <div className="post-card__meta">{p.date}</div>
                    <a href="#" className="post-card__btn">
                      Read More
                    </a>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {filteredPosts.length > 0 && (
          <div className="pagination">
            <button className="page-btn" onClick={goPrev} disabled={currentPage === 1} type="button">
              Prev
            </button>

            <div className="page-numbers" id="pageNumbers">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  className={`page-number ${n === currentPage ? "active" : ""}`}
                  onClick={() => setCurrentPage(n)}
                  type="button"
                >
                  {n}
                </button>
              ))}
            </div>

            <button className="page-btn" onClick={goNext} disabled={currentPage === totalPages} type="button">
              Next
            </button>
          </div>
        )}
      </main>
    </>
  );
}