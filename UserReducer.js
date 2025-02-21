import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data.map((user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    dob: "1990-01-01",
    address: user.address.street + ", " + user.address.city,
  }));
});

const loadUsers = () => {
  const savedUsers = localStorage.getItem("users");
  return savedUsers ? JSON.parse(savedUsers) : [];
};

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: loadUsers(),
    status: "idle", 
  },
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser: (state, action) => {
      const { id, name, email, dob, address } = action.payload;
      const user = state.users.find((user) => user.id === id);
      if (user) {
        user.name = name;
        user.email = email;
        user.dob = dob;
        user.address = address;
      }
      localStorage.setItem("users", JSON.stringify(state.users));
    },
    deleteUser: (state, action) => {
      state.users = state.users.filter((user) => user.id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        localStorage.setItem("users", JSON.stringify(action.payload));
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { addUser, deleteUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
