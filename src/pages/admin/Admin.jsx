import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddProducts, AdminHome, AdminSidebar, Orders, ViewProducts } from "../../components";

const Admin = () => {
	return (
		<>
			<div className=" bg-base-200 ">
				<div className="w-full md:w-9/12 mx-auto h-[93vh] flex bg-base-100  ">
					<div className="w-24 md:w-96 border-x-2">
						<AdminSidebar />
					</div>
					<div className="flex-1 sm:p-4">
						<Routes>
							<Route path="home" element={<AdminHome />} />
							<Route path="all-products" element={<ViewProducts />} />
							<Route path="add-product/:id" element={<AddProducts />} />
							<Route path="orders" element={<Orders />} />
						</Routes>
					</div>
				</div>
			</div>
		</>
	);
};

export default Admin;
