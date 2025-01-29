import { useState } from 'react';
import './AddUser.css';

function AddUser() {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    department: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form state
    setForm({ ...form, [name]: value });

    // Validate name fields (firstName and lastName)
    if ((name === "firstName" || name === "lastName") && !/^[A-Za-z\s]+$/.test(value)) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "Name is Invalid" }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }

    // Validate email field
    if (name === "email") {
      const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (value.match(validRegex)) {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "Email is Invalid" }));
      }
    }
  };

  const handleAddUser = () => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => setUsers([...users, { ...form }]))
      .catch((error) => console.error("Error adding user:", error));

    // Clear form after submission
    setForm({ firstName: "", lastName: "", email: "", department: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleAddUser();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="user-form">
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          value={form.firstName}
          required
        />
        {errors.firstName && <span className="error-msg">{errors.firstName}</span>}

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          value={form.lastName}
          required
        />
        {errors.lastName && <span className="error-msg">{errors.lastName}</span>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={form.email}
          required
        />
        {errors.email && <span className="error-msg">{errors.email}</span>}

        <input
          type="text"
          name="department"
          placeholder="Department"
          onChange={handleChange}
          value={form.department}
          required
        />

        <button type="submit" disabled={Object.values(errors).some((err) => err)}>
          Add User
        </button>
      </form>
    </>
  );
}

export default AddUser;
