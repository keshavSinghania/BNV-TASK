import React from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import UsersList from "../pages/users/UsersList.jsx"
import UserAdd from "../pages/users/UserAdd.jsx"
import UserEdit from "../pages/users/UserEdit.jsx"
import UserView from "../pages/users/UserView.jsx"

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/users" />}/>

      <Route path="/users" element={<UsersList/>}/>
      <Route path="/users/new" element={<UserAdd/>}/>
      <Route path="/users/:id/edit" element={<UserEdit/>}/>
      <Route path="/users/:id" element={<UserView/>}/>

      <Route path="*" element={<><h1 className='bg-red-600'>Page not found </h1></>}/>
    </Routes>
  )
}

export default AppRoutes