import { create } from 'zustand'
import axios from 'axios'


export const useUsersStore = create((set) => ({
users: [],
total: 0,
loading: false,
error: null,


fetchUsers: async (limit = 10, skip = 0, q = '') => {
set({ loading: true })
try {
const url = q
? `https://dummyjson.com/users/search?q=${q}`
: `https://dummyjson.com/users?limit=${limit}&skip=${skip}`


const res = await axios.get(url)
const items = res.data.users || res.data
set({ users: items, total: res.data.total || items.length, loading: false })
} catch (err) {
set({ error: err.message, loading: false })
}
},


fetchUserById: async (id) => {
const res = await axios.get(`https://dummyjson.com/users/${id}`)
return res.data
},
}))