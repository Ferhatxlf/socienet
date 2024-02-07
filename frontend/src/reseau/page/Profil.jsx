import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Profil = () => {
  const [profile, setProfile] = useState();
  const [error, setError] = useState("");
  const [user, setUser] = useState("");
  const [component, setComponent] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const a = localStorage.getItem("currentUser");

    setUser(JSON.parse(a));
  }, []);
  async function handelSubmit(e) {
    const a = localStorage.getItem("currentUser");

    const me = JSON.parse(a);
    e.preventDefault();
    setError("");
    const formData = new FormData();
    formData.append("photo_profile", profile);

    const res = await fetch(`http://localhost:8000/${user.id}/profile`, {
      method: "PATCH",
      body: formData,
    });
    if (!res.ok) {
      return setError("error uploading file");
    }
    const data = await res.json();
    setUser({ ...user, photo_profile: data.image });
    return navigate("/reseau/page/Acc");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", image);

      const res = await fetch(`http://localhost:8000/${user.id}/addPost`, {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        return setError("error uploading file");
      }
      const data = await res.json();
      setUser({ ...user, photo_profile: data.image });

      navigate("/reseau/page/Acc");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <div
        style={{
          width: "20%",
          backgroundColor: "#f0f0f0",
          padding: "20px",
          borderRight: "1px solid #ccc",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <img
            src={`http://localhost:8000/${user?.photo_profile}`}
            alt="Profile"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              objectFit: "cover",
              border: "2px solid white",
            }}
          />
          <h3 style={{ margin: "10px 0" }}>{user.username}</h3>
        </div>
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <li style={{ marginBottom: "10px" }}>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#333",
                fontSize: "16px",
              }}
              onClick={() => setComponent(0)}
            >
              Modifier la photo de profile
            </button>
          </li>

          <li>
            <button
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
                color: "#333",
                fontSize: "16px",
              }}
              onClick={() => setComponent(1)}
            >
              Nouvelle publication
            </button>
          </li>
        </ul>
      </div>

      {component === 0 && (
        <div style={{ width: "80%" }}>
          <div
            style={{
              height: "100dvh",
              width: "80%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              margin: "0 auto",
            }}
          >
            <img
              src={`http://localhost:8000/${user?.photo_profile}`}
              alt="Profile"
              style={{
                width: "400px",
                height: "400px",
                marginTop: "-100px",
                aspectRatio: "1/1",
                overflow: "hidden",
                borderRadius: "50%",
                objectFit: "cover",

                border: "1px solid white",
              }}
              height="400"
              width="200"
            />
            <h2>Profile picture</h2>
            <form onSubmit={handelSubmit}>
              <label
                style={{
                  margin: "15px",
                  fontSize: "1.1rem",
                  color: "#161616",
                  fontWeight: "bold",
                }}
              >
                {" "}
                add a new profile picture{" "}
              </label>
              <input
                id="coverPicture"
                onChange={(e) => setProfile(e.target.files[0])}
                style={{
                  appearance: "none",
                  border: "1px solid #CBD5E0",
                  borderRadius: "0.375rem",
                  boxShadow:
                    "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                  color: "#4A5568",
                  padding: "0.75rem 0.75rem",
                  width: "100%",
                  margin: "25px 0",
                }}
                type="file"
              />
              <button
                style={{
                  padding: "15px",
                  width: "100%",
                  backgroundColor: "#0c2031",
                  color: "white",
                }}
              >
                Submit
              </button>
              {error && (
                <p
                  style={{
                    color: "#dc3545",
                    fontSize: ".7rem",
                    backgroundColor: "pink",
                    padding: "15px",
                  }}
                >
                  {error}
                </p>
              )}
            </form>
          </div>
        </div>
      )}

      {component === 1 && (
        <div
          style={{
            height: "100vh",
            width: "80%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "0 auto",
          }}
        >
          <h2>Create Publication</h2>
          <form
            onSubmit={handleSubmit}
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <label htmlFor="description" style={{ marginBottom: "10px" }}>
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: "100%",
                minHeight: "100px",
                marginBottom: "20px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "10px",
                resize: "vertical",
              }}
              required
            />
            <label htmlFor="image" style={{ marginBottom: "10px" }}>
              Image:
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ marginBottom: "20px" }}
              required
            />
            <button
              type="submit"
              style={{
                padding: "10px 20px",
                backgroundColor: "#0c2031",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Submit
            </button>
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default Profil;
