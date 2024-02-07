const express = require("express");
const fileupload = require("express-fileupload");
const mysql = require("mysql");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileupload());
app.use(express.static("upload"));

const conn = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "socienet",
});

app.post("/", async function (req, res) {
  try {
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ error: "No files were uploaded." });
    }

    const { nom, email, bio, addresse } = req.body;

    const photoProfileFile = req.files.photo_profile;
    const photoCouvFile = req.files.photo_coverture;

    const photoProfilePath = "./upload/" + photoProfileFile.name;
    const photoCouvPath = "./upload/" + photoCouvFile.name;

    photoProfileFile.mv(photoProfilePath, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log("Photo profile uploaded to:", photoProfilePath);
    });

    photoCouvFile.mv(photoCouvPath, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      console.log("Photo couverture uploaded to:", photoCouvPath);
    });

    const insertQuery =
      "INSERT INTO user (nom, email, bio, addresse, photo_profile, photo_coverture) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      nom,
      email,
      bio,
      addresse,
      photoProfileFile.name,
      photoCouvFile.name,
    ];

    conn.query(insertQuery, values, (err, results, fields) => {
      if (err) {
        console.error("Error inserting data into database:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      console.log("Data inserted into the database");
      const userId = results.insertId;
      const getquery = "SELECT * FROM user WHERE id = ?";

      conn.query(getquery, [userId], (err, userresults) => {
        if (err) {
          console.error("Error retrieving user data:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const user = userresults[0];

        return res.status(201).json(user);
      });
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch("/:id", function (req, res) {
  const userId = req.params.id;
  const { nom, email, addresse, bio } = req.body;

  const updateQuery =
    "UPDATE user SET nom = ?, email = ?, addresse = ?, bio = ? WHERE id = ?";

  conn.query(
    updateQuery,
    [nom, email, addresse, bio, userId],
    (err, results) => {
      if (err) {
        console.error("Error updating user data:", err);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.affectedRows === 0) {
        return res.status(404).json({ error: "User not found." });
      }

      const getQuery = "SELECT * FROM user WHERE id = ?";

      conn.query(getQuery, [userId], (err, userResults) => {
        if (err) {
          console.error("Error retrieving updated user data:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const updatedUser = userResults[0];
        return res.status(200).json(updatedUser);
      });
    }
  );
});

app.post("/posts", function (req, res) {
  if (req.files.image) {
    const { image } = req.files;
    const photoPath = "./upload/" + image.name;

    image.mv(photoPath, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      const insertQuery = "INSERT INTO post (caption, image) VALUES (?, ?)";
      const values = [req.body.caption, image.name];

      conn.query(insertQuery, values, (err, results, fields) => {
        if (err) {
          console.error("Error inserting data into database:", err);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        const postId = results.insertId;
        const getquery = "SELECT * FROM post WHERE id = ?";

        conn.query(getquery, [postId], (err, results) => {
          if (err) {
            console.error("Error retrieving post data:", err);
            return res.status(500).json({ error: "Internal Server Error" });
          }

          const post = results[0];

          return res.status(201).json(post);
        });
      });
    });
  } else {
    return res.status(400).json({ message: "Please upload an image" });
  }
});

app.patch("/:id/profile", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded." });
  }
  const photoProfileFile = req.files.photo_profile;
  const photoProfilePath = "./upload/" + photoProfileFile.name;
  photoProfileFile.mv(photoProfilePath, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("Photo profile uploaded to:", photoProfilePath);
  });

  const query = "UPDATE user SET photo_profile = ? WHERE id = ? ";
  conn.query(query, [photoProfileFile.name, req.params.id], (err, results) => {
    if (err) {
      console.error("Error updating user data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }
    return res.status(200).json({ image: photoProfileFile.name });
  });
});
app.patch("/:id/cover", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ error: "No files were uploaded." });
  }
  const photoCover = req.files.photo_coverture;
  const photoPath = "./upload/" + photoCover.name;
  photoCover.mv(photoPath, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    console.log("Photo profile uploaded to:", photoPath);
  });

  const query = "UPDATE user SET photo_coverture = ? WHERE id = ? ";
  conn.query(query, [photoCover.name, req.params.id], (err, results) => {
    if (err) {
      console.error("Error updating user data:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ image: photoCover.name });
  });
});
app.get("/posts", function (req, res) {
  const query = "SELECT * FROM post";

  conn.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.message);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    console.log(results);
    res.status(200).json({ posts: results });
  });
});

const PORT = 8000;
app.listen(PORT, () => {
  conn.getConnection((err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Connected to the database");
  });
  console.log(`App listening on port ${PORT}`);
});
