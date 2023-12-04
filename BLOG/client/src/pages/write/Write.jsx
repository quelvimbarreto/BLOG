import { useContext, useEffect, useState } from "react";
import "./write.css";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Write() {
  const [categories, setCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user } = useContext(Context);
  const [cats, setCats] = useState([]);

  const handleCheck = (e) => {
    if (!cats.includes(e.target.name)) {
      setCats([...cats, e.target.name]);
    } else {
      setCats(cats.filter((c) => c !== e.target.name));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      desc,
      categories: cats,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    if (title && desc) {
      try {
        const res = await axios.post("/posts", newPost);
        window.location.replace("/posts/" + res.data._id);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await axios.get("/categories");
      setCategories(res.data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="write">
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
      <form className="writeForm" onSubmit={handleSubmit}>
        <input
          className="writeInput"
          placeholder="Title"
          type="text"
          autoFocus={true}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="writeFormGroup">
          <textarea
            placeholder="Tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </div>
        <ul className="writeFormList">
          {categories.map((c, i) => (
            <li className="writeFormListItem" key={c._id}>
              <input type="checkbox" name={c.name} onChange={handleCheck} />
              <span>{c.name}</span>
            </li>
          ))}
        </ul>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-regular fa-image"></i>{" "}
          </label>
          <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <button className="writeSubmit" type="submit">
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}
