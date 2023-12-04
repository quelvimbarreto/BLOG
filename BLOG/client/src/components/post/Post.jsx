import "./post.css";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  const postDate = new Date(post.createdAt);
  const postUpdated = new Date(post.updatedAt);

  return (
    <div className="post">
      <img
        className="postImg"
        src={"http://localhost:5000/images/" + post.photo}
        alt=""
      />
      <div className="postinfo">
        <div className="postCats">
          {post.categories.map((c) => {
            return (
              <span className="postCat" key={c}>
                {c}
              </span>
            );
          })}
        </div>
        <span className="postTitle">
          <Link to={`/posts/${post._id}`}>{post.title}</Link>
        </span>
        <hr />
        <span className="postDate">
          Postado{" "}
          {postDate.toLocaleString("pt-BR", {
            timezone: "UTC",
            dateStyle: "full",
          })}
        </span>
        <br />
        {post.createdAt !== post.updatedAt && (
          <span className="postDate">
            Última atualização:{" "}
            {postUpdated.toLocaleString("pt-BR", {
              timezone: "UTC",
              dateStyle: "full",
            })}
          </span>
        )}
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
