import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfileImage = ({ setUser, user }) => {
  const [profile, setProfile] = useState();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  /* 
  async function handelSubmit(e) {
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
    return navigate("/");
  } */

  return (
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
        alt="Profile"
        style={{
          width: "400px",
          height: "400px",
          marginTop: "-100px",
          aspectRatio: "1/1",
          overflow: "hidden",
          borderRadius: "50%",
          objectFit: "cover",

          border: "4px solid white",
        }}
        height="400"
        width="200"
      />
      <h2>Profile picture</h2>
      <form>
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
  );
};

export default ProfileImage;
